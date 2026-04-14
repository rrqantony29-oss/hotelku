"use client";

import { useState } from "react";
import {
  Search,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Ban,
  MapPin,
  Building2,
  Mail,
  Phone,
  DollarSign,
  Hotel,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency, adminPartners, AdminPartner } from "@/data/admin-dummy";

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  verified: { label: "Verified", color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-[#ffddb8] text-[#784b00]", icon: Clock },
  rejected: { label: "Rejected", color: "bg-[#ffdad6] text-[#ba1a1a]", icon: XCircle },
  suspended: { label: "Suspended", color: "bg-[#d9e3f6] text-[#434655]", icon: Ban },
};

export default function AdminPartnersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState<AdminPartner | null>(null);

  const filteredPartners = adminPartners
    .filter((p) => {
      const matchesSearch =
        p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || p.status === activeTab;
      return matchesSearch && matchesTab;
    });

  const tabCounts = {
    all: adminPartners.length,
    pending: adminPartners.filter((p) => p.status === "pending").length,
    verified: adminPartners.filter((p) => p.status === "verified").length,
    rejected: adminPartners.filter((p) => p.status === "rejected").length,
  };

  return (
    <div className="p-6 space-y-6 bg-[#f8f9ff] min-h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#121c2a]">Partner Management</h1>
        <p className="text-[#434655] mt-1">Kelola dan verifikasi hotel partner</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#121c2a]">{adminPartners.length}</p>
            <p className="text-xs text-[#434655] mt-0.5">Total Partner</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#784b00]">{tabCounts.pending}</p>
            <p className="text-xs text-[#434655] mt-0.5">Menunggu Verifikasi</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{tabCounts.verified}</p>
            <p className="text-xs text-[#434655] mt-0.5">Terverifikasi</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#ba1a1a]">{tabCounts.rejected}</p>
            <p className="text-xs text-[#434655] mt-0.5">Ditolak</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#434655]" />
        <Input
          placeholder="Cari nama perusahaan, PIC, atau kota..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl bg-white border-0 shadow-sm"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#e6eeff] rounded-xl">
          <TabsTrigger value="all" className="text-sm rounded-lg data-[active]:bg-white">Semua ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="pending" className="text-sm rounded-lg data-[active]:bg-white">Pending ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value="verified" className="text-sm rounded-lg data-[active]:bg-white">Verified ({tabCounts.verified})</TabsTrigger>
          <TabsTrigger value="rejected" className="text-sm rounded-lg data-[active]:bg-white">Rejected ({tabCounts.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card className="rounded-xl border-0 shadow-sm bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e6eeff]">
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Perusahaan</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">PIC</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Kota</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Hotel</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Booking</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Revenue</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Status</th>
                      <th className="text-right text-xs font-medium text-[#434655] p-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f8f9ff]">
                    {filteredPartners.map((partner) => {
                      const status = statusConfig[partner.status];
                      const StatusIcon = status.icon;

                      return (
                        <tr key={partner.id} className="hover:bg-[#eff4ff]/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#e6eeff] flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-[#004ac6]">
                                  {partner.companyName.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#121c2a]">{partner.companyName}</p>
                                <p className="text-[10px] text-[#434655]">{partner.joinedAt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-[#121c2a]">{partner.picName}</p>
                            <p className="text-xs text-[#434655]">{partner.email}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-[#434655]" />
                              <span className="text-sm text-[#121c2a]">{partner.city}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-medium text-[#121c2a]">{partner.hotelCount}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-medium text-[#121c2a]">{partner.totalBookings}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-semibold text-[#121c2a]">
                              {partner.totalRevenue > 0 ? formatCurrency(partner.totalRevenue) : "-"}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge className={`${status.color} border-0 text-xs font-medium rounded-lg`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {partner.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg"
                                    title="Verifikasi"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 text-[#ba1a1a] hover:text-red-700 hover:bg-[#ffdad6] rounded-lg"
                                    title="Tolak"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {partner.status === "verified" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 text-[#ba1a1a] hover:text-red-700 hover:bg-[#ffdad6] rounded-lg"
                                  title="Suspend"
                                >
                                  <Ban className="h-4 w-4" />
                                </Button>
                              )}
                              <Dialog>
                                <DialogTrigger>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 rounded-lg"
                                    onClick={() => setSelectedPartner(partner)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-lg rounded-xl">
                                  <DialogHeader>
                                    <DialogTitle>Detail Partner</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    {/* Company Info */}
                                    <div className="flex items-start gap-4">
                                      <div className="w-14 h-14 rounded-xl bg-[#e6eeff] flex items-center justify-center shrink-0">
                                        <Building2 className="h-7 w-7 text-[#004ac6]" />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-semibold text-[#121c2a]">{partner.companyName}</h3>
                                        <Badge className={`${status.color} border-0 text-xs mt-1 rounded-lg`}>
                                          <StatusIcon className="h-3 w-3 mr-1" />
                                          {status.label}
                                        </Badge>
                                      </div>
                                    </div>

                                    <Separator className="bg-[#e6eeff]" />

                                    {/* Contact */}
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="bg-[#f8f9ff] rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 text-[#434655] mb-1">
                                          <Users className="h-3 w-3" />
                                          <span className="text-xs">PIC</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#121c2a]">{partner.picName}</p>
                                      </div>
                                      <div className="bg-[#f8f9ff] rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 text-[#434655] mb-1">
                                          <MapPin className="h-3 w-3" />
                                          <span className="text-xs">Kota</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#121c2a]">{partner.city}</p>
                                      </div>
                                      <div className="bg-[#f8f9ff] rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 text-[#434655] mb-1">
                                          <Mail className="h-3 w-3" />
                                          <span className="text-xs">Email</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#121c2a] truncate">{partner.email}</p>
                                      </div>
                                      <div className="bg-[#f8f9ff] rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 text-[#434655] mb-1">
                                          <Phone className="h-3 w-3" />
                                          <span className="text-xs">Telepon</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#121c2a]">{partner.phone}</p>
                                      </div>
                                    </div>

                                    {/* Stats (for verified partners) */}
                                    {partner.status === "verified" && (
                                      <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-[#eff4ff] rounded-xl p-3 text-center">
                                          <Hotel className="h-4 w-4 text-[#004ac6] mx-auto mb-1" />
                                          <p className="text-lg font-bold text-[#004ac6]">{partner.hotelCount}</p>
                                          <p className="text-[10px] text-[#434655]">Hotel</p>
                                        </div>
                                        <div className="bg-green-50 rounded-xl p-3 text-center">
                                          <Users className="h-4 w-4 text-green-600 mx-auto mb-1" />
                                          <p className="text-lg font-bold text-green-700">{partner.totalBookings}</p>
                                          <p className="text-[10px] text-green-600">Booking</p>
                                        </div>
                                        <div className="bg-[#ffddb8]/50 rounded-xl p-3 text-center">
                                          <DollarSign className="h-4 w-4 text-[#784b00] mx-auto mb-1" />
                                          <p className="text-sm font-bold text-[#784b00]">
                                            {(partner.totalRevenue / 1000000).toFixed(0)}jt
                                          </p>
                                          <p className="text-[10px] text-[#784b00]">Revenue</p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Documents */}
                                    <div>
                                      <p className="text-xs font-semibold text-[#434655] uppercase mb-2">Dokumen</p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {partner.documents.map((doc) => (
                                          <Badge key={doc} className="bg-[#e6eeff] text-[#004ac6] border-0 text-xs rounded-lg">
                                            <FileText className="h-3 w-3 mr-1" />
                                            {doc}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Actions */}
                                    {partner.status === "pending" && (
                                      <div className="flex gap-2 pt-2">
                                        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl">
                                          <CheckCircle className="h-4 w-4 mr-1.5" />
                                          Verifikasi
                                        </Button>
                                        <Button variant="outline" className="flex-1 text-[#ba1a1a] hover:text-red-700 hover:bg-[#ffdad6] rounded-xl border-[#e6eeff]">
                                          <XCircle className="h-4 w-4 mr-1.5" />
                                          Tolak
                                        </Button>
                                      </div>
                                    )}
                                    {partner.status === "verified" && (
                                      <div className="flex gap-2 pt-2">
                                        <Button variant="outline" className="flex-1 text-[#ba1a1a] hover:text-red-700 hover:bg-[#ffdad6] rounded-xl border-[#e6eeff]">
                                          <Ban className="h-4 w-4 mr-1.5" />
                                          Suspend
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
