"use client";

import { useState } from "react";
import Link from "next/link";
import { Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Hotel className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Daftar HotelKu</CardTitle>
          <p className="text-sm text-slate-500">Buat akun baru untuk mulai booking</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nama Lengkap</Label>
            <Input placeholder="Nama Anda" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label>No. HP</Label>
            <Input placeholder="08xxxxxxxxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <Label>Konfirmasi Password</Label>
            <Input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          </div>
          <Button className="w-full">Daftar</Button>
          <p className="text-center text-sm text-slate-500">
            Sudah punya akun? <Link href="/auth/login" className="text-blue-600 hover:underline">Masuk</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
