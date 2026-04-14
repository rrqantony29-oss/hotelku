"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, MapPin, Calendar, Users, Bed, Clock, Download,
  QrCode, Phone, Mail, CheckCircle, Circle, XCircle, ArrowLeft,
  Star, FileText, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookings, formatCurrency } from "@/data/dummy";

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: "bg-[#e6eeff]", text: "text-[#004ac6]", label: "Terkonfirmasi" },
  pending: { bg: "bg-[#fff3e0]", text: "text-[#e65100]", label: "Menunggu Pembayaran" },
  completed: { bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]", label: "Selesai" },
  cancelled: { bg: "bg-[#ffdad6]", text: "text-[#ba1a1a]", label: "Dibatalkan" },
  "checked-in": { bg: "bg-[#e0f2f1]", text: "text-[#00695c]", label: "Check-in" },
};

const timelineSteps = [
  { key: "pending", label: "Pesanan Dibuat", desc: "Booking berhasil dibuat" },
  { key: "confirmed", label: "Pembayaran Diterima", desc: "Pembayaran terkonfirmasi" },
  { key: "checked-in", label: "Check-in", desc: "Tamu sudah check-in" },
  { key: "completed", label: "Selesai", desc: "Menginap selesai" },
];

export default function BookingDetailPage() {
  const params = useParams();
  const booking = bookings.find((b) => b.id === Number(params.id));

  if (!booking) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#121c2a] font-semibold text-lg mb-2">Booking tidak ditemukan</p>
          <Link href="/bookings" className="text-sm text-[#004ac6] font-medium hover:underline">
            Kembali ke daftar booking
          </Link>
        </div>
      </div>
    );
  }

  const sc = statusConfig[booking.status] || statusConfig.pending;
  const currentStep = timelineSteps.findIndex((s) => s.key === booking.status);
  const canCancel = ["confirmed", "pending"].includes(booking.status);
  const canReview = booking.status === "completed";

  return (
    <div className="bg-[#f8f9ff] min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-[#434655] mb-2">
            <Link href="/" className="hover:text-[#004ac6]">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/bookings" className="hover:text-[#004ac6]">Booking Saya</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#121c2a] font-medium">{booking.bookingCode}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#121c2a]">Detail Booking</h1>
              <p className="text-sm text-[#434655] mt-1">Kode: {booking.bookingCode}</p>
            </div>
            <div className={`${sc.bg} ${sc.text} rounded-xl px-4 py-2 flex items-center gap-2 font-semibold text-sm`}>
              {sc.label}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="font-semibold text-[#121c2a] text-lg mb-5">Status Booking</h2>
              <div className="relative">
                {timelineSteps.map((step, i) => {
                  const isCompleted = i <= currentStep;
                  const isCurrent = i === currentStep;
                  return (
                    <div key={step.key} className="flex gap-4 mb-6 last:mb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? "gradient-primary text-white"
                            : "bg-[#e6eeff] text-[#434655]"
                        }`}>
                          {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        </div>
                        {i < timelineSteps.length - 1 && (
                          <div className={`w-0.5 h-12 mt-1 ${isCompleted ? "bg-[#2563eb]" : "bg-[#dee9fc]"}`} />
                        )}
                      </div>
                      <div className="pb-2">
                        <p className={`font-medium text-sm ${isCurrent ? "text-[#004ac6]" : isCompleted ? "text-[#121c2a]" : "text-[#434655]"}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-[#434655]">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hotel Info */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <div className="relative h-48">
                <Image src={booking.hotel.images[0]} alt={booking.hotel.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-bold text-xl text-white">{booking.hotel.name}</h3>
                  <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {booking.hotel.address}, {booking.hotel.city}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#eff4ff] rounded-xl p-3 text-center">
                    <Calendar className="h-5 w-5 text-[#2563eb] mx-auto mb-1" />
                    <p className="text-xs text-[#434655]">Check-in</p>
                    <p className="font-bold text-sm text-[#121c2a]">{new Date(booking.checkIn).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</p>
                    <p className="text-xs text-[#434655]">{booking.hotel.checkInTime}</p>
                  </div>
                  <div className="bg-[#eff4ff] rounded-xl p-3 text-center">
                    <Calendar className="h-5 w-5 text-[#2563eb] mx-auto mb-1" />
                    <p className="text-xs text-[#434655]">Check-out</p>
                    <p className="font-bold text-sm text-[#121c2a]">{new Date(booking.checkOut).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</p>
                    <p className="text-xs text-[#434655]">{booking.hotel.checkOutTime}</p>
                  </div>
                  <div className="bg-[#eff4ff] rounded-xl p-3 text-center">
                    <Clock className="h-5 w-5 text-[#2563eb] mx-auto mb-1" />
                    <p className="text-xs text-[#434655]">Durasi</p>
                    <p className="font-bold text-sm text-[#121c2a]">{booking.nights} malam</p>
                    <p className="text-xs text-[#434655]">{booking.roomCount} kamar</p>
                  </div>
                  <div className="bg-[#eff4ff] rounded-xl p-3 text-center">
                    <Users className="h-5 w-5 text-[#2563eb] mx-auto mb-1" />
                    <p className="text-xs text-[#434655]">Tamu</p>
                    <p className="font-bold text-sm text-[#121c2a]">{booking.guestCount} orang</p>
                    <p className="text-xs text-[#434655]">&nbsp;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Room & Guest Details */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="font-semibold text-[#121c2a] text-lg mb-4">Detail Kamar & Tamu</h2>
              <div className="space-y-4">
                <div className="bg-[#eff4ff] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Bed className="h-5 w-5 text-[#2563eb]" />
                    <p className="font-semibold text-[#121c2a]">{booking.room.name}</p>
                  </div>
                  <p className="text-sm text-[#434655]">{booking.room.description}</p>
                  <p className="text-sm text-[#434655] mt-1">{booking.room.bedCount} {booking.room.bedType} · Maks {booking.room.maxOccupancy} tamu</p>
                </div>
                <div className="bg-[#eff4ff] rounded-xl p-4">
                  <p className="font-semibold text-[#121c2a] mb-3">Data Tamu</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[#434655]">Nama</p>
                      <p className="font-medium text-[#121c2a]">{booking.guestName}</p>
                    </div>
                    <div>
                      <p className="text-[#434655]">Email</p>
                      <p className="font-medium text-[#121c2a] flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-[#2563eb]" /> {booking.guestEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#434655]">No. HP</p>
                      <p className="font-medium text-[#121c2a] flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-[#2563eb]" /> {booking.guestPhone}
                      </p>
                    </div>
                    {booking.specialRequest && (
                      <div>
                        <p className="text-[#434655]">Permintaan Khusus</p>
                        <p className="font-medium text-[#121c2a]">{booking.specialRequest}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="font-semibold text-[#121c2a] text-lg mb-4">Rincian Harga</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#434655]">{formatCurrency(booking.pricePerNight)} × {booking.nights} malam × {booking.roomCount} kamar</span>
                  <span className="text-[#121c2a] font-medium">{formatCurrency(booking.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#434655]">Pajak (11%)</span>
                  <span className="text-[#121c2a] font-medium">{formatCurrency(booking.tax)}</span>
                </div>
                <div className="border-t border-[#eff4ff] pt-3 flex justify-between">
                  <span className="font-semibold text-[#121c2a]">Total</span>
                  <span className="font-bold text-lg text-[#004ac6]">{formatCurrency(booking.total)}</span>
                </div>
              </div>
              <div className="mt-3 bg-[#e8f5e9] rounded-xl p-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#2e7d32] shrink-0" />
                <p className="text-sm text-[#2e7d32] font-medium">Pembayaran Lunas</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* QR Code */}
            <div className="bg-white rounded-xl shadow-card p-6 text-center">
              <h3 className="font-semibold text-[#121c2a] mb-4">E-Ticket</h3>
              <div className="bg-[#eff4ff] rounded-xl p-6 mb-4 inline-block">
                <div className="w-36 h-36 bg-white rounded-xl flex items-center justify-center mx-auto">
                  <div className="grid grid-cols-8 gap-0.5 p-3">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 ${Math.random() > 0.4 ? "bg-[#121c2a]" : "bg-white"} rounded-[1px]`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#434655] mb-4">Tunjukkan QR ini saat check-in</p>
              <Button className="w-full gradient-primary text-white rounded-xl h-11 font-semibold hover:opacity-90 transition">
                <Download className="h-4 w-4 mr-2" /> Unduh E-Ticket
              </Button>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-card p-5 space-y-3">
              {canReview && (
                <Link href={`/bookings/${booking.id}/review`} className="block">
                  <Button variant="outline" className="w-full rounded-xl h-11 font-medium border-[#2563eb] text-[#004ac6] hover:bg-[#eff4ff]">
                    <Star className="h-4 w-4 mr-2" /> Beri Review
                  </Button>
                </Link>
              )}
              {canCancel && (
                <Link href={`/bookings/${booking.id}/cancel`} className="block">
                  <Button variant="outline" className="w-full rounded-xl h-11 font-medium border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6]">
                    <XCircle className="h-4 w-4 mr-2" /> Batalkan Booking
                  </Button>
                </Link>
              )}
              <Button variant="outline" className="w-full rounded-xl h-11 font-medium text-[#434655]">
                <Share2 className="h-4 w-4 mr-2" /> Bagikan
              </Button>
              <Button variant="outline" className="w-full rounded-xl h-11 font-medium text-[#434655]">
                <FileText className="h-4 w-4 mr-2" /> Cetak Invoice
              </Button>
            </div>

            {/* Help */}
            <div className="bg-[#e6eeff] rounded-xl p-5">
              <p className="font-semibold text-[#121c2a] text-sm mb-2">Butuh Bantuan?</p>
              <p className="text-xs text-[#434655] mb-3">Hubungi customer service kami 24/7</p>
              <div className="flex items-center gap-2 text-sm text-[#004ac6] font-medium">
                <Phone className="h-4 w-4" /> 0800-123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-[#004ac6] font-medium mt-1">
                <Mail className="h-4 w-4" /> support@hotelku.id
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
