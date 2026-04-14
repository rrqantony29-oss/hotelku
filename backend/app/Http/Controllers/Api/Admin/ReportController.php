<?php

namespace App\Http\Controllers\Api\Admin;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Payment;
use App\Repositories\Eloquent\BookingRepository;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function __construct(
        private BookingRepository $bookingRepository,
    ) {}

    public function index(Request $request)
    {
        $dateFrom = $request->input('date_from', now()->subMonth()->toDateString());
        $dateTo = $request->input('date_to', now()->toDateString());

        // Revenue stats
        $totalRevenue = Booking::where('status', 'completed')
            ->whereBetween('check_in_date', [$dateFrom, $dateTo])
            ->sum('total_amount');

        $totalTransactions = Booking::whereBetween('check_in_date', [$dateFrom, $dateTo])->count();

        // Transaction breakdown
        $transactionStats = Booking::whereBetween('check_in_date', [$dateFrom, $dateTo])
            ->selectRaw('status, COUNT(*) as count, SUM(total_amount) as total')
            ->groupBy('status')
            ->get();

        // Daily revenue chart data
        $dailyRevenue = $this->bookingRepository->getRevenueByDateRange($dateFrom, $dateTo);

        // Growth comparison
        $previousFrom = \Carbon\Carbon::parse($dateFrom)->subDays(
            \Carbon\Carbon::parse($dateFrom)->diffInDays(\Carbon\Carbon::parse($dateTo))
        )->toDateString();
        $previousTo = \Carbon\Carbon::parse($dateFrom)->subDay()->toDateString();

        $previousRevenue = Booking::where('status', 'completed')
            ->whereBetween('check_in_date', [$previousFrom, $previousTo])
            ->sum('total_amount');

        $growthPercentage = $previousRevenue > 0
            ? round((($totalRevenue - $previousRevenue) / $previousRevenue) * 100, 2)
            : 0;

        // Top hotels
        $topHotels = Booking::where('status', 'completed')
            ->whereBetween('check_in_date', [$dateFrom, $dateTo])
            ->with('hotel:id,name')
            ->selectRaw('hotel_id, COUNT(*) as bookings_count, SUM(total_amount) as revenue')
            ->groupBy('hotel_id')
            ->orderByDesc('revenue')
            ->limit(5)
            ->get();

        return ApiResponse::success([
            'period' => ['from' => $dateFrom, 'to' => $dateTo],
            'revenue' => [
                'total' => (float) $totalRevenue,
                'previous_period' => (float) $previousRevenue,
                'growth_percentage' => $growthPercentage,
            ],
            'transactions' => [
                'total' => $totalTransactions,
                'breakdown' => $transactionStats,
            ],
            'daily_revenue' => $dailyRevenue,
            'top_hotels' => $topHotels,
        ]);
    }
}
