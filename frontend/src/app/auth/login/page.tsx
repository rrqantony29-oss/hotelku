"use client";

import { useState } from "react";
import Link from "next/link";
import { Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Hotel className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Masuk ke HotelKu</CardTitle>
          <p className="text-sm text-slate-500">Masukkan email dan password Anda</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full">Masuk</Button>
          <p className="text-center text-sm text-slate-500">
            Belum punya akun? <Link href="/auth/register" className="text-blue-600 hover:underline">Daftar</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
