<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Hotel\HotelController;
use App\Http\Controllers\Api\Hotel\RoomController;
use App\Http\Controllers\Api\Booking\BookingController;
use App\Http\Controllers\Api\Booking\PaymentController;
use App\Http\Controllers\Api\Booking\ReviewController;
use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Admin\CommissionController;
use App\Http\Controllers\Api\Admin\ReportController;
use App\Http\Controllers\Api\Admin\ContentController;
use App\Http\Controllers\Api\Partner\PartnerHotelController;
use App\Http\Controllers\Api\Partner\PartnerBookingController;
use App\Http\Controllers\Api\Partner\PartnerRoomController;
use App\Http\Controllers\Api\Partner\PartnerReportController;
use App\Http\Controllers\Api\Partner\PartnerPayoutController;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::get('hotels', [HotelController::class, 'index']);
Route::get('hotels/{slug}', [HotelController::class, 'show']);
Route::get('hotels/{hotel}/rooms', [RoomController::class, 'index']);
Route::get('banners', [ContentController::class, 'banners']);
Route::get('faqs', [ContentController::class, 'faqs']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);

    // Bookings (Customer)
    Route::apiResource('bookings', BookingController::class)->only(['index', 'store', 'show']);
    Route::post('bookings/{booking}/cancel', [BookingController::class, 'cancel']);
    Route::post('bookings/{booking}/pay', [PaymentController::class, 'createInvoice']);
    Route::post('bookings/{booking}/review', [ReviewController::class, 'store']);

    // Partner
    Route::prefix('partner')->middleware('role:partner,admin')->group(function () {
        Route::apiResource('hotels', PartnerHotelController::class);
        Route::apiResource('rooms', PartnerRoomController::class);
        Route::get('bookings', [PartnerBookingController::class, 'index']);
        Route::patch('bookings/{booking}/status', [PartnerBookingController::class, 'updateStatus']);
        Route::get('reports', [PartnerReportController::class, 'index']);
        Route::get('payouts', [PartnerPayoutController::class, 'index']);
        Route::post('payouts/request', [PartnerPayoutController::class, 'requestPayout']);
    });

    // Admin
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('dashboard', [AdminController::class, 'dashboard']);
        Route::apiResource('partners', AdminController::class)->only(['index', 'update']);
        Route::apiResource('hotels', AdminController::class)->only(['index', 'update', 'destroy']);
        Route::get('bookings', [AdminController::class, 'bookings']);
        Route::get('commission', [CommissionController::class, 'index']);
        Route::put('commission', [CommissionController::class, 'update']);
        Route::get('reports', [ReportController::class, 'index']);
        Route::apiResource('banners', ContentController::class)->only(['store', 'update', 'destroy']);
        Route::apiResource('faqs', ContentController::class)->except(['index']);
    });
});

// Webhook (no auth)
Route::post('webhooks/xendit', [PaymentController::class, 'webhook']);
