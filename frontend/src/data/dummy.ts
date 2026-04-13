import { Hotel, Booking, Review } from "@/lib/types";

export const cities = [
  "Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Bali",
  "Semarang", "Malang", "Solo", "Medan", "Makassar",
];

export const facilitiesList = [
  "WiFi Gratis", "Kolam Renang", "Parkir Gratis", "Sarapan",
  "AC", "Restoran", "Spa", "Gym", "Room Service", "Laundry",
];

export const hotels: Hotel[] = [
  {
    id: 1,
    slug: "hotel-nusa-indah-jakarta",
    name: "Hotel Nusa Indah Jakarta",
    description: "Hotel bintang 4 di jantung kota Jakarta dengan akses mudah ke pusat bisnis dan perbelanjaan. Menawarkan kamar modern dengan pemandangan kota yang menakjubkan.",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    city: "Jakarta",
    province: "DKI Jakarta",
    starRating: 4,
    avgRating: 4.5,
    reviewCount: 234,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    ],
    facilities: ["WiFi Gratis", "Kolam Renang", "Parkir Gratis", "Sarapan", "AC", "Restoran", "Spa", "Gym", "Room Service"],
    rooms: [
      {
        id: 1, name: "Superior Room", description: "Kamar luas dengan pemandangan kota",
        maxOccupancy: 2, bedCount: 1, bedType: "King", basePrice: 750000, weekendPrice: 850000,
        images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"],
        facilities: ["AC", "TV", "Mini Bar", "WiFi"], available: 8,
      },
      {
        id: 2, name: "Deluxe Room", description: "Kamar mewah dengan bathtub dan city view",
        maxOccupancy: 2, bedCount: 1, bedType: "King", basePrice: 1100000, weekendPrice: 1250000,
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"],
        facilities: ["AC", "TV", "Mini Bar", "WiFi", "Bathtub", "Bathrobe"], available: 4,
      },
      {
        id: 3, name: "Suite Room", description: "Suite eksklusif dengan ruang tamu terpisah",
        maxOccupancy: 4, bedCount: 2, bedType: "King", basePrice: 2000000, weekendPrice: 2300000,
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800"],
        facilities: ["AC", "TV", "Mini Bar", "WiFi", "Bathtub", "Living Room", "Kitchen"], available: 2,
      },
    ],
    partner: { id: 1, companyName: "PT Nusa Indah Hotel", picName: "Budi Santoso", status: "verified" },
    isFeatured: true,
  },
  {
    id: 2,
    slug: "villa-bukit-asri-bandung",
    name: "Villa Bukit Asri Bandung",
    description: "Villa dengan udara sejuk pegunungan Bandung. Cocok untuk liburan keluarga atau rombongan dengan pemandangan pegunungan yang asri.",
    address: "Jl. Raya Lembang No. 45, Bandung",
    city: "Bandung",
    province: "Jawa Barat",
    starRating: 3,
    avgRating: 4.2,
    reviewCount: 156,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    ],
    facilities: ["WiFi Gratis", "Parkir Gratis", "Sarapan", "AC", "Taman", "BBQ Area"],
    rooms: [
      {
        id: 4, name: "Standard Villa", description: "Villa 1 kamar dengan teras",
        maxOccupancy: 3, bedCount: 1, bedType: "Queen", basePrice: 500000, weekendPrice: 600000,
        images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"],
        facilities: ["AC", "TV", "Kitchen", "WiFi"], available: 6,
      },
      {
        id: 5, name: "Family Villa", description: "Villa 2 kamar dengan ruang keluarga",
        maxOccupancy: 6, bedCount: 2, bedType: "Queen", basePrice: 900000, weekendPrice: 1050000,
        images: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"],
        facilities: ["AC", "TV", "Kitchen", "WiFi", "Living Room"], available: 3,
      },
    ],
    partner: { id: 2, companyName: "CV Bukit Asri", picName: "Dewi Lestari", status: "verified" },
    isFeatured: true,
  },
  {
    id: 3,
    slug: "grand-palace-yogyakarta",
    name: "Grand Palace Yogyakarta",
    description: "Hotel mewah bergaya Jawa modern dekat dengan Malioboro. Pengalaman menginap yang menggabungkan budaya dan kenyamanan.",
    address: "Jl. Malioboro No. 88, Yogyakarta",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    starRating: 5,
    avgRating: 4.8,
    reviewCount: 412,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
    ],
    facilities: ["WiFi Gratis", "Kolam Renang", "Parkir Gratis", "Sarapan", "AC", "Restoran", "Spa", "Gym", "Room Service", "Laundry"],
    rooms: [
      {
        id: 6, name: "Heritage Room", description: "Kamar dengan nuansa Jawa klasik",
        maxOccupancy: 2, bedCount: 1, bedType: "King", basePrice: 1200000, weekendPrice: 1400000,
        images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"],
        facilities: ["AC", "TV", "Mini Bar", "WiFi", "Bathtub"], available: 10,
      },
      {
        id: 7, name: "Royal Suite", description: "Suite premium dengan balkon menghadap taman",
        maxOccupancy: 3, bedCount: 1, bedType: "King", basePrice: 2500000, weekendPrice: 2900000,
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"],
        facilities: ["AC", "TV", "Mini Bar", "WiFi", "Bathtub", "Balkon", "Living Room"], available: 3,
      },
    ],
    partner: { id: 3, companyName: "PT Grand Palace Indonesia", picName: "Hadi Wijaya", status: "verified" },
    isFeatured: true,
  },
  {
    id: 4,
    slug: "beachside-resort-bali",
    name: "Beachside Resort Bali",
    description: "Resort tepi pantai dengan akses langsung ke pantai. Nikmati sunset Bali dari kamar Anda.",
    address: "Jl. Pantai Kuta No. 100, Badung, Bali",
    city: "Bali",
    province: "Bali",
    starRating: 5,
    avgRating: 4.7,
    reviewCount: 589,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800",
    ],
    facilities: ["WiFi Gratis", "Kolam Renang", "Parkir Gratis", "Sarapan", "AC", "Restoran", "Spa", "Beach Access", "Room Service"],
    rooms: [
      {
        id: 8, name: "Ocean View Room", description: "Kamar dengan pemandangan laut",
        maxOccupancy: 2, bedCount: 1, bedType: "King", basePrice: 1800000, weekendPrice: 2200000,
        images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800"],
        facilities: ["AC", "TV", "Mini Bar", "WiFi", "Balkon", "Ocean View"], available: 12,
      },
      {
        id: 9, name: "Beach Villa", description: "Villa pribadi dengan pool dan akses pantai",
        maxOccupancy: 4, bedCount: 2, bedType: "King", basePrice: 4500000, weekendPrice: 5200000,
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"],
        facilities: ["AC", "TV", "WiFi", "Private Pool", "Beach Access", "Kitchen", "Living Room"], available: 4,
      },
    ],
    partner: { id: 4, companyName: "PT Bali Beachside", picName: "Made Wirawan", status: "verified" },
    isFeatured: true,
  },
  {
    id: 5,
    slug: "budget-inn-surabaya",
    name: "Budget Inn Surabaya",
    description: "Hotel hemat dengan fasilitas lengkap. Strategis dekat pusat kota Surabaya.",
    address: "Jl. Basuki Rahmat No. 50, Surabaya",
    city: "Surabaya",
    province: "Jawa Timur",
    starRating: 2,
    avgRating: 3.9,
    reviewCount: 87,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    images: [
      "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800",
    ],
    facilities: ["WiFi Gratis", "Parkir Gratis", "AC"],
    rooms: [
      {
        id: 10, name: "Standard Room", description: "Kamar standar bersih dan nyaman",
        maxOccupancy: 2, bedCount: 1, bedType: "Double", basePrice: 250000, weekendPrice: 280000,
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800"],
        facilities: ["AC", "TV", "WiFi"], available: 15,
      },
    ],
    partner: { id: 5, companyName: "UD Budget Inn", picName: "Siti Aminah", status: "verified" },
    isFeatured: false,
  },
];

export const reviews: Review[] = [
  { id: 1, userName: "Andi P.", rating: 5, comment: "Pelayanan sangat bagus, kamar bersih dan nyaman. Lokasi strategis!", createdAt: "2026-03-15" },
  { id: 2, userName: "Rina S.", rating: 4, comment: "Kamar bagus, tapi agak bising dari jalan. Sarapan enak.", createdAt: "2026-03-10" },
  { id: 3, userName: "Budi W.", rating: 5, comment: "Best hotel di kota ini! Pasti balik lagi.", createdAt: "2026-02-28" },
  { id: 4, userName: "Dewi K.", rating: 4, comment: "Staff ramah, fasilitas lengkap. Kolam renangnya bersih.", createdAt: "2026-02-20" },
  { id: 5, userName: "Hendra T.", rating: 3, comment: "Cukup oke untuk harga segini. AC kurang dingin.", createdAt: "2026-02-15" },
];

export const bookings: Booking[] = [
  {
    id: 1, bookingCode: "HKU-20260315-001",
    hotel: hotels[0], room: hotels[0].rooms[0],
    checkIn: "2026-04-10", checkOut: "2026-04-12", nights: 2, roomCount: 1, guestCount: 2,
    pricePerNight: 750000, subtotal: 1500000, tax: 165000, total: 1665000,
    guestName: "Andi Prasetyo", guestEmail: "andi@gmail.com", guestPhone: "081234567890",
    specialRequest: "Kamar lantai tinggi", status: "confirmed", paymentStatus: "paid",
    createdAt: "2026-03-15",
  },
  {
    id: 2, bookingCode: "HKU-20260310-002",
    hotel: hotels[2], room: hotels[2].rooms[0],
    checkIn: "2026-03-20", checkOut: "2026-03-22", nights: 2, roomCount: 1, guestCount: 2,
    pricePerNight: 1200000, subtotal: 2400000, tax: 264000, total: 2664000,
    guestName: "Andi Prasetyo", guestEmail: "andi@gmail.com", guestPhone: "081234567890",
    specialRequest: "", status: "completed", paymentStatus: "paid",
    createdAt: "2026-03-10",
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

export function searchHotels(query: {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  star?: number;
  minPrice?: number;
  maxPrice?: number;
}): Hotel[] {
  return hotels.filter((h) => {
    if (query.city && !h.city.toLowerCase().includes(query.city.toLowerCase())) return false;
    if (query.star && h.starRating !== query.star) return false;
    if (query.minPrice) {
      const minRoomPrice = Math.min(...h.rooms.map((r) => r.basePrice));
      if (minRoomPrice < query.minPrice) return false;
    }
    if (query.maxPrice) {
      const minRoomPrice = Math.min(...h.rooms.map((r) => r.basePrice));
      if (minRoomPrice > query.maxPrice) return false;
    }
    return true;
  });
}
