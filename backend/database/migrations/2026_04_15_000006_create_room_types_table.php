<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('base_price', 15, 2)->comment('Price in IDR');
            $table->integer('max_guests')->default(2);
            $table->integer('total_rooms')->default(1);
            $table->integer('bed_count')->default(1);
            $table->string('bed_type')->nullable()->comment('single, double, queen, king');
            $table->integer('room_size')->nullable()->comment('in sqm');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_types');
    }
};
