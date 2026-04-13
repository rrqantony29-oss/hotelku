"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { hotels, cities, formatCurrency } from "@/data/dummy";

function HotelsContent() {
  const searchParams = useSearchParams();
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [star, setStar] = useState(searchParams.get("star") || "");
  const [sortBy, setSortBy] = useState("popular");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = useMemo(() => {
    let result = [...hotels];
    if (city) result = result.filter((h) => h.city.toLowerCase().includes(city.toLowerCase()));
    if (star) result = result.filter((h) => h.starRating === Number(star));
    if (minPrice) result = result.filter((h) => Math.min(...h.rooms.map((r) => r.basePrice)) >= Number(minPrice));
    if (maxPrice) result = result.filter((h) => Math.min(...h.rooms.map((r) => r.basePrice)) <= Number(maxPrice));

    if (sortBy === "price_asc") result.sort((a, b) => Math.min(...a.rooms.map((r) => r.basePrice)) - Math.min(...b.rooms.map((r) => r.basePrice)));
    if (sortBy === "price_desc") result.sort((a, b) => Math.min(...b.rooms.map((r) => r.basePrice)) - Math.min(...a.rooms.map((r) => r.basePrice)));
    if (sortBy === "rating") result.sort((a, b) => b.avgRating - a.avgRating);

    return result;
  }, [city, star, sortBy, minPrice, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cari Hotel</h1>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Kota</label>
              <Select value={city} onValueChange={(v) => setCity(!v || v === "all" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Semua Kota" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kota</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Bintang</label>
              <Select value={star} onValueChange={(v) => setStar(!v || v === "all" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Semua Bintang" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  {[5, 4, 3, 2, 1].map((s) => <SelectItem key={s} value={String(s)}>{s} Bintang</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Harga Min</label>
              <Input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Harga Max</label>
              <Input type="number" placeholder="Tanpa batas" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Urutkan</label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v || "popular")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Populer</SelectItem>
                  <SelectItem value="price_asc">Harga Terendah</SelectItem>
                  <SelectItem value="price_desc">Harga Tertinggi</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => { setCity(""); setStar(""); setMinPrice(""); setMaxPrice(""); setSortBy("popular"); }}>
                <SlidersHorizontal className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <p className="text-sm text-slate-500 mb-4">{filtered.length} hotel ditemukan</p>
      <div className="space-y-4">
        {filtered.map((hotel) => (
          <Link key={hotel.id} href={`/hotels/${hotel.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition group">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                  <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: hotel.starRating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                      <MapPin className="h-4 w-4" /> {hotel.address}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {hotel.facilities.slice(0, 4).map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                      ))}
                      {hotel.facilities.length > 4 && <Badge variant="outline" className="text-xs">+{hotel.facilities.length - 4}</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600">{hotel.avgRating}</Badge>
                      <span className="text-sm text-slate-500">{hotel.reviewCount} review</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(Math.min(...hotel.rooms.map((r) => r.basePrice)))}</p>
                      <p className="text-xs text-slate-400">/malam</p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Tidak ada hotel yang cocok dengan filter Anda.</p>
        </div>
      )}
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <HotelsContent />
    </Suspense>
  );
}
