"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Star, Clock, Users, Bed, Wifi, Car, Coffee, Waves,
  ChevronLeft, ChevronRight, X, Maximize2, Phone, Mail,
  Bath, Tv, Wind, UtensilsCrossed, Shirt, Dumbbell,
  ChevronRight as ChevronRightIcon, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotels, reviews, formatCurrency } from "@/data/dummy";

const facilityIconMap: Record<string, React.ReactNode> = {
  "WiFi Gratis": <Wifi className="h-4 w-4" />,
  "Kolam Renang": <Waves className="h-4 w-4" />,
  "Parkir Gratis": <Car className="h-4 w-4" />,
  "Sarapan": <Coffee className="h-4 w-4" />,
  "AC": <Wind className="h-4 w-4" />,
  "Restoran": <UtensilsCrossed className="h-4 w-4" />,
  "Spa": <Sparkles className="h-4 w-4" />,
  "Gym": <Dumbbell className="h-4 w-4" />,
  "Room Service": <Coffee className="h-4 w-4" />,
  "Laundry": <Shirt className="h-4 w-4" />,
};

const roomFacilityIcons: Record<string, React.ReactNode> = {
  "AC": <Wind className="h-3.5 w-3.5" />,
  "TV": <Tv className="h-3.5 w-3.5" />,
  "WiFi": <Wifi className="h-3.5 w-3.5" />,
  "Bathtub": <Bath className="h-3.5 w-3.5" />,
};

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const hotel = hotels.find((h) => h.slug === params.slug);
  const [imgIdx, setImgIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "rooms" | "reviews">("info");

  if (!hotel) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#121c2a] font-semibold text-lg mb-2">Hotel tidak ditemukan</p>
          <Link href="/hotels" className="text-sm text-[#004ac6] font-medium hover:underline">
            Kembali ke daftar hotel
          </Link>
        </div>
      </div>
    );
  }

  const nextImg = () => setImgIdx((i) => (i + 1) % hotel.images.length);
  const prevImg = () => setImgIdx((i) => (i - 1 + hotel.images.length) % hotel.images.length);

  const lowestPrice = Math.min(...hotel.rooms.map((r) => r.basePrice));

  // Similar hotels (same city, different hotel)
  const similarHotels = hotels.filter((h) => h.city === hotel.city && h.id !== hotel.id).slice(0, 3);

  return (
    <div className="bg-[#f8f9ff] min-h-screen pb-24">
      {/* Photo Gallery */}
      <section className="relative">
        <div className="container mx-auto px-4 pt-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#434655] mb-4">
            <Link href="/" className="hover:text-[#004ac6]">Beranda</Link>
            <ChevronRightIcon className="h-3 w-3" />
            <Link href="/hotels" className="hover:text-[#004ac6]">Hotel</Link>
            <ChevronRightIcon className="h-3 w-3" />
            <span className="text-[#121c2a] font-medium">{hotel.name}</span>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
            {/* Main image */}
            <div
              className="md:col-span-2 md:row-span-2 relative h-64 md:h-[400px] cursor-pointer group"
              onClick={() => setShowLightbox(true)}
            >
              <Image
                src={hotel.images[0]}
                alt={hotel.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-sm font-medium text-[#121c2a] opacity-0 group-hover:opacity-100 transition">
                <Maximize2 className="h-4 w-4" /> Lihat Semua Foto
              </button>
            </div>

            {/* Side images */}
            {hotel.images.slice(1, 3).map((img, i) => (
              <div
                key={i}
                className="hidden md:block relative h-[196px] cursor-pointer group"
                onClick={() => { setImgIdx(i + 1); setShowLightbox(true); }}
              >
                <Image src={img} alt={`${hotel.name} ${i + 2}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>
            ))}

            {/* Fill missing grid spots with placeholders */}
            {hotel.images.length < 3 && (
              <div className="hidden md:flex items-center justify-center bg-[#e6eeff] h-[196px]">
                <span className="text-sm text-[#434655]">Foto tambahan</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <button onClick={prevImg} className="absolute left-4 text-white/80 hover:text-white">
            <ChevronLeft className="h-10 w-10" />
          </button>
          <div className="relative w-full max-w-4xl h-[60vh] mx-12">
            <Image src={hotel.images[imgIdx]} alt={hotel.name} fill className="object-contain" />
          </div>
          <button onClick={nextImg} className="absolute right-4 text-white/80 hover:text-white">
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="absolute bottom-6 text-white/60 text-sm">
            {imgIdx + 1} / {hotel.images.length}
          </div>
        </div>
      )}

      {/* Hotel Info Header */}
      <section className="container mx-auto px-4 mt-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            {/* Stars */}
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#784b00] text-[#784b00]" />
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#121c2a] mb-2">{hotel.name}</h1>
            <p className="text-sm text-[#434655] flex items-center gap-1.5 mb-3">
              <MapPin className="h-4 w-4 text-[#2563eb]" /> {hotel.address}, {hotel.city}
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-[#004ac6] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-white text-white" />
                <span className="text-white font-bold">{hotel.avgRating}</span>
              </div>
              <span className="text-sm text-[#434655]">{hotel.reviewCount} review</span>
              <span className="text-sm text-[#434655]">·</span>
              <span className="text-sm text-[#434655]">{hotel.city}, {hotel.province}</span>
            </div>
          </div>

          {/* Check-in/out badges */}
          <div className="flex gap-3">
            <div className="bg-[#e6eeff] rounded-xl px-4 py-3 text-center">
              <p className="text-xs text-[#434655] mb-0.5">Check-in</p>
              <p className="font-bold text-[#121c2a]">{hotel.checkInTime}</p>
            </div>
            <div className="bg-[#e6eeff] rounded-xl px-4 py-3 text-center">
              <p className="text-xs text-[#434655] mb-0.5">Check-out</p>
              <p className="font-bold text-[#121c2a]">{hotel.checkOutTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="container mx-auto px-4 mt-8">
        <div className="flex gap-1 bg-[#e6eeff] rounded-xl p-1 w-fit">
          {[
            { key: "info" as const, label: "Informasi" },
            { key: "rooms" as const, label: `Kamar (${hotel.rooms.length})` },
            { key: "reviews" as const, label: `Review (${hotel.reviewCount})` },
          ].map((tab) => (
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
      </section>

      {/* Tab Content */}
      <section className="container mx-auto px-4 mt-6">
        {/* Info Tab */}
        {activeTab === "info" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="font-semibold text-[#121c2a] text-lg mb-3">Tentang Hotel</h3>
                <p className="text-[#434655] leading-relaxed">{hotel.description}</p>
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="font-semibold text-[#121c2a] text-lg mb-4">Fasilitas Hotel</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.facilities.map((f) => (
                    <div key={f} className="flex items-center gap-3 bg-[#eff4ff] rounded-xl px-4 py-3">
                      <div className="w-9 h-9 rounded-lg bg-[#e6eeff] flex items-center justify-center shrink-0 text-[#004ac6]">
                        {facilityIconMap[f] || <Coffee className="h-4 w-4" />}
                      </div>
                      <span className="text-sm font-medium text-[#121c2a]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="font-semibold text-[#121c2a] text-lg mb-4">Lokasi</h3>
                <div className="bg-[#eff4ff] rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-[#2563eb] mx-auto mb-2" />
                    <p className="text-sm text-[#434655]">{hotel.address}</p>
                    <p className="text-sm text-[#434655]">{hotel.city}, {hotel.province}</p>
                    <button className="mt-3 text-sm font-medium text-[#004ac6] hover:underline">
                      Buka di Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Quick room prices */}
            <div>
              <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
                <h3 className="font-semibold text-[#121c2a] mb-4">Pilih Kamar</h3>
                <div className="space-y-3">
                  {hotel.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="bg-[#eff4ff] rounded-xl p-4 hover:bg-[#e6eeff] transition cursor-pointer"
                      onClick={() => setActiveTab("rooms")}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-[#121c2a]">{room.name}</p>
                        <p className="font-bold text-[#004ac6] text-sm">{formatCurrency(room.basePrice)}</p>
                      </div>
                      <p className="text-xs text-[#434655]">
                        {room.maxOccupancy} tamu · {room.bedCount} {room.bedType} · {room.available} tersisa
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#e6eeff] mt-4 pt-4">
                  <p className="text-xs text-[#434655] text-center">Harga sudah termasuk pajak</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === "rooms" && (
          <div className="space-y-4">
            {hotel.rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Room image */}
                  <div className="relative w-full md:w-60 h-44 md:h-auto shrink-0">
                    <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                  </div>

                  {/* Room details */}
                  <div className="p-5 flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-[#121c2a] mb-1">{room.name}</h4>
                        <p className="text-sm text-[#434655] mb-3">{room.description}</p>

                        <div className="flex items-center gap-4 text-sm text-[#434655] mb-3">
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-[#2563eb]" /> {room.maxOccupancy} tamu
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Bed className="h-4 w-4 text-[#2563eb]" /> {room.bedCount} {room.bedType}
                          </span>
                        </div>

                        {/* Room facilities */}
                        <div className="flex flex-wrap gap-2">
                          {room.facilities.map((f) => (
                            <span
                              key={f}
                              className="inline-flex items-center gap-1.5 bg-[#eff4ff] text-[#434655] text-xs px-2.5 py-1 rounded-lg"
                            >
                              {roomFacilityIcons[f] || <Coffee className="h-3 w-3" />}
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 md:text-right shrink-0">
                        <div>
                          <p className="text-xl font-bold text-[#004ac6]">{formatCurrency(room.basePrice)}</p>
                          <p className="text-xs text-[#434655]">/malam</p>
                          <p className="text-xs text-green-600 font-medium mt-1">{room.available} kamar tersisa</p>
                        </div>
                        <Button
                          className="gradient-primary text-white rounded-xl px-6 h-11 font-semibold shadow-lg hover:opacity-90 transition"
                          onClick={() => router.push(`/bookings?hotel=${hotel.slug}&room=${room.id}`)}
                        >
                          Pesan
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-xl shadow-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar placeholder */}
                      <div className="w-10 h-10 rounded-full bg-[#e6eeff] flex items-center justify-center">
                        <span className="text-sm font-bold text-[#004ac6]">
                          {r.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#121c2a]">{r.userName}</p>
                        <p className="text-xs text-[#434655]">{r.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < r.rating ? "fill-[#784b00] text-[#784b00]" : "text-[#dee9fc]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#434655] leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>

            {/* Rating summary */}
            <div>
              <div className="bg-white rounded-xl shadow-card p-6 sticky top-24 text-center">
                <div className="text-5xl font-bold text-[#121c2a] mb-2">{hotel.avgRating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(hotel.avgRating)
                          ? "fill-[#784b00] text-[#784b00]"
                          : "text-[#dee9fc]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#434655]">{hotel.reviewCount} review</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Similar Hotels */}
      {similarHotels.length > 0 && (
        <section className="container mx-auto px-4 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#121c2a]">Hotel Serupa</h2>
              <p className="text-sm text-[#434655]">Rekomendasi lain di {hotel.city}</p>
            </div>
            <Link href={`/hotels?city=${hotel.city}`} className="text-sm font-medium text-[#004ac6] flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {similarHotels.map((h) => (
              <Link key={h.id} href={`/hotels/${h.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-ambient transition-shadow group">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={h.images[0]}
                      alt={h.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-0.5">
                      {Array.from({ length: h.starRating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#784b00] text-[#784b00]" />
                      ))}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#004ac6] rounded-lg px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white text-white" />
                      <span className="text-white text-xs font-semibold">{h.avgRating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#121c2a] mb-1 truncate">{h.name}</h3>
                    <p className="text-sm text-[#434655] flex items-center gap-1 mb-3">
                      <MapPin className="h-3.5 w-3.5 text-[#2563eb]" /> {h.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="bg-[#e6eeff] text-[#004ac6] text-xs font-medium px-2 py-0.5 rounded-lg">
                        {h.reviewCount} review
                      </span>
                      <div>
                        <p className="text-[#004ac6] font-bold text-right">
                          {formatCurrency(Math.min(...h.rooms.map((r) => r.basePrice)))}
                        </p>
                        <p className="text-xs text-[#434655] text-right">/malam</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="glass-strong border-t border-white/20">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#434655]">Mulai dari</p>
              <p className="text-xl font-bold text-[#004ac6]">
                {formatCurrency(lowestPrice)}
                <span className="text-sm font-normal text-[#434655]">/malam</span>
              </p>
            </div>
            <Button
              className="gradient-primary text-white rounded-xl px-8 h-12 font-semibold shadow-lg hover:opacity-90 transition"
              onClick={() => setActiveTab("rooms")}
            >
              Pilih Kamar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
