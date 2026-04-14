<?php

namespace App\Http\Controllers\Api\Partner;

use App\DTOs\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\RoomType;
use App\Models\RoomImage;
use Illuminate\Http\Request;

class PartnerRoomController extends Controller
{
    private function getPartnerId(): int
    {
        return auth()->user()->partner->id;
    }

    private function verifyHotelOwnership(int $hotelId): ?Hotel
    {
        return Hotel::where('id', $hotelId)
            ->where('partner_id', $this->getPartnerId())
            ->first();
    }

    public function index(Request $request)
    {
        $hotelId = $request->input('hotel_id');

        $query = RoomType::with(['images', 'hotel'])
            ->whereHas('hotel', function ($q) {
                $q->where('partner_id', $this->getPartnerId());
            });

        if ($hotelId) {
            $query->where('hotel_id', $hotelId);
        }

        $rooms = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 15));

        return ApiResponse::paginated($rooms);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|integer|exists:hotels,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
            'max_guests' => 'required|integer|min:1',
            'total_rooms' => 'required|integer|min:1',
            'bed_count' => 'nullable|integer|min:1',
            'bed_type' => 'nullable|string|max:50',
            'room_size' => 'nullable|integer|min:1',
        ]);

        $hotel = $this->verifyHotelOwnership($validated['hotel_id']);

        if (!$hotel) {
            return ApiResponse::error('Hotel not found or access denied.', 404);
        }

        $room = RoomType::create(array_merge($validated, ['is_active' => true]));

        return ApiResponse::success($room->load('images'), 'Room type created.', 201);
    }

    public function show(int $room)
    {
        $roomType = RoomType::with(['images', 'hotel'])
            ->whereHas('hotel', function ($q) {
                $q->where('partner_id', $this->getPartnerId());
            })
            ->where('id', $room)
            ->first();

        if (!$roomType) {
            return ApiResponse::error('Room type not found.', 404);
        }

        return ApiResponse::success($roomType);
    }

    public function update(Request $request, int $room)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'sometimes|numeric|min:0',
            'max_guests' => 'sometimes|integer|min:1',
            'total_rooms' => 'sometimes|integer|min:1',
            'bed_count' => 'nullable|integer|min:1',
            'bed_type' => 'nullable|string|max:50',
            'room_size' => 'nullable|integer|min:1',
            'is_active' => 'nullable|boolean',
        ]);

        $roomType = RoomType::whereHas('hotel', function ($q) {
                $q->where('partner_id', $this->getPartnerId());
            })
            ->where('id', $room)
            ->first();

        if (!$roomType) {
            return ApiResponse::error('Room type not found.', 404);
        }

        $roomType->update($validated);

        return ApiResponse::success($roomType->fresh(), 'Room type updated.');
    }

    public function destroy(int $room)
    {
        $roomType = RoomType::whereHas('hotel', function ($q) {
                $q->where('partner_id', $this->getPartnerId());
            })
            ->where('id', $room)
            ->first();

        if (!$roomType) {
            return ApiResponse::error('Room type not found.', 404);
        }

        $roomType->delete();

        return ApiResponse::success(null, 'Room type deleted.');
    }
}
