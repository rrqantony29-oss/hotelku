"use client";

import { useState } from "react";
import {
  Wallet,
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Building2,
  CreditCard,
  Settings,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency, payoutHistory, payoutInfo } from "@/data/partner-dummy";

const payoutStatusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  completed: { label: "Selesai", color: "bg-green-100 text-green-700", icon: CheckCircle },
  processing: { label: "Diproses", color: "bg-blue-100 text-blue-700", icon: Loader2 },
  pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700", icon: Clock },
};

export default function PartnerPayoutsPage() {
  const [autoPayout, setAutoPayout] = useState(payoutInfo.autoPayout);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Payout</h1>
          <p className="text-[#434655] mt-1">Kelola saldo dan penarikan dana</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
              <Wallet className="h-4 w-4 mr-2" />
              Tarik Dana
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-[#121c2a]">Tarik Dana</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-[#f8f9ff] rounded-xl p-4">
                <p className="text-xs text-[#434655]">Saldo Tersedia</p>
                <p className="text-xl font-bold text-[#2563eb]">{formatCurrency(payoutInfo.availableBalance)}</p>
              </div>
              <div>
                <Label className="text-xs font-medium text-[#434655] mb-1 block">Jumlah Penarikan</Label>
                <Input
                  type="number"
                  defaultValue={payoutInfo.availableBalance}
                  className="rounded-xl bg-[#f8f9ff] border-0 focus-visible:ring-[#2563eb]"
                />
              </div>
              <div className="bg-[#f8f9ff] rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#434655]" />
                  <span className="text-sm text-[#121c2a]">{payoutInfo.bankName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[#434655]" />
                  <span className="text-sm text-[#121c2a]">{payoutInfo.bankAccount}</span>
                </div>
                <p className="text-xs text-[#434655]">a.n. {payoutInfo.accountHolder}</p>
              </div>
              <Button className="w-full bg-[#2563eb] hover:bg-[#004ac6] rounded-xl">
                Konfirmasi Penarikan
              </Button>
              <p className="text-[10px] text-[#434655] text-center">Dana akan diproses dalam 1-3 hari kerja</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-[#2563eb] to-[#004ac6] rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="h-5 w-5 text-white/80" />
              <span className="text-sm font-medium text-white/80">Saldo Tersedia</span>
            </div>
            <p className="text-2xl font-bold text-white">{formatCurrency(payoutInfo.availableBalance)}</p>
            <p className="text-xs text-white/60 mt-1">Siap ditarik</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-[#434655]">Dalam Proses</span>
            </div>
            <p className="text-2xl font-bold text-[#121c2a]">{formatCurrency(payoutInfo.pendingBalance)}</p>
            <p className="text-xs text-[#434655] mt-1">Sedang diproses</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-[#434655]">Total Pendapatan</span>
            </div>
            <p className="text-2xl font-bold text-[#121c2a]">{formatCurrency(payoutInfo.totalEarned)}</p>
            <p className="text-xs text-[#434655] mt-1">Sepanjang waktu</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payout Settings */}
        <div className="space-y-4">
          {/* Auto Payout Toggle */}
          <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#121c2a]">Auto Payout</p>
                  <p className="text-xs text-[#434655] mt-0.5">Tarik otomatis setiap minggu</p>
                </div>
                <button
                  onClick={() => setAutoPayout(!autoPayout)}
                  className={`w-11 h-6 rounded-full transition-colors ${autoPayout ? "bg-[#2563eb]" : "bg-[#dee9fc]"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${autoPayout ? "translate-x-5.5" : "translate-x-0.5"}`} />
                </button>
              </div>
              {autoPayout && (
                <div>
                  <Label className="text-xs text-[#434655] mb-1 block">Minimum Penarikan</Label>
                  <Input
                    type="number"
                    defaultValue={payoutInfo.minThreshold}
                    className="rounded-xl bg-[#f8f9ff] border-0 focus-visible:ring-[#2563eb]"
                  />
                  <p className="text-[10px] text-[#434655] mt-1">
                    Saldo otomatis ditarik jika mencapai {formatCurrency(payoutInfo.minThreshold)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bank Account Info */}
          <Card className="border-0 shadow-sm bg-[#ffffff] rounded-xl">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#121c2a]">Rekening Bank</p>
                <Button variant="ghost" size="sm" className="text-[#2563eb] hover:text-[#004ac6] hover:bg-[#eff4ff] h-8 text-xs">
                  <Settings className="h-3.5 w-3.5 mr-1" />
                  Ubah
                </Button>
              </div>
              <div className="bg-[#f8f9ff] rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#434655]" />
                  <span className="text-sm font-medium text-[#121c2a]">{payoutInfo.bankName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[#434655]" />
                  <span className="text-sm text-[#121c2a]">{payoutInfo.bankAccount}</span>
                </div>
                <p className="text-xs text-[#434655]">a.n. {payoutInfo.accountHolder}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payout Schedule */}
          <Card className="border-0 shadow-sm bg-[#eff4ff] rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-[#2563eb]" />
                <p className="text-sm font-semibold text-[#121c2a]">Jadwal Payout</p>
              </div>
              <p className="text-xs text-[#434655]">
                {autoPayout
                  ? `Payout otomatis setiap hari Kamis jika saldo mencapai ${formatCurrency(payoutInfo.minThreshold)}.`
                  : "Payout manual. Klik 'Tarik Dana' kapan saja."}
              </p>
              <p className="text-xs text-[#2563eb] font-medium mt-2">
                Pembayaran berikutnya: {payoutInfo.nextPayoutDate}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payout History */}
        <Card className="lg:col-span-2 border-0 shadow-sm bg-[#ffffff] rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[#121c2a]">Riwayat Payout</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#eff4ff]">
                    <th className="text-left text-xs font-medium text-[#434655] p-4">ID</th>
                    <th className="text-left text-xs font-medium text-[#434655] p-4">Tanggal</th>
                    <th className="text-right text-xs font-medium text-[#434655] p-4">Jumlah</th>
                    <th className="text-right text-xs font-medium text-[#434655] p-4">Diterima</th>
                    <th className="text-left text-xs font-medium text-[#434655] p-4">Status</th>
                    <th className="text-right text-xs font-medium text-[#434655] p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8f9ff]">
                  {payoutHistory.map((p) => {
                    const st = payoutStatusConfig[p.status];
                    const StatusIcon = st.icon;
                    return (
                      <tr key={p.id} className="hover:bg-[#f8f9ff]">
                        <td className="p-4">
                          <span className="text-sm font-mono font-medium text-[#2563eb]">{p.id}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-[#121c2a]">{p.date}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-sm font-semibold text-[#121c2a]">{formatCurrency(p.gross)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-sm font-semibold text-green-600">{formatCurrency(p.net)}</span>
                        </td>
                        <td className="p-4">
                          <Badge className={`${st.color} border-0 text-xs font-medium`}>
                            <StatusIcon className={`h-3 w-3 mr-1 ${p.status === "processing" ? "animate-spin" : ""}`} />
                            {st.label}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-[#434655] hover:text-[#121c2a] hover:bg-[#eff4ff]">
                            Detail
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
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
    </div>
  );
}
