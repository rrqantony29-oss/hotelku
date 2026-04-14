import { formatCurrency } from "./dummy";

// Re-export for convenience
export { formatCurrency };

// Partner Dashboard Stats
export const partnerStats = {
  totalBookings: 156,
  monthlyRevenue: 245800000,
  occupancyRate: 78,
  avgRating: 4.7,
  pendingBookings: 3,
  totalHotels: 2,
};

// Monthly Revenue (Jan - Jun 2026)
export const partnerMonthlyRevenue = [
  { month: "Jan", revenue: 185000000 },
  { month: "Feb", revenue: 210000000 },
  { month: "Mar", revenue: 195000000 },
  { month: "Apr", revenue: 245800000 },
  { month: "Mei", revenue: 0 },
  { month: "Jun", revenue: 0 },
];

// Recent Bookings for Partner Dashboard
export interface PartnerBooking {
  id: number;
  code: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomCount: number;
  guestCount: number;
  pricePerNight: number;
  total: number;
  status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  createdAt: string;
}

export const partnerRecentBookings: PartnerBooking[] = [
  {
    id: 1,
    code: "BK-2026-001",
    guestName: "Andi Pratama",
    guestEmail: "andi@email.com",
    guestPhone: "081234567890",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Deluxe Room",
    checkIn: "15 Apr 2026",
    checkOut: "17 Apr 2026",
    nights: 2,
    roomCount: 1,
    guestCount: 2,
    pricePerNight: 1100000,
    total: 2442000,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2026-04-12T10:30:00Z",
  },
  {
    id: 2,
    code: "BK-2026-002",
    guestName: "Siti Rahayu",
    guestEmail: "siti@email.com",
    guestPhone: "082345678901",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Superior Room",
    checkIn: "16 Apr 2026",
    checkOut: "18 Apr 2026",
    nights: 2,
    roomCount: 2,
    guestCount: 4,
    pricePerNight: 750000,
    total: 3630000,
    status: "pending",
    paymentStatus: "paid",
    createdAt: "2026-04-13T08:15:00Z",
  },
  {
    id: 3,
    code: "BK-2026-003",
    guestName: "Rudi Hermawan",
    guestEmail: "rudi@email.com",
    guestPhone: "083456789012",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Suite Room",
    checkIn: "14 Apr 2026",
    checkOut: "16 Apr 2026",
    nights: 2,
    roomCount: 1,
    guestCount: 3,
    pricePerNight: 2000000,
    total: 4440000,
    status: "checked_in",
    paymentStatus: "paid",
    createdAt: "2026-04-10T14:20:00Z",
  },
  {
    id: 4,
    code: "BK-2026-004",
    guestName: "Maya Kusuma",
    guestEmail: "maya@email.com",
    guestPhone: "084567890123",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Deluxe Room",
    checkIn: "13 Apr 2026",
    checkOut: "14 Apr 2026",
    nights: 1,
    roomCount: 1,
    guestCount: 2,
    pricePerNight: 1100000,
    total: 1331000,
    status: "checked_out",
    paymentStatus: "paid",
    createdAt: "2026-04-11T09:45:00Z",
  },
  {
    id: 5,
    code: "BK-2026-005",
    guestName: "Dimas Saputra",
    guestEmail: "dimas@email.com",
    guestPhone: "085678901234",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Superior Room",
    checkIn: "20 Apr 2026",
    checkOut: "22 Apr 2026",
    nights: 2,
    roomCount: 1,
    guestCount: 2,
    pricePerNight: 750000,
    total: 1815000,
    status: "pending",
    paymentStatus: "paid",
    createdAt: "2026-04-14T11:00:00Z",
  },
  {
    id: 6,
    code: "BK-2026-006",
    guestName: "Linda Wati",
    guestEmail: "linda@email.com",
    guestPhone: "086789012345",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Suite Room",
    checkIn: "18 Apr 2026",
    checkOut: "21 Apr 2026",
    nights: 3,
    roomCount: 1,
    guestCount: 2,
    pricePerNight: 2000000,
    total: 6660000,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2026-04-13T16:30:00Z",
  },
  {
    id: 7,
    code: "BK-2026-007",
    guestName: "Hendra Gunawan",
    guestEmail: "hendra@email.com",
    guestPhone: "087890123456",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Superior Room",
    checkIn: "12 Apr 2026",
    checkOut: "13 Apr 2026",
    nights: 1,
    roomCount: 1,
    guestCount: 1,
    pricePerNight: 750000,
    total: 907500,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2026-04-10T07:00:00Z",
  },
  {
    id: 8,
    code: "BK-2026-008",
    guestName: "Rina Melani",
    guestEmail: "rina@email.com",
    guestPhone: "088901234567",
    hotelName: "Hotel Nusa Indah Jakarta",
    roomName: "Deluxe Room",
    checkIn: "19 Apr 2026",
    checkOut: "21 Apr 2026",
    nights: 2,
    roomCount: 1,
    guestCount: 2,
    pricePerNight: 1100000,
    total: 2442000,
    status: "pending",
    paymentStatus: "paid",
    createdAt: "2026-04-14T09:20:00Z",
  },
];

// Partner Hotels
export interface PartnerHotel {
  id: number;
  name: string;
  city: string;
  image: string;
  rating: number;
  roomCount: number;
  bookings: number;
  status: "active" | "draft" | "suspended";
}

export const partnerHotels: PartnerHotel[] = [
  {
    id: 1,
    name: "Hotel Nusa Indah Jakarta",
    city: "Jakarta Selatan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    rating: 4.5,
    roomCount: 3,
    bookings: 142,
    status: "active",
  },
  {
    id: 2,
    name: "Nusa Indah Boutique Bandung",
    city: "Bandung",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    rating: 4.3,
    roomCount: 2,
    bookings: 14,
    status: "active",
  },
];

// Room types for partner hotel management
export interface PartnerRoom {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  basePrice: number;
  weekendPrice: number;
  maxOccupancy: number;
  bedType: string;
  bedCount: number;
  totalRooms: number;
  available: number;
  facilities: string[];
  status: "active" | "inactive";
}

export const partnerRooms: PartnerRoom[] = [
  {
    id: 1, hotelId: 1, name: "Superior Room",
    description: "Kamar luas dengan pemandangan kota",
    basePrice: 750000, weekendPrice: 850000,
    maxOccupancy: 2, bedType: "King", bedCount: 1,
    totalRooms: 10, available: 8,
    facilities: ["AC", "TV", "Mini Bar", "WiFi"],
    status: "active",
  },
  {
    id: 2, hotelId: 1, name: "Deluxe Room",
    description: "Kamar mewah dengan bathtub dan city view",
    basePrice: 1100000, weekendPrice: 1250000,
    maxOccupancy: 2, bedType: "King", bedCount: 1,
    totalRooms: 6, available: 4,
    facilities: ["AC", "TV", "Mini Bar", "WiFi", "Bathtub", "Bathrobe"],
    status: "active",
  },
  {
    id: 3, hotelId: 1, name: "Suite Room",
    description: "Suite eksklusif dengan ruang tamu terpisah",
    basePrice: 2000000, weekendPrice: 2300000,
    maxOccupancy: 4, bedType: "King", bedCount: 2,
    totalRooms: 3, available: 2,
    facilities: ["AC", "TV", "Mini Bar", "WiFi", "Bathtub", "Living Room", "Kitchen"],
    status: "active",
  },
  {
    id: 4, hotelId: 2, name: "Standard Room",
    description: "Kamar nyaman dengan konsep minimalis",
    basePrice: 450000, weekendPrice: 550000,
    maxOccupancy: 2, bedType: "Queen", bedCount: 1,
    totalRooms: 8, available: 6,
    facilities: ["AC", "TV", "WiFi"],
    status: "active",
  },
  {
    id: 5, hotelId: 2, name: "Family Room",
    description: "Kamar luas untuk keluarga",
    basePrice: 800000, weekendPrice: 950000,
    maxOccupancy: 4, bedType: "Queen", bedCount: 2,
    totalRooms: 4, available: 3,
    facilities: ["AC", "TV", "WiFi", "Mini Bar", "Bathrobe"],
    status: "active",
  },
];

// Reports / Earnings
export interface Transaction {
  id: number;
  date: string;
  guest: string;
  hotel: string;
  room: string;
  amount: number;
  commission: number;
  net: number;
  status: "completed" | "pending" | "refunded";
}

export const partnerTransactions: Transaction[] = [
  { id: 1, date: "14 Apr 2026", guest: "Andi Pratama", hotel: "Nusa Indah Jakarta", room: "Deluxe Room", amount: 2442000, commission: 244200, net: 2197800, status: "completed" },
  { id: 2, date: "13 Apr 2026", guest: "Siti Rahayu", hotel: "Nusa Indah Jakarta", room: "Superior Room", amount: 3630000, commission: 363000, net: 3267000, status: "pending" },
  { id: 3, date: "13 Apr 2026", guest: "Linda Wati", hotel: "Nusa Indah Jakarta", room: "Suite Room", amount: 6660000, commission: 666000, net: 5994000, status: "completed" },
  { id: 4, date: "12 Apr 2026", guest: "Rudi Hermawan", hotel: "Nusa Indah Jakarta", room: "Suite Room", amount: 4440000, commission: 444000, net: 3996000, status: "completed" },
  { id: 5, date: "11 Apr 2026", guest: "Maya Kusuma", hotel: "Nusa Indah Jakarta", room: "Deluxe Room", amount: 1331000, commission: 133100, net: 1197900, status: "completed" },
  { id: 6, date: "10 Apr 2026", guest: "Hendra Gunawan", hotel: "Nusa Indah Jakarta", room: "Superior Room", amount: 907500, commission: 90750, net: 816750, status: "refunded" },
  { id: 7, date: "10 Apr 2026", guest: "Dimas Saputra", hotel: "Nusa Indah Jakarta", room: "Superior Room", amount: 1815000, commission: 181500, net: 1633500, status: "pending" },
  { id: 8, date: "09 Apr 2026", guest: "Rina Melani", hotel: "Nusa Indah Jakarta", room: "Deluxe Room", amount: 2442000, commission: 244200, net: 2197800, status: "completed" },
];

export const reportStats = {
  totalBookings: 156,
  totalRevenue: 245800000,
  occupancyRate: 78,
  bookingBreakdown: {
    completed: 120,
    confirmed: 18,
    pending: 8,
    cancelled: 10,
  },
};

// Weekly data for reports
export const weeklyReport = [
  { label: "Sen", value: 12 },
  { label: "Sel", value: 8 },
  { label: "Rab", value: 15 },
  { label: "Kam", value: 10 },
  { label: "Jum", value: 22 },
  { label: "Sab", value: 28 },
  { label: "Min", value: 18 },
];

export const monthlyReport = [
  { label: "Minggu 1", value: 32 },
  { label: "Minggu 2", value: 38 },
  { label: "Minggu 3", value: 45 },
  { label: "Minggu 4", value: 41 },
];

export const quarterlyReport = [
  { label: "Jan", value: 142 },
  { label: "Feb", value: 158 },
  { label: "Mar", value: 135 },
];

// Payouts
export interface Payout {
  id: string;
  date: string;
  gross: number;
  net: number;
  status: "completed" | "processing" | "pending";
}

export const payoutHistory: Payout[] = [
  { id: "PO-2026-012", date: "10 Apr 2026", gross: 18500000, net: 18500000, status: "completed" },
  { id: "PO-2026-011", date: "03 Apr 2026", gross: 22300000, net: 22300000, status: "completed" },
  { id: "PO-2026-010", date: "27 Mar 2026", gross: 15800000, net: 15800000, status: "completed" },
  { id: "PO-2026-009", date: "20 Mar 2026", gross: 19200000, net: 19200000, status: "completed" },
  { id: "PO-2026-008", date: "13 Mar 2026", gross: 14600000, net: 14600000, status: "completed" },
];

export const payoutInfo = {
  availableBalance: 24580000,
  pendingBalance: 8200000,
  totalEarned: 185000000,
  bankName: "BCA",
  bankAccount: "****5678",
  accountHolder: "Budi Santoso",
  nextPayoutDate: "17 Apr 2026",
  autoPayout: true,
  minThreshold: 5000000,
};
