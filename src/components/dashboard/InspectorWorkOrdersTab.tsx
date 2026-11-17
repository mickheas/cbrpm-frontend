import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Building2, 
  Phone, 
  Check, 
  User, 
  Calendar,
  Filter
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface WorkOrder {
  id: string;
  building: string;
  unit: string;
  subCity: string;
  category: "Plumbing" | "Electrical" | "Structural" | "Sanitary Riser";
  description: string;
  reportedBy: string;
  contactPhone: string;
  assignedTechnician: string;
  priority: "Standard" | "Urgent" | "Emergency";
  status: "dispatched" | "parts_pending" | "in_progress" | "completed";
  loggedDate: string;
}

const INITIAL_ORDERS: WorkOrder[] = [
  {
    id: "WO-2026-9041",
    building: "Gerji Imperial Residence (Block 4)",
    unit: "Unit B-402",
    subCity: "Yeka Sub-City",
    category: "Plumbing",
    description: "Main supply riser valve washer replacement on floor 3-4 service shaft. Water pressure imbalance reported.",
    reportedBy: "Dr. Tewodros Kassahun",
    contactPhone: "+251 91 144 8921",
    assignedTechnician: "Tech. Solomon Bekele (Yeka Depot Team 2)",
    priority: "Standard",
    status: "in_progress",
    loggedDate: "18 Sep 2026"
  },
  {
    id: "WO-2026-9012",
    building: "Bole Bulbula Civil Service Court (Block 7)",
    unit: "Corridor West Landing",
    subCity: "Bole Sub-City",
    category: "Electrical",
    description: "Main floor distribution board breaker trip caused by rainwater seepage through window reveal seal.",
    reportedBy: "Building Committee Rep. Almaz Tefera",
    contactPhone: "+251 92 331 4055",
    assignedTechnician: "Tech. Dawit Hailu (Electrical Crew)",
    priority: "Urgent",
    status: "parts_pending",
    loggedDate: "17 Sep 2026"
  },
  {
    id: "WO-2026-8994",
    building: "Lideta Commercial Center (Block C)",
    unit: "Shop G-12",
    subCity: "Lideta Sub-City",
    category: "Sanitary Riser",
    description: "Waste pipe clearing and trap replacement following commercial unit plumbing blockage.",
    reportedBy: "Tenant Abebe Worku",
    contactPhone: "+251 93 550 1192",
    assignedTechnician: "Tech. Getachew Tadesse (Sanitary Div.)",
    priority: "Standard",
    status: "completed",
    loggedDate: "14 Sep 2026"
  }
];

export const InspectorWorkOrdersTab: React.FC = () => {
  const { showToast } = useApp();
  const [orders, setOrders] = useState<WorkOrder[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<string>("All");

  const handleUpdateStatus = (id: string, newStatus: WorkOrder["status"]) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
    showToast(`Work order ${id} marked as ${newStatus.replace("_", " ")}.`, "success");
  };

  const filteredOrders = orders.filter(o => {
    if (filter === "All") return true;
    if (filter === "Active") return o.status !== "completed";
    if (filter === "Completed") return o.status === "completed";
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#E8F5F1] dark:bg-[#121212] border border-[#00594C]/20 dark:border-[#00A38C]/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00594C] dark:text-[#00A38C]">
            <Wrench className="w-4 h-4" />
            <span>Municipal Depot Maintenance Dispatch</span>
          </div>
          <h2 className="text-base font-bold text-[var(--color-ink)]">
            Active Defect Work Orders & Field Repair Tasks
          </h2>
          <p className="text-xs text-[var(--color-slate)]">
            Track technician dispatch, parts requisitions, and completion sign-offs for public housing units.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-[#1A1A1A] p-1 rounded-lg border border-[var(--color-line)] shrink-0">
          {["All", "Active", "Completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === f
                  ? "bg-[#00594C] text-white"
                  : "text-[var(--color-slate)] hover:text-[var(--color-ink)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map(order => (
          <Card key={order.id} className="shadow-xs hover:border-[#00594C]/30 transition-colors">
            <CardContent className="p-4 sm:p-5 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-line)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[var(--color-ink)]">
                    {order.id}
                  </span>
                  <Badge 
                    variant={
                      order.status === "completed" 
                        ? "approved" 
                        : order.status === "parts_pending" 
                        ? "rejected" 
                        : "pending"
                    }
                    className="text-[11px] py-0.5"
                  >
                    {order.status === "completed" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {order.status === "in_progress" && <Clock className="w-3 h-3 text-[#00594C] animate-spin" />}
                    {order.status === "parts_pending" && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                    <span>{order.status.replace("_", " ").toUpperCase()}</span>
                  </Badge>

                  {order.priority === "Urgent" && (
                    <Badge variant="destructive" className="text-[10px] py-0.5">
                      Urgent
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-[var(--color-slate)] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Logged: {order.loggedDate}</span>
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[var(--color-slate)] block text-[11px]">Location & Unit:</span>
                  <strong className="text-[var(--color-ink)] block">{order.building}</strong>
                  <span className="text-[var(--color-slate)]">{order.unit} • {order.subCity}</span>
                </div>

                <div>
                  <span className="text-[var(--color-slate)] block text-[11px]">Reported By & Tenant:</span>
                  <strong className="text-[var(--color-ink)] block">{order.reportedBy}</strong>
                  <span className="text-[var(--color-slate)] font-mono">{order.contactPhone}</span>
                </div>

                <div>
                  <span className="text-[var(--color-slate)] block text-[11px]">Assigned Municipal Technician:</span>
                  <strong className="text-[#00594C] block">{order.assignedTechnician}</strong>
                  <span className="text-[var(--color-slate)]">Category: {order.category}</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[var(--color-subtle)] p-3 rounded-md text-xs text-[var(--color-ink)]/90 leading-relaxed">
                <strong>Scope of Work:</strong> {order.description}
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--color-line)]">
                <span className="text-[11px] text-[var(--color-slate)]">
                  Sub-City Maintenance Depot Protocol
                </span>

                <div className="flex items-center gap-2">
                  {order.status !== "in_progress" && order.status !== "completed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(order.id, "in_progress")}
                      className="text-xs h-7 border-[var(--color-line)]"
                    >
                      <span>Mark In-Progress</span>
                    </Button>
                  )}

                  {order.status !== "parts_pending" && order.status !== "completed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(order.id, "parts_pending")}
                      className="text-xs h-7 border-[var(--color-line)]"
                    >
                      <span>Flag Parts Needed</span>
                    </Button>
                  )}

                  {order.status !== "completed" && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, "completed")}
                      className="text-xs h-7 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      <span>Sign-off Complete</span>
                    </Button>
                  )}
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};
