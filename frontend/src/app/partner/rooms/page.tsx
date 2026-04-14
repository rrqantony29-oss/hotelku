"use client";

import { useState } from "react";
import {
  Plus,
  Bed,
  DollarSign,
  Users,
  Calendar,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency, partnerHotels, partnerRooms, PartnerRoom } from "@/data/partner-dummy";

export default function PartnerRoomsPage() {
  const [selectedHotelId, setSelectedHotelId] = useState<number>(partnerHotels[0]?.id || 1);
  const [showAddForm, setShowAddForm] = useState(false);

  const hotelRooms = partnerRooms.filter((r) => r.hotelId === selectedHotelId);
  const selectedHotel = partnerHotels.find((h) => h.id === selectedHotelId);

  const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Kelola Kamar</h1>
          <p className="text-[#434655] mt-1">Atur tipe kamar, harga, dan ketersediaan</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Tipe Kamar
        </Button>
      </div>

      {/* Hotel Selector */}
      <div className="relative max-w-sm">
        <Label className="text-xs font-medium text-[#434655] mb-1.5 block">Pilih Properti</Label>
        <div className="relative">
          <select
            value={selectedHotelId}
            onChange={(e) => setSelectedHotelId(Number(e.target.value))}
            className="w-full appearance-none rounded-xl bg-[#f8f9ff] border-0 px-4 py-2.5 text-sm text-[#121c2a] focus:outline-none focus:ring-2 focus:ring-[#2563eb] pr-10"
          >
            {partnerHotels.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655] pointer-events-none" />
        </div>
      </div>

      {/* Inline Add Form */}
      {showAddForm && (
        <Card className="border-0 shadow-sm bg-[#eff4ff] rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Tambah Tipe Kamar Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Nama Kamar</Label>
                <Input placeholder="Contoh: Presidential Suite" className="rounded-xl bg-[#ffffff] border-0 focus-visible:ring-[#2563eb]" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Tipe Tempat Tidur</Label>
                <Input placeholder="King / Queen / Twin" className="rounded-xl bg-[#ffffff] border-0 focus-visible:ring-[#2563eb]" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Jumlah Tempat Tidur</Label>
                <Input type="number" placeholder="1" className="rounded-xl bg-[#ffffff] border-0 focus-visible:ring-[#2563eb]" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Harga Dasar (per malam)</Label>
                <Input type="number" placeholder="750000" className="rounded-xl bg-[#ffffff] border-0 focus-visible:ring-[#2563eb]" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Harga Weekend</Label>
                <Input type="number" placeholder="850000" className="rounded-xl bg-[#ffffff] border-0 focus-visible:ring-[#2563eb]" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Maks Tamu</Label>
                <Input type="number" placeholder="2" className="rounded-xl bg-[#ffffff] border-0 focus-visible:ring-[#2563eb]" />
              </div>
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Total Kamar</Label>
                <Input type="number" placeholder="10" className="rounded-xl bg-[#ffffff] border-0 focus-visible:ring-[#2563eb]" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">Simpan</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#ffffff]">Batal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Room Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hotelRooms.map((room) => (
          <Card key={room.id} className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[#121c2a]">{room.name}</h3>
                  <p className="text-xs text-[#434655] mt-0.5 line-clamp-1">{room.description}</p>
                </div>
                <button className="text-[#434655] hover:text-[#121c2a] transition-colors">
                  {room.status === "active" ? (
                    <ToggleRight className="h-6 w-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-[#434655]" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f8f9ff] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <DollarSign className="h-3 w-3 text-[#434655]" />
                    <span className="text-[10px] text-[#434655]">Harga Dasar</span>
                  </div>
                  <p className="text-sm font-semibold text-[#121c2a]">{formatCurrency(room.basePrice)}</p>
                </div>
                <div className="bg-[#f8f9ff] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Calendar className="h-3 w-3 text-[#434655]" />
                    <span className="text-[10px] text-[#434655]">Harga Weekend</span>
                  </div>
                  <p className="text-sm font-semibold text-[#121c2a]">{formatCurrency(room.weekendPrice)}</p>
                </div>
                <div className="bg-[#f8f9ff] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users className="h-3 w-3 text-[#434655]" />
                    <span className="text-[10px] text-[#434655]">Maks Tamu</span>
                  </div>
                  <p className="text-sm font-semibold text-[#121c2a]">{room.maxOccupancy} tamu</p>
                </div>
                <div className="bg-[#f8f9ff] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Bed className="h-3 w-3 text-[#434655]" />
                    <span className="text-[10px] text-[#434655]">Tempat Tidur</span>
                  </div>
                  <p className="text-sm font-semibold text-[#121c2a]">{room.bedCount} {room.bedType}</p>
                </div>
              </div>

              {/* Availability */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#434655]">Ketersediaan</span>
                  <Badge className={room.status === "active" ? "bg-green-100 text-green-700 border-0 text-[10px]" : "bg-[#e6eeff] text-[#434655] border-0 text-[10px]"}>
                    {room.available}/{room.totalRooms} tersedia
                  </Badge>
                </div>
                <div className="h-2 bg-[#e6eeff] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2563eb] to-[#004ac6] rounded-full"
                    style={{ width: `${(room.available / room.totalRooms) * 100}%` }}
                  />
                </div>
              </div>

              {/* Facilities */}
              <div className="flex flex-wrap gap-1">
                {room.facilities.slice(0, 4).map((f) => (
                  <Badge key={f} className="bg-[#e6eeff] text-[#2563eb] border-0 text-[10px]">{f}</Badge>
                ))}
                {room.facilities.length > 4 && (
                  <Badge className="bg-[#e6eeff] text-[#434655] border-0 text-[10px]">+{room.facilities.length - 4}</Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1 rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl border-[#e6eeff] text-[#ba1a1a] hover:bg-[#ffdad6] hover:text-[#ba1a1a]">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State Card */}
        <Card className="border-0 shadow-sm bg-[#f8f9ff] rounded-xl border-2 border-dashed border-[#dee9fc]">
          <CardContent className="flex flex-col items-center justify-center py-12 cursor-pointer hover:bg-[#eff4ff] transition-colors" onClick={() => setShowAddForm(true)}>
            <div className="w-12 h-12 rounded-xl bg-[#e6eeff] flex items-center justify-center mb-3">
              <Plus className="h-6 w-6 text-[#2563eb]" />
            </div>
            <p className="text-sm font-medium text-[#121c2a]">Tambah Tipe Kamar</p>
            <p className="text-xs text-[#434655] mt-0.5">Klik untuk menambah tipe kamar baru</p>
          </CardContent>
        </Card>
      </div>

      {/* Availability Calendar Placeholder */}
      <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Kalender Ketersediaan - April 2026</CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-green-400" />
                <span className="text-[10px] text-[#434655]">Tersedia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#ba1a1a]" />
                <span className="text-[10px] text-[#434655]">Penuh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#ffddb8]" />
                <span className="text-[10px] text-[#434655]">Sebagian</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-[#434655] pb-2 pr-3 min-w-[120px]">Kamar</th>
                  {calendarDays.map((d) => (
                    <th key={d} className="text-center text-[10px] font-medium text-[#434655] pb-2 w-10">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hotelRooms.map((room) => (
                  <tr key={room.id}>
                    <td className="text-xs font-medium text-[#121c2a] py-1 pr-3">{room.name}</td>
                    {calendarDays.map((d) => {
                      const ratio = room.available / room.totalRooms;
                      let bg = "bg-green-100 hover:bg-green-200";
                      if (d <= 5) bg = "bg-[#ffdad6] hover:bg-red-100";
                      else if (ratio < 0.3) bg = "bg-[#ffddb8] hover:bg-orange-200";
                      else if (ratio < 0.6) bg = "bg-yellow-100 hover:bg-yellow-200";
                      return (
                        <td key={d} className="py-1 px-0.5">
                          <div className={`w-9 h-7 rounded-md cursor-pointer transition-colors ${bg}`} title={`${d} Apr`} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
