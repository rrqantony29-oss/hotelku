"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CalendarCheck,
  Users,
  Hotel,
  ArrowUpRight,
  AlertTriangle,
  Flag,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  formatCurrency,
  adminStats,
  adminMonthlyGMV,
  adminGrowth,
  adminPartners,
  adminTopHotels,
  adminTransactions,
} from "@/data/admin-dummy";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(adminStats.totalRevenue),
      change: adminGrowth.gmv.label,
      trend: "up" as const,
      icon: DollarSign,
      color: "bg-[#eff4ff] text-[#004ac6]",
    },
    {
      title: "Total Bookings",
      value: adminStats.totalBookings.toLocaleString(),
      change: adminGrowth.newUsers.label,
      trend: "up" as const,
      icon: CalendarCheck,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Active Hotels",
      value: adminStats.activeHotels.toLocaleString(),
      change: "+12%",
      trend: "up" as const,
      icon: Hotel,
      color: "bg-[#ffddb8] text-[#784b00]",
    },
    {
      title: "Active Users",
      value: adminStats.activePartners.toLocaleString(),
      change: adminGrowth.newPartners.label,
      trend: "up" as const,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const pendingPartners = adminPartners.filter((p) => p.status === "pending");
  const maxGMV = Math.max(...adminMonthlyGMV.map((m) => m.gmv));

  return (
    <div className="p-6 space-y-6 bg-[#f8f9ff] min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Dashboard</h1>
          <p className="text-[#434655] mt-1">Ringkasan performa platform HotelKu</p>
        </div>
        <Link href="/admin/reports">
          <Button className="bg-[#004ac6] hover:bg-[#003aaa] text-white rounded-xl">
            <BarChart3 className="h-4 w-4 mr-2" />
            Lihat Laporan Lengkap
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="rounded-xl border-0 shadow-sm bg-white">
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

      {/* Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/admin/partners" className="block">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#ffddb8]/50 hover:bg-[#ffddb8]/80 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#ffddb8] flex items-center justify-center">
              <Clock className="h-5 w-5 text-[#784b00]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#121c2a]">{adminStats.pendingVerifications} Partner Menunggu</p>
              <p className="text-xs text-[#434655]">Perlu verifikasi dokumen</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#784b00]" />
          </div>
        </Link>
        <Link href="/admin/bookings" className="block">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#ffdad6]/50 hover:bg-[#ffdad6]/80 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-[#ba1a1a]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#121c2a]">{adminStats.disputedBookings} Booking Dispute</p>
              <p className="text-xs text-[#434655]">Perlu penanganan</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#ba1a1a]" />
          </div>
        </Link>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#e6eeff]">
          <div className="w-10 h-10 rounded-xl bg-[#dee9fc] flex items-center justify-center">
            <Flag className="h-5 w-5 text-[#004ac6]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#121c2a]">{adminStats.flaggedReviews} Review Dilaporkan</p>
            <p className="text-xs text-[#434655]">Perlu moderasi</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 rounded-xl border-0 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Revenue Bulanan</CardTitle>
            <Badge className="bg-[#eff4ff] text-[#004ac6] border-0 text-xs">2026</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-48">
              {adminMonthlyGMV.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex gap-0.5 items-end h-full w-full">
                    <div
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-[#004ac6] to-[#2563eb]"
                      style={{ height: `${(month.gmv / maxGMV) * 100}%`, minHeight: "8px" }}
                      title={`GMV: ${formatCurrency(month.gmv)}`}
                    />
                    <div
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-green-600 to-green-400"
                      style={{ height: `${(month.revenue / maxGMV) * 100}%`, minHeight: "8px" }}
                      title={`Revenue: ${formatCurrency(month.revenue)}`}
                    />
                  </div>
                  <span className="text-[10px] text-[#434655]">{month.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#2563eb]" />
                <span className="text-xs text-[#434655]">GMV</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-green-500" />
                <span className="text-xs text-[#434655]">Revenue (Komisi)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Partners */}
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Verifikasi Partner</CardTitle>
            <Link href="/admin/partners">
              <Button variant="ghost" size="sm" className="text-[#004ac6] hover:text-[#003aaa] hover:bg-[#eff4ff] rounded-lg">
                Lihat Semua
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingPartners.slice(0, 4).map((partner) => (
              <div key={partner.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9ff]">
                <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-[#004ac6]">
                    {partner.companyName.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#121c2a] truncate">{partner.companyName}</p>
                  <p className="text-xs text-[#434655]">{partner.city} • {partner.joinedAt}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-[#ba1a1a] hover:text-red-700 hover:bg-[#ffdad6] rounded-lg">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hotels */}
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Top 5 Hotel (by Booking)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminTopHotels.map((hotel, i) => {
                const maxBookings = adminTopHotels[0].bookings;
                return (
                  <div key={hotel.id} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-[#ffddb8] text-[#784b00]" :
                      i === 1 ? "bg-[#e6eeff] text-[#004ac6]" :
                      i === 2 ? "bg-[#d9e3f6] text-[#434655]" :
                      "bg-[#f8f9ff] text-[#434655]"
                    }`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#121c2a] truncate">{hotel.name}</p>
                      <p className="text-xs text-[#434655]">{hotel.city}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-[#121c2a]">{hotel.bookings}</p>
                      <p className="text-[10px] text-[#434655]">{formatCurrency(hotel.revenue)}</p>
                    </div>
                    <div className="w-20 h-1.5 bg-[#e6eeff] rounded-full overflow-hidden shrink-0">
                      <div
                        className="h-full bg-[#2563eb] rounded-full"
                        style={{ width: `${(hotel.bookings / maxBookings) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Transaksi Terbaru</CardTitle>
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm" className="text-[#004ac6] hover:text-[#003aaa] hover:bg-[#eff4ff] rounded-lg">
                Lihat Semua
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminTransactions.map((trx) => {
                const statusConfig: Record<string, { label: string; color: string }> = {
                  success: { label: "Sukses", color: "bg-green-100 text-green-700" },
                  pending: { label: "Pending", color: "bg-[#ffddb8] text-[#784b00]" },
                  failed: { label: "Gagal", color: "bg-[#ffdad6] text-[#ba1a1a]" },
                  refunded: { label: "Refund", color: "bg-purple-100 text-purple-700" },
                };
                const status = statusConfig[trx.status];

                return (
                  <div key={trx.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9ff]">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium text-[#004ac6]">{trx.bookingCode}</span>
                        <Badge className={`${status.color} border-0 text-[10px] rounded-lg`}>{status.label}</Badge>
                      </div>
                      <p className="text-sm text-[#121c2a] truncate mt-0.5">{trx.guestName}</p>
                      <p className="text-[10px] text-[#434655]">{trx.hotelName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-[#121c2a]">{formatCurrency(trx.amount)}</p>
                      <p className="text-[10px] text-green-600">Komisi: {formatCurrency(trx.commission)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
