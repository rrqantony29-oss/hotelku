"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Hotel,
  CalendarCheck,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  X,
  Shield,
  Percent,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Partner", href: "/admin/partners", icon: Users, badge: 5 },
  { label: "Hotel", href: "/admin/hotels", icon: Hotel },
  { label: "Booking", href: "/admin/bookings", icon: CalendarCheck, badge: 2 },
  { label: "Komisi & Markup", href: "/admin/commission", icon: Percent },
  { label: "Laporan", href: "/admin/reports", icon: BarChart3 },
  { label: "Konten", href: "/admin/content", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800">HotelKu</span>
              <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">Admin</Badge>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                8
              </span>
            </Button>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-purple-700">AD</span>
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-slate-800">Admin</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-64px)] bg-white border-r border-slate-200">
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-purple-50 text-purple-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-100">
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-purple-900">Platform Status</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-purple-700">Semua sistem normal</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {mobileOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <aside className="absolute left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto">
              <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-purple-50 text-purple-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
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
