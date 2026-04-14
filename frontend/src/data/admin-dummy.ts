import { formatCurrency } from "./dummy";
export { formatCurrency };

// Admin Dashboard Stats
export const adminStats = {
  totalRevenue: 2400000000,
  totalBookings: 12456,
  activePartners: 847,
  activeHotels: 2315,
  todayTransactions: 156,
  pendingVerifications: 5,
  disputedBookings: 2,
  flaggedReviews: 1,
};

// Monthly GMV (Jan - Apr 2026)
export const adminMonthlyGMV = [
  { month: "Jan", gmv: 1800000000, revenue: 270000000 },
  { month: "Feb", gmv: 2100000000, revenue: 315000000 },
  { month: "Mar", gmv: 1950000000, revenue: 292500000 },
  { month: "Apr", gmv: 2400000000, revenue: 360000000 },
];

// Growth Metrics
export const adminGrowth = {
  newUsers: { value: 15, label: "+15%" },
  newPartners: { value: 8, label: "+8%" },
  gmv: { value: 22, label: "+22%" },
};

// Partners for Admin
export interface AdminPartner {
  id: number;
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  city: string;
  hotelCount: number;
  totalBookings: number;
  totalRevenue: number;
  status: "pending" | "verified" | "rejected" | "suspended";
  joinedAt: string;
  documents: string[];
}

export const adminPartners: AdminPartner[] = [
  {
    id: 1, companyName: "PT Nusa Indah Hotel", picName: "Budi Santoso",
    email: "budi@nusaindah.com", phone: "081234567890", city: "Jakarta",
    hotelCount: 2, totalBookings: 156, totalRevenue: 245800000,
    status: "verified", joinedAt: "2025-08-15", documents: ["KTP", "NPWP", "SIUP"],
  },
  {
    id: 2, companyName: "CV Bukit Asri", picName: "Dewi Lestari",
    email: "dewi@bukitasri.com", phone: "082345678901", city: "Bandung",
    hotelCount: 1, totalBookings: 89, totalRevenue: 125000000,
    status: "verified", joinedAt: "2025-09-20", documents: ["KTP", "NPWP"],
  },
  {
    id: 3, companyName: "PT Grand Palace Indonesia", picName: "Hadi Wijaya",
    email: "hadi@grandpalace.com", phone: "083456789012", city: "Yogyakarta",
    hotelCount: 1, totalBookings: 412, totalRevenue: 890000000,
    status: "verified", joinedAt: "2025-07-01", documents: ["KTP", "NPWP", "SIUP", "Akta"],
  },
  {
    id: 4, companyName: "PT Bali Beachside", picName: "Made Wirawan",
    email: "made@beachside.com", phone: "084567890123", city: "Bali",
    hotelCount: 1, totalBookings: 589, totalRevenue: 1200000000,
    status: "verified", joinedAt: "2025-06-10", documents: ["KTP", "NPWP", "SIUP"],
  },
  {
    id: 5, companyName: "UD Budget Surabaya", picName: "Agus Setiawan",
    email: "agus@budgetsurabaya.com", phone: "085678901234", city: "Surabaya",
    hotelCount: 1, totalBookings: 87, totalRevenue: 32000000,
    status: "verified", joinedAt: "2025-11-05", documents: ["KTP"],
  },
  {
    id: 6, companyName: "PT Semarang Heritage", picName: "Linda Wijaya",
    email: "linda@semarangheritage.com", phone: "086789012345", city: "Semarang",
    hotelCount: 0, totalBookings: 0, totalRevenue: 0,
    status: "pending", joinedAt: "2026-04-10", documents: ["KTP", "NPWP"],
  },
  {
    id: 7, companyName: "CV Malang Hillside", picName: "Rudi Hartono",
    email: "rudi@hillside.com", phone: "087890123456", city: "Malang",
    hotelCount: 0, totalBookings: 0, totalRevenue: 0,
    status: "pending", joinedAt: "2026-04-12", documents: ["KTP"],
  },
  {
    id: 8, companyName: "PT Solo Royal", picName: "Sari Dewi",
    email: "sari@soloroyal.com", phone: "088901234567", city: "Solo",
    hotelCount: 0, totalBookings: 0, totalRevenue: 0,
    status: "pending", joinedAt: "2026-04-13", documents: ["KTP", "NPWP", "SIUP"],
  },
  {
    id: 9, companyName: "CV Medan View", picName: "Budi Raharjo",
    email: "budi@medanview.com", phone: "089012345678", city: "Medan",
    hotelCount: 0, totalBookings: 0, totalRevenue: 0,
    status: "rejected", joinedAt: "2026-03-28", documents: ["KTP"],
  },
  {
    id: 10, companyName: "PT Makassar Seaside", picName: "Andi Pratama",
    email: "andi@makassarsea.com", phone: "081123456789", city: "Makassar",
    hotelCount: 0, totalBookings: 0, totalRevenue: 0,
    status: "pending", joinedAt: "2026-04-14", documents: ["KTP", "NPWP"],
  },
];

// Top Hotels for Admin
export const adminTopHotels = [
  { id: 4, name: "Beachside Resort Bali", city: "Bali", bookings: 589, revenue: 1200000000, rating: 4.7 },
  { id: 3, name: "Grand Palace Yogyakarta", city: "Yogyakarta", bookings: 412, revenue: 890000000, rating: 4.8 },
  { id: 1, name: "Hotel Nusa Indah Jakarta", city: "Jakarta", bookings: 142, revenue: 230000000, rating: 4.5 },
  { id: 2, name: "Villa Bukit Asri Bandung", city: "Bandung", bookings: 89, revenue: 125000000, rating: 4.2 },
  { id: 5, name: "Budget Inn Surabaya", city: "Surabaya", bookings: 87, revenue: 32000000, rating: 3.9 },
];

// Recent Transactions
export interface AdminTransaction {
  id: number;
  bookingCode: string;
  hotelName: string;
  guestName: string;
  amount: number;
  commission: number;
  method: string;
  status: "success" | "pending" | "failed" | "refunded";
  createdAt: string;
}

export const adminTransactions: AdminTransaction[] = [
  {
    id: 1, bookingCode: "BK-2026-001", hotelName: "Hotel Nusa Indah Jakarta",
    guestName: "Andi Pratama", amount: 2442000, commission: 244200,
    method: "BCA VA", status: "success", createdAt: "2026-04-14T10:30:00Z",
  },
  {
    id: 2, bookingCode: "BK-2026-015", hotelName: "Beachside Resort Bali",
    guestName: "Joko Widodo", amount: 9500000, commission: 950000,
    method: "GoPay", status: "success", createdAt: "2026-04-14T09:15:00Z",
  },
  {
    id: 3, bookingCode: "BK-2026-016", hotelName: "Grand Palace Yogyakarta",
    guestName: "Siti Nurhaliza", amount: 5200000, commission: 520000,
    method: "Mandiri VA", status: "pending", createdAt: "2026-04-14T08:45:00Z",
  },
  {
    id: 4, bookingCode: "BK-2026-017", hotelName: "Hotel Nusa Indah Jakarta",
    guestName: "Rina Susanti", amount: 1650000, commission: 165000,
    method: "OVO", status: "success", createdAt: "2026-04-14T07:20:00Z",
  },
  {
    id: 5, bookingCode: "BK-2026-018", hotelName: "Villa Bukit Asri Bandung",
    guestName: "Ahmad Dhani", amount: 2100000, commission: 210000,
    method: "ShopeePay", status: "failed", createdAt: "2026-04-14T06:00:00Z",
  },
];

// Commission Settings
export interface CommissionSetting {
  id: number;
  hotelName: string;
  partnerName: string;
  defaultCommission: number;
  customCommission: number | null;
  defaultMarkup: number;
  customMarkup: number | null;
}

export const commissionSettings: CommissionSetting[] = [
  { id: 1, hotelName: "Hotel Nusa Indah Jakarta", partnerName: "PT Nusa Indah Hotel", defaultCommission: 10, customCommission: null, defaultMarkup: 5, customMarkup: null },
  { id: 2, hotelName: "Villa Bukit Asri Bandung", partnerName: "CV Bukit Asri", defaultCommission: 10, customCommission: 12, defaultMarkup: 5, customMarkup: null },
  { id: 3, hotelName: "Grand Palace Yogyakarta", partnerName: "PT Grand Palace Indonesia", defaultCommission: 10, customCommission: 8, defaultMarkup: 5, customMarkup: 3 },
  { id: 4, hotelName: "Beachside Resort Bali", partnerName: "PT Bali Beachside", defaultCommission: 10, customCommission: null, defaultMarkup: 5, customMarkup: 7 },
  { id: 5, hotelName: "Budget Inn Surabaya", partnerName: "UD Budget Surabaya", defaultCommission: 10, customCommission: 15, defaultMarkup: 5, customMarkup: null },
];

// Reports Data
export const reportsMonthlyRevenue = [
  { month: "Okt 2025", gmv: 1500000000, revenue: 225000000 },
  { month: "Nov 2025", gmv: 1650000000, revenue: 247500000 },
  { month: "Des 2025", gmv: 1900000000, revenue: 285000000 },
  { month: "Jan 2026", gmv: 1800000000, revenue: 270000000 },
  { month: "Feb 2026", gmv: 2100000000, revenue: 315000000 },
  { month: "Mar 2026", gmv: 1950000000, revenue: 292500000 },
  { month: "Apr 2026", gmv: 2400000000, revenue: 360000000 },
];

export const reportsGrowth = {
  revenueGrowth: { current: 360000000, previous: 292500000, percent: 23.1 },
  bookingGrowth: { current: 3421, previous: 2980, percent: 14.8 },
  userGrowth: { current: 8234, previous: 7150, percent: 15.2 },
};

// Content Management Data
export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  status: "active" | "inactive";
  order: number;
  createdAt: string;
}

export const banners: Banner[] = [
  { id: 1, title: "Promo Lebaran 2026", subtitle: "Diskon hingga 40% untuk hotel pilihan!", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", link: "/hotels?promo=lebaran", status: "active", order: 1, createdAt: "2026-03-01" },
  { id: 2, title: "Liburan Sekolah", subtitle: "Paket keluarga hemat mulai Rp 500rb", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", link: "/hotels?tag=family", status: "active", order: 2, createdAt: "2026-03-15" },
  { id: 3, title: "Weekend Getaway", subtitle: "Staycation seru di hotel terdekat", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800", link: "/hotels?tag=weekend", status: "inactive", order: 3, createdAt: "2026-02-10" },
];

export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  order: number;
}

export const faqs: FAQ[] = [
  { id: 1, category: "Booking", question: "Bagaimana cara melakukan booking hotel?", answer: "Pilih hotel, tentukan tanggal, pilih kamar, lalu lanjutkan ke pembayaran. Konfirmasi akan dikirim via email.", order: 1 },
  { id: 2, category: "Booking", question: "Bisakah saya membatalkan booking?", answer: "Ya, Anda dapat membatalkan booking hingga 24 jam sebelum check-in tanpa dikenakan biaya.", order: 2 },
  { id: 3, category: "Booking", question: "Bagaimana cara mengubah tanggal booking?", answer: "Hubungi customer service kami atau ubah melalui halaman detail booking di akun Anda.", order: 3 },
  { id: 4, category: "Pembayaran", question: "Metode pembayaran apa saja yang tersedia?", answer: "Kami menerima transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, ShopeePay), dan kartu kredit.", order: 1 },
  { id: 5, category: "Pembayaran", question: "Apakah pembayaran aman?", answer: "Ya, semua transaksi dilindungi dengan enkripsi SSL 256-bit dan bekerja sama dengan payment gateway terpercaya.", order: 2 },
  { id: 6, category: "Akun", question: "Bagaimana cara mendaftar?", answer: "Klik tombol Daftar, masukkan email dan password, lalu verifikasi melalui link yang dikirim ke email Anda.", order: 1 },
  { id: 7, category: "Akun", question: "Saya lupa password, apa yang harus dilakukan?", answer: "Klik 'Lupa Password' di halaman login, masukkan email Anda, dan ikuti instruksi reset password.", order: 2 },
];

export interface PlatformSettings {
  taxRate: number;
  serviceFee: number;
  contactEmail: string;
  contactPhone: string;
  maintenanceMode: boolean;
}

export const platformSettings: PlatformSettings = {
  taxRate: 11,
  serviceFee: 25000,
  contactEmail: "support@hotelku.com",
  contactPhone: "021-5551234",
  maintenanceMode: false,
};
