"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search, MapPin, Calendar, Users, Star, ChevronRight,
  Wifi, Car, Coffee, Sparkles, ArrowRight, TrendingUp,
  Shield, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hotels, cities, formatCurrency } from "@/data/dummy";

const featuredDestinations = [
  { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600", count: 124 },
  { name: "Yogyakarta", image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600", count: 89 },
  { name: "Jakarta", image: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600", count: 256 },
  { name: "Bandung", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600", count: 67 },
  { name: "Surabaya", image: "https://images.unsplash.com/photo-1583265662081-a35e1ef8f425?w=600", count: 45 },
  { name: "Lombok", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600", count: 38 },
];

const promos = [
  { title: "Diskon 25%", subtitle: "Untuk booking pertama kali", code: "HOTELKU25", gradient: "from-[#004ac6] to-[#2563eb]" },
  { title: "Cashback 15%", subtitle: "Minimal transaksi Rp 500rb", code: "CASHBACK15", gradient: "from-[#784b00] to-[#b8860b]" },
];

export default function HomePage() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const featuredHotels = hotels.filter((h) => h.isFeatured);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <div className="bg-[#f8f9ff]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8f9ff]" />

        {/* Decorative circles */}
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5" />

        <div className="relative container mx-auto px-4 pt-16 pb-32">
          {/* Nav spacing */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#ffddb8]" />
              <span className="text-sm text-white/90 font-medium">Booking hotel terpercaya #1 di Indonesia</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Temukan Hotel<br />Impian Anda
            </h1>
            <p className="text-lg text-white/70 max-w-lg mx-auto">
              Lebih dari 10.000 hotel di seluruh Indonesia dengan harga terbaik
            </p>
          </div>

          {/* Glassmorphism Search Bar */}
          <div className="max-w-5xl mx-auto">
            <div className="glass-strong rounded-2xl shadow-ambient p-2">
              <div className="bg-white rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Location */}
                  <div className="md:col-span-3">
                    <label className="text-xs font-medium text-[#434655] mb-1.5 block">Lokasi</label>
                    <Select value={city} onValueChange={(v) => setCity(!v || v === "all" ? "" : v)}>
                      <SelectTrigger className="bg-[#eff4ff] h-12 rounded-xl">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#2563eb]" />
                          <SelectValue placeholder="Pilih kota" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kota</SelectItem>
                        {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Check-in */}
                  <div className="md:col-span-3">
                    <label className="text-xs font-medium text-[#434655] mb-1.5 block">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2563eb]" />
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="bg-[#eff4ff] h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  {/* Check-out */}
                  <div className="md:col-span-3">
                    <label className="text-xs font-medium text-[#434655] mb-1.5 block">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2563eb]" />
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="bg-[#eff4ff] h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-[#434655] mb-1.5 block">Tamu</label>
                    <Select value={guests} onValueChange={(v) => setGuests(v || "2")}>
                      <SelectTrigger className="bg-[#eff4ff] h-12 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#2563eb]" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <SelectItem key={n} value={String(n)}>{n} Tamu</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="md:col-span-1 flex items-end">
                    <Button
                      className="w-full h-12 gradient-primary rounded-xl text-white font-semibold shadow-lg hover:opacity-90 transition"
                      onClick={handleSearch}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: "Harga Terjamin", desc: "Harga terbaik atau uang kembali" },
            { icon: Clock, title: "Booking Instan", desc: "Konfirmasi langsung dalam hitungan detik" },
            { icon: TrendingUp, title: "10.000+ Hotel", desc: "Pilihan terlengkap di Indonesia" },
          ].map((badge, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-card flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#e6eeff] flex items-center justify-center shrink-0">
                <badge.icon className="h-5 w-5 text-[#004ac6]" />
              </div>
              <div>
                <p className="font-semibold text-[#121c2a] text-sm">{badge.title}</p>
                <p className="text-xs text-[#434655]">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#121c2a]">Destinasi Populer</h2>
            <p className="text-sm text-[#434655] mt-1">Eksplorasi kota-kota favorit wisatawan</p>
          </div>
          <Link href="/hotels" className="text-sm font-medium text-[#004ac6] flex items-center gap-1 hover:gap-2 transition-all">
            Lihat Semua <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredDestinations.map((dest) => (
            <Link
              key={dest.name}
              href={`/hotels?city=${dest.name}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-ambient transition-shadow"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-base">{dest.name}</p>
                <p className="text-white/70 text-xs">{dest.count} hotel</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Hotels */}
      <section className="bg-[#eff4ff] py-16 mb-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#121c2a]">Hotel Populer</h2>
              <p className="text-sm text-[#434655] mt-1">Pilihan hotel terbaik berdasarkan review tamu</p>
            </div>
            <Link href="/hotels" className="text-sm font-medium text-[#004ac6] flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredHotels.map((hotel) => (
              <Link key={hotel.id} href={`/hotels/${hotel.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-ambient transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={hotel.images[0]}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Star badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-0.5">
                      {Array.from({ length: hotel.starRating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#784b00] text-[#784b00]" />
                      ))}
                    </div>
                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 bg-[#004ac6] rounded-lg px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white text-white" />
                      <span className="text-white text-xs font-semibold">{hotel.avgRating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#121c2a] mb-1 truncate">{hotel.name}</h3>
                    <p className="text-sm text-[#434655] flex items-center gap-1 mb-3">
                      <MapPin className="h-3.5 w-3.5 text-[#2563eb]" /> {hotel.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="bg-[#e6eeff] rounded-lg px-2 py-0.5">
                          <span className="text-xs font-medium text-[#004ac6]">{hotel.reviewCount} review</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#004ac6] font-bold">
                          {formatCurrency(Math.min(...hotel.rooms.map((r) => r.basePrice)))}
                        </p>
                        <p className="text-xs text-[#434655]">/malam</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#121c2a]">Promo Spesial</h2>
          <p className="text-sm text-[#434655] mt-1">Manfaatkan penawaran terbatas untuk pengalaman menginap terbaik</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {promos.map((promo, i) => (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${promo.gradient} p-6 text-white`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <p className="text-3xl font-bold mb-1">{promo.title}</p>
                <p className="text-white/80 text-sm mb-4">{promo.subtitle}</p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-xs font-medium text-white/70">Kode:</span>
                  <span className="text-sm font-bold tracking-wider">{promo.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-[#eff4ff] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-[#121c2a] mb-3">Punya Hotel? Gabung Jadi Partner!</h2>
            <p className="text-[#434655] mb-6">
              Daftarkan hotel Anda di HotelKu dan jangkau ribuan calon tamu setiap hari.
            </p>
            <Link href="/partner/dashboard">
              <Button className="gradient-primary text-white rounded-xl px-8 h-12 font-semibold shadow-lg hover:opacity-90 transition">
                Daftar Jadi Partner <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
