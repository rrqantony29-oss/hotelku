<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HotelPartner extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'company_address',
        'tax_id',
        'bank_name',
        'bank_account_number',
        'bank_account_name',
        'verification_status',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'verified_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function hotels(): HasMany
    {
        return $this->hasMany(Hotel::class, 'partner_id');
    }

    public function payouts(): HasMany
    {
        return $this->hasMany(Payout::class, 'partner_id');
    }
}
