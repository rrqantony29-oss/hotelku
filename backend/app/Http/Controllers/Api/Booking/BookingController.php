<?php

namespace App\Http\Controllers\Api\Booking;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(
        private BookingService $bookingService,
    ) {}

    public function index(Request $request)
    {
        $userId = auth()->id();
        $filters = $request->only(['status']);
        $perPage = $request->input('per_page', 15);

        $bookings = $this->bookingService->getUserBookings($userId, $filters, $perPage);

        return ApiResponse::paginated($bookings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|integer|exists:hotels,id',
            'room_type_id' => 'required|integer|exists:room_types,id',
            'check_in_date' => 'required|date|after:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'num_rooms' => 'required|integer|min:1|max:10',
            'num_guests' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
            'guest_name' => 'nullable|string|max:255',
            'guest_email' => 'nullable|email|max:255',
            'guest_phone' => 'nullable|string|max:20',
        ]);

        try {
            $booking = $this->bookingService->createBooking(auth()->id(), $validated);

            return ApiResponse::success($booking, 'Booking created successfully.', 201);
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    public function show(int $booking)
    {
        $result = $this->bookingService->getBooking(auth()->id(), $booking);

        if (!$result) {
            return ApiResponse::error('Booking not found.', 404);
        }

        return ApiResponse::success($result);
    }

    public function cancel(int $booking)
    {
        try {
            $result = $this->bookingService->cancelBooking(auth()->id(), $booking);

            return ApiResponse::success($result, 'Booking cancelled successfully.');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
