"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, MapPin, Calendar, Users, CreditCard, Building2,
  Wallet, Landmark, Lock, ShieldCheck, Clock, Bed, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotels, formatCurrency } from "@/data/dummy";

const paymentMethods = [
  { id: "va", label: "Virtual Account", desc: "BCA, Mandiri, BNI, BRI", icon: Landmark },
  { id: "ewallet", label: "E-Wallet", desc: "GoPay, OVO, DANA, ShopeePay", icon: Wallet },
  { id: "cc", label: "Kartu Kredit", desc: "Visa, Mastercard, JCB", icon: CreditCard },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hotelSlug = searchParams.get("hotel");
  const roomId = searchParams.get("room");

  const hotel = hotels.find((h) => h.slug === hotelSlug);
  const room = hotel?.rooms.find((r) => r.id === Number(roomId));

  const checkIn = searchParams.get("checkIn") || "2026-04-20";
  const checkOut = searchParams.get("checkOut") || "2026-04-22";
  const roomCount = Number(searchParams.get("rooms") || "1");
  const guestCount = Number(searchParams.get("guests") || "2");

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequest: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("va");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!hotel || !room) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#121c2a] font-semibold text-lg mb-2">Data tidak ditemukan</p>
          <Link href="/hotels" className="text-sm text-[#004ac6] font-medium hover:underline">
            Kembali ke daftar hotel
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = room.basePrice * nights * roomCount;
  const serviceFee = Math.round(subtotal * 0.02);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + serviceFee + tax;

  const isValid = form.guestName && form.guestEmail && form.guestPhone;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/bookings");
    }, 2000);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen pb-8">
      {/* Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-[#434655] mb-2">
            <Link href="/" className="hover:text-[#004ac6]">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/hotels/${hotel.slug}`} className="hover:text-[#004ac6]">{hotel.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#121c2a] font-medium">Checkout</span>
          </div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Checkout</h1>
          <p className="text-sm text-[#434655] mt-1">Lengkapi data diri dan pilih metode pembayaran</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Guest Info */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#004ac6]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#121c2a] text-lg">Data Tamu</h2>
                  <p className="text-xs text-[#434655]">Isi data sesuai identitas (KTP/Paspor)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-[#121c2a] mb-1.5 block">Nama Lengkap *</Label>
                  <Input
                    placeholder="Nama sesuai KTP/Paspor"
                    value={form.guestName}
                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                    className="bg-[#eff4ff] border-0 rounded-xl h-12 text-[#121c2a] placeholder:text-[#434655]/50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-[#121c2a] mb-1.5 block">Email *</Label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={form.guestEmail}
                      onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                      className="bg-[#eff4ff] border-0 rounded-xl h-12 text-[#121c2a] placeholder:text-[#434655]/50"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#121c2a] mb-1.5 block">No. HP *</Label>
                    <Input
                      placeholder="08xxxxxxxxxx"
                      value={form.guestPhone}
                      onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                      className="bg-[#eff4ff] border-0 rounded-xl h-12 text-[#121c2a] placeholder:text-[#434655]/50"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#121c2a] mb-1.5 block">Permintaan Khusus (Opsional)</Label>
                  <textarea
                    placeholder="Contoh: Kamar lantai tinggi, non-smoking, extra bed, late check-in"
                    value={form.specialRequest}
                    onChange={(e) => setForm({ ...form, specialRequest: e.target.value })}
                    className="w-full bg-[#eff4ff] rounded-xl px-4 py-3 text-sm text-[#121c2a] placeholder:text-[#434655]/50 outline-none resize-none h-24"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-[#004ac6]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#121c2a] text-lg">Metode Pembayaran</h2>
                  <p className="text-xs text-[#434655]">Pembayaran diproses aman via Xendit</p>
                </div>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition ${
                        paymentMethod === pm.id
                          ? "bg-[#e6eeff] ring-2 ring-[#2563eb]"
                          : "bg-[#eff4ff] hover:bg-[#e6eeff]"
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        paymentMethod === pm.id ? "bg-[#004ac6]" : "bg-[#dee9fc]"
                      }`}>
                        <Icon className={`h-5 w-5 ${paymentMethod === pm.id ? "text-white" : "text-[#004ac6]"}`} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium text-sm text-[#121c2a]">{pm.label}</p>
                        <p className="text-xs text-[#434655]">{pm.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === pm.id ? "border-[#2563eb]" : "border-[#dee9fc]"
                      }`}>
                        {paymentMethod === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mt-4 bg-[#eff4ff] rounded-xl p-3">
                <ShieldCheck className="h-4 w-4 text-[#004ac6] shrink-0" />
                <p className="text-xs text-[#434655]">Pembayaran Anda dienkripsi dan diproses dengan aman melalui Xendit.</p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
              <h3 className="font-semibold text-[#121c2a] mb-4">Ringkasan Pesanan</h3>

              {/* Hotel Info */}
              <div className="flex gap-3 mb-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-[#121c2a] truncate">{hotel.name}</h4>
                  <p className="text-xs text-[#434655] flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-[#2563eb]" /> {hotel.city}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-[#784b00]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div className="bg-[#eff4ff] rounded-xl p-4 space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-[#2563eb] shrink-0" />
                  <div className="text-sm">
                    <p className="text-[#434655]">{new Date(checkIn).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" })} — {new Date(checkOut).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</p>
                    <p className="text-[#121c2a] font-medium">{nights} malam</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bed className="h-4 w-4 text-[#2563eb] shrink-0" />
                  <div className="text-sm">
                    <p className="text-[#121c2a] font-medium">{room.name}</p>
                    <p className="text-[#434655]">{roomCount} kamar · {guestCount} tamu</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-[#434655]">{formatCurrency(room.basePrice)} × {nights} malam × {roomCount} kamar</span>
                  <span className="text-[#121c2a] font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#434655]">Biaya layanan</span>
                  <span className="text-[#121c2a] font-medium">{formatCurrency(serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#434655]">Pajak (11%)</span>
                  <span className="text-[#121c2a] font-medium">{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="bg-[#e6eeff] rounded-xl p-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#121c2a]">Total Pembayaran</span>
                  <span className="text-xl font-bold text-[#004ac6]">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button
                onClick={handlePay}
                disabled={!isValid || isProcessing}
                className="w-full gradient-primary text-white rounded-xl h-13 font-semibold text-base shadow-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Bayar {formatCurrency(total)}
                  </span>
                )}
              </Button>

              <p className="text-center text-xs text-[#434655] mt-3">
                Dengan melanjutkan, Anda menyetujui{" "}
                <span className="text-[#004ac6] font-medium">Syarat & Ketentuan</span> kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center"><div className="text-[#434655]">Loading...</div></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
