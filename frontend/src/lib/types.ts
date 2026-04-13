export interface Hotel {
  id: number;
  slug: string;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  starRating: number;
  avgRating: number;
  reviewCount: number;
  checkInTime: string;
  checkOutTime: string;
  images: string[];
  facilities: string[];
  rooms: Room[];
  partner: Partner;
  isFeatured: boolean;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  maxOccupancy: number;
  bedCount: number;
  bedType: string;
  basePrice: number;
  weekendPrice: number;
  images: string[];
  facilities: string[];
  available: number;
}

export interface Partner {
  id: number;
  companyName: string;
  picName: string;
  status: string;
}

export interface Booking {
  id: number;
  bookingCode: string;
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomCount: number;
  guestCount: number;
  pricePerNight: number;
  subtotal: number;
  tax: number;
  total: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequest: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "partner" | "admin";
}
