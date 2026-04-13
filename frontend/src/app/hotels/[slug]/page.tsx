"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Clock, Users, Bed, Wifi, Car, Coffee, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hotels, reviews, formatCurrency } from "@/data/dummy";

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const hotel = hotels.find((h) => h.slug === params.slug);
  const [imgIdx, setImgIdx] = useState(0);

  if (!hotel) return <div className="container mx-auto px-4 py-16 text-center">Hotel tidak ditemukan.</div>;

  const nextImg = () => setImgIdx((i) => (i + 1) % hotel.images.length);
  const prevImg = () => setImgIdx((i) => (i - 1 + hotel.images.length) % hotel.images.length);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: hotel.starRating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
      <p className="text-slate-500 flex items-center gap-1 mb-6">
        <MapPin className="h-4 w-4" /> {hotel.address}
      </p>

      {/* Gallery */}
      <div className="relative rounded-xl overflow-hidden h-[400px] mb-8 bg-slate-100">
        <Image src={hotel.images[imgIdx]} alt={hotel.name} fill className="object-cover" />
        {hotel.images.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {imgIdx + 1} / {hotel.images.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Info */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Informasi</TabsTrigger>
              <TabsTrigger value="rooms">Kamar</TabsTrigger>
              <TabsTrigger value="reviews">Review ({hotel.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-4 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Tentang Hotel</h3>
                <p className="text-slate-600 leading-relaxed">{hotel.description}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3">Fasilitas</h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.facilities.map((f) => (
                    <Badge key={f} variant="secondary" className="px-3 py-1">{f}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-slate-500">Check-in</p>
                    <p className="font-medium">{hotel.checkInTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-slate-500">Check-out</p>
                    <p className="font-medium">{hotel.checkOutTime}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="mt-4 space-y-4">
              {hotel.rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-56 h-40 md:h-auto shrink-0">
                      <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-5 flex-1">
                      <h4 className="font-bold text-lg mb-1">{room.name}</h4>
                      <p className="text-sm text-slate-500 mb-2">{room.description}</p>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {room.maxOccupancy} tamu</span>
                        <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {room.bedCount} {room.bedType}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {room.facilities.map((f) => (
                          <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{formatCurrency(room.basePrice)}</p>
                          <p className="text-xs text-slate-400">/malam</p>
                          <p className="text-xs text-green-600">{room.available} kamar tersisa</p>
                        </div>
                        <Button onClick={() => router.push(`/bookings?hotel=${hotel.slug}&room=${room.id}`)}>
                          Pilih Kamar
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="mt-4 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl font-bold">{hotel.avgRating}</div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(hotel.avgRating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">{hotel.reviewCount} review</p>
                </div>
              </div>
              {reviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{r.userName}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{r.comment}</p>
                    <p className="text-xs text-slate-400 mt-2">{r.createdAt}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right - Booking Card */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Pesan Kamar</h3>
              <div className="space-y-3 mb-4">
                {hotel.rooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-3 rounded-lg border hover:border-blue-300 transition cursor-pointer" onClick={() => router.push(`/bookings?hotel=${hotel.slug}&room=${room.id}`)}>
                    <div>
                      <p className="font-medium text-sm">{room.name}</p>
                      <p className="text-xs text-slate-500">{room.maxOccupancy} tamu · {room.bedType}</p>
                    </div>
                    <p className="font-bold text-blue-600 text-sm">{formatCurrency(room.basePrice)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="text-xs text-slate-400 text-center">Harga sudah termasuk pajak</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
