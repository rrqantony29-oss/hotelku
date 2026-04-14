"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  DollarSign,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/data/admin-dummy";
import { partnerRecentBookings, PartnerBooking } from "@/data/partner-dummy";

interface AdminBooking extends PartnerBooking {
  hotelName: string;
  commission: number;
}

const adminBookings: AdminBooking[] = partnerRecentBookings.map((b) => ({
  ...b,
  commission: Math.round(b.total * 0.1),
}));

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  paid: { label: "Paid", color: "bg-green-100 text-green-700" },
  pending: { label: "Pending", color: "bg-[#ffddb8] text-[#784b00]" },
  failed: { label: "Failed", color: "bg-[#ffdad6] text-[#ba1a1a]" },
  refunded: { label: "Refunded", color: "bg-purple-100 text-purple-700" },
};

const bookingStatusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-[#ffddb8] text-[#784b00]", icon: Clock },
  checked_in: { label: "Checked In", color: "bg-[#eff4ff] text-[#004ac6]", icon: CheckCircle },
  checked_out: { label: "Checked Out", color: "bg-[#d9e3f6] text-[#434655]", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-[#ffdad6] text-[#ba1a1a]", icon: XCircle },
};

export default function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings = adminBookings.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || b.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabCounts = {
    all: adminBookings.length,
    pending: adminBookings.filter((b) => b.status === "pending").length,
    confirmed: adminBookings.filter((b) => b.status === "confirmed").length,
    checked_in: adminBookings.filter((b) => b.status === "checked_in").length,
    checked_out: adminBookings.filter((b) => b.status === "checked_out").length,
    cancelled: adminBookings.filter((b) => b.status === "cancelled").length,
  };

  const totalGMV = adminBookings.reduce((sum, b) => sum + b.total, 0);
  const totalCommission = adminBookings.reduce((sum, b) => sum + b.commission, 0);

  return (
    <div className="p-6 space-y-6 bg-[#f8f9ff] min-h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#121c2a]">Booking Management</h1>
        <p className="text-[#434655] mt-1">Monitor dan kelola semua booking di platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#121c2a]">{adminBookings.length}</p>
            <p className="text-xs text-[#434655] mt-0.5">Total Booking</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-bold text-[#004ac6]">{formatCurrency(totalGMV)}</p>
            <p className="text-xs text-[#434655] mt-0.5">Total GMV</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-bold text-green-600">{formatCurrency(totalCommission)}</p>
            <p className="text-xs text-[#434655] mt-0.5">Total Komisi</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#ba1a1a]">{tabCounts.cancelled}</p>
            <p className="text-xs text-[#434655] mt-0.5">Dibatalkan</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
        <Input
          placeholder="Cari kode booking atau nama tamu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl bg-white border-0 shadow-sm"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#e6eeff] rounded-xl flex-wrap">
          <TabsTrigger value="all" className="text-sm rounded-lg data-[active]:bg-white">Semua ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="pending" className="text-sm rounded-lg data-[active]:bg-white">Pending ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value="confirmed" className="text-sm rounded-lg data-[active]:bg-white">Confirmed ({tabCounts.confirmed})</TabsTrigger>
          <TabsTrigger value="checked_in" className="text-sm rounded-lg data-[active]:bg-white">Checked In ({tabCounts.checked_in})</TabsTrigger>
          <TabsTrigger value="cancelled" className="text-sm rounded-lg data-[active]:bg-white">Cancelled ({tabCounts.cancelled})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card className="rounded-xl border-0 shadow-sm bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e6eeff]">
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Kode</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Tamu</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Hotel</th>
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
                      const bStatus = bookingStatusConfig[booking.status];
                      const pStatus = paymentStatusConfig[booking.paymentStatus];
                      const StatusIcon = bStatus.icon;

                      return (
                        <tr key={booking.id} className="hover:bg-[#eff4ff]/50">
                          <td className="p-4">
                            <span className="text-sm font-mono font-medium text-[#004ac6]">{booking.code}</span>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-medium text-[#121c2a]">{booking.guestName}</p>
                            <p className="text-xs text-[#434655]">{booking.guestEmail}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-[#121c2a]">{booking.hotelName}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-[#121c2a]">{booking.roomName}</p>
                            <p className="text-xs text-[#434655]">{booking.nights} malam</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-[#121c2a]">{booking.checkIn}</p>
                            <p className="text-xs text-[#434655]">s/d {booking.checkOut}</p>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-semibold text-[#121c2a]">{formatCurrency(booking.total)}</span>
                            <p className="text-[10px] text-green-600">Komisi: {formatCurrency(booking.commission)}</p>
                          </td>
                          <td className="p-4">
                            <Badge className={`${pStatus.color} border-0 text-xs font-medium rounded-lg`}>
                              <CreditCard className="h-3 w-3 mr-1" />
                              {pStatus.label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={`${bStatus.color} border-0 text-xs font-medium rounded-lg`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {bStatus.label}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button size="sm" variant="ghost" className="h-8 rounded-lg hover:bg-[#e6eeff]">
                              <Eye className="h-4 w-4 text-[#004ac6]" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
