"use client";

import {
  TrendingUp,
  TrendingDown,
  CalendarCheck,
  DollarSign,
  Bed,
  Hotel,
  Star,
  ArrowUpRight,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/data/dummy";
import {
  partnerStats,
  partnerRecentBookings,
  partnerMonthlyRevenue,
  partnerHotels,
} from "@/data/partner-dummy";
import Link from "next/link";

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  confirmed: { label: "Dikonfirmasi", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  checked_in: { label: "Check In", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  checked_out: { label: "Selesai", color: "bg-slate-100 text-slate-700", icon: CheckCircle },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function PartnerDashboardPage() {
  const stats = [
    {
      title: "Total Properti",
      value: partnerStats.totalHotels,
      change: "+1",
      trend: "up",
      icon: Hotel,
      color: "bg-[#e6eeff] text-[#2563eb]",
    },
    {
      title: "Total Booking",
      value: partnerStats.totalBookings,
      change: "+12%",
      trend: "up",
      icon: CalendarCheck,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pendapatan Bulan Ini",
      value: formatCurrency(partnerStats.monthlyRevenue),
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "bg-[#ffddb8] text-[#784b00]",
    },
    {
      title: "Tingkat Hunian",
      value: `${partnerStats.occupancyRate}%`,
      change: "-2%",
      trend: "down",
      icon: Bed,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const maxRevenue = Math.max(...partnerMonthlyRevenue.map((m) => m.revenue));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Dashboard</h1>
          <p className="text-[#434655] mt-1">Selamat datang kembali, Budi Santoso</p>
        </div>
        <Link href="/partner/hotels">
          <Button className="bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Properti
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-[#ba1a1a]"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-[#121c2a]">{stat.value}</p>
                <p className="text-sm text-[#434655] mt-0.5">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <Card className="lg:col-span-2 border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Pendapatan Bulanan</CardTitle>
            <Badge className="bg-[#e6eeff] text-[#2563eb] border-0 text-xs">2026</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {partnerMonthlyRevenue.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#434655] font-medium">
                    {month.revenue > 0 ? `${(month.revenue / 1000000).toFixed(0)}jt` : "-"}
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#2563eb] to-[#004ac6] transition-all hover:opacity-80"
                    style={{ height: month.revenue > 0 ? `${(month.revenue / maxRevenue) * 100}%` : "8px", minHeight: "8px" }}
                  />
                  <span className="text-[10px] text-[#434655]">{month.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/partner/hotels" className="block">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center">
                  <Bed className="h-5 w-5 text-[#2563eb]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#121c2a]">Kelola Kamar</p>
                  <p className="text-xs text-[#434655]">Update harga & ketersediaan</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#434655]" />
              </div>
            </Link>
            <Link href="/partner/bookings" className="block">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <CalendarCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#121c2a]">Booking Masuk</p>
                  <p className="text-xs text-[#434655]">{partnerStats.pendingBookings} menunggu konfirmasi</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#434655]" />
              </div>
            </Link>
            <Link href="/partner/reports" className="block">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#121c2a]">Lihat Laporan</p>
                  <p className="text-xs text-[#434655]">Analisis performa hotel</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#434655]" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings Table */}
      <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-[#121c2a]">Booking Terbaru</CardTitle>
          <Link href="/partner/bookings">
            <Button variant="ghost" size="sm" className="text-[#2563eb] hover:text-[#004ac6] hover:bg-[#eff4ff]">
              Lihat Semua
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e6eeff]">
                  <th className="text-left text-xs font-medium text-[#434655] pb-3 pr-4">Kode</th>
                  <th className="text-left text-xs font-medium text-[#434655] pb-3 pr-4">Tamu</th>
                  <th className="text-left text-xs font-medium text-[#434655] pb-3 pr-4">Kamar</th>
                  <th className="text-left text-xs font-medium text-[#434655] pb-3 pr-4">Check-in</th>
                  <th className="text-left text-xs font-medium text-[#434655] pb-3 pr-4">Total</th>
                  <th className="text-left text-xs font-medium text-[#434655] pb-3 pr-4">Status</th>
                  <th className="text-right text-xs font-medium text-[#434655] pb-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {partnerRecentBookings.slice(0, 5).map((booking) => {
                  const status = statusConfig[booking.status] || statusConfig.pending;
                  const StatusIcon = status.icon;
                  return (
                    <tr key={booking.id} className="hover:bg-[#f8f9ff]">
                      <td className="py-3 pr-4">
                        <span className="text-sm font-mono font-medium text-[#2563eb]">
                          {booking.code}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-sm font-medium text-[#121c2a]">{booking.guestName}</p>
                        <p className="text-xs text-[#434655]">{booking.guestEmail}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-sm text-[#121c2a]">{booking.roomName}</p>
                        <p className="text-xs text-[#434655]">{booking.nights} malam</p>
                      </td>
                      <td className="py-3 pr-4">
                        <p className="text-sm text-[#121c2a]">{booking.checkIn}</p>
                        <p className="text-xs text-[#434655]">{booking.checkOut}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm font-semibold text-[#121c2a]">
                          {formatCurrency(booking.total)}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge className={`${status.color} border-0 font-medium`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" variant="ghost" className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 text-[#ba1a1a] hover:bg-[#ffdad6]">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost" className="h-8 hover:bg-[#eff4ff]">
                            <Eye className="h-4 w-4" />
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

      {/* Property Overview */}
      <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-[#121c2a]">Properti Saya</CardTitle>
          <Link href="/partner/hotels">
            <Button variant="ghost" size="sm" className="text-[#2563eb] hover:text-[#004ac6] hover:bg-[#eff4ff]">
              Kelola
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerHotels.map((hotel) => (
              <div key={hotel.id} className="flex gap-4 p-4 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#121c2a] truncate">{hotel.name}</h3>
                    <Badge className={hotel.status === "active" ? "bg-green-100 text-green-700 border-0 text-[10px] shrink-0" : "bg-[#ffddb8] text-[#784b00] border-0 text-[10px] shrink-0"}>
                      {hotel.status === "active" ? "Aktif" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#434655] mt-0.5">{hotel.city}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Bed className="h-3 w-3 text-[#434655]" />
                      <span className="text-xs text-[#434655]">{hotel.roomCount} kamar</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-[#434655]">{hotel.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarCheck className="h-3 w-3 text-[#434655]" />
                      <span className="text-xs text-[#434655]">{hotel.bookings} booking</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
