import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Zap, 
  Droplet, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  AlertCircle, 
  TrendingDown, 
  TrendingUp,
  Activity,
  UploadCloud
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription 
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from "recharts";

const UTILITY_CHART_DATA = [
  { month: "Mar", electricKWh: 210, waterM3: 12, costEtb: 1140 },
  { month: "Apr", electricKWh: 225, waterM3: 13, costEtb: 1210 },
  { month: "May", electricKWh: 230, waterM3: 11, costEtb: 1195 },
  { month: "Jun", electricKWh: 245, waterM3: 15, costEtb: 1340 },
  { month: "Jul", electricKWh: 250, waterM3: 14, costEtb: 1325 },
  { month: "Aug", electricKWh: 240, waterM3: 14, costEtb: 1307 },
];

export const DashboardUtilitiesTab: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [selfReadingOpen, setSelfReadingOpen] = useState(false);
  const [meterType, setMeterType] = useState<"electric" | "water">("electric");
  const [readingValue, setReadingValue] = useState("");

  const handleReadingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!readingValue) return;

    showToast(
      `Self-reading for ${meterType === "electric" ? "EEP Electric" : "AAWSA Water"} (${readingValue}) submitted for municipal audit.`,
      "success"
    );
    setReadingValue("");
    setSelfReadingOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* EEP Electricity */}
        <Card className="hover:border-[#00594C]/40 transition-colors">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--color-slate)] uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#A6690B]" />
                <span>EEP Electricity Meter</span>
              </span>
              <Badge variant="paid">Sub-Meter Active</Badge>
            </div>

            <div>
              <div className="text-xl font-bold text-[var(--color-ink)] font-mono-num">
                240 kWh <span className="text-xs font-normal text-[var(--color-slate)]">(Aug 2026)</span>
              </div>
              <p className="text-[11px] text-[var(--color-slate)]">
                Meter No: <strong className="font-mono-num text-[var(--color-ink)]">EEP-MTR-8841-01</strong>
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[var(--color-line)] text-xs">
              <span className="text-[var(--color-slate)]">Monthly Cost:</span>
              <span className="font-mono-num font-bold text-[var(--color-ink)]">ETB 948.00</span>
            </div>
          </CardContent>
        </Card>

        {/* AAWSA Water */}
        <Card className="hover:border-[#00594C]/40 transition-colors">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--color-slate)] uppercase tracking-wider flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-[#00594C] dark:text-[#00A38C]" />
                <span>AAWSA Water Meter</span>
              </span>
              <Badge variant="paid">Sub-Meter Active</Badge>
            </div>

            <div>
              <div className="text-xl font-bold text-[var(--color-ink)] font-mono-num">
                14 m³ <span className="text-xs font-normal text-[var(--color-slate)]">(Aug 2026)</span>
              </div>
              <p className="text-[11px] text-[var(--color-slate)]">
                Meter No: <strong className="font-mono-num text-[var(--color-ink)]">AAWSA-SUB-3312</strong>
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[var(--color-line)] text-xs">
              <span className="text-[var(--color-slate)]">Monthly Cost:</span>
              <span className="font-mono-num font-bold text-[var(--color-ink)]">ETB 359.00</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Cost & Action */}
        <Card className="hover:border-[#00594C]/40 transition-colors">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--color-slate)] uppercase tracking-wider">
                Combined Billing
              </span>
              <Badge variant="approved">Audited</Badge>
            </div>

            <div>
              <div className="text-xl font-bold text-[var(--color-ink)] font-mono-num">
                ETB 1,307.00
              </div>
              <p className="text-[11px] text-[var(--color-slate)]">
                Included in direct municipal billing invoice
              </p>
            </div>

            <div className="pt-0.5">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => setSelfReadingOpen(true)}
              >
                <UploadCloud className="w-3.5 h-3.5 mr-1 text-[#00594C] dark:text-[#00A38C]" />
                <span>Submit Self-Reading Photo</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Recharts Consumption Visualizer */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Historical Sub-Meter Consumption Trends</CardTitle>
              <CardDescription>
                Monthly verification of electricity (kWh) and municipal water (m³) consumption.
              </CardDescription>
            </div>
            <span className="text-[11px] font-mono-num text-[var(--color-slate)]">
              Last 6 Cycles (2026)
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UTILITY_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-slate)" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="var(--color-slate)" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-line)",
                    borderRadius: "6px",
                    fontSize: "12px",
                    color: "var(--color-ink)"
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} 
                />
                <Bar dataKey="electricKWh" name="EEP Electricity (kWh)" fill="#00594C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="waterM3" name="AAWSA Water (m³)" fill="#1B7A4A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Self Reading Dialog */}
      <Dialog open={selfReadingOpen} onOpenChange={setSelfReadingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Sub-Meter Reading</DialogTitle>
            <DialogDescription>
              Submit your unit's current meter reading if municipal depot inspectors could not access your corridor.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleReadingSubmit} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Select Utility Meter</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMeterType("electric")}
                  className={`p-2.5 border rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    meterType === "electric"
                      ? "border-[#00594C] bg-[#E8F5F1] text-[#00594C] dark:bg-[#03241E] dark:text-[#00A38C]"
                      : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-slate)]"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>EEP Electricity</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMeterType("water")}
                  className={`p-2.5 border rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    meterType === "water"
                      ? "border-[#00594C] bg-[#E8F5F1] text-[#00594C] dark:bg-[#03241E] dark:text-[#00A38C]"
                      : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-slate)]"
                  }`}
                >
                  <Droplet className="w-3.5 h-3.5" />
                  <span>AAWSA Water</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="reading-val">
                {meterType === "electric" ? "Current kWh Dial Reading" : "Current m³ Meter Reading"}
              </Label>
              <Input
                id="reading-val"
                type="number"
                step="0.1"
                required
                placeholder={meterType === "electric" ? "e.g. 248.5" : "e.g. 15.2"}
                value={readingValue}
                onChange={(e) => setReadingValue(e.target.value)}
                className="font-mono-num"
              />
            </div>

            <div className="p-3 bg-[var(--color-base)] border border-[var(--color-line)] rounded-md text-xs text-[var(--color-slate)]">
              Depot facility inspectors will audit this submission against the block primary check-meter.
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelfReadingOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Submit Reading
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};
