"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Star, Search, SlidersHorizontal, ChevronDown,
  Wifi, Car, Coffee, Waves, Dumbbell, X, ChevronRight,
  SlidersVertical, ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hotels, cities, facilitiesList, formatCurrency } from "@/data/dummy";

const facilityIcons: Record<string, React.ReactNode> = {
  "WiFi Gratis": <Wifi className="h-4 w-4" />,
  "Kolam Renang": <Waves className="h-4 w-4" />,
  "Parkir Gratis": <Car className="h-4 w-4" />,
  "Sarapan": <Coffee className="h-4 w-4" />,
  "Gym": <Dumbbell className="h-4 w-4" />,
};

const accommodationTypes = ["Hotel", "Villa", "Resort", "Guest House"];

function HotelsContent() {
  const searchParams = useSearchParams();
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [star, setStar] = useState(searchParams.get("star") || "");
  const [sortBy, setSortBy] = useState("popular");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const toggleFacility = (f: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filtered = useMemo(() => {
    let result = [...hotels];
    if (city) result = result.filter((h) => h.city.toLowerCase().includes(city.toLowerCase()));
    if (star) result = result.filter((h) => h.starRating === Number(star));
    if (minPrice) result = result.filter((h) => Math.min(...h.rooms.map((r) => r.basePrice)) >= Number(minPrice));
    if (maxPrice) result = result.filter((h) => Math.min(...h.rooms.map((r) => r.basePrice)) <= Number(maxPrice));
    if (selectedFacilities.length > 0) {
      result = result.filter((h) =>
        selectedFacilities.every((f) => h.facilities.includes(f))
      );
    }

    if (sortBy === "price_asc") result.sort((a, b) => Math.min(...a.rooms.map((r) => r.basePrice)) - Math.min(...b.rooms.map((r) => r.basePrice)));
    if (sortBy === "price_desc") result.sort((a, b) => Math.min(...b.rooms.map((r) => r.basePrice)) - Math.min(...a.rooms.map((r) => r.basePrice)));
    if (sortBy === "rating") result.sort((a, b) => b.avgRating - a.avgRating);

    return result;
  }, [city, star, sortBy, minPrice, maxPrice, selectedFacilities]);

  const clearFilters = () => {
    setCity(""); setStar(""); setMinPrice(""); setMaxPrice("");
    setSortBy("popular"); setSelectedFacilities([]); setSelectedType("");
  };

  const activeFilterCount = [city, star, minPrice, maxPrice, selectedType].filter(Boolean).length + selectedFacilities.length;

  return (
    <div className="bg-[#f8f9ff] min-h-screen">
      {/* Search Header */}
      <div className="bg-white shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-end">
            {/* City search */}
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-[#434655] mb-1.5 block">Lokasi</label>
              <Select value={city} onValueChange={(v) => setCity(!v || v === "all" ? "" : v)}>
                <SelectTrigger className="bg-[#eff4ff] h-11 rounded-xl">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#2563eb]" />
                    <SelectValue placeholder="Semua Kota" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kota</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Date inputs */}
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-[#434655] mb-1.5 block">Check-in</label>
              <Input type="date" className="bg-[#eff4ff] h-11 rounded-xl" defaultValue={searchParams.get("checkIn") || ""} />
            </div>
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-[#434655] mb-1.5 block">Check-out</label>
              <Input type="date" className="bg-[#eff4ff] h-11 rounded-xl" defaultValue={searchParams.get("checkOut") || ""} />
            </div>

            {/* Sort & Filter toggle */}
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v || "popular")}>
                <SelectTrigger className="bg-[#eff4ff] h-11 rounded-xl w-full md:w-44">
                  <ArrowUpDown className="h-4 w-4 text-[#2563eb] mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Populer</SelectItem>
                  <SelectItem value="price_asc">Harga Terendah</SelectItem>
                  <SelectItem value="price_desc">Harga Tertinggi</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="h-11 rounded-xl bg-[#eff4ff] hover:bg-[#e6eeff] border-0"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersVertical className="h-4 w-4 mr-1" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-1.5 bg-[#004ac6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-64 shrink-0 hidden lg:block">
              <div className="bg-white rounded-xl shadow-card p-5 sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#121c2a]">Filter</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[#004ac6] font-medium hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Star Rating */}
                <div>
                  <h4 className="text-sm font-medium text-[#121c2a] mb-3">Rating Bintang</h4>
                  <div className="flex flex-wrap gap-2">
                    {["", "5", "4", "3", "2", "1"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStar(s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                          star === s
                            ? "bg-[#004ac6] text-white"
                            : "bg-[#eff4ff] text-[#434655] hover:bg-[#e6eeff]"
                        }`}
                      >
                        {s === "" ? "Semua" : `${s} ★`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-[#121c2a] mb-3">Rentang Harga</h4>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="bg-[#eff4ff] rounded-lg h-10 text-sm"
                    />
                    <span className="text-[#434655] self-center">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="bg-[#eff4ff] rounded-lg h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h4 className="text-sm font-medium text-[#121c2a] mb-3">Fasilitas</h4>
                  <div className="space-y-2">
                    {facilitiesList.slice(0, 6).map((f) => (
                      <label
                        key={f}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition ${
                            selectedFacilities.includes(f)
                              ? "bg-[#004ac6]"
                              : "bg-[#eff4ff] group-hover:bg-[#e6eeff]"
                          }`}
                        >
                          {selectedFacilities.includes(f) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-[#434655] group-hover:text-[#121c2a]">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Accommodation Type */}
                <div>
                  <h4 className="text-sm font-medium text-[#121c2a] mb-3">Tipe Akomodasi</h4>
                  <div className="flex flex-wrap gap-2">
                    {accommodationTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedType(selectedType === t ? "" : t)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                          selectedType === t
                            ? "bg-[#004ac6] text-white"
                            : "bg-[#eff4ff] text-[#434655] hover:bg-[#e6eeff]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#434655]">
                <span className="font-semibold text-[#121c2a]">{filtered.length}</span> hotel ditemukan
                {city && <span> di <span className="font-medium text-[#004ac6]">{city}</span></span>}
              </p>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {city && (
                  <span className="inline-flex items-center gap-1.5 bg-[#e6eeff] text-[#004ac6] text-xs font-medium px-3 py-1.5 rounded-lg">
                    {city}
                    <button onClick={() => setCity("")}><X className="h-3 w-3" /></button>
                  </span>
                )}
                {star && (
                  <span className="inline-flex items-center gap-1.5 bg-[#e6eeff] text-[#004ac6] text-xs font-medium px-3 py-1.5 rounded-lg">
                    {star} Bintang
                    <button onClick={() => setStar("")}><X className="h-3 w-3" /></button>
                  </span>
                )}
                {selectedFacilities.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 bg-[#e6eeff] text-[#004ac6] text-xs font-medium px-3 py-1.5 rounded-lg">
                    {f}
                    <button onClick={() => toggleFacility(f)}><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {filtered.map((hotel) => (
                <Link key={hotel.id} href={`/hotels/${hotel.slug}`}>
                  <div className="bg-white rounded-xl shadow-card hover:shadow-ambient transition-shadow overflow-hidden group">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
                        <Image
                          src={hotel.images[0]}
                          alt={hotel.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Stars */}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-0.5">
                          {Array.from({ length: hotel.starRating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#784b00] text-[#784b00]" />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-[#121c2a] mb-1 group-hover:text-[#004ac6] transition-colors">
                            {hotel.name}
                          </h3>
                          <p className="text-sm text-[#434655] flex items-center gap-1 mb-3">
                            <MapPin className="h-4 w-4 text-[#2563eb]" /> {hotel.address}
                          </p>

                          {/* Facilities */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.facilities.slice(0, 4).map((f) => (
                              <span
                                key={f}
                                className="inline-flex items-center gap-1 bg-[#eff4ff] text-[#434655] text-xs px-2.5 py-1 rounded-lg"
                              >
                                {facilityIcons[f] || <Coffee className="h-3 w-3" />}
                                {f}
                              </span>
                            ))}
                            {hotel.facilities.length > 4 && (
                              <span className="inline-flex items-center bg-[#e6eeff] text-[#004ac6] text-xs px-2.5 py-1 rounded-lg font-medium">
                                +{hotel.facilities.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between pt-3">
                          {/* Rating */}
                          <div className="flex items-center gap-2">
                            <div className="bg-[#004ac6] rounded-lg px-2.5 py-1 flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-white text-white" />
                              <span className="text-white text-sm font-bold">{hotel.avgRating}</span>
                            </div>
                            <span className="text-sm text-[#434655]">
                              {hotel.reviewCount} review
                            </span>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#004ac6]">
                              {formatCurrency(Math.min(...hotel.rooms.map((r) => r.basePrice)))}
                            </p>
                            <p className="text-xs text-[#434655]">/malam</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="bg-white rounded-xl shadow-card text-center py-16">
                <Search className="h-12 w-12 text-[#dee9fc] mx-auto mb-4" />
                <p className="text-[#121c2a] font-semibold mb-1">Tidak ada hotel ditemukan</p>
                <p className="text-sm text-[#434655] mb-4">Coba ubah filter pencarian Anda</p>
                <Button
                  variant="outline"
                  className="rounded-xl bg-[#eff4ff] hover:bg-[#e6eeff] border-0"
                  onClick={clearFilters}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#004ac6] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#434655]">Memuat hotel...</p>
        </div>
      </div>
    }>
      <HotelsContent />
    </Suspense>
  );
}
