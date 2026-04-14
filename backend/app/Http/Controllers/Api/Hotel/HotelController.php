<?php

namespace App\Http\Controllers\Api\Hotel;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\HotelService;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function __construct(
        private HotelService $hotelService,
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only([
            'search', 'city', 'province', 'star_rating',
            'min_price', 'max_price', 'facilities', 'sort', 'order',
        ]);

        $perPage = $request->input('per_page', 15);
        $hotels = $this->hotelService->getHotels($filters, $perPage);

        return ApiResponse::paginated($hotels);
    }

    public function show(string $slug)
    {
        $hotel = $this->hotelService->getHotelBySlug($slug);

        if (!$hotel) {
            return ApiResponse::error('Hotel not found.', 404);
        }

        return ApiResponse::success($hotel);
    }
}
