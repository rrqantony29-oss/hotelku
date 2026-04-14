<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Booking;
use App\Models\CommissionSetting;
use App\Models\Faq;
use App\Models\Hotel;
use App\Models\HotelFacility;
use App\Models\HotelImage;
use App\Models\HotelPartner;
use App\Models\Payment;
use App\Models\Payout;
use App\Models\Review;
use App\Models\RoomAvailability;
use App\Models\RoomImage;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ===== USERS =====
        $admin = User::create([
            'name' => 'Admin HotelKU',
            'email' => 'admin@hotelku.com',
            'role' => 'admin',
            'phone' => '+6281234567890',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        $partner1User = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@partner.com',
            'role' => 'partner',
            'phone' => '+6281111111111',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        $partner2User = User::create([
            'name' => 'Siti Rahayu',
            'email' => 'siti@partner.com',
            'role' => 'partner',
            'phone' => '+6282222222222',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        $customers = collect();
        $customerData = [
            ['name' => 'Andi Wijaya', 'email' => 'andi@customer.com', 'phone' => '+6283333333333'],
            ['name' => 'Dewi Lestari', 'email' => 'dewi@customer.com', 'phone' => '+6284444444444'],
            ['name' => 'Rudi Hermawan', 'email' => 'rudi@customer.com', 'phone' => '+6285555555555'],
            ['name' => 'Maya Putri', 'email' => 'maya@customer.com', 'phone' => '+6286666666666'],
            ['name' => 'Eko Prasetyo', 'email' => 'eko@customer.com', 'phone' => '+6287777777777'],
        ];

        foreach ($customerData as $data) {
            $customers->push(User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'role' => 'customer',
                'phone' => $data['phone'],
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]));
        }

        // ===== HOTEL PARTNERS =====
        $partner1 = HotelPartner::create([
            'user_id' => $partner1User->id,
            'company_name' => 'PT Santoso Hospitality Indonesia',
            'company_address' => 'Jl. Sudirman No. 123, Jakarta Pusat',
            'tax_id' => '01.234.567.8-901.000',
            'bank_name' => 'Bank Central Asia (BCA)',
            'bank_account_number' => '1234567890',
            'bank_account_name' => 'PT Santoso Hospitality Indonesia',
            'verification_status' => 'verified',
            'verified_at' => now()->subDays(30),
        ]);

        $partner2 = HotelPartner::create([
            'user_id' => $partner2User->id,
            'company_name' => 'CV Rahayu Paradise Hotels',
            'company_address' => 'Jl. Sunset Road No. 88, Seminyak, Bali',
            'tax_id' => '02.345.678.9-012.000',
            'bank_name' => 'Bank Mandiri',
            'bank_account_number' => '0987654321',
            'bank_account_name' => 'CV Rahayu Paradise Hotels',
            'verification_status' => 'verified',
            'verified_at' => now()->subDays(20),
        ]);

        // ===== HOTELS =====
        $hotels = collect();

        // Partner 1 Hotels (Jakarta)
        $hotel1 = Hotel::create([
            'partner_id' => $partner1->id,
            'name' => 'Grand Hyatt Jakarta',
            'slug' => 'grand-hyatt-jakarta',
            'description' => 'Experience luxury in the heart of Jakarta. Grand Hyatt Jakarta offers world-class hospitality with stunning city views, exceptional dining, and unparalleled service. Located adjacent to Plaza Indonesia shopping mall.',
            'address' => 'Jl. M.H. Thamrin Kav. 28-30, Menteng',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'postal_code' => '10350',
            'latitude' => -6.1931,
            'longitude' => 106.8219,
            'phone' => '+62213901234',
            'email' => 'info@grandhyattjakarta.com',
            'star_rating' => 5,
            'is_active' => true,
        ]);

        $hotel2 = Hotel::create([
            'partner_id' => $partner1->id,
            'name' => 'JW Marriott Hotel Jakarta',
            'slug' => 'jw-marriott-hotel-jakarta',
            'description' => 'Nestled in the prestigious Mega Kuningan business district, JW Marriott Hotel Jakarta combines elegance with modern comfort. Features include a luxurious spa, outdoor pool, and award-winning restaurants.',
            'address' => 'Jl. DR. Ide Anak Agung Gde Agung Kav. E.1.2 No. 1-2, Mega Kuningan',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'postal_code' => '12950',
            'latitude' => -6.2272,
            'longitude' => 106.8304,
            'phone' => '+622157988888',
            'email' => 'info@jwmarriottjakarta.com',
            'star_rating' => 5,
            'is_active' => true,
        ]);

        // Partner 2 Hotels (Bali & Yogyakarta)
        $hotel3 = Hotel::create([
            'partner_id' => $partner2->id,
            'name' => 'The Mulia Bali',
            'slug' => 'the-mulia-bali',
            'description' => 'The Mulia Bali is an ultra-luxurious beachfront resort in Nusa Dua. Featuring exquisite suites, world-class dining, the iconic Mulia Spa, and pristine white sand beaches. A sanctuary of refined elegance.',
            'address' => 'Jl. Raya Nusa Dua Selatan, Kawasan Sawangan, Nusa Dua',
            'city' => 'Bali',
            'province' => 'Bali',
            'postal_code' => '80363',
            'latitude' => -8.8167,
            'longitude' => 115.2272,
            'phone' => '+623613017777',
            'email' => 'info@themulia.com',
            'star_rating' => 5,
            'is_active' => true,
        ]);

        $hotel4 = Hotel::create([
            'partner_id' => $partner2->id,
            'name' => 'Hyatt Regency Yogyakarta',
            'slug' => 'hyatt-regency-yogyakarta',
            'description' => 'Set amidst 24 hectares of beautifully landscaped gardens, Hyatt Regency Yogyakarta offers a tranquil retreat. Features include a championship golf course, multiple pools, and authentic Javanese hospitality.',
            'address' => 'Jl. Palagan Tentara Pelajar, Panggung Sari, Sariharjo, Ngaglik',
            'city' => 'Yogyakarta',
            'province' => 'DI Yogyakarta',
            'postal_code' => '55581',
            'latitude' => -7.7321,
            'longitude' => 110.3891,
            'phone' => '+622744581234',
            'email' => 'info@hyattyogyakarta.com',
            'star_rating' => 5,
            'is_active' => true,
        ]);

        $hotels->push($hotel1, $hotel2, $hotel3, $hotel4);

        // ===== HOTEL IMAGES =====
        foreach ($hotels as $hotel) {
            HotelImage::create(['hotel_id' => $hotel->id, 'image_path' => 'images/hotels/' . $hotel->slug . '-main.webp', 'caption' => 'Hotel Exterior', 'is_primary' => true, 'sort_order' => 1]);
            HotelImage::create(['hotel_id' => $hotel->id, 'image_path' => 'images/hotels/' . $hotel->slug . '-lobby.webp', 'caption' => 'Grand Lobby', 'is_primary' => false, 'sort_order' => 2]);
            HotelImage::create(['hotel_id' => $hotel->id, 'image_path' => 'images/hotels/' . $hotel->slug . '-pool.webp', 'caption' => 'Swimming Pool', 'is_primary' => false, 'sort_order' => 3]);
        }

        // ===== HOTEL FACILITIES =====
        $facilitySets = [
            $hotel1->id => ['Swimming Pool', 'Spa & Wellness', 'Fitness Center', 'Restaurant', 'Bar & Lounge', 'Business Center', 'Conference Rooms', 'Free WiFi', 'Valet Parking', 'Concierge'],
            $hotel2->id => ['Swimming Pool', 'Spa & Wellness', 'Fitness Center', 'Restaurant', 'Executive Lounge', 'Business Center', 'Meeting Rooms', 'Free WiFi', 'Parking', 'Room Service'],
            $hotel3->id => ['Beachfront', 'Infinity Pool', 'Luxury Spa', 'Multiple Restaurants', 'Fitness Center', 'Tennis Court', 'Kids Club', 'Free WiFi', 'Butler Service', 'Private Beach'],
            $hotel4->id => ['Golf Course', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Tennis Court', 'Jogging Track', 'Free WiFi', 'Parking', 'Kids Playground'],
        ];

        foreach ($facilitySets as $hotelId => $facilities) {
            foreach ($facilities as $i => $name) {
                HotelFacility::create(['hotel_id' => $hotelId, 'name' => $name, 'icon' => Str::slug($name)]);
            }
        }

        // ===== ROOM TYPES =====
        $roomTypes = collect();

        // Grand Hyatt Jakarta rooms
        $roomTypes->push(
            RoomType::create(['hotel_id' => $hotel1->id, 'name' => 'Grand Room King', 'description' => 'Elegant 36sqm room with king bed and city views. Features marble bathroom with rain shower.', 'base_price' => 2850000, 'max_guests' => 2, 'total_rooms' => 50, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 36, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel1->id, 'name' => 'Grand Twin Room', 'description' => 'Spacious 36sqm room with two queen beds, perfect for families or friends.', 'base_price' => 2850000, 'max_guests' => 2, 'total_rooms' => 40, 'bed_count' => 2, 'bed_type' => 'queen', 'room_size' => 36, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel1->id, 'name' => 'Grand Suite', 'description' => 'Luxurious 72sqm suite with separate living area, panoramic city views, and premium amenities.', 'base_price' => 5500000, 'max_guests' => 3, 'total_rooms' => 20, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 72, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel1->id, 'name' => 'Presidential Suite', 'description' => 'The ultimate luxury with 150sqm of living space, private dining, and butler service.', 'base_price' => 25000000, 'max_guests' => 4, 'total_rooms' => 3, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 150, 'is_active' => true]),
        );

        // JW Marriott Jakarta rooms
        $roomTypes->push(
            RoomType::create(['hotel_id' => $hotel2->id, 'name' => 'Deluxe Room', 'description' => 'Modern 40sqm room with floor-to-ceiling windows and plush bedding.', 'base_price' => 2200000, 'max_guests' => 2, 'total_rooms' => 60, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 40, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel2->id, 'name' => 'Executive Room', 'description' => '42sqm room with executive lounge access and complimentary breakfast.', 'base_price' => 3100000, 'max_guests' => 2, 'total_rooms' => 40, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 42, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel2->id, 'name' => 'Marriott Suite', 'description' => '85sqm suite with separate living room, dining area, and panoramic views.', 'base_price' => 6000000, 'max_guests' => 3, 'total_rooms' => 15, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 85, 'is_active' => true]),
        );

        // The Mulia Bali rooms
        $roomTypes->push(
            RoomType::create(['hotel_id' => $hotel3->id, 'name' => 'Mulia Signature Room', 'description' => 'Elegant 57sqm room with ocean views, marble bathroom, and exclusive Mulia amenities.', 'base_price' => 5000000, 'max_guests' => 2, 'total_rooms' => 80, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 57, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel3->id, 'name' => 'Mulia Grandeur Suite', 'description' => 'Opulent 114sqm suite with panoramic ocean views, private balcony, and butler service.', 'base_price' => 12000000, 'max_guests' => 3, 'total_rooms' => 30, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 114, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel3->id, 'name' => 'The Mulia Villa', 'description' => 'Private 2-bedroom villa with plunge pool, garden, and direct beach access. 250sqm of luxury.', 'base_price' => 35000000, 'max_guests' => 4, 'total_rooms' => 10, 'bed_count' => 2, 'bed_type' => 'king', 'room_size' => 250, 'is_active' => true]),
        );

        // Hyatt Regency Yogyakarta rooms
        $roomTypes->push(
            RoomType::create(['hotel_id' => $hotel4->id, 'name' => 'Garden View Room', 'description' => 'Comfortable 35sqm room overlooking lush tropical gardens.', 'base_price' => 1500000, 'max_guests' => 2, 'total_rooms' => 70, 'bed_count' => 1, 'bed_type' => 'queen', 'room_size' => 35, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel4->id, 'name' => 'Pool View Room', 'description' => 'Relaxing 38sqm room with stunning pool and garden views.', 'base_price' => 1800000, 'max_guests' => 2, 'total_rooms' => 50, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 38, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel4->id, 'name' => 'Executive Suite', 'description' => 'Spacious 75sqm suite with separate living area and golf course views.', 'base_price' => 3500000, 'max_guests' => 3, 'total_rooms' => 20, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 75, 'is_active' => true]),
            RoomType::create(['hotel_id' => $hotel4->id, 'name' => 'Regency Suite', 'description' => 'Premium 100sqm suite with dining room, pantry, and panoramic garden views.', 'base_price' => 5500000, 'max_guests' => 4, 'total_rooms' => 10, 'bed_count' => 1, 'bed_type' => 'king', 'room_size' => 100, 'is_active' => true]),
        );

        // ===== ROOM IMAGES =====
        foreach ($roomTypes as $rt) {
            RoomImage::create(['room_type_id' => $rt->id, 'image_path' => 'images/rooms/' . Str::slug($rt->name) . '-main.webp', 'caption' => 'Room Overview', 'is_primary' => true, 'sort_order' => 1]);
            RoomImage::create(['room_type_id' => $rt->id, 'image_path' => 'images/rooms/' . Str::slug($rt->name) . '-bathroom.webp', 'caption' => 'Bathroom', 'is_primary' => false, 'sort_order' => 2]);
        }

        // ===== ROOM AVAILABILITIES (next 30 days) =====
        foreach ($roomTypes as $rt) {
            for ($d = 0; $d < 30; $d++) {
                $date = now()->addDays($d);
                // Weekend premium
                $multiplier = in_array($date->dayOfWeek, [0, 5, 6]) ? 1.25 : 1.0;
                RoomAvailability::create([
                    'room_type_id' => $rt->id,
                    'date' => $date->toDateString(),
                    'available_rooms' => rand(1, $rt->total_rooms),
                    'price' => round($rt->base_price * $multiplier, 2),
                ]);
            }
        }

        // ===== BOOKINGS =====
        $bookings = collect();
        $statuses = ['confirmed', 'checked_in', 'checked_out', 'pending', 'cancelled', 'no_show'];
        $bookingIndex = 0;

        $bookingConfigs = [
            ['customer' => 0, 'hotel' => 0, 'room' => 0, 'days_ago' => 5, 'nights' => 2, 'status' => 'checked_out'],
            ['customer' => 0, 'hotel' => 2, 'room' => 8, 'days_ago' => 8, 'nights' => 3, 'status' => 'checked_out'],
            ['customer' => 1, 'hotel' => 0, 'room' => 2, 'days_ago' => 1, 'nights' => 1, 'status' => 'checked_in'],
            ['customer' => 1, 'hotel' => 3, 'room' => 12, 'days_ago' => 3, 'nights' => 2, 'status' => 'checked_out'],
            ['customer' => 2, 'hotel' => 1, 'room' => 5, 'days_ago' => 0, 'nights' => 4, 'status' => 'pending'],
            ['customer' => 2, 'hotel' => 2, 'room' => 7, 'days_ago' => 7, 'nights' => 2, 'status' => 'cancelled'],
            ['customer' => 3, 'hotel' => 0, 'room' => 0, 'days_ago' => 2, 'nights' => 1, 'status' => 'no_show'],
            ['customer' => 3, 'hotel' => 3, 'room' => 10, 'days_ago' => 15, 'nights' => 5, 'status' => 'checked_out'],
            ['customer' => 4, 'hotel' => 1, 'room' => 4, 'days_ago' => 10, 'nights' => 2, 'status' => 'checked_out'],
            ['customer' => 4, 'hotel' => 2, 'room' => 9, 'days_ago' => 1, 'nights' => 3, 'status' => 'checked_in'],
        ];

        $allRoomTypes = $roomTypes->values();

        foreach ($bookingConfigs as $cfg) {
            $customer = $customers[$cfg['customer']];
            $hotel = $hotels[$cfg['hotel']];
            $rt = $allRoomTypes[$cfg['room']];
            $checkIn = now()->subDays($cfg['days_ago']);
            $checkOut = $checkIn->copy()->addDays($cfg['nights']);
            $pricePerNight = $rt->base_price;
            $subtotal = $pricePerNight * $cfg['nights'];
            $tax = round($subtotal * 0.11, 2);
            $total = $subtotal + $tax;

            $booking = Booking::create([
                'booking_code' => 'HKB-' . strtoupper(Str::random(8)),
                'user_id' => $customer->id,
                'hotel_id' => $hotel->id,
                'room_type_id' => $rt->id,
                'check_in_date' => $checkIn->toDateString(),
                'check_out_date' => $checkOut->toDateString(),
                'num_rooms' => 1,
                'num_guests' => rand(1, $rt->max_guests),
                'price_per_night' => $pricePerNight,
                'nights' => $cfg['nights'],
                'subtotal' => $subtotal,
                'tax_amount' => $tax,
                'total_amount' => $total,
                'status' => $cfg['status'],
                'guest_name' => $customer->name,
                'guest_email' => $customer->email,
                'guest_phone' => $customer->phone,
            ]);

            $bookings->push($booking);
        }

        // ===== PAYMENTS =====
        $paymentMethods = ['bank_transfer', 'credit_card', 'e_wallet', 'virtual_account'];

        foreach ($bookings as $i => $booking) {
            if (in_array($booking->status, ['cancelled', 'no_show', 'pending'])) {
                if ($booking->status === 'pending') {
                    Payment::create([
                        'payment_code' => 'PAY-' . strtoupper(Str::random(8)),
                        'booking_id' => $booking->id,
                        'amount' => $booking->total_amount,
                        'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                        'status' => 'pending',
                    ]);
                }
                continue;
            }

            Payment::create([
                'payment_code' => 'PAY-' . strtoupper(Str::random(8)),
                'booking_id' => $booking->id,
                'amount' => $booking->total_amount,
                'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                'status' => $booking->status === 'checked_out' || $booking->status === 'confirmed' || $booking->status === 'checked_in' ? 'paid' : 'pending',
                'transaction_id' => 'TXN-' . strtoupper(Str::random(12)),
                'paid_at' => $booking->status !== 'pending' ? $booking->check_in_date->subDay() : null,
            ]);
        }

        // ===== REVIEWS =====
        $reviewedBookings = $bookings->filter(fn($b) => $b->status === 'checked_out')->take(5);

        $reviewComments = [
            'Pengalaman menginap yang luar biasa! Kamar bersih, pelayanan ramah, dan sarapan sangat lezat. Pasti akan kembali lagi.',
            'Hotel yang bagus dengan lokasi strategis. Kamar luas dan nyaman. Hanya saja AC sedikit kurang dingin.',
            'Staf sangat profesional dan helpful. Kolam renangnya bagus. Makanan di restoran juga enak-enak.',
            'Sesuai dengan harga. Fasilitas lengkap dan bersih. Recommended untuk keluarga.',
            'Pemandangan dari kamar sangat indah. Spa nya juga mantap. Worth every penny!',
        ];

        $reviewedBookings->values()->each(function ($booking, $i) use ($reviewComments) {
            Review::create([
                'user_id' => $booking->user_id,
                'hotel_id' => $booking->hotel_id,
                'booking_id' => $booking->id,
                'rating' => rand(4, 5),
                'comment' => $reviewComments[$i],
            ]);
        });

        // ===== BANNERS =====
        Banner::create([
            'title' => 'Diskon Musim Panas 30%',
            'image_path' => 'images/banners/summer-sale.webp',
            'link_url' => '/promotions/summer-sale',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        Banner::create([
            'title' => 'Liburan Bali Spesial',
            'image_path' => 'images/banners/bali-special.webp',
            'link_url' => '/hotels?city=bali',
            'sort_order' => 2,
            'is_active' => true,
        ]);

        Banner::create([
            'title' => 'Booking Sekarang, Bayar Nanti',
            'image_path' => 'images/banners/book-now-pay-later.webp',
            'link_url' => '/promotions/book-now-pay-later',
            'sort_order' => 3,
            'is_active' => true,
        ]);

        // ===== FAQs =====
        $faqs = [
            ['question' => 'Bagaimana cara melakukan reservasi hotel?', 'answer' => 'Anda dapat melakukan reservasi melalui website atau aplikasi HotelKU. Pilih hotel dan kamar yang diinginkan, isi data tamu, lalu lakukan pembayaran. Konfirmasi booking akan dikirim ke email Anda.', 'sort_order' => 1],
            ['question' => 'Metode pembayaran apa saja yang tersedia?', 'answer' => 'Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI, BRI), kartu kredit (Visa, Mastercard), e-wallet (GoPay, OVO, DANA), dan virtual account.', 'sort_order' => 2],
            ['question' => 'Bagaimana kebijakan pembatalan?', 'answer' => 'Pembatalan gratis dapat dilakukan hingga 24 jam sebelum waktu check-in. Pembatalan setelah batas waktu akan dikenakan biaya sesuai kebijakan hotel.', 'sort_order' => 3],
            ['question' => 'Jam check-in dan check-out berapa?', 'answer' => 'Waktu check-in standar adalah pukul 14:00 dan check-out pukul 12:00. Beberapa hotel mungkin memiliki kebijakan berbeda, silakan cek detail hotel.', 'sort_order' => 4],
            ['question' => 'Apakah data pribadi saya aman?', 'answer' => 'Ya, HotelKU menggunakan teknologi enkripsi terbaru untuk melindungi data pribadi Anda. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan.', 'sort_order' => 5],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }

        // ===== COMMISSION SETTINGS =====
        CommissionSetting::create([
            'name' => 'default',
            'commission_percentage' => 10.00,
            'is_active' => true,
        ]);

        // ===== PAYOUTS =====
        $completedBookings = $bookings->filter(fn($b) => $b->status === 'checked_out');

        // Payout for partner 1
        $partner1Bookings = $completedBookings->filter(fn($b) => $b->hotel_id === $hotel1->id || $b->hotel_id === $hotel2->id);
        if ($partner1Bookings->count() > 0) {
            $totalAmount = $partner1Bookings->sum('total_amount');
            $commission = round($totalAmount * 0.10, 2);
            $netAmount = $totalAmount - $commission;

            Payout::create([
                'payout_code' => 'PO-' . strtoupper(Str::random(8)),
                'partner_id' => $partner1->id,
                'amount' => $totalAmount,
                'commission_amount' => $commission,
                'net_amount' => $netAmount,
                'status' => 'completed',
                'bank_name' => $partner1->bank_name,
                'bank_account_number' => $partner1->bank_account_number,
                'bank_account_name' => $partner1->bank_account_name,
                'notes' => 'Payout periode ' . now()->subDays(7)->format('d M Y') . ' - ' . now()->format('d M Y'),
                'processed_at' => now()->subDays(2),
            ]);
        }

        // Payout for partner 2
        $partner2Bookings = $completedBookings->filter(fn($b) => $b->hotel_id === $hotel3->id || $b->hotel_id === $hotel4->id);
        if ($partner2Bookings->count() > 0) {
            $totalAmount = $partner2Bookings->sum('total_amount');
            $commission = round($totalAmount * 0.10, 2);
            $netAmount = $totalAmount - $commission;

            Payout::create([
                'payout_code' => 'PO-' . strtoupper(Str::random(8)),
                'partner_id' => $partner2->id,
                'amount' => $totalAmount,
                'commission_amount' => $commission,
                'net_amount' => $netAmount,
                'status' => 'pending',
                'bank_name' => $partner2->bank_name,
                'bank_account_number' => $partner2->bank_account_number,
                'bank_account_name' => $partner2->bank_account_name,
                'notes' => 'Payout periode ' . now()->subDays(7)->format('d M Y') . ' - ' . now()->format('d M Y'),
            ]);
        }
    }
}
