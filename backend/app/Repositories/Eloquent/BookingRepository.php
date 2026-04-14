<?php

namespace App\Repositories\Eloquent;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Pagination\LengthAwarePaginator;

class BookingRepository
{
    public function paginateForUser(int $userId, array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Booking::with(['hotel.images', 'roomType', 'payment'])
            ->where('user_id', $userId);

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function findById(int $id)
    {
        return Booking::with(['user', 'hotel', 'roomType', 'payment'])->find($id);
    }

    public function findByCode(string $code)
    {
        return Booking::where('booking_code', $code)->first();
    }

    public function create(array $data)
    {
        return Booking::create($data);
    }

    public function update(int $id, array $data)
    {
        $booking = Booking::find($id);
        if ($booking) {
            $booking->update($data);
            $booking->refresh();
        }
        return $booking;
    }

    public function getPartnerBookings(int $partnerId, array $filters = []): LengthAwarePaginator
    {
        $query = Booking::with(['user', 'hotel', 'roomType', 'payment'])
            ->whereHas('hotel', function ($q) use ($partnerId) {
                $q->where('partner_id', $partnerId);
            });

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['hotel_id'])) {
            $query->where('hotel_id', $filters['hotel_id']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($filters['per_page'] ?? 15);
    }

    public function getAllBookings(array $filters = []): LengthAwarePaginator
    {
        $query = Booking::with(['user', 'hotel', 'roomType', 'payment']);

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['hotel_id'])) {
            $query->where('hotel_id', $filters['hotel_id']);
        }

        if (!empty($filters['date_from'])) {
            $query->where('check_in_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('check_in_date', '<=', $filters['date_to']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($filters['per_page'] ?? 15);
    }

    public function count(): int
    {
        return Booking::count();
    }

    public function countByStatus(string $status): int
    {
        return Booking::where('status', $status)->count();
    }

    public function totalRevenue(): float
    {
        return (float) Booking::where('status', 'completed')->sum('total_amount');
    }

    public function createPayment(array $data)
    {
        return Payment::create($data);
    }

    public function findPaymentByBookingId(int $bookingId)
    {
        return Payment::where('booking_id', $bookingId)->first();
    }

    public function findPaymentByCode(string $code)
    {
        return Payment::where('payment_code', $code)->first();
    }

    public function updatePayment(int $id, array $data)
    {
        $payment = Payment::find($id);
        if ($payment) {
            $payment->update($data);
            $payment->refresh();
        }
        return $payment;
    }

    public function getPartnerEarnings(int $partnerId, array $filters = []): array
    {
        $query = Booking::whereHas('hotel', function ($q) use ($partnerId) {
            $q->where('partner_id', $partnerId);
        })->where('status', 'completed');

        if (!empty($filters['date_from'])) {
            $query->where('check_in_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('check_out_date', '<=', $filters['date_to']);
        }

        $totalEarnings = (float) $query->sum('total_amount');
        $totalBookings = $query->count();

        return [
            'total_earnings' => $totalEarnings,
            'total_bookings' => $totalBookings,
        ];
    }

    public function getPartnerStats(int $partnerId): array
    {
        $query = Booking::whereHas('hotel', function ($q) use ($partnerId) {
            $q->where('partner_id', $partnerId);
        });

        return [
            'total_bookings' => $query->count(),
            'pending_bookings' => (clone $query)->where('status', 'pending')->count(),
            'confirmed_bookings' => (clone $query)->where('status', 'confirmed')->count(),
            'completed_bookings' => (clone $query)->where('status', 'completed')->count(),
            'cancelled_bookings' => (clone $query)->where('status', 'cancelled')->count(),
            'total_revenue' => (float) (clone $query)->where('status', 'completed')->sum('total_amount'),
        ];
    }

    public function getRevenueByDateRange(string $from, string $to): array
    {
        return Booking::where('status', 'completed')
            ->whereBetween('check_in_date', [$from, $to])
            ->selectRaw('DATE(check_in_date) as date, SUM(total_amount) as revenue, COUNT(*) as bookings')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
    }

    public function getRecentBookings(int $limit = 10)
    {
        return Booking::with(['user', 'hotel'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
