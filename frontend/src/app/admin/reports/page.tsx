"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CalendarCheck,
  Users,
  Download,
  Calendar,
  ArrowUpRight,
  Hotel,
  Star,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  formatCurrency,
  reportsMonthlyRevenue,
  reportsGrowth,
  adminTopHotels,
} from "@/data/admin-dummy";

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState({ from: "2026-01-01", to: "2026-04-30" });

  const maxRevenue = Math.max(...reportsMonthlyRevenue.map((m) => m.gmv));
  const totalGMV = reportsMonthlyRevenue.reduce((sum, m) => sum + m.gmv, 0);
  const totalRevenue = reportsMonthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);

  const revenueCards = [
    {
      title: "Total GMV",
      value: formatCurrency(totalGMV),
      change: `+${reportsGrowth.revenueGrowth.percent}%`,
      trend: "up" as const,
      icon: DollarSign,
      color: "bg-[#eff4ff] text-[#004ac6]",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      change: `+${reportsGrowth.revenueGrowth.percent}%`,
      trend: "up" as const,
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Booking",
      value: reportsGrowth.bookingGrowth.current.toLocaleString(),
      change: `+${reportsGrowth.bookingGrowth.percent}%`,
      trend: "up" as const,
      icon: CalendarCheck,
      color: "bg-[#ffddb8] text-[#784b00]",
    },
    {
      title: "Active Users",
      value: reportsGrowth.userGrowth.current.toLocaleString(),
      change: `+${reportsGrowth.userGrowth.percent}%`,
      trend: "up" as const,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#f8f9ff] min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Reports & Analytics</h1>
          <p className="text-[#434655] mt-1">Analisis performa platform secara detail</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-3 py-2">
            <Calendar className="h-4 w-4 text-[#434655]" />
            <Input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange((p) => ({ ...p, from: e.target.value }))}
              className="w-32 border-0 bg-transparent text-sm p-0 h-auto focus-visible:ring-0"
            />
            <span className="text-[#434655] text-sm">-</span>
            <Input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange((p) => ({ ...p, to: e.target.value }))}
              className="w-32 border-0 bg-transparent text-sm p-0 h-auto focus-visible:ring-0"
            />
          </div>
          <Button className="bg-[#004ac6] hover:bg-[#003aaa] text-white rounded-xl">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueCards.map((card) => (
          <Card key={card.title} className="rounded-xl border-0 shadow-sm bg-white">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  card.trend === "up" ? "text-green-600" : "text-[#ba1a1a]"
                }`}>
                  {card.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {card.change}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-[#121c2a]">{card.value}</p>
                <p className="text-sm text-[#434655] mt-0.5">{card.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Chart */}
        <Card className="lg:col-span-2 rounded-xl border-0 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Tren Revenue</CardTitle>
            <Badge className="bg-[#eff4ff] text-[#004ac6] border-0 text-xs rounded-lg">7 Bulan Terakhir</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-56">
              {reportsMonthlyRevenue.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex flex-col gap-0.5 items-center h-full w-full justify-end">
                    <span className="text-[9px] text-[#434655] mb-0.5">
                      {(month.gmv / 1000000000).toFixed(1)}T
                    </span>
                    <div className="flex gap-0.5 items-end w-full" style={{ height: "calc(100% - 20px)" }}>
                      <div
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-[#004ac6] to-[#2563eb]"
                        style={{ height: `${(month.gmv / maxRevenue) * 100}%`, minHeight: "8px" }}
                        title={`GMV: ${formatCurrency(month.gmv)}`}
                      />
                      <div
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-green-600 to-green-400"
                        style={{ height: `${(month.revenue / maxRevenue) * 100}%`, minHeight: "8px" }}
                        title={`Revenue: ${formatCurrency(month.revenue)}`}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-[#434655] whitespace-nowrap">{month.month.split(" ")[0]}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
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

        {/* Growth Metrics */}
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#121c2a]">Growth Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#f8f9ff] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#434655]">Revenue Growth</span>
                <span className="text-sm font-bold text-green-600">+{reportsGrowth.revenueGrowth.percent}%</span>
              </div>
              <div className="h-2 bg-[#e6eeff] rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${reportsGrowth.revenueGrowth.percent}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-[#434655]">
                <span>{formatCurrency(reportsGrowth.revenueGrowth.previous)}</span>
                <span>{formatCurrency(reportsGrowth.revenueGrowth.current)}</span>
              </div>
            </div>

            <div className="bg-[#f8f9ff] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#434655]">Booking Growth</span>
                <span className="text-sm font-bold text-[#004ac6]">+{reportsGrowth.bookingGrowth.percent}%</span>
              </div>
              <div className="h-2 bg-[#e6eeff] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563eb] rounded-full"
                  style={{ width: `${reportsGrowth.bookingGrowth.percent}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-[#434655]">
                <span>{reportsGrowth.bookingGrowth.previous.toLocaleString()}</span>
                <span>{reportsGrowth.bookingGrowth.current.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-[#f8f9ff] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#434655]">User Growth</span>
                <span className="text-sm font-bold text-purple-600">+{reportsGrowth.userGrowth.percent}%</span>
              </div>
              <div className="h-2 bg-[#e6eeff] rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${reportsGrowth.userGrowth.percent}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-[#434655]">
                <span>{reportsGrowth.userGrowth.previous.toLocaleString()}</span>
                <span>{reportsGrowth.userGrowth.current.toLocaleString()}</span>
              </div>
            </div>

            <Separator className="bg-[#e6eeff]" />

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#e6eeff]">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-[#004ac6]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#121c2a]">Avg. Order Value</p>
                <p className="text-lg font-bold text-[#004ac6]">{formatCurrency(Math.round(totalGMV / reportsGrowth.bookingGrowth.current))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Hotels Table */}
      <Card className="rounded-xl border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-[#121c2a]">Top Hotels by Revenue</CardTitle>
          <Badge className="bg-[#ffddb8] text-[#784b00] border-0 text-xs rounded-lg">Periode Terpilih</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e6eeff]">
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Rank</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Hotel</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Kota</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Rating</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Bookings</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Revenue</th>
                  <th className="text-left text-xs font-medium text-[#434655] p-4">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9ff]">
                {adminTopHotels.map((hotel, i) => {
                  const share = ((hotel.revenue / totalGMV) * 100).toFixed(1);
                  return (
                    <tr key={hotel.id} className="hover:bg-[#eff4ff]/50">
                      <td className="p-4">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-[#ffddb8] text-[#784b00]" :
                          i === 1 ? "bg-[#e6eeff] text-[#004ac6]" :
                          i === 2 ? "bg-[#d9e3f6] text-[#434655]" :
                          "bg-[#f8f9ff] text-[#434655]"
                        }`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#e6eeff] flex items-center justify-center">
                            <Hotel className="h-5 w-5 text-[#004ac6]" />
                          </div>
                          <p className="text-sm font-medium text-[#121c2a]">{hotel.name}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-[#121c2a]">{hotel.city}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-[#784b00] fill-[#ffddb8]" />
                          <span className="text-sm font-medium text-[#121c2a]">{hotel.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-[#121c2a]">{hotel.bookings}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-[#121c2a]">{formatCurrency(hotel.revenue)}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#e6eeff] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2563eb] rounded-full"
                              style={{ width: `${Number(share) * 2}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-[#434655]">{share}%</span>
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
