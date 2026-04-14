<?php

namespace App\Services;

use App\DTOs\BookingData;
use App\Models\Booking;
use App\Models\Hotel;
use App\Models\RoomType;
use App\Models\Review;
use App\Repositories\Eloquent\BookingRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingService
{
    public function __construct(
        private BookingRepository $bookingRepository,
    ) {}

    public function getUserBookings(int $userId, array $filters = [], int $perPage = 15)
    {
        return $this->bookingRepository->paginateForUser($userId, $filters, $perPage);
    }

    public function getBooking(int $userId, int $bookingId)
    {
        $booking = $this->bookingRepository->findById($bookingId);

        if (!$booking || $booking->user_id !== $userId) {
            return null;
        }

        return $booking;
    }

    public function createBooking(int $userId, array $data)
    {
        $hotel = Hotel::find($data['hotel_id']);
        if (!$hotel || !$hotel->is_active) {
            throw new \Exception('Hotel not found or inactive.');
        }

        $roomType = RoomType::where('id', $data['room_type_id'])
            ->where('hotel_id', $hotel->id)
            ->where('is_active', true)
            ->first();

        if (!$roomType) {
            throw new \Exception('Room type not found or inactive.');
        }

        $checkIn = \Carbon\Carbon::parse($data['check_in_date']);
        $checkOut = \Carbon\Carbon::parse($data['check_out_date']);
        $nights = $checkIn->diffInDays($checkOut);

        if ($nights < 1) {
            throw new \Exception('Check-out date must be after check-in date.');
        }

        // Check availability
        $unavailable = $roomType->availabilities()
            ->whereBetween('date', [$checkIn, $checkOut->subDay()])
            ->where('available_rooms', '<', $data['num_rooms'])
            ->exists();

        if ($unavailable) {
            throw new \Exception('Selected rooms are not available for the requested dates.');
        }

        $pricePerNight = $roomType->base_price;
        $subtotal = $pricePerNight * $data['num_rooms'] * $nights;
        $taxAmount = $subtotal * 0.11; // 11% tax
        $totalAmount = $subtotal + $taxAmount;

        $booking = DB::transaction(function () use ($userId, $data, $hotel, $roomType, $nights, $pricePerNight, $subtotal, $taxAmount, $totalAmount) {
            // Decrease availability
            $checkIn = \Carbon\Carbon::parse($data['check_in_date']);
            $checkOut = \Carbon\Carbon::parse($data['check_out_date']);

            for ($date = $checkIn->copy(); $date->lt($checkOut); $date->addDay()) {
                $roomType->availabilities()
                    ->where('date', $date->toDateString())
                    ->decrement('available_rooms', $data['num_rooms']);
            }

            return $this->bookingRepository->create([
                'booking_code' => 'BK-' . strtoupper(Str::random(8)),
                'user_id' => $userId,
                'hotel_id' => $hotel->id,
                'room_type_id' => $roomType->id,
                'check_in_date' => $data['check_in_date'],
                'check_out_date' => $data['check_out_date'],
                'num_rooms' => $data['num_rooms'],
                'num_guests' => $data['num_guests'],
                'price_per_night' => $pricePerNight,
                'nights' => $nights,
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'notes' => $data['notes'] ?? null,
                'guest_name' => $data['guest_name'] ?? null,
                'guest_email' => $data['guest_email'] ?? null,
                'guest_phone' => $data['guest_phone'] ?? null,
            ]);
        });

        return $booking->load(['hotel', 'roomType']);
    }

    public function cancelBooking(int $userId, int $bookingId)
    {
        $booking = $this->bookingRepository->findById($bookingId);

        if (!$booking || $booking->user_id !== $userId) {
            throw new \Exception('Booking not found.');
        }

        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            throw new \Exception('Cannot cancel booking with status: ' . $booking->status);
        }

        return DB::transaction(function () use ($booking) {
            // Restore availability
            $checkIn = \Carbon\Carbon::parse($booking->check_in_date);
            $checkOut = \Carbon\Carbon::parse($booking->check_out_date);

            $roomType = RoomType::find($booking->room_type_id);
            for ($date = $checkIn->copy(); $date->lt($checkOut); $date->addDay()) {
                $roomType->availabilities()
                    ->where('date', $date->toDateString())
                    ->increment('available_rooms', $booking->num_rooms);
            }

            return $this->bookingRepository->update($booking->id, ['status' => 'cancelled']);
        });
    }

    public function createReview(int $userId, int $bookingId, array $data)
    {
        $booking = $this->bookingRepository->findById($bookingId);

        if (!$booking || $booking->user_id !== $userId) {
            throw new \Exception('Booking not found.');
        }

        if ($booking->status !== 'completed') {
            throw new \Exception('Can only review completed bookings.');
        }

        $existingReview = Review::where('booking_id', $bookingId)->first();
        if ($existingReview) {
            throw new \Exception('You have already reviewed this booking.');
        }

        return Review::create([
            'user_id' => $userId,
            'hotel_id' => $booking->hotel_id,
            'booking_id' => $bookingId,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
        ]);
    }

    public function createPaymentInvoice(int $userId, int $bookingId)
    {
        $booking = $this->bookingRepository->findById($bookingId);

        if (!$booking || $booking->user_id !== $userId) {
            throw new \Exception('Booking not found.');
        }

        if ($booking->status !== 'pending') {
            throw new \Exception('Payment can only be created for pending bookings.');
        }

        $existingPayment = $this->bookingRepository->findPaymentByBookingId($bookingId);
        if ($existingPayment && $existingPayment->status === 'paid') {
            throw new \Exception('Booking is already paid.');
        }

        // Create or update payment record (Xendit stub)
        $paymentData = [
            'payment_code' => 'PAY-' . strtoupper(Str::random(8)),
            'booking_id' => $bookingId,
            'amount' => $booking->total_amount,
            'payment_method' => 'xendit',
            'status' => 'pending',
        ];

        if ($existingPayment) {
            $payment = $this->bookingRepository->updatePayment($existingPayment->id, $paymentData);
        } else {
            $payment = $this->bookingRepository->createPayment($paymentData);
        }

        return [
            'payment' => $payment,
            'invoice_url' => 'https://checkout.xendit.co/inv/' . $payment->payment_code, // Stub
        ];
    }

    public function handleWebhook(array $payload)
    {
        $paymentCode = $payload['external_id'] ?? null;
        $status = $payload['status'] ?? null;

        if (!$paymentCode) {
            throw new \Exception('Invalid webhook payload.');
        }

        $payment = $this->bookingRepository->findPaymentByCode($paymentCode);
        if (!$payment) {
            throw new \Exception('Payment not found.');
        }

        if ($status === 'PAID') {
            DB::transaction(function () use ($payment) {
                $this->bookingRepository->updatePayment($payment->id, [
                    'status' => 'paid',
                    'transaction_id' => $payment->transaction_id ?? $payment->payment_code,
                    'paid_at' => now(),
                ]);

                $this->bookingRepository->update($payment->booking_id, [
                    'status' => 'confirmed',
                ]);
            });
        }

        return $payment;
    }

    public function getPartnerBookings(int $partnerId, array $filters = [])
    {
        return $this->bookingRepository->getPartnerBookings($partnerId, $filters);
    }

    public function updateBookingStatus(int $partnerId, int $bookingId, string $status)
    {
        $booking = $this->bookingRepository->findById($bookingId);

        if (!$booking || $booking->hotel->partner_id !== $partnerId) {
            throw new \Exception('Booking not found.');
        }

        $allowedTransitions = [
            'pending' => ['confirmed', 'cancelled'],
            'confirmed' => ['completed', 'cancelled'],
        ];

        if (!isset($allowedTransitions[$booking->status]) || !in_array($status, $allowedTransitions[$booking->status])) {
            throw new \Exception('Cannot change status from ' . $booking->status . ' to ' . $status);
        }

        return $this->bookingRepository->update($bookingId, ['status' => $status]);
    }

    public function getPartnerStats(int $partnerId): array
    {
        return $this->bookingRepository->getPartnerStats($partnerId);
    }

    public function getPartnerEarnings(int $partnerId, array $filters = []): array
    {
        return $this->bookingRepository->getPartnerEarnings($partnerId, $filters);
    }

    public function getAllBookings(array $filters = [])
    {
        return $this->bookingRepository->getAllBookings($filters);
    }

    public function getDashboardStats(): array
    {
        return [
            'total_bookings' => $this->bookingRepository->count(),
            'pending_bookings' => $this->bookingRepository->countByStatus('pending'),
            'confirmed_bookings' => $this->bookingRepository->countByStatus('confirmed'),
            'completed_bookings' => $this->bookingRepository->countByStatus('completed'),
            'cancelled_bookings' => $this->bookingRepository->countByStatus('cancelled'),
            'total_revenue' => $this->bookingRepository->totalRevenue(),
            'recent_bookings' => $this->bookingRepository->getRecentBookings(5),
        ];
    }
}
