<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'commission_percentage',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'commission_percentage' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }
}
