<?php

namespace App\Http\Controllers\Api\Booking;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __construct(
        private BookingService $bookingService,
    ) {}

    public function store(int $booking, Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        try {
            $review = $this->bookingService->createReview(auth()->id(), $booking, $validated);

            return ApiResponse::success($review, 'Review submitted successfully.', 201);
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
