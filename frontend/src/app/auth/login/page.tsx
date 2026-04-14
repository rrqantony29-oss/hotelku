"use client";

import { useState } from "react";
import Link from "next/link";
import { Hotel, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/15 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Hotel className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">HotelKu</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Selamat Datang<br />Kembali
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-md">
            Kelola reservasi, temukan penawaran eksklusif, dan nikmati pengalaman booking hotel terbaik di seluruh Indonesia.
          </p>
          <div className="flex items-center gap-8 mt-12">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-white/70">Hotel Partner</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm text-white/70">Pengguna Aktif</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.8</p>
              <p className="text-sm text-white/70">Rating App</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Hotel className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#121c2a]">HotelKu</span>
          </div>

          <h2 className="text-2xl font-bold text-[#121c2a] mb-2">Masuk ke HotelKu</h2>
          <p className="text-sm text-[#434655] mb-8">Masukkan email dan password untuk melanjutkan</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#121c2a] mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#eff4ff] border-0 rounded-xl h-12 pl-11 text-[#121c2a] placeholder:text-[#434655]/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[#121c2a]">Password</label>
                <button className="text-xs text-[#004ac6] font-medium hover:underline">Lupa password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#eff4ff] border-0 rounded-xl h-12 pl-11 pr-11 text-[#121c2a] placeholder:text-[#434655]/50"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#434655] hover:text-[#121c2a]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button className="w-full gradient-primary text-white rounded-xl h-12 font-semibold text-base shadow-lg hover:opacity-90 transition">
              Masuk <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#dee9fc]" />
            <span className="text-xs text-[#434655] font-medium">atau</span>
            <div className="flex-1 h-px bg-[#dee9fc]" />
          </div>

          {/* Google Login */}
          <button className="w-full bg-white rounded-xl h-12 flex items-center justify-center gap-3 shadow-card hover:shadow-ambient transition text-sm font-medium text-[#121c2a]">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Masuk dengan Google
          </button>

          <p className="text-center text-sm text-[#434655] mt-8">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="text-[#004ac6] font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
