"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  CalendarCheck,
  DollarSign,
  Bed,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  formatCurrency,
  reportStats,
  partnerTransactions,
  weeklyReport,
  monthlyReport,
  quarterlyReport,
} from "@/data/partner-dummy";

type Period = "week" | "month" | "quarter";

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: "Selesai", color: "bg-green-100 text-green-700" },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  refunded: { label: "Refund", color: "bg-[#ffdad6] text-[#ba1a1a]" },
};

export default function PartnerReportsPage() {
  const [period, setPeriod] = useState<Period>("month");

  const chartData = period === "week" ? weeklyReport : period === "month" ? monthlyReport : quarterlyReport;
  const maxValue = Math.max(...chartData.map((d) => d.value));

  const commissionTotal = partnerTransactions.reduce((s, t) => s + t.commission, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Laporan & Pendapatan</h1>
          <p className="text-[#434655] mt-1">Analisis performa bisnis Anda</p>
        </div>
        <Button variant="outline" className="rounded-xl border-[#e6eeff] text-[#434655] hover:bg-[#eff4ff]">
          <Download className="h-4 w-4 mr-2" />
          Export Laporan
        </Button>
      </div>

      {/* Period Filter */}
      <div className="flex items-center bg-[#eff4ff] rounded-xl p-1 w-fit">
        {(["week", "month", "quarter"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              period === p ? "bg-[#ffffff] text-[#2563eb] shadow-sm" : "text-[#434655] hover:text-[#121c2a]"
            }`}
          >
            {p === "week" ? "Minggu" : p === "month" ? "Bulan" : "Kuartal"}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center">
                <CalendarCheck className="h-5 w-5 text-[#2563eb]" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <TrendingUp className="h-3 w-3" />
                +12%
              </div>
            </div>
            <p className="text-2xl font-bold text-[#121c2a]">{reportStats.totalBookings}</p>
            <p className="text-sm text-[#434655] mt-0.5">Total Booking</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffddb8] flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-[#784b00]" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <TrendingUp className="h-3 w-3" />
                +8.2%
              </div>
            </div>
            <p className="text-2xl font-bold text-[#121c2a]">{formatCurrency(reportStats.totalRevenue - commissionTotal)}</p>
            <p className="text-sm text-[#434655] mt-0.5">Total Pendapatan (setelah komisi)</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Bed className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-[#ba1a1a]">
                <TrendingDown className="h-3 w-3" />
                -2%
              </div>
            </div>
            <p className="text-2xl font-bold text-[#121c2a]">{reportStats.occupancyRate}%</p>
            <p className="text-sm text-[#434655] mt-0.5">Tingkat Hunian</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line Chart Placeholder */}
        <Card className="lg:col-span-2 border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Tren Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simulated line chart using bars with rounded tops */}
            <div className="space-y-3">
              <div className="flex items-end gap-3 h-48">
                {chartData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-[#434655] font-medium">{d.value}</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#2563eb] to-[#004ac6] transition-all hover:opacity-80"
                      style={{ height: `${(d.value / maxValue) * 100}%`, minHeight: "8px" }}
                    />
                    <span className="text-[10px] text-[#434655]">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Status Breakdown (Pie placeholder) */}
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Status Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Donut chart placeholder */}
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full bg-[#e6eeff]" />
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "0",
                    background: `conic-gradient(
                      #22c55e 0deg ${(reportStats.bookingBreakdown.completed / reportStats.totalBookings) * 360}deg,
                      #3b82f6 ${(reportStats.bookingBreakdown.completed / reportStats.totalBookings) * 360}deg ${((reportStats.bookingBreakdown.completed + reportStats.bookingBreakdown.confirmed) / reportStats.totalBookings) * 360}deg,
                      #eab308 ${((reportStats.bookingBreakdown.completed + reportStats.bookingBreakdown.confirmed) / reportStats.totalBookings) * 360}deg ${((reportStats.bookingBreakdown.completed + reportStats.bookingBreakdown.confirmed + reportStats.bookingBreakdown.pending) / reportStats.totalBookings) * 360}deg,
                      #ef4444 ${((reportStats.bookingBreakdown.completed + reportStats.bookingBreakdown.confirmed + reportStats.bookingBreakdown.pending) / reportStats.totalBookings) * 360}deg 360deg
                    )`,
                    borderRadius: "50%",
                  }}
                />
                <div className="absolute rounded-full bg-[#ffffff]" style={{ inset: "24px" }}>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#121c2a]">{reportStats.totalBookings}</p>
                      <p className="text-[10px] text-[#434655]">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-[#121c2a]">Selesai</span>
                </div>
                <span className="text-xs font-semibold text-[#121c2a]">{reportStats.bookingBreakdown.completed}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2563eb]" />
                  <span className="text-xs text-[#121c2a]">Dikonfirmasi</span>
                </div>
                <span className="text-xs font-semibold text-[#121c2a]">{reportStats.bookingBreakdown.confirmed}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-xs text-[#121c2a]">Pending</span>
                </div>
                <span className="text-xs font-semibold text-[#121c2a]">{reportStats.bookingBreakdown.pending}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8f9ff]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs text-[#121c2a]">Dibatalkan</span>
                </div>
                <span className="text-xs font-semibold text-[#121c2a]">{reportStats.bookingBreakdown.cancelled}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-[#121c2a]">Transaksi Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eff4ff]">
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Tanggal</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Tamu</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Kamar</th>
                  <th className="text-right text-xs font-medium text-[#434655] p-4">Jumlah</th>
                  <th className="text-right text-xs font-medium text-[#434655] p-4">Komisi (10%)</th>
                  <th className="text-right text-xs font-medium text-[#434655] p-4">Bersih</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9ff]">
                {partnerTransactions.map((t) => {
                  const st = statusConfig[t.status];
                  return (
                    <tr key={t.id} className="hover:bg-[#f8f9ff]">
                      <td className="p-4">
                        <span className="text-sm text-[#121c2a]">{t.date}</span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-[#121c2a]">{t.guest}</p>
                        <p className="text-xs text-[#434655]">{t.hotel}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-[#121c2a]">{t.room}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-semibold text-[#121c2a]">{formatCurrency(t.amount)}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm text-[#ba1a1a]">-{formatCurrency(t.commission)}</span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-semibold text-green-600">{formatCurrency(t.net)}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={`${st.color} border-0 text-xs`}>{st.label}</Badge>
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
