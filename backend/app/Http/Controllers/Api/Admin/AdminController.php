<?php

namespace App\Http\Controllers\Api\Admin;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\HotelPartner;
use App\Models\Hotel;
use App\Services\BookingService;
use App\Services\HotelService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct(
        private HotelService $hotelService,
        private BookingService $bookingService,
    ) {}

    public function dashboard()
    {
        $hotelStats = $this->hotelService->getDashboardStats();
        $bookingStats = $this->bookingService->getDashboardStats();

        return ApiResponse::success([
            'hotels' => $hotelStats['hotels'],
            'bookings' => $bookingStats,
        ]);
    }

    // Partners CRUD
    public function partners(Request $request)
    {
        $query = HotelPartner::with('user');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('verification_status')) {
            $query->where('verification_status', $request->input('verification_status'));
        }

        $partners = $query->orderBy('created_at', 'desc')->paginate($request->input('per_page', 15));

        return ApiResponse::paginated($partners);
    }

    public function updatePartner(Request $request, int $partner)
    {
        $validated = $request->validate([
            'verification_status' => 'required|in:pending,verified,rejected',
        ]);

        $hotelPartner = HotelPartner::find($partner);

        if (!$hotelPartner) {
            return ApiResponse::error('Partner not found.', 404);
        }

        $updateData = ['verification_status' => $validated['verification_status']];

        if ($validated['verification_status'] === 'verified') {
            $updateData['verified_at'] = now();
        }

        $hotelPartner->update($updateData);

        return ApiResponse::success($hotelPartner->fresh(), 'Partner updated successfully.');
    }

    // Hotels CRUD
    public function hotels(Request $request)
    {
        $query = Hotel::with(['partner.user', 'images']);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $hotels = $query->orderBy('created_at', 'desc')->paginate($request->input('per_page', 15));

        return ApiResponse::paginated($hotels);
    }

    public function updateHotel(Request $request, int $hotel)
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $hotelModel = Hotel::find($hotel);

        if (!$hotelModel) {
            return ApiResponse::error('Hotel not found.', 404);
        }

        $hotelModel->update($validated);

        return ApiResponse::success($hotelModel->fresh(), 'Hotel updated successfully.');
    }

    public function destroyHotel(int $hotel)
    {
        $hotelModel = Hotel::find($hotel);

        if (!$hotelModel) {
            return ApiResponse::error('Hotel not found.', 404);
        }

        $hotelModel->delete();

        return ApiResponse::success(null, 'Hotel deleted successfully.');
    }

    // Bookings
    public function bookings(Request $request)
    {
        $filters = $request->only(['status', 'hotel_id', 'date_from', 'date_to']);
        $bookings = $this->bookingService->getAllBookings($filters);

        return ApiResponse::paginated($bookings);
    }
}
