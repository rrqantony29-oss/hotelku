"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, Star, Camera, Send, ArrowLeft, CheckCircle, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookings } from "@/data/dummy";

const MAX_CHARS = 1000;

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const booking = bookings.find((b) => b.id === Number(params.id));

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!booking) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#121c2a] font-semibold text-lg mb-2">Booking tidak ditemukan</p>
          <Link href="/bookings" className="text-sm text-[#004ac6] font-medium hover:underline">
            Kembali ke daftar booking
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const ratingLabels = ["", "Sangat Buruk", "Buruk", "Cukup", "Bagus", "Sangat Bagus"];

  if (isSubmitted) {
    return (
      <div className="bg-[#f8f9ff] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-[#2e7d32]" />
          </div>
          <h2 className="text-xl font-bold text-[#121c2a] mb-2">Review Terkirim!</h2>
          <p className="text-sm text-[#434655] mb-6">
            Terima kasih atas review Anda untuk {booking.hotel.name}.
          </p>
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-6 w-6 ${i < rating ? "fill-[#784b00] text-[#784b00]" : "text-[#dee9fc]"}`} />
            ))}
          </div>
          <Link href={`/bookings/${booking.id}`}>
            <Button className="w-full gradient-primary text-white rounded-xl h-12 font-semibold hover:opacity-90">
              Kembali ke Detail Booking
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9ff] min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-[#434655] mb-2">
            <Link href="/" className="hover:text-[#004ac6]">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/bookings" className="hover:text-[#004ac6]">Booking Saya</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/bookings/${booking.id}`} className="hover:text-[#004ac6]">{booking.bookingCode}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#121c2a] font-medium">Review</span>
          </div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Beri Review</h1>
          <p className="text-sm text-[#434655] mt-1">Bagikan pengalaman menginap Anda</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6 max-w-2xl space-y-5">
        {/* Hotel Info */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <Image src={booking.hotel.images[0]} alt={booking.hotel.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#121c2a]">{booking.hotel.name}</h3>
              <p className="text-sm text-[#434655] mt-1">
                {new Date(booking.checkIn).toLocaleDateString("id-ID", { day: "numeric", month: "long" })} — {new Date(booking.checkOut).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <p className="text-sm text-[#434655]">{booking.nights} malam · {booking.room.name}</p>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <h2 className="font-semibold text-[#121c2a] text-lg mb-2">Bagaimana pengalaman Anda?</h2>
          <p className="text-sm text-[#434655] mb-5">Ketuk bintang untuk memberi rating</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    i < (hoverRating || rating)
                      ? "fill-[#784b00] text-[#784b00]"
                      : "text-[#dee9fc]"
                  }`}
                />
              </button>
            ))}
          </div>
          {(hoverRating || rating) > 0 && (
            <p className="text-sm font-medium text-[#004ac6]">
              {ratingLabels[hoverRating || rating]}
            </p>
          )}
        </div>

        {/* Review Text */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-[#121c2a] text-lg mb-4">Tulis Review</h2>
          <div className="relative">
            <textarea
              placeholder="Ceritakan pengalaman menginap Anda — kamar, pelayanan, fasilitas, lokasi, dll."
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, MAX_CHARS))}
              className="w-full bg-[#eff4ff] rounded-xl px-4 py-3 text-sm text-[#121c2a] placeholder:text-[#434655]/50 outline-none resize-none h-40"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-[#434655]">Minimal 20 karakter</p>
              <p className={`text-xs ${comment.length > MAX_CHARS * 0.9 ? "text-[#ba1a1a]" : "text-[#434655]"}`}>
                {comment.length}/{MAX_CHARS}
              </p>
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="font-semibold text-[#121c2a] text-lg mb-4">Tambahkan Foto (Opsional)</h2>
          <div className="border-2 border-dashed border-[#dee9fc] rounded-xl p-8 text-center hover:border-[#2563eb] transition cursor-pointer">
            <Camera className="h-10 w-10 text-[#dee9fc] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#121c2a] mb-1">Klik atau seret foto ke sini</p>
            <p className="text-xs text-[#434655]">PNG, JPG maks. 5MB per foto (maks. 5 foto)</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/bookings/${booking.id}`} className="flex-1">
            <Button variant="outline" className="w-full rounded-xl h-12 font-semibold text-[#434655]">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || comment.length < 20 || isSubmitting}
            className="flex-1 gradient-primary text-white rounded-xl h-12 font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Mengirim...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" /> Kirim Review
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
