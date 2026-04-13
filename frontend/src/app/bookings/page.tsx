"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { hotels, formatCurrency } from "@/data/dummy";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hotelSlug = searchParams.get("hotel");
  const roomId = searchParams.get("room");

  const hotel = hotels.find((h) => h.slug === hotelSlug);
  const room = hotel?.rooms.find((r) => r.id === Number(roomId));

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    checkIn: "", checkOut: "", roomCount: "1", guestCount: "2",
    guestName: "", guestEmail: "", guestPhone: "", specialRequest: "",
  });

  if (!hotel || !room) return <div className="container mx-auto px-4 py-16 text-center">Data tidak ditemukan.</div>;

  const nights = form.checkIn && form.checkOut ? Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const subtotal = room.basePrice * nights * Number(form.roomCount);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const handleSubmit = () => {
    setStep(3);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {["Detail Pesanan", "Data Tamu", "Pembayaran"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
              {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm hidden md:inline ${step === i + 1 ? "font-semibold" : "text-slate-500"}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card>
              <CardHeader><CardTitle>Detail Pesanan</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Check-in</Label>
                    <Input type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
                  </div>
                  <div>
                    <Label>Check-out</Label>
                    <Input type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
                  </div>
                  <div>
                    <Label>Jumlah Kamar</Label>
                    <Input type="number" min="1" value={form.roomCount} onChange={(e) => setForm({ ...form, roomCount: e.target.value })} />
                  </div>
                  <div>
                    <Label>Jumlah Tamu</Label>
                    <Input type="number" min="1" value={form.guestCount} onChange={(e) => setForm({ ...form, guestCount: e.target.value })} />
                  </div>
                </div>
                {nights > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">{nights} malam × {form.roomCount} kamar × {formatCurrency(room.basePrice)} = <strong>{formatCurrency(subtotal)}</strong></p>
                  </div>
                )}
                <Button className="w-full" onClick={() => setStep(2)} disabled={!form.checkIn || !form.checkOut || nights <= 0}>
                  Lanjut ke Data Tamu
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader><CardTitle>Data Tamu</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nama Lengkap</Label>
                  <Input placeholder="Nama sesuai KTP" value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" value={form.guestEmail} onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} />
                </div>
                <div>
                  <Label>No. HP</Label>
                  <Input placeholder="08xxxxxxxxxx" value={form.guestPhone} onChange={(e) => setForm({ ...form, guestPhone: e.target.value })} />
                </div>
                <div>
                  <Label>Permintaan Khusus (Opsional)</Label>
                  <Input placeholder="Contoh: Kamar lantai tinggi, non-smoking" value={form.specialRequest} onChange={(e) => setForm({ ...form, specialRequest: e.target.value })} />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Kembali</Button>
                  <Button onClick={handleSubmit} disabled={!form.guestName || !form.guestEmail || !form.guestPhone} className="flex-1">
                    Lanjut ke Pembayaran
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader><CardTitle>Pembayaran</CardTitle></CardHeader>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Booking Berhasil!</h3>
                <p className="text-slate-500 mb-2">Kode Booking: <strong>HKU-20260414-001</strong></p>
                <p className="text-slate-500 mb-6">Silakan lakukan pembayaran melalui Xendit untuk mengkonfirmasi pesanan Anda.</p>
                <Badge className="mb-4 bg-yellow-100 text-yellow-800">Menunggu Pembayaran</Badge>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => router.push("/bookings")}>Lihat Booking</Button>
                  <Button><CreditCard className="h-4 w-4 mr-1" /> Bayar Sekarang</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Sidebar */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-5">
              <div className="flex gap-3 mb-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{hotel.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {hotel.city}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm mt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tipe Kamar</span>
                  <span className="font-medium">{room.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Harga/malam</span>
                  <span>{formatCurrency(room.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Durasi</span>
                  <span>{nights} malam × {form.roomCount} kamar</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pajak (11%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
