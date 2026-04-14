<?php

namespace App\DTOs;

class BookingData
{
    public function __construct(
        public readonly int $userId,
        public readonly int $hotelId,
        public readonly int $roomTypeId,
        public readonly string $checkInDate,
        public readonly string $checkOutDate,
        public readonly int $numRooms,
        public readonly int $numGuests,
        public readonly ?string $notes = null,
        public readonly ?string $guestName = null,
        public readonly ?string $guestEmail = null,
        public readonly ?string $guestPhone = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            userId: $data['user_id'],
            hotelId: $data['hotel_id'],
            roomTypeId: $data['room_type_id'],
            checkInDate: $data['check_in_date'],
            checkOutDate: $data['check_out_date'],
            numRooms: $data['num_rooms'],
            numGuests: $data['num_guests'],
            notes: $data['notes'] ?? null,
            guestName: $data['guest_name'] ?? null,
            guestEmail: $data['guest_email'] ?? null,
            guestPhone: $data['guest_phone'] ?? null,
        );
    }
}
