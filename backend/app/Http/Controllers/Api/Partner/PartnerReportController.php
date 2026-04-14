<?php

namespace App\Http\Controllers\Api\Partner;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\Request;

class PartnerReportController extends Controller
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
        $filters = $request->only(['date_from', 'date_to']);
        $partnerId = $this->getPartnerId();

        $stats = $this->bookingService->getPartnerStats($partnerId);
        $earnings = $this->bookingService->getPartnerEarnings($partnerId, $filters);

        return ApiResponse::success([
            'stats' => $stats,
            'earnings' => $earnings,
        ]);
    }
}
