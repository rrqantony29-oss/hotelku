"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, MapPin, Calendar, Clock, AlertTriangle,
  ArrowLeft, CheckCircle, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookings, formatCurrency } from "@/data/dummy";

const cancelReasons = [
  "Perubahan jadwal perjalanan",
  "Menemukan hotel lain dengan harga lebih baik",
  "Perubahan rencana bisnis",
  "Kondisi kesehatan / darurat",
  "Kesalahan saat memesan",
  "Alasan lainnya",
];

export default function CancelBookingPage() {
  const params = useParams();
  const router = useRouter();
  const booking = bookings.find((b) => b.id === Number(params.id));
  const [reason, setReason] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

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

  const refundAmount = Math.round(booking.total * 0.85);
  const cancellationFee = booking.total - refundAmount;

  const handleCancel = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setIsCancelled(true);
    }, 1500);
  };

  if (isCancelled) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-[#2e7d32]" />
          </div>
          <h2 className="text-xl font-bold text-[#121c2a] mb-2">Booking Dibatalkan</h2>
          <p className="text-sm text-[#434655] mb-2">
            Booking <strong>{booking.bookingCode}</strong> berhasil dibatalkan.
          </p>
          <p className="text-sm text-[#434655] mb-6">
            Refund sebesar <strong className="text-[#004ac6]">{formatCurrency(refundAmount)}</strong> akan diproses dalam 3-5 hari kerja.
          </p>
          <Link href="/bookings">
            <Button className="w-full gradient-primary text-white rounded-xl h-12 font-semibold hover:opacity-90">
              Kembali ke Booking Saya
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href={`/bookings/${booking.id}`} className="hover:text-[#004ac6]">{booking.bookingCode}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#121c2a] font-medium">Batalkan</span>
          </div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Batalkan Booking</h1>
          <p className="text-sm text-[#434655] mt-1">Konfirmasi pembatalan reservasi Anda</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 max-w-2xl space-y-5">
        {/* Warning */}
        <div className="bg-[#fff3e0] rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-[#e65100] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-[#e65100]">Perhatian</p>
            <p className="text-sm text-[#434655]">Pembatalan bersifat permanen dan tidak dapat dikembalikan. Pastikan Anda yakin sebelum melanjutkan.</p>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-[#121c2a] text-lg mb-4">Ringkasan Booking</h2>
          <div className="flex gap-4 mb-4">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <Image src={booking.hotel.images[0]} alt={booking.hotel.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs text-[#434655] font-medium mb-0.5">{booking.bookingCode}</p>
              <h3 className="font-bold text-[#121c2a]">{booking.hotel.name}</h3>
              <p className="text-sm text-[#434655] flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5 text-[#2563eb]" /> {booking.hotel.city}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#eff4ff] rounded-xl p-3">
              <p className="text-xs text-[#434655]">Check-in</p>
              <p className="font-semibold text-sm text-[#121c2a]">{new Date(booking.checkIn).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
            <div className="bg-[#eff4ff] rounded-xl p-3">
              <p className="text-xs text-[#434655]">Check-out</p>
              <p className="font-semibold text-sm text-[#121c2a]">{new Date(booking.checkOut).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
            <div className="bg-[#eff4ff] rounded-xl p-3">
              <p className="text-xs text-[#434655]">Kamar</p>
              <p className="font-semibold text-sm text-[#121c2a]">{booking.room.name}</p>
            </div>
            <div className="bg-[#eff4ff] rounded-xl p-3">
              <p className="text-xs text-[#434655]">Durasi</p>
              <p className="font-semibold text-sm text-[#121c2a]">{booking.nights} malam · {booking.roomCount} kamar</p>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center">
              <Info className="h-5 w-5 text-[#004ac6]" />
            </div>
            <h2 className="font-semibold text-[#121c2a] text-lg">Kebijakan Pembatalan</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 bg-[#e8f5e9] rounded-xl p-3">
              <CheckCircle className="h-4 w-4 text-[#2e7d32] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#121c2a]">Gratis pembatalan hingga 24 jam sebelum check-in</p>
                <p className="text-xs text-[#434655]">Refund 100% dikembalikan ke metode pembayaran</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-[#fff3e0] rounded-xl p-3">
              <AlertTriangle className="h-4 w-4 text-[#e65100] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#121c2a]">Pembatalan kurang dari 24 jam: dikenakan biaya 15%</p>
                <p className="text-xs text-[#434655]">Biaya pembatalan dipotong dari total pembayaran</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Breakdown */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-[#121c2a] text-lg mb-4">Rincian Refund</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#434655]">Total pembayaran</span>
              <span className="text-[#121c2a] font-medium">{formatCurrency(booking.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#434655]">Biaya pembatalan (15%)</span>
              <span className="text-[#ba1a1a] font-medium">-{formatCurrency(cancellationFee)}</span>
            </div>
            <div className="border-t border-[#eff4ff] pt-3 flex justify-between">
              <span className="font-semibold text-[#121c2a]">Total Refund</span>
              <span className="font-bold text-lg text-[#2e7d32]">{formatCurrency(refundAmount)}</span>
            </div>
          </div>
          <p className="text-xs text-[#434655] mt-3 bg-[#eff4ff] rounded-xl p-3">
            Refund akan diproses ke metode pembayaran asli dalam waktu 3-5 hari kerja.
          </p>
        </div>

        {/* Reason */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-[#121c2a] text-lg mb-4">Alasan Pembatalan *</h2>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-[#eff4ff] rounded-xl px-4 py-3 text-sm text-[#121c2a] outline-none appearance-none cursor-pointer"
          >
            <option value="">Pilih alasan pembatalan</option>
            {cancelReasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/bookings/${booking.id}`} className="flex-1">
            <Button variant="outline" className="w-full rounded-xl h-12 font-semibold border-[#2563eb] text-[#004ac6] hover:bg-[#eff4ff]">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali, Pertahankan Booking
            </Button>
          </Link>
          <Button
            onClick={handleCancel}
            disabled={!reason || isConfirming}
            className="flex-1 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-xl h-12 font-semibold disabled:opacity-50"
          >
            {isConfirming ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Membatalkan...
              </span>
            ) : (
              "Konfirmasi Pembatalan"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
