"use client";

import { useState } from "react";
import {
  Search,
  Star,
  MapPin,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { hotels, formatCurrency } from "@/data/dummy";

export default function AdminHotelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || (statusFilter === "featured" ? h.isFeatured : !h.isFeatured);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-[#f8f9ff] min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Hotel Management</h1>
          <p className="text-[#434655] mt-1">Kelola semua hotel di platform</p>
        </div>
        <Button className="bg-[#004ac6] hover:bg-[#003aaa] text-white rounded-xl">
          Tambah Hotel
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#121c2a]">{hotels.length}</p>
            <p className="text-xs text-[#434655] mt-0.5">Total Hotel</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#784b00]">{hotels.filter((h) => h.isFeatured).length}</p>
            <p className="text-xs text-[#434655] mt-0.5">Featured</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#004ac6]">{hotels.reduce((sum, h) => sum + h.rooms.length, 0)}</p>
            <p className="text-xs text-[#434655] mt-0.5">Total Tipe Kamar</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#784b00]">
              {(hotels.reduce((sum, h) => sum + h.avgRating, 0) / hotels.length).toFixed(1)}
            </p>
            <p className="text-xs text-[#434655] mt-0.5">Rating Rata-rata</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
          <Input
            placeholder="Cari hotel atau kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-white border-0 shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          {["all", "featured", "regular"].map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              size="sm"
              onClick={() => setStatusFilter(filter)}
              className={`rounded-xl ${
                statusFilter === filter
                  ? "bg-[#004ac6] text-white hover:bg-[#003aaa]"
                  : "bg-white text-[#434655] hover:bg-[#e6eeff]"
              }`}
            >
              {filter === "all" ? "Semua" : filter === "featured" ? "Featured" : "Regular"}
            </Button>
          ))}
        </div>
      </div>

      {/* Hotels Table */}
      <Card className="rounded-xl border-0 shadow-sm bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e6eeff]">
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Hotel</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Lokasi</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Partner</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Bintang</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Rating</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Kamar</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Harga Mulai</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Status</th>
                  <th className="text-right text-xs font-medium text-[#434655] p-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9ff]">
                {filteredHotels.map((hotel) => {
                  const minPrice = Math.min(...hotel.rooms.map((r) => r.basePrice));

                  return (
                    <tr key={hotel.id} className="hover:bg-[#eff4ff]/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <p className="text-sm font-medium text-[#121c2a]">{hotel.name}</p>
                            <p className="text-[10px] text-[#434655] truncate max-w-48">{hotel.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#434655]" />
                          <span className="text-sm text-[#121c2a]">{hotel.city}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-[#121c2a]">{hotel.partner.companyName}</p>
                        <Badge
                          className={`text-[10px] mt-0.5 rounded-lg border-0 ${
                            hotel.partner.status === "verified"
                              ? "bg-green-100 text-green-700"
                              : "bg-[#ffddb8] text-[#784b00]"
                          }`}
                        >
                          {hotel.partner.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: hotel.starRating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-[#784b00] fill-[#ffddb8]" />
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-[#784b00] fill-[#ffddb8]" />
                          <span className="text-sm font-medium text-[#121c2a]">{hotel.avgRating}</span>
                          <span className="text-[10px] text-[#434655]">({hotel.reviewCount})</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-[#121c2a]">{hotel.rooms.length} tipe</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-[#121c2a]">{formatCurrency(minPrice)}</span>
                      </td>
                      <td className="p-4">
                        {hotel.isFeatured ? (
                          <Badge className="bg-[#ffddb8] text-[#784b00] border-0 text-xs rounded-lg">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        ) : (
                          <Badge className="bg-[#e6eeff] text-[#004ac6] border-0 text-xs rounded-lg">Active</Badge>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-8 rounded-lg hover:bg-[#e6eeff]">
                            <Eye className="h-4 w-4 text-[#434655]" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 rounded-lg hover:bg-[#e6eeff]">
                            <Edit className="h-4 w-4 text-[#004ac6]" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-[#ba1a1a] hover:text-red-700 hover:bg-[#ffdad6] rounded-lg">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
