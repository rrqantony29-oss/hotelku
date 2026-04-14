"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Bed,
  Star,
  MapPin,
  DollarSign,
  Users,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Settings,
  Calendar,
  MoreVertical,
  Grid3X3,
  List,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency, partnerHotels, partnerRooms, PartnerRoom } from "@/data/partner-dummy";

type StatusFilter = "all" | "active" | "draft" | "suspended";
type ViewMode = "grid" | "list";

export default function PartnerHotelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [expandedHotel, setExpandedHotel] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<PartnerRoom | null>(null);

  const filteredHotels = partnerHotels.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusFilters: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "Semua" },
    { value: "active", label: "Aktif" },
    { value: "draft", label: "Draft" },
    { value: "suspended", label: "Ditangguhkan" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Properti Saya</h1>
          <p className="text-[#434655] mt-1">Kelola hotel dan kamar Anda</p>
        </div>
        <Button className="bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Properti
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
          <Input
            placeholder="Cari properti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-[#f8f9ff] border-0 focus-visible:ring-[#2563eb]"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#eff4ff] rounded-xl p-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  statusFilter === f.value
                    ? "bg-[#ffffff] text-[#2563eb] shadow-sm"
                    : "text-[#434655] hover:text-[#121c2a]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-[#eff4ff] rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#ffffff] shadow-sm" : ""}`}
            >
              <Grid3X3 className={`h-4 w-4 ${viewMode === "grid" ? "text-[#2563eb]" : "text-[#434655]"}`} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#ffffff] shadow-sm" : ""}`}
            >
              <List className={`h-4 w-4 ${viewMode === "list" ? "text-[#2563eb]" : "text-[#434655]"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredHotels.map((hotel) => {
            const hotelRooms = partnerRooms.filter((r) => r.hotelId === hotel.id);
            return (
              <Card key={hotel.id} className="border-0 shadow-sm bg-[#ffffff] rounded-xl overflow-hidden group">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={hotel.status === "active" ? "bg-green-100 text-green-700 border-0 shadow-sm" : "bg-[#ffddb8] text-[#784b00] border-0 shadow-sm"}>
                      {hotel.status === "active" ? "Aktif" : "Draft"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-[#ffffff]/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-[#121c2a]">{hotel.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#121c2a] line-clamp-1">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#434655] mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {hotel.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Bed className="h-3.5 w-3.5 text-[#434655]" />
                      <span className="text-xs text-[#434655]">{hotelRooms.length} tipe kamar</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-[#434655]" />
                      <span className="text-xs text-[#434655]">{hotel.bookings} booking</span>
                    </div>
                  </div>
                  {/* Mini room list */}
                  <div className="space-y-1.5">
                    {hotelRooms.slice(0, 2).map((room) => (
                      <div key={room.id} className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff]">
                        <div>
                          <p className="text-xs font-medium text-[#121c2a]">{room.name}</p>
                          <p className="text-[10px] text-[#434655]">{room.available}/{room.totalRooms} tersedia</p>
                        </div>
                        <span className="text-xs font-semibold text-[#2563eb]">
                          {formatCurrency(room.basePrice)}
                        </span>
                      </div>
                    ))}
                    {hotelRooms.length > 2 && (
                      <p className="text-[10px] text-[#434655] text-center">+{hotelRooms.length - 2} lainnya</p>
                    )}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff] hover:text-[#121c2a]">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Lihat
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff] hover:text-[#121c2a]">
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl border-[#e6eeff] text-[#ba1a1a] hover:bg-[#ffdad6] hover:text-[#ba1a1a]">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredHotels.map((hotel) => {
            const hotelRooms = partnerRooms.filter((r) => r.hotelId === hotel.id);
            const isExpanded = expandedHotel === hotel.id;

            return (
              <Card key={hotel.id} className="border-0 shadow-sm bg-[#ffffff] rounded-xl overflow-hidden">
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-[#f8f9ff] transition-colors"
                  onClick={() => setExpandedHotel(isExpanded ? null : hotel.id)}
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-semibold text-[#121c2a]">{hotel.name}</h2>
                        <div className="flex items-center gap-1 text-sm text-[#434655] mt-0.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {hotel.city}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={hotel.status === "active" ? "bg-green-100 text-green-700 border-0" : "bg-[#ffddb8] text-[#784b00] border-0"}>
                          {hotel.status === "active" ? "Aktif" : "Draft"}
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-[#434655]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#434655]" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-[#121c2a]">{hotel.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-[#434655]" />
                        <span className="text-sm text-[#434655]">{hotelRooms.length} tipe kamar</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-[#434655]" />
                        <span className="text-sm text-[#434655]">{hotel.bookings} booking</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#eff4ff]">
                    <div className="px-5 pb-5 pt-4 space-y-4">
                      {/* Rooms */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-[#121c2a]">Tipe Kamar ({hotelRooms.length})</h3>
                          <Button size="sm" variant="outline" className="rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
                            <Plus className="h-3.5 w-3.5 mr-1" />
                            Tambah Kamar
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {hotelRooms.map((room) => (
                            <div key={room.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-semibold text-[#121c2a]">{room.name}</h4>
                                  <Badge className={room.status === "active" ? "bg-green-50 text-green-700 border-0 text-[10px]" : "bg-[#e6eeff] text-[#434655] border-0 text-[10px]"}>
                                    {room.status === "active" ? "Aktif" : "Nonaktif"}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3 text-[#434655]" />
                                    <span className="text-xs text-[#434655]">
                                      {formatCurrency(room.basePrice)}/malam
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 text-[#434655]" />
                                    <span className="text-xs text-[#434655]">
                                      Weekend: {formatCurrency(room.weekendPrice)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3 text-[#434655]" />
                                    <span className="text-xs text-[#434655]">Max {room.maxOccupancy} tamu</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Bed className="h-3 w-3 text-[#434655]" />
                                    <span className="text-xs text-[#434655]">{room.bedCount} {room.bedType}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-[#434655]">
                                    Kamar: {room.available}/{room.totalRooms} tersedia
                                  </span>
                                  <div className="flex-1 max-w-24 h-1.5 bg-[#dee9fc] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-green-500 rounded-full"
                                      style={{ width: `${(room.available / room.totalRooms) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <Dialog>
                                  <DialogTrigger>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-[#eff4ff]" onClick={() => setSelectedRoom(room)}>
                                      <Eye className="h-4 w-4 text-[#434655]" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md rounded-xl">
                                    <DialogHeader>
                                      <DialogTitle className="text-[#121c2a]">Detail Kamar: {room.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p className="text-sm text-[#434655]">{room.description}</p>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-[#f8f9ff] rounded-xl p-3">
                                          <p className="text-xs text-[#434655]">Harga Dasar</p>
                                          <p className="text-sm font-semibold text-[#121c2a]">{formatCurrency(room.basePrice)}</p>
                                        </div>
                                        <div className="bg-[#f8f9ff] rounded-xl p-3">
                                          <p className="text-xs text-[#434655]">Harga Weekend</p>
                                          <p className="text-sm font-semibold text-[#121c2a]">{formatCurrency(room.weekendPrice)}</p>
                                        </div>
                                        <div className="bg-[#f8f9ff] rounded-xl p-3">
                                          <p className="text-xs text-[#434655]">Kapasitas</p>
                                          <p className="text-sm font-semibold text-[#121c2a]">{room.maxOccupancy} tamu</p>
                                        </div>
                                        <div className="bg-[#f8f9ff] rounded-xl p-3">
                                          <p className="text-xs text-[#434655]">Tempat Tidur</p>
                                          <p className="text-sm font-semibold text-[#121c2a]">{room.bedCount} {room.bedType}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-xs text-[#434655] mb-2">Fasilitas Kamar</p>
                                        <div className="flex flex-wrap gap-1.5">
                                          {room.facilities.map((f) => (
                                            <Badge key={f} className="bg-[#e6eeff] text-[#2563eb] border-0 text-[10px]">
                                              {f}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button variant="outline" className="flex-1 rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
                                          <Edit className="h-3.5 w-3.5 mr-1.5" />
                                          Edit
                                        </Button>
                                        <Button variant="outline" className="flex-1 rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
                                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                          Kalender
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-[#eff4ff]">
                                  <Edit className="h-4 w-4 text-[#434655]" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
                          <Edit className="h-3.5 w-3.5 mr-1.5" />
                          Edit Properti
                        </Button>
                        <Button variant="outline" className="rounded-xl border-[#e6eeff] text-[#ba1a1a] hover:bg-[#ffdad6] hover:text-[#ba1a1a]">
                          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {filteredHotels.length === 0 && (
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="py-16 text-center">
            <Bed className="h-12 w-12 text-[#dee9fc] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#121c2a]">Belum ada properti</h3>
            <p className="text-sm text-[#434655] mt-1">Tambahkan properti pertama Anda untuk mulai menerima booking</p>
            <Button className="mt-4 bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Properti
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
