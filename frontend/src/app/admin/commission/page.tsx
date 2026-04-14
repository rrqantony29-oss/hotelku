"use client";

import { useState, useMemo } from "react";
import {
  Save,
  Calculator,
  Percent,
  Building2,
  ArrowRight,
  RotateCcw,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  commissionSettings,
  formatCurrency,
  CommissionSetting,
} from "@/data/admin-dummy";

export default function AdminCommissionPage() {
  const [globalCommission, setGlobalCommission] = useState(10);
  const [globalMarkup, setGlobalMarkup] = useState(5);
  const [previewBasePrice, setPreviewBasePrice] = useState(1000000);
  const [overrides, setOverrides] = useState<Record<number, { commission: number | null; markup: number | null }>>({});

  const pricePreview = useMemo(() => {
    const commission = previewBasePrice * (globalCommission / 100);
    const afterCommission = previewBasePrice - commission;
    const markup = previewBasePrice * (globalMarkup / 100);
    const customerPrice = previewBasePrice + markup;
    return { base: previewBasePrice, commission, afterCommission, markup, customerPrice };
  }, [previewBasePrice, globalCommission, globalMarkup]);

  const getEffectiveRate = (setting: CommissionSetting, type: "commission" | "markup") => {
    const override = overrides[setting.id];
    if (type === "commission") {
      return override?.commission ?? setting.customCommission ?? globalCommission;
    }
    return override?.markup ?? setting.customMarkup ?? globalMarkup;
  };

  const handleOverrideChange = (id: number, type: "commission" | "markup", value: string) => {
    const numValue = value === "" ? null : Number(value);
    setOverrides((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: numValue,
      },
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-[#f8f9ff] min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#121c2a]">Commission & Markup</h1>
          <p className="text-[#434655] mt-1">Atur rate komisi dan markup untuk platform</p>
        </div>
        <Button className="bg-[#004ac6] hover:bg-[#003aaa] text-white rounded-xl">
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Global Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-xl border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#121c2a] flex items-center gap-2">
                <Percent className="h-5 w-5 text-[#004ac6]" />
                Global Default Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Commission Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-[#121c2a]">Commission Rate</p>
                    <p className="text-xs text-[#434655]">Persentase komisi dari harga partner</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={globalCommission}
                      onChange={(e) => setGlobalCommission(Number(e.target.value))}
                      className="w-20 text-right rounded-xl bg-[#f8f9ff] border-0"
                      min={0}
                      max={100}
                    />
                    <span className="text-sm font-medium text-[#434655]">%</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={0.5}
                    value={globalCommission}
                    onChange={(e) => setGlobalCommission(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #004ac6 0%, #004ac6 ${(globalCommission / 30) * 100}%, #e6eeff ${(globalCommission / 30) * 100}%, #e6eeff 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-[#434655] mt-1">
                    <span>0%</span>
                    <span>15%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>

              <Separator className="bg-[#e6eeff]" />

              {/* Markup Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-[#121c2a]">Markup Rate</p>
                    <p className="text-xs text-[#434655]">Persentase markup ke harga customer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={globalMarkup}
                      onChange={(e) => setGlobalMarkup(Number(e.target.value))}
                      className="w-20 text-right rounded-xl bg-[#f8f9ff] border-0"
                      min={0}
                      max={100}
                    />
                    <span className="text-sm font-medium text-[#434655]">%</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={20}
                    step={0.5}
                    value={globalMarkup}
                    onChange={(e) => setGlobalMarkup(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(globalMarkup / 20) * 100}%, #e6eeff ${(globalMarkup / 20) * 100}%, #e6eeff 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-[#434655] mt-1">
                    <span>0%</span>
                    <span>10%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Per-Hotel Overrides */}
          <Card className="rounded-xl border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#121c2a] flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#004ac6]" />
                Per-Hotel Override
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e6eeff]">
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Hotel</th>
                      <th className="text-left text-xs font-medium text-[#434655] p-4">Partner</th>
                      <th className="text-center text-xs font-medium text-[#434655] p-4">Commission (%)</th>
                      <th className="text-center text-xs font-medium text-[#434655] p-4">Markup (%)</th>
                      <th className="text-center text-xs font-medium text-[#434655] p-4">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f8f9ff]">
                    {commissionSettings.map((setting) => {
                      const hasOverride = setting.customCommission !== null || setting.customMarkup !== null;
                      return (
                        <tr key={setting.id} className="hover:bg-[#eff4ff]/50">
                          <td className="p-4">
                            <p className="text-sm font-medium text-[#121c2a]">{setting.hotelName}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-[#434655]">{setting.partnerName}</p>
                          </td>
                          <td className="p-4 text-center">
                            <Input
                              type="number"
                              value={overrides[setting.id]?.commission ?? setting.customCommission ?? ""}
                              onChange={(e) => handleOverrideChange(setting.id, "commission", e.target.value)}
                              placeholder={`${globalCommission}%`}
                              className="w-20 text-center mx-auto rounded-xl bg-[#f8f9ff] border-0 text-sm"
                              min={0}
                              max={100}
                            />
                          </td>
                          <td className="p-4 text-center">
                            <Input
                              type="number"
                              value={overrides[setting.id]?.markup ?? setting.customMarkup ?? ""}
                              onChange={(e) => handleOverrideChange(setting.id, "markup", e.target.value)}
                              placeholder={`${globalMarkup}%`}
                              className="w-20 text-center mx-auto rounded-xl bg-[#f8f9ff] border-0 text-sm"
                              min={0}
                              max={100}
                            />
                          </td>
                          <td className="p-4 text-center">
                            {hasOverride ? (
                              <Badge className="bg-[#ffddb8] text-[#784b00] border-0 text-xs rounded-lg">Custom</Badge>
                            ) : (
                              <Badge className="bg-[#e6eeff] text-[#004ac6] border-0 text-xs rounded-lg">Default</Badge>
                            )}
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

        {/* Price Preview Calculator */}
        <div>
          <Card className="rounded-xl border-0 shadow-sm bg-white sticky top-24">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#121c2a] flex items-center gap-2">
                <Calculator className="h-5 w-5 text-[#004ac6]" />
                Price Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#434655] mb-1.5 block">Base Price (Harga Partner)</label>
                <Input
                  type="number"
                  value={previewBasePrice}
                  onChange={(e) => setPreviewBasePrice(Number(e.target.value))}
                  className="rounded-xl bg-[#f8f9ff] border-0"
                />
              </div>

              <div className="space-y-3">
                {/* Flow visualization */}
                <div className="bg-[#f8f9ff] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#434655]">Base Price</span>
                    <span className="text-sm font-semibold text-[#121c2a]">{formatCurrency(pricePreview.base)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#434655]">
                    <div className="flex-1 h-px bg-[#d9e3f6]" />
                    <span className="text-[10px]">-{globalCommission}% komisi</span>
                    <div className="flex-1 h-px bg-[#d9e3f6]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#434655]">Partner Receives</span>
                    <span className="text-sm font-semibold text-green-600">{formatCurrency(pricePreview.afterCommission)}</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#ffdad6]/50 rounded-lg p-2">
                    <span className="text-xs text-[#ba1a1a]">Platform Commission</span>
                    <span className="text-sm font-semibold text-[#ba1a1a]">{formatCurrency(pricePreview.commission)}</span>
                  </div>

                  <Separator className="bg-[#d9e3f6]" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#434655]">+{globalMarkup}% markup</span>
                    <span className="text-sm font-medium text-[#784b00]">{formatCurrency(pricePreview.markup)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#434655]">
                    <div className="flex-1 h-px bg-[#d9e3f6]" />
                    <ArrowRight className="h-3 w-3" />
                    <div className="flex-1 h-px bg-[#d9e3f6]" />
                  </div>

                  <div className="bg-[#004ac6] rounded-xl p-3 text-center">
                    <p className="text-xs text-blue-200 mb-0.5">Customer Pays</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(pricePreview.customerPrice)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#eff4ff] rounded-xl p-3">
                  <Info className="h-4 w-4 text-[#004ac6] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#434655]">
                    Formula: Customer Price = Base Price + (Base Price × Markup%) 
                    <br />
                    Platform Revenue = Base Price × Commission%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
