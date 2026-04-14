<?php

namespace App\Repositories\Eloquent;

use App\Models\Hotel;
use App\Repositories\HotelRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class HotelRepository implements HotelRepositoryInterface
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Hotel::with(['images', 'facilities', 'roomTypes', 'reviews']);

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        if (!empty($filters['city'])) {
            $query->where('city', 'like', "%{$filters['city']}%");
        }

        if (!empty($filters['province'])) {
            $query->where('province', 'like', "%{$filters['province']}%");
        }

        if (!empty($filters['star_rating'])) {
            $query->where('star_rating', $filters['star_rating']);
        }

        if (!empty($filters['min_price']) || !empty($filters['max_price'])) {
            $query->whereHas('roomTypes', function ($q) use ($filters) {
                if (!empty($filters['min_price'])) {
                    $q->where('base_price', '>=', $filters['min_price']);
                }
                if (!empty($filters['max_price'])) {
                    $q->where('base_price', '<=', $filters['max_price']);
                }
            });
        }

        if (!empty($filters['facilities'])) {
            $facilities = is_array($filters['facilities']) ? $filters['facilities'] : explode(',', $filters['facilities']);
            $query->whereHas('facilities', function ($q) use ($facilities) {
                $q->whereIn('name', $facilities);
            }, '=', count($facilities));
        }

        $query->where('is_active', true);

        $sort = $filters['sort'] ?? 'created_at';
        $order = $filters['order'] ?? 'desc';

        if (in_array($sort, ['name', 'star_rating', 'created_at'])) {
            $query->orderBy($sort, $order);
        }

        return $query->paginate($perPage);
    }

    public function findBySlug(string $slug)
    {
        return Hotel::with(['images', 'facilities', 'roomTypes.images', 'roomTypes.availabilities', 'reviews.user'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();
    }

    public function findById(int $id)
    {
        return Hotel::with(['images', 'facilities', 'roomTypes'])->find($id);
    }

    public function findRoomsByHotelId(int $hotelId, array $filters = [])
    {
        $query = Hotel::find($hotelId)?->roomTypes()->with(['images', 'availabilities']);

        if (!$query) {
            return collect();
        }

        if (!empty($filters['is_active'])) {
            $query->where('is_active', true);
        }

        return $query->get();
    }

    public function create(array $data)
    {
        return Hotel::create($data);
    }

    public function update(int $id, array $data)
    {
        $hotel = Hotel::find($id);
        if ($hotel) {
            $hotel->update($data);
            $hotel->refresh();
        }
        return $hotel;
    }

    public function delete(int $id)
    {
        $hotel = Hotel::find($id);
        if ($hotel) {
            $hotel->delete();
            return true;
        }
        return false;
    }

    public function getStats(): array
    {
        return [
            'total' => Hotel::count(),
            'active' => Hotel::where('is_active', true)->count(),
            'inactive' => Hotel::where('is_active', false)->count(),
        ];
    }

    public function getPartnerHotels(int $partnerId, array $filters = []): LengthAwarePaginator
    {
        $query = Hotel::with(['images', 'roomTypes'])
            ->where('partner_id', $partnerId);

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($filters['per_page'] ?? 15);
    }

    public function getPartnerHotel(int $partnerId, int $hotelId)
    {
        return Hotel::with(['images', 'facilities', 'roomTypes.images'])
            ->where('partner_id', $partnerId)
            ->where('id', $hotelId)
            ->first();
    }

    public function count(): int
    {
        return Hotel::count();
    }

    public function countActive(): int
    {
        return Hotel::where('is_active', true)->count();
    }
}
