<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code',
        'user_id',
        'hotel_id',
        'room_type_id',
        'check_in_date',
        'check_out_date',
        'num_rooms',
        'num_guests',
        'price_per_night',
        'nights',
        'subtotal',
        'tax_amount',
        'total_amount',
        'status',
        'notes',
        'guest_name',
        'guest_email',
        'guest_phone',
    ];

    protected function casts(): array
    {
        return [
            'check_in_date' => 'date',
            'check_out_date' => 'date',
            'num_rooms' => 'integer',
            'num_guests' => 'integer',
            'price_per_night' => 'decimal:2',
            'nights' => 'integer',
            'subtotal' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'total_amount' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
