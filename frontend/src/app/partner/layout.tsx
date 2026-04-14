"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Hotel,
  CalendarCheck,
  Star,
  Bed,
  BarChart3,
  Wallet,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { label: "Dashboard", href: "/partner/dashboard", icon: LayoutDashboard },
  { label: "Properti Saya", href: "/partner/hotels", icon: Hotel },
  { label: "Booking Masuk", href: "/partner/bookings", icon: CalendarCheck, badge: 3 },
  { label: "Kelola Kamar", href: "/partner/rooms", icon: Bed },
  { label: "Review", href: "/partner/reviews", icon: Star },
  { label: "Laporan", href: "/partner/reports", icon: BarChart3 },
  { label: "Payout", href: "/partner/payouts", icon: Wallet },
  { label: "Pengaturan", href: "/partner/settings", icon: Settings },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-[#eff4ff]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/partner/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#004ac6] flex items-center justify-center">
                <Hotel className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-[#121c2a]">HotelKu</span>
              <Badge className="bg-[#e6eeff] text-[#2563eb] border-0 text-[10px]">Partner</Badge>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-[#eff4ff]">
              <Bell className="h-5 w-5 text-[#434655]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ba1a1a] text-white text-[10px] rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center gap-2 pl-3" style={{ borderLeft: "1px solid #e6eeff" }}>
              <div className="w-8 h-8 rounded-full bg-[#e6eeff] flex items-center justify-center">
                <span className="text-sm font-semibold text-[#2563eb]">BS</span>
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-[#121c2a]">Budi Santoso</p>
                <p className="text-xs text-[#434655]">PT Nusa Indah Hotel</p>
              </div>
              <ChevronDown className="h-4 w-4 text-[#434655]" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-64px)] bg-white" style={{ borderRight: "1px solid #e6eeff" }}>
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#eff4ff] text-[#2563eb]"
                      : "text-[#434655] hover:bg-[#f8f9ff] hover:text-[#121c2a]"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#2563eb]" : "text-[#434655]"}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="w-5 h-5 bg-[#ba1a1a] text-white text-[10px] rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="p-4" style={{ borderTop: "1px solid #eff4ff" }}>
            <div className="bg-[#eff4ff] rounded-xl p-4">
              <p className="text-sm font-semibold text-[#121c2a]">Butuh bantuan?</p>
              <p className="text-xs text-[#434655] mt-1">Hubungi tim support kami</p>
              <Button size="sm" className="mt-3 w-full bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
                Hubungi Support
              </Button>
            </div>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {mobileOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <aside className="absolute left-0 top-16 bottom-0 w-64 bg-white overflow-y-auto" style={{ borderRight: "1px solid #e6eeff" }}>
              <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#eff4ff] text-[#2563eb]"
                          : "text-[#434655] hover:bg-[#f8f9ff] hover:text-[#121c2a]"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? "text-[#2563eb]" : "text-[#434655]"}`} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="w-5 h-5 bg-[#ba1a1a] text-white text-[10px] rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
