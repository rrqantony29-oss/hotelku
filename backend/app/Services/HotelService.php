<?php

namespace App\Services;

use App\Repositories\HotelRepositoryInterface;
use App\Repositories\Eloquent\BookingRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class HotelService
{
    public function __construct(
        private HotelRepositoryInterface $hotelRepository,
        private BookingRepository $bookingRepository,
    ) {}

    public function getHotels(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return $this->hotelRepository->paginate($filters, $perPage);
    }

    public function getHotelBySlug(string $slug)
    {
        $hotel = $this->hotelRepository->findBySlug($slug);

        if (!$hotel) {
            return null;
        }

        // Add computed attributes
        $hotel->append(['review_count', 'average_rating']);

        return $hotel;
    }

    public function getHotelRooms(int $hotelId, array $filters = [])
    {
        return $this->hotelRepository->findRoomsByHotelId($hotelId, $filters);
    }

    public function createHotel(array $data)
    {
        if (empty($data['slug'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['name']) . '-' . uniqid();
        }

        return $this->hotelRepository->create($data);
    }

    public function updateHotel(int $id, array $data)
    {
        return $this->hotelRepository->update($id, $data);
    }

    public function deleteHotel(int $id)
    {
        return $this->hotelRepository->delete($id);
    }

    public function getDashboardStats(): array
    {
        $hotelStats = $this->hotelRepository->getStats();
        $bookingStats = $this->bookingRepository->count();

        return [
            'hotels' => $hotelStats,
            'bookings' => [
                'total' => $bookingStats,
            ],
            'recent_bookings' => $this->bookingRepository->getRecentBookings(5),
        ];
    }

    public function getPartnerHotels(int $partnerId, array $filters = []): LengthAwarePaginator
    {
        return $this->hotelRepository->getPartnerHotels($partnerId, $filters);
    }

    public function getPartnerHotel(int $partnerId, int $hotelId)
    {
        return $this->hotelRepository->getPartnerHotel($partnerId, $hotelId);
    }

    public function createPartnerHotel(int $partnerId, array $data)
    {
        $data['partner_id'] = $partnerId;

        if (empty($data['slug'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['name']) . '-' . uniqid();
        }

        return $this->hotelRepository->create($data);
    }

    public function updatePartnerHotel(int $partnerId, int $hotelId, array $data)
    {
        $hotel = $this->hotelRepository->getPartnerHotel($partnerId, $hotelId);

        if (!$hotel) {
            return null;
        }

        return $this->hotelRepository->update($hotelId, $data);
    }

    public function deletePartnerHotel(int $partnerId, int $hotelId)
    {
        $hotel = $this->hotelRepository->getPartnerHotel($partnerId, $hotelId);

        if (!$hotel) {
            return false;
        }

        return $this->hotelRepository->delete($hotelId);
    }
}
