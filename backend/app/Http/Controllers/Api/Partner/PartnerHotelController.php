<?php

namespace App\Http\Controllers\Api\Partner;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\HotelImage;
use App\Models\HotelFacility;
use App\Services\HotelService;
use Illuminate\Http\Request;

class PartnerHotelController extends Controller
{
    public function __construct(
        private HotelService $hotelService,
    ) {}

    private function getPartnerId(): int
    {
        return auth()->user()->partner->id;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'is_active']);
        $hotels = $this->hotelService->getPartnerHotels($this->getPartnerId(), $filters);

        return ApiResponse::paginated($hotels);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'province' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'star_rating' => 'nullable|integer|min:1|max:5',
        ]);

        $validated['is_active'] = false; // New hotels start inactive

        $hotel = $this->hotelService->createPartnerHotel($this->getPartnerId(), $validated);

        return ApiResponse::success($hotel, 'Hotel created successfully.', 201);
    }

    public function show(int $hotel)
    {
        $result = $this->hotelService->getPartnerHotel($this->getPartnerId(), $hotel);

        if (!$result) {
            return ApiResponse::error('Hotel not found.', 404);
        }

        return ApiResponse::success($result);
    }

    public function update(Request $request, int $hotel)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'address' => 'sometimes|string|max:500',
            'city' => 'sometimes|string|max:100',
            'province' => 'sometimes|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'star_rating' => 'nullable|integer|min:1|max:5',
        ]);

        $result = $this->hotelService->updatePartnerHotel($this->getPartnerId(), $hotel, $validated);

        if (!$result) {
            return ApiResponse::error('Hotel not found.', 404);
        }

        return ApiResponse::success($result, 'Hotel updated successfully.');
    }

    public function destroy(int $hotel)
    {
        $result = $this->hotelService->deletePartnerHotel($this->getPartnerId(), $hotel);

        if (!$result) {
            return ApiResponse::error('Hotel not found.', 404);
        }

        return ApiResponse::success(null, 'Hotel deleted successfully.');
    }
}
