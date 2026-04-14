<?php

namespace App\Http\Controllers\Api\Booking;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(
        private BookingService $bookingService,
    ) {}

    public function createInvoice(int $booking)
    {
        try {
            $result = $this->bookingService->createPaymentInvoice(auth()->id(), $booking);

            return ApiResponse::success($result, 'Payment invoice created.');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    public function webhook(Request $request)
    {
        try {
            $this->bookingService->handleWebhook($request->all());

            return response()->json(['received' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
