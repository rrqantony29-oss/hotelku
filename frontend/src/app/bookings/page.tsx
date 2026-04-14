"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar, MapPin, Clock, ChevronRight, Search, Filter,
  CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { formatCurrency } from "@/data/dummy";
import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";

type TabKey = "upcoming" | "completed" | "cancelled";

const tabs: { key: TabKey; label: string }[] = [
  { key: "upcoming", label: "Mendatang" },
  { key: "completed", label: "Selesai" },
  { key: "cancelled", label: "Dibatalkan" },
];

const statusConfig: Record<string, { bg: string; text: string; label: string; icon: React.ReactNode }> = {
  confirmed: { bg: "bg-[#e6eeff]", text: "text-[#004ac6]", label: "Terkonfirmasi", icon: <CheckCircle className="h-3.5 w-3.5" /> },
  pending: { bg: "bg-[#fff3e0]", text: "text-[#e65100]", label: "Menunggu", icon: <Clock className="h-3.5 w-3.5" /> },
  completed: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]", label: "Selesai", icon: <CheckCircle className="h-3.5 w-3.5" /> },
  cancelled: { bg: "bg-[#ffdad6]", text: "text-[#ba1a1a]", label: "Dibatalkan", icon: <XCircle className="h-3.5 w-3.5" /> },
  "checked-in": { bg: "bg-[#e0f2f1]", text: "text-[#00695c]", label: "Check-in", icon: <CheckCircle className="h-3.5 w-3.5" /> },
};

interface ApiBooking {
  id: number;
  booking_code: string;
  hotel: { id: number; name: string; city: string; province: string; images: string[]; address: string; check_in_time: string; check_out_time: string; star_rating: number };
  room: { id: number; name: string; description?: string; bed_count?: number; bed_type?: string; max_occupancy?: number };
  check_in: string;
  check_out: string;
  nights: number;
  room_count: number;
  guest_count: number;
  price_per_night: number;
  subtotal: number;
  tax: number;
  total: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  special_request: string;
  status: string;
  payment_status: string;
  created_at: string;
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await apiGet<ApiBooking[] | { data: ApiBooking[] }>("/bookings");
        const data = res.data;
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (data && typeof data === "object" && "data" in data) {
          setBookings(data.data || []);
        }
      } catch {
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "upcoming") return ["confirmed", "pending", "checked-in"].includes(b.status);
    if (activeTab === "completed") return b.status === "completed";
    if (activeTab === "cancelled") return b.status === "cancelled";
    return true;
  }).filter((b) =>
    searchQuery === "" ||
    b.hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.booking_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f8f9ff] min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-[#434655] mb-2">
            <Link href="/" className="hover:text-[#004ac6]">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#121c2a] font-medium">Booking Saya</span>
          </div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Booking Saya</h1>
          <p className="text-sm text-[#434655] mt-1">Kelola dan pantau semua reservasi Anda</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-[#e6eeff] rounded-xl p-1 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "bg-white text-[#004ac6] shadow-sm"
                    : "text-[#434655] hover:text-[#121c2a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
            <input
              placeholder="Cari kode booking atau hotel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#121c2a] placeholder:text-[#434655]/50 outline-none shadow-card w-full sm:w-64"
            />
          </div>
        </div>

        {/* Booking Cards */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-card p-12 text-center">
            <div className="w-8 h-8 border-2 border-[#004ac6] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#434655]">Memuat booking...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card p-12 text-center">
            <AlertCircle className="h-12 w-12 text-[#dee9fc] mx-auto mb-3" />
            <p className="text-[#121c2a] font-semibold mb-1">Tidak ada booking</p>
            <p className="text-sm text-[#434655] mb-4">
              {activeTab === "upcoming"
                ? "Anda belum memiliki reservasi mendatang."
                : activeTab === "completed"
                ? "Belum ada booking yang selesai."
                : "Tidak ada booking yang dibatalkan."}
            </p>
            <Link href="/hotels">
              <button className="gradient-primary text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition">
                Cari Hotel
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const sc = statusConfig[booking.status] || statusConfig.pending;
              return (
                <Link key={booking.id} href={`/bookings/${booking.id}`}>
                  <div className="bg-white rounded-xl shadow-card hover:shadow-ambient transition-shadow overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Hotel Photo */}
                      <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
                        <Image
                          src={booking.hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"}
                          alt={booking.hotel.name}
                          fill
                          className="object-cover"
                        />
                        <div className={`absolute top-3 left-3 ${sc.bg} ${sc.text} rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs font-semibold`}>
                          {sc.icon}
                          {sc.label}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <p className="text-xs text-[#434655] font-medium mb-1">{booking.booking_code}</p>
                            <h3 className="font-bold text-lg text-[#121c2a]">{booking.hotel.name}</h3>
                            <p className="text-sm text-[#434655] flex items-center gap-1 mt-1">
                              <MapPin className="h-3.5 w-3.5 text-[#2563eb]" />
                              {booking.hotel.city}, {booking.hotel.province}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#434655]">Total Pembayaran</p>
                            <p className="text-lg font-bold text-[#004ac6]">{formatCurrency(booking.total)}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#434655]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-[#2563eb]" />
                            {new Date(booking.check_in).toLocaleDateString("id-ID", { day: "numeric", month: "short" })} — {new Date(booking.check_out).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-[#2563eb]" />
                            {booking.nights} malam · {booking.room_count} kamar
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#eff4ff]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#434655]">{booking.room.name}</span>
                            <span className="w-1 h-1 rounded-full bg-[#dee9fc]" />
                            <span className="text-xs text-[#434655]">{booking.guest_count} tamu</span>
                          </div>
                          <span className="text-sm font-medium text-[#004ac6] flex items-center gap-1">
                            Lihat Detail <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
