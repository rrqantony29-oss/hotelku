"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Hotel, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/hotels", label: "Cari Hotel" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Hotel className="h-6 w-6 text-blue-600" />
          <span>HotelKu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm"><LogIn className="h-4 w-4 mr-1" />Masuk</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm"><User className="h-4 w-4 mr-1" />Daftar</Button>
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden p-2 rounded-md hover:bg-slate-100">
            {open ? <X /> : <Menu />}
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-medium">
                  {l.label}
                </Link>
              ))}
              <hr />
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Masuk</Button>
              </Link>
              <Link href="/auth/register" onClick={() => setOpen(false)}>
                <Button className="w-full">Daftar</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
