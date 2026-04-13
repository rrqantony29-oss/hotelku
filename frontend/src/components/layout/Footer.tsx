import Link from "next/link";
import { Hotel } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Hotel className="h-6 w-6 text-blue-600" />
              <span>HotelKu</span>
            </Link>
            <p className="text-sm text-slate-500">
              Platform booking hotel terpercaya di Indonesia. Temukan dan pesan hotel terbaik untuk perjalanan Anda.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Tautan</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/hotels" className="hover:text-blue-600">Cari Hotel</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Tentang Kami</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Partner</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/partner/dashboard" className="hover:text-blue-600">Dashboard Partner</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Daftar Jadi Partner</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Bantuan</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Syarat & Ketentuan</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>
        <hr className="my-8" />
        <p className="text-center text-sm text-slate-400">&copy; 2026 HotelKu. All rights reserved.</p>
      </div>
    </footer>
  );
}
