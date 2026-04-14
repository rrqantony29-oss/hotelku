"use client";

import { useState } from "react";
import {
  Search,
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
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
import { Separator } from "@/components/ui/separator";
import { formatCurrency, partnerRecentBookings, PartnerBooking } from "@/data/partner-dummy";

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  confirmed: { label: "Dikonfirmasi", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  checked_in: { label: "Check In", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  checked_out: { label: "Selesai", color: "bg-[#e6eeff] text-[#434655]", icon: CheckCircle },
  cancelled: { label: "Dibatalkan", color: "bg-[#ffdad6] text-[#ba1a1a]", icon: XCircle },
};

const paymentConfig: Record<string, { label: string; color: string }> = {
  paid: { label: "Lunas", color: "bg-green-100 text-green-700" },
  pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  failed: { label: "Gagal", color: "bg-[#ffdad6] text-[#ba1a1a]" },
  refunded: { label: "Refund", color: "bg-purple-100 text-purple-700" },
};

const tabs: { value: string; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "checked_in", label: "Check-in" },
  { value: "checked_out", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export default function PartnerBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings = partnerRecentBookings
    .filter((b) => {
      const matchesSearch =
        b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || b.status === activeTab;
      return matchesSearch && matchesTab;
    });

  const tabCounts = {
    all: partnerRecentBookings.length,
    pending: partnerRecentBookings.filter((b) => b.status === "pending").length,
    confirmed: partnerRecentBookings.filter((b) => b.status === "confirmed").length,
    checked_in: partnerRecentBookings.filter((b) => b.status === "checked_in").length,
    checked_out: partnerRecentBookings.filter((b) => b.status === "checked_out").length,
    cancelled: partnerRecentBookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Booking Masuk</h1>
          <p className="text-[#434655] mt-1">Kelola reservasi dari customer</p>
        </div>
        <Button variant="outline" className="rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{tabCounts.pending}</p>
            <p className="text-xs text-[#434655] mt-0.5">Perlu Konfirmasi</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{tabCounts.confirmed}</p>
            <p className="text-xs text-[#434655] mt-0.5">Terkonfirmasi</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#2563eb]">{tabCounts.checked_in}</p>
            <p className="text-xs text-[#434655] mt-0.5">Sedang Menginap</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#434655]">{tabCounts.checked_out}</p>
            <p className="text-xs text-[#434655] mt-0.5">Selesai</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
        <Input
          placeholder="Cari nama tamu atau kode booking..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl bg-[#f8f9ff] border-0 focus-visible:ring-[#2563eb]"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-[#eff4ff] rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.value
                ? "bg-[#ffffff] text-[#2563eb] shadow-sm"
                : "text-[#434655] hover:text-[#121c2a]"
            }`}
          >
            {tab.label} ({tabCounts[tab.value as keyof typeof tabCounts]})
          </button>
        ))}
      </div>

      {/* Booking List */}
      <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eff4ff]">
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Kode</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Tamu</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Kamar</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Tanggal</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Total</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Pembayaran</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Status</th>
                  <th className="text-right text-xs font-medium text-[#434655] p-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9ff]">
                {filteredBookings.map((booking) => {
                  const status = statusConfig[booking.status];
                  const payment = paymentConfig[booking.paymentStatus];
                  const StatusIcon = status.icon;

                  return (
                    <tr key={booking.id} className="hover:bg-[#f8f9ff]">
                      <td className="p-4">
                        <span className="text-sm font-mono font-medium text-[#2563eb]">
                          {booking.code}
                        </span>
                        <p className="text-[10px] text-[#434655] mt-0.5">{booking.createdAt.split("T")[0]}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-[#121c2a]">{booking.guestName}</p>
                        <p className="text-xs text-[#434655]">{booking.guestEmail}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-[#121c2a]">{booking.roomName}</p>
                        <p className="text-xs text-[#434655]">{booking.nights} malam x {booking.roomCount} kamar</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-[#121c2a]">{booking.checkIn}</p>
                        <p className="text-xs text-[#434655]">s/d {booking.checkOut}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-[#121c2a]">
                          {formatCurrency(booking.total)}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge className={`${payment.color} border-0 text-xs`}>
                          {payment.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={`${status.color} border-0 text-xs font-medium`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" variant="ghost" className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50" title="Konfirmasi">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 text-[#ba1a1a] hover:bg-[#ffdad6]" title="Tolak">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <Button size="sm" variant="ghost" className="h-8 text-[#2563eb] hover:text-[#004ac6] hover:bg-[#eff4ff]" title="Check-in">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {booking.status === "checked_in" && (
                            <Button size="sm" variant="ghost" className="h-8 text-[#434655] hover:bg-[#e6eeff]" title="Check-out">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger>
                              <Button size="sm" variant="ghost" className="h-8 hover:bg-[#eff4ff]">
                                <Eye className="h-4 w-4 text-[#434655]" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg rounded-xl">
                              <DialogHeader>
                                <DialogTitle className="text-[#121c2a]">Detail Booking: {booking.code}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {/* Guest Info */}
                                <div>
                                  <h4 className="text-xs font-semibold text-[#434655] uppercase mb-2">Data Tamu</h4>
                                  <div className="bg-[#f8f9ff] rounded-xl p-4 space-y-2">
                                    <p className="text-sm font-medium text-[#121c2a]">{booking.guestName}</p>
                                    <div className="flex items-center gap-2 text-sm text-[#434655]">
                                      <Mail className="h-3.5 w-3.5" />
                                      {booking.guestEmail}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#434655]">
                                      <Phone className="h-3.5 w-3.5" />
                                      {booking.guestPhone}
                                    </div>
                                  </div>
                                </div>

                                {/* Booking Details */}
                                <div>
                                  <h4 className="text-xs font-semibold text-[#434655] uppercase mb-2">Detail Reservasi</h4>
                                  <div className="bg-[#f8f9ff] rounded-xl p-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Kamar</span>
                                      <span className="font-medium text-[#121c2a]">{booking.roomName}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Check-in</span>
                                      <span className="font-medium text-[#121c2a]">{booking.checkIn}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Check-out</span>
                                      <span className="font-medium text-[#121c2a]">{booking.checkOut}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Durasi</span>
                                      <span className="font-medium text-[#121c2a]">{booking.nights} malam</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Jumlah Kamar</span>
                                      <span className="font-medium text-[#121c2a]">{booking.roomCount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Jumlah Tamu</span>
                                      <span className="font-medium text-[#121c2a]">{booking.guestCount}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Payment */}
                                <div>
                                  <h4 className="text-xs font-semibold text-[#434655] uppercase mb-2">Pembayaran</h4>
                                  <div className="bg-[#f8f9ff] rounded-xl p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Harga per malam</span>
                                      <span className="text-[#121c2a]">{formatCurrency(booking.pricePerNight)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Subtotal</span>
                                      <span className="text-[#121c2a]">{formatCurrency(booking.pricePerNight * booking.nights * booking.roomCount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-[#434655]">Pajak (11%)</span>
                                      <span className="text-[#121c2a]">{formatCurrency(booking.total - booking.pricePerNight * booking.nights * booking.roomCount)}</span>
                                    </div>
                                    <Separator className="my-2 bg-[#dee9fc]" />
                                    <div className="flex justify-between">
                                      <span className="text-sm font-semibold text-[#121c2a]">Total</span>
                                      <span className="text-sm font-bold text-[#2563eb]">{formatCurrency(booking.total)}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                  {booking.status === "pending" && (
                                    <>
                                      <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl">
                                        <CheckCircle className="h-4 w-4 mr-1.5" />
                                        Konfirmasi
                                      </Button>
                                      <Button variant="outline" className="flex-1 rounded-xl text-[#ba1a1a] hover:text-[#ba1a1a] hover:bg-[#ffdad6] border-[#e6eeff]">
                                        <XCircle className="h-4 w-4 mr-1.5" />
                                        Tolak
                                      </Button>
                                    </>
                                  )}
                                  {booking.status === "confirmed" && (
                                    <Button className="flex-1 bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
                                      <CheckCircle className="h-4 w-4 mr-1.5" />
                                      Check-in Tamu
                                    </Button>
                                  )}
                                  {booking.status === "checked_in" && (
                                    <Button className="flex-1 rounded-xl" variant="outline">
                                      <CheckCircle className="h-4 w-4 mr-1.5" />
                                      Check-out Tamu
                                    </Button>
                                  )}
                                  <Button variant="outline" className="flex-1 rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
                                    <MessageSquare className="h-4 w-4 mr-1.5" />
                                    Hubungi
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="py-16 text-center">
              <CalendarCheck className="h-12 w-12 text-[#dee9fc] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#121c2a]">Tidak ada booking</h3>
              <p className="text-sm text-[#434655] mt-1">
                {searchQuery ? "Coba kata kunci lain" : "Belum ada booking masuk untuk filter ini"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
