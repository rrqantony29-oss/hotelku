<?php

namespace App\Http\Controllers\Api\Partner;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\Request;

class PartnerBookingController extends Controller
{
    public function __construct(
        private BookingService $bookingService,
    ) {}

    private function getPartnerId(): int
    {
        return auth()->user()->partner->id;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['status', 'hotel_id']);
        $bookings = $this->bookingService->getPartnerBookings($this->getPartnerId(), $filters);

        return ApiResponse::paginated($bookings);
    }

    public function updateStatus(Request $request, int $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:confirmed,completed,cancelled',
        ]);

        try {
            $result = $this->bookingService->updateBookingStatus(
                $this->getPartnerId(),
                $booking,
                $validated['status']
            );

            return ApiResponse::success($result, 'Booking status updated.');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
