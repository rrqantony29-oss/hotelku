"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  HelpCircle,
  Settings,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Save,
  Mail,
  Phone,
  Percent,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  banners,
  faqs,
  platformSettings,
  Banner,
  FAQ,
  PlatformSettings,
} from "@/data/admin-dummy";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("banners");
  const [bannerList, setBannerList] = useState(banners);
  const [faqList, setFaqList] = useState(faqs);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [settings, setSettings] = useState(platformSettings);

  const toggleBannerStatus = (id: number) => {
    setBannerList((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === "active" ? "inactive" : "active" } : b
      )
    );
  };

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const faqCategories = [...new Set(faqList.map((f) => f.category))];

  return (
    <div className="p-6 space-y-6 bg-[#f8f9ff] min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Content Management</h1>
          <p className="text-[#434655] mt-1">Kelola banner, FAQ, dan pengaturan platform</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#e6eeff] rounded-xl">
          <TabsTrigger value="banners" className="text-sm rounded-lg data-[active]:bg-white">
            <ImageIcon className="h-4 w-4 mr-1.5" />
            Banner
          </TabsTrigger>
          <TabsTrigger value="faq" className="text-sm rounded-lg data-[active]:bg-white">
            <HelpCircle className="h-4 w-4 mr-1.5" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-sm rounded-lg data-[active]:bg-white">
            <Settings className="h-4 w-4 mr-1.5" />
            Pengaturan
          </TabsTrigger>
        </TabsList>

        {/* Banner Management */}
        <TabsContent value="banners" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button className="bg-[#004ac6] hover:bg-[#003aaa] text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Banner
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bannerList.map((banner) => (
              <Card key={banner.id} className="rounded-xl border-0 shadow-sm bg-white overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-semibold text-sm truncate">{banner.title}</p>
                    <p className="text-white/80 text-xs truncate">{banner.subtitle}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleBannerStatus(banner.id)}
                      className="rounded-lg"
                    >
                      {banner.status === "active" ? (
                        <Badge className="bg-green-100 text-green-700 border-0 text-xs rounded-lg">
                          <ToggleRight className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-[#d9e3f6] text-[#434655] border-0 text-xs rounded-lg">
                          <ToggleLeft className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#e6eeff] text-[#004ac6] border-0 text-[10px] rounded-lg">
                        Order: {banner.order}
                      </Badge>
                      <span className="text-[10px] text-[#434655]">{banner.createdAt}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg hover:bg-[#e6eeff]">
                        <Edit className="h-3.5 w-3.5 text-[#004ac6]" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-lg hover:bg-[#ffdad6]">
                        <Trash2 className="h-3.5 w-3.5 text-[#ba1a1a]" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-[#434655]">
                    <ExternalLink className="h-3 w-3" />
                    <span className="truncate">{banner.link}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ Management */}
        <TabsContent value="faq" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button className="bg-[#004ac6] hover:bg-[#003aaa] text-white rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Tambah FAQ
            </Button>
          </div>

          {faqCategories.map((category) => (
            <Card key={category} className="rounded-xl border-0 shadow-sm bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-[#121c2a] flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#e6eeff] flex items-center justify-center">
                    <HelpCircle className="h-4 w-4 text-[#004ac6]" />
                  </div>
                  {category}
                  <Badge className="bg-[#e6eeff] text-[#004ac6] border-0 text-[10px] rounded-lg ml-2">
                    {faqList.filter((f) => f.category === category).length} pertanyaan
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqList
                  .filter((f) => f.category === category)
                  .sort((a, b) => a.order - b.order)
                  .map((faq) => (
                    <div
                      key={faq.id}
                      className="rounded-xl bg-[#f8f9ff] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="text-sm font-medium text-[#121c2a] pr-4">{faq.question}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-lg hover:bg-white">
                              <Edit className="h-3 w-3 text-[#004ac6]" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-lg hover:bg-[#ffdad6]">
                              <Trash2 className="h-3 w-3 text-[#ba1a1a]" />
                            </Button>
                          </div>
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="h-4 w-4 text-[#434655]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#434655]" />
                          )}
                        </div>
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4">
                          <Separator className="bg-[#e6eeff] mb-3" />
                          <p className="text-sm text-[#434655] leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Platform Settings */}
        <TabsContent value="settings" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Settings */}
            <Card className="rounded-xl border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-[#121c2a] flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#004ac6]" />
                  Pengaturan Keuangan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#121c2a] mb-2 block">
                    Tax Rate (PPN)
                  </label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={settings.taxRate}
                      onChange={(e) => setSettings((p) => ({ ...p, taxRate: Number(e.target.value) }))}
                      className="rounded-xl bg-[#f8f9ff] border-0 flex-1"
                    />
                    <div className="flex items-center gap-1.5 bg-[#e6eeff] rounded-xl px-3 py-2">
                      <Percent className="h-4 w-4 text-[#004ac6]" />
                      <span className="text-sm font-medium text-[#004ac6]">Persen</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#434655] mt-1">PPN yang dikenakan pada setiap transaksi</p>
                </div>

                <Separator className="bg-[#e6eeff]" />

                <div>
                  <label className="text-sm font-medium text-[#121c2a] mb-2 block">
                    Service Fee
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#434655]">Rp</span>
                    <Input
                      type="number"
                      value={settings.serviceFee}
                      onChange={(e) => setSettings((p) => ({ ...p, serviceFee: Number(e.target.value) }))}
                      className="rounded-xl bg-[#f8f9ff] border-0 flex-1"
                    />
                  </div>
                  <p className="text-xs text-[#434655] mt-1">Biaya layanan tetap per transaksi</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Settings */}
            <Card className="rounded-xl border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-[#121c2a] flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#004ac6]" />
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#121c2a] mb-2 block flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#434655]" />
                    Email Support
                  </label>
                  <Input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings((p) => ({ ...p, contactEmail: e.target.value }))}
                    className="rounded-xl bg-[#f8f9ff] border-0"
                  />
                  <p className="text-xs text-[#434655] mt-1">Email yang ditampilkan ke pengguna</p>
                </div>

                <Separator className="bg-[#e6eeff]" />

                <div>
                  <label className="text-sm font-medium text-[#121c2a] mb-2 block flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#434655]" />
                    Telepon Support
                  </label>
                  <Input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings((p) => ({ ...p, contactPhone: e.target.value }))}
                    className="rounded-xl bg-[#f8f9ff] border-0"
                  />
                  <p className="text-xs text-[#434655] mt-1">Nomor telepon customer service</p>
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card className="rounded-xl border-0 shadow-sm bg-white lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-[#121c2a] flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[#004ac6]" />
                  Pengaturan Sistem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#f8f9ff]">
                  <div>
                    <p className="text-sm font-medium text-[#121c2a]">Maintenance Mode</p>
                    <p className="text-xs text-[#434655] mt-0.5">
                      Aktifkan untuk menonaktifkan akses publik sementara
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings((p) => ({ ...p, maintenanceMode: !p.maintenanceMode }))}
                    className="shrink-0"
                  >
                    {settings.maintenanceMode ? (
                      <Badge className="bg-[#ffdad6] text-[#ba1a1a] border-0 text-xs rounded-lg px-3 py-1.5">
                        <ToggleRight className="h-4 w-4 mr-1" />
                        Aktif
                      </Badge>
                    ) : (
                      <Badge className="bg-[#e6eeff] text-[#434655] border-0 text-xs rounded-lg px-3 py-1.5">
                        <ToggleLeft className="h-4 w-4 mr-1" />
                        Nonaktif
                      </Badge>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <Button className="bg-[#004ac6] hover:bg-[#003aaa] text-white rounded-xl">
              <Save className="h-4 w-4 mr-2" />
              Simpan Pengaturan
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
