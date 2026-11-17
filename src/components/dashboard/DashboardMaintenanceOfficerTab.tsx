import React, { useState } from "react";
import { 
  Wrench, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ShieldAlert, 
  Package, 
  Search, 
  Filter, 
  PhoneCall, 
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { MOCK_DISPATCH_WORK_ORDERS } from "../../data/mockData";
import { DispatchWorkOrder } from "../../types";
import { useApp } from "../../context/AppContext";

export const DashboardMaintenanceOfficerTab: React.FC = () => {
  const { showToast } = useApp();
  const [workOrders, setWorkOrders] = useState<DispatchWorkOrder[]>(MOCK_DISPATCH_WORK_ORDERS);
  const [tradeFilter, setTradeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Municipal Spare Parts State
  const [inventory, setInventory] = useState([
    {
      id: "PRT-01",
      name: "Submersible Well & Sump Pump (3.5 HP, 3-Phase)",
      sku: "PUMP-SUB-35HP",
      depot: "Central Logistics Depot",
      stock: 8,
      minStock: 4,
      unitPriceEtb: 48000,
      status: "In Stock"
    },
    {
      id: "PRT-02",
      name: "Main Building Three-Pole MCB Breaker (100A, 400V)",
      sku: "ELEC-MCB-100A",
      depot: "Yeka Central Depot",
      stock: 14,
      minStock: 6,
      unitPriceEtb: 6200,
      status: "In Stock"
    },
    {
      id: "PRT-03",
      name: "Copper Riser Pipe (2.5 Inch Type L, 6m Length)",
      sku: "PLUMB-COP-25",
      depot: "Kirkos Sub-City Station",
      stock: 3,
      minStock: 8,
      unitPriceEtb: 14500,
      status: "Low Stock Alert"
    },
    {
      id: "PRT-04",
      name: "High-Output Commercial Elevator Door Sensor Curtain",
      sku: "ELEV-SNS-CURT",
      depot: "Central Logistics Depot",
      stock: 5,
      minStock: 2,
      unitPriceEtb: 22000,
      status: "In Stock"
    }
  ]);

  const handleUpdateOrderStatus = (orderId: string, nextStatus: DispatchWorkOrder["status"]) => {
    setWorkOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        showToast(`Work order ${orderId} updated to: ${nextStatus.replace(/_/g, " ")}.`, "success");
        return { ...order, status: nextStatus };
      }
      return order;
    }));
  };

  const handleOrderParts = (partName: string) => {
    showToast(`Municipal requisition submitted for 10 units of "${partName}". Dispatched to procurement.`, "info");
  };

  const filteredOrders = workOrders.filter(order => {
    const matchesTrade = tradeFilter === "all" || order.trade === tradeFilter;
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrade && matchesPriority && matchesSearch;
  });

  const emergencyCount = workOrders.filter(w => w.priority === "Emergency").length;
  const inProgressCount = workOrders.filter(w => w.status === "in_progress" || w.status === "technician_en_route").length;

  return (
    <div className="space-y-6">
      
      {/* Maintenance Operations Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Active Dispatch Orders</span>
            <Wrench className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[var(--color-ink)]">
            24 Orders
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            {inProgressCount} currently field deployed
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Emergency Priority</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-700 dark:text-rose-400">
            {emergencyCount} Urgent
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            4-hour SLA response active
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Technicians on Duty</span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            18 Crews
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            11 Sub-City Depots operational
          </div>
        </Card>

        <Card className="border-[var(--color-line)] p-4 bg-white dark:bg-[#121212] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-1">
            <span className="font-medium">Avg Dispatch Latency</span>
            <Clock className="w-4 h-4 text-[#00594C]" />
          </div>
          <div className="text-2xl font-bold text-[#00473D] dark:text-[#00A38C]">
            1.8 Hours
          </div>
          <div className="text-[11px] text-[var(--color-slate)] mt-1">
            Exceeding municipal target
          </div>
        </Card>
      </div>

      {/* Depot Work Order Dispatch Desk */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#00594C]" />
                <span>Municipal Maintenance Depot Dispatch Desk</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Triage incoming resident and building manager defect reports, assign depot technicians, and enforce SLA deadlines.
              </CardDescription>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[160px]">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
                <Input
                  type="text"
                  placeholder="Search order ID or site..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-xs bg-slate-50 dark:bg-[#121212]"
                />
              </div>

              <select
                value={tradeFilter}
                onChange={(e) => setTradeFilter(e.target.value)}
                className="h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-lg font-medium text-[var(--color-ink)]"
              >
                <option value="all">All Trades</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Elevator">Elevator</option>
                <option value="Roofing">Roofing</option>
                <option value="Carpentry & Locks">Carpentry</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-[var(--color-line)] rounded-lg font-medium text-[var(--color-ink)]"
              >
                <option value="all">All Priorities</option>
                <option value="Emergency">Emergency (4h)</option>
                <option value="Urgent">Urgent (24h)</option>
                <option value="Standard">Standard (48h)</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-line)]">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[var(--color-ink)]">{order.id}</span>
                    <span 
                      className={`text-xs font-bold ${
                        order.priority === "Emergency" 
                          ? "text-rose-700 dark:text-rose-400" 
                          : order.priority === "Urgent" 
                          ? "text-amber-700 dark:text-amber-400" 
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {order.priority}
                    </span>
                    <span>•</span>
                    <span className="text-[#00473D] dark:text-[#00A38C] font-semibold text-xs">
                      {order.trade}
                    </span>
                    <span className="text-xs text-[var(--color-slate)]">• {order.depotStation}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--color-slate)]">
                      SLA: <strong className={order.slaRemainingHours < 3 ? "text-rose-600 font-bold" : "text-emerald-600"}>
                        {order.slaRemainingHours}h remaining
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="font-semibold text-[var(--color-ink)]">{order.siteName} • {order.unitNumber}</div>
                    <div className="text-[11px] text-[var(--color-slate)]">{order.subCity}</div>
                  </div>
                  <div>
                    <div className="text-[var(--color-slate)]">Reported by: <span className="font-medium text-[var(--color-ink)]">{order.reportedBy}</span></div>
                    <div className="text-[11px] text-[var(--color-slate)]">{order.reportedDate}</div>
                  </div>
                  <div>
                    <div className="text-[var(--color-slate)]">Assigned Tech: <span className="font-medium text-[var(--color-ink)]">{order.assignedTechnician || "Unassigned"}</span></div>
                    <div className="text-[11px] text-[var(--color-slate)]">Est. Budget: ETB {order.estimatedCostEtb.toLocaleString()}</div>
                  </div>
                </div>

                <div className="text-xs text-[var(--color-slate)] bg-slate-50 dark:bg-[#121212] p-2.5 rounded-lg border border-[var(--color-line)]">
                  <span className="font-semibold text-[var(--color-ink)]">Technician Brief: </span>
                  {order.notes}
                </div>

                {/* Status Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-[#1E1E1E]">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-slate)]">
                    <span>Status:</span>
                    <span className="capitalize text-xs font-semibold text-[var(--color-ink)]">
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status !== "technician_en_route" && order.status !== "resolved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, "technician_en_route")}
                        className="h-7 text-xs px-2.5 border-[var(--color-line)]"
                      >
                        <Truck className="w-3 h-3 mr-1 text-[#00594C]" />
                        <span>Dispatch Crew</span>
                      </Button>
                    )}

                    {order.status !== "in_progress" && order.status !== "resolved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, "in_progress")}
                        className="h-7 text-xs px-2.5 border-[var(--color-line)]"
                      >
                        <Wrench className="w-3 h-3 mr-1 text-amber-600" />
                        <span>Start Work</span>
                      </Button>
                    )}

                    {order.status !== "resolved" && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, "resolved")}
                        className="h-7 text-xs px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        <span>Sign-off & Close</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Municipal Depot Inventory & Parts Reserve */}
      <Card className="border-[var(--color-line)] shadow-xs">
        <CardHeader className="pb-3 border-b border-[var(--color-line)]">
          <CardTitle className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#00594C]" />
            <span>Sub-City Depots Spare Parts Inventory</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Critical maintenance replacement inventory: commercial pumps, circuit breakers, copper risers, and elevator electronics.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inventory.map((item) => (
              <div 
                key={item.id} 
                className="p-3.5 rounded-xl border border-[var(--color-line)] bg-slate-50/50 dark:bg-[#121212]/50 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-xs text-[var(--color-ink)]">{item.name}</div>
                      <div className="text-[11px] font-mono text-[var(--color-slate)]">{item.sku} • {item.depot}</div>
                    </div>
                    <span 
                      className={`text-xs font-semibold ${
                        item.stock <= item.minStock 
                          ? "text-rose-700 dark:text-rose-400" 
                          : "text-emerald-700 dark:text-emerald-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs mt-2 text-[var(--color-slate)]">
                    <span>Stock: <strong className="text-[var(--color-ink)]">{item.stock} units</strong></span>
                    <span>Min Buffer: {item.minStock}</span>
                    <span>Unit: ETB {item.unitPriceEtb.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOrderParts(item.name)}
                    className="h-7 text-xs px-2.5 border-[var(--color-line)]"
                  >
                    Requisition Parts
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
