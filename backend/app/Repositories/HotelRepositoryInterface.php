<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface HotelRepositoryInterface
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator;

    public function findBySlug(string $slug);

    public function findById(int $id);

    public function findRoomsByHotelId(int $hotelId, array $filters = []);

    public function create(array $data);

    public function update(int $id, array $data);

    public function delete(int $id);

    public function getStats(): array;

    public function getPartnerHotels(int $partnerId, array $filters = []): LengthAwarePaginator;

    public function getPartnerHotel(int $partnerId, int $hotelId);

    public function count(): int;

    public function countActive(): int;
}
