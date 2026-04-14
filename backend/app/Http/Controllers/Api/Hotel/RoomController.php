<?php

namespace App\Http\Controllers\Api\Hotel;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\HotelService;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function __construct(
        private HotelService $hotelService,
    ) {}

    public function index(int $hotel, Request $request)
    {
        $filters = $request->only(['is_active']);
        $rooms = $this->hotelService->getHotelRooms($hotel, $filters);

        return ApiResponse::success($rooms);
    }
}
