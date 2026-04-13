"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hotels, cities, formatCurrency } from "@/data/dummy";
import Link from "next/link";
import Image from "next/image";

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
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Temukan Hotel Impian Anda</h1>
            <p className="text-lg text-blue-100">Pesan hotel di seluruh Indonesia dengan harga terbaik</p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-5xl mx-auto -mb-20 relative z-10 shadow-xl">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="md:col-span-1">
                  <label className="text-xs text-slate-500 mb-1 block">Lokasi</label>
                  <Select value={city} onValueChange={(v) => setCity(!v || v === "all" ? "" : v)}>
                    <SelectTrigger><MapPin className="h-4 w-4 mr-1 text-slate-400" /><SelectValue placeholder="Pilih kota" /></SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Check-in</label>
                  <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Check-out</label>
                  <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Tamu</label>
                  <Select value={guests} onValueChange={(v) => setGuests(v || "2")}>
                    <SelectTrigger><Users className="h-4 w-4 mr-1 text-slate-400" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((n) => <SelectItem key={n} value={String(n)}>{n} Tamu</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full h-10" onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-1" /> Cari
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Hotel Populer</h2>
          <p className="text-slate-500 mb-8">Pilihan hotel terbaik berdasarkan review tamu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <Link key={hotel.id} href={`/hotels/${hotel.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={hotel.images[0]}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-white text-slate-800">
                      {Array.from({ length: hotel.starRating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{hotel.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3" /> {hotel.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{hotel.avgRating}</span>
                        <span className="text-xs text-slate-400">({hotel.reviewCount})</span>
                      </div>
                      <p className="text-blue-600 font-bold">
                        {formatCurrency(Math.min(...hotel.rooms.map((r) => r.basePrice)))}
                        <span className="text-xs text-slate-400 font-normal">/malam</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Hotels */}
      <section className="pb-16 bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Semua Hotel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <Link key={hotel.id} href={`/hotels/${hotel.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition group flex flex-col md:flex-row">
                  <div className="relative w-full md:w-48 h-40 md:h-auto shrink-0 overflow-hidden">
                    <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <CardContent className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: hotel.starRating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h3 className="font-semibold mb-1">{hotel.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {hotel.city}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary">{hotel.avgRating}</Badge>
                        <span className="text-xs text-slate-400">({hotel.reviewCount})</span>
                      </div>
                      <p className="text-blue-600 font-bold text-sm">
                        {formatCurrency(Math.min(...hotel.rooms.map((r) => r.basePrice)))}
                        <span className="text-xs text-slate-400 font-normal">/malam</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Punya Hotel? Gabung Jadi Partner!</h2>
          <p className="text-slate-500 mb-6 max-w-xl mx-auto">
            Daftarkan hotel Anda di HotelKu dan jangkau ribuan calon tamu setiap hari.
          </p>
          <Link href="/partner/dashboard">
            <Button size="lg">Daftar Jadi Partner</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
