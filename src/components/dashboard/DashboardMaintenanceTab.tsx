import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  Wrench, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  MapPin, 
  ShieldAlert, 
  Phone, 
  ArrowRight,
  Filter
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
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
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export interface MaintenanceTicket {
  id: string;
  category: string;
  description: string;
  reportedDate: string;
  depot: string;
  priority: "Emergency" | "Standard" | "Scheduled";
  status: "in_progress" | "pending" | "resolved";
  technician: string;
}

interface DashboardMaintenanceTabProps {
  tickets: MaintenanceTicket[];
  onCreateTicket: (ticket: Partial<MaintenanceTicket>) => void;
  maintDialogOpen: boolean;
  setMaintDialogOpen: (open: boolean) => void;
}

export const DashboardMaintenanceTab: React.FC<DashboardMaintenanceTabProps> = ({
  tickets,
  onCreateTicket,
  maintDialogOpen,
  setMaintDialogOpen
}) => {
  const { currentUser, showToast } = useApp();

  const [category, setCategory] = useState("Plumbing & water pressure");
  const [priority, setPriority] = useState<"Emergency" | "Standard" | "Scheduled">("Standard");
  const [description, setDescription] = useState("");
  const [depot, setDepot] = useState(currentUser?.subCity ? `${currentUser.subCity} Central Depot (Team 2)` : "Yeka Central Depot (Team 2)");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "resolved">("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onCreateTicket({
      category,
      priority,
      description,
      depot
    });

    setDescription("");
    setMaintDialogOpen(false);
  };

  const filteredTickets = tickets.filter(t => {
    if (filterStatus === "active") return t.status !== "resolved";
    if (filterStatus === "resolved") return t.status === "resolved";
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header with quick stats & filters */}
      <Card className="shadow-xs">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 space-y-0">
          <div>
            <CardTitle className="text-sm sm:text-base md:text-lg">Municipal Facility Engineering & Maintenance Dispatch</CardTitle>
            <CardDescription className="text-xs mt-1">
              Dispatched directly to the Addis Ababa City Administration sub-city maintenance depots.
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <div className="flex items-center justify-between sm:justify-start bg-[var(--color-base)] border border-[var(--color-line)] rounded-lg p-1 text-xs">
              <button
                type="button"
                onClick={() => setFilterStatus("all")}
                className={`flex-1 sm:flex-none text-center px-3 py-1 rounded-md font-medium transition-colors cursor-pointer text-xs ${
                  filterStatus === "all" ? "bg-[var(--color-surface)] text-[var(--color-ink)] font-bold shadow-xs" : "text-[var(--color-slate)]"
                }`}
              >
                All ({tickets.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("active")}
                className={`flex-1 sm:flex-none text-center px-3 py-1 rounded-md font-medium transition-colors cursor-pointer text-xs ${
                  filterStatus === "active" ? "bg-[var(--color-surface)] text-[var(--color-ink)] font-bold shadow-xs" : "text-[var(--color-slate)]"
                }`}
              >
                Active ({tickets.filter(t => t.status !== "resolved").length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("resolved")}
                className={`flex-1 sm:flex-none text-center px-3 py-1 rounded-md font-medium transition-colors cursor-pointer text-xs ${
                  filterStatus === "resolved" ? "bg-[var(--color-surface)] text-[var(--color-ink)] font-bold shadow-xs" : "text-[var(--color-slate)]"
                }`}
              >
                Resolved ({tickets.filter(t => t.status === "resolved").length})
              </button>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={() => setMaintDialogOpen(true)}
              className="w-full sm:w-auto text-xs bg-[#00594C] hover:bg-[#00473D] text-white cursor-pointer h-9 px-3.5 justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Defect</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Ticket Work Orders Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTickets.map((t) => {
          // Calculate step index
          const step = t.status === "resolved" ? 4 : t.status === "in_progress" ? 3 : 2;

          return (
            <Card key={t.id} className="hover:border-[#00594C]/40 transition-colors">
              <CardContent className="p-4 sm:p-5 space-y-4">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-line)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-num font-bold text-sm text-[var(--color-ink)]">
                      {t.id}
                    </span>
                    <Badge variant={t.status}>
                      {t.status === "in_progress" ? "Dispatched" : t.status === "pending" ? "Triage Pending" : "Resolved"}
                    </Badge>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-xs ${
                      t.priority === "Emergency" 
                        ? "bg-[#B3261E]/10 text-[#B3261E] border border-[#B3261E]/30 font-bold" 
                        : "bg-[var(--color-base)] text-[var(--color-slate)] border border-[var(--color-line)]"
                    }`}>
                      {t.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[var(--color-slate)]">
                    <span className="flex items-center gap-1 font-mono-num">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Reported: {t.reportedDate}</span>
                    </span>
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 space-y-1.5">
                    <div className="text-xs font-bold text-[var(--color-ink)] flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-[#00594C] dark:text-[#00A38C]" />
                      <span>{t.category}</span>
                    </div>
                    <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                      {t.description}
                    </p>
                  </div>

                  <div className="md:col-span-4 p-3 bg-[var(--color-base)] border border-[var(--color-line)] rounded-md space-y-1 text-xs">
                    <div className="text-[11px] text-[var(--color-slate)] font-semibold uppercase tracking-wider">
                      Assigned Depot Team
                    </div>
                    <div className="font-medium text-[var(--color-ink)] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00594C] dark:text-[#00A38C] shrink-0" />
                      <span>{t.depot}</span>
                    </div>
                    <div className="text-[11px] text-[var(--color-slate)] flex items-center gap-1 pt-1 border-t border-[var(--color-line)]">
                      <User className="w-3 h-3 text-[var(--color-slate)]" />
                      <span>Lead: <strong className="text-[var(--color-ink)]">{t.technician}</strong></span>
                    </div>
                  </div>
                </div>

                {/* 4-Stage Stepper (HeroUI style) */}
                <div className="pt-2 border-t border-[var(--color-line)]">
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                    
                    {/* Stage 1 */}
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-xs ${step >= 1 ? "bg-[#1B7A4A]" : "bg-[var(--color-line)]"}`} />
                      <span className="font-medium text-[var(--color-ink)]">1. Logged</span>
                    </div>

                    {/* Stage 2 */}
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-xs ${step >= 2 ? "bg-[#1B7A4A]" : "bg-[var(--color-line)]"}`} />
                      <span className="font-medium text-[var(--color-ink)]">2. Depot Triage</span>
                    </div>

                    {/* Stage 3 */}
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-xs ${step >= 3 ? "bg-[#00594C] dark:bg-[#00A38C]" : "bg-[var(--color-line)]"}`} />
                      <span className="font-medium text-[var(--color-ink)]">3. Dispatched</span>
                    </div>

                    {/* Stage 4 */}
                    <div className="space-y-1">
                      <div className={`h-1.5 rounded-xs ${step >= 4 ? "bg-[#1B7A4A]" : "bg-[var(--color-line)]"}`} />
                      <span className={`font-medium ${step >= 4 ? "text-[#1B7A4A] font-bold" : "text-[var(--color-slate)]"}`}>
                        4. Rectified
                      </span>
                    </div>

                  </div>
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* New Maintenance Dialog */}
      <Dialog open={maintDialogOpen} onOpenChange={setMaintDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Log Municipal Defect or Repair Request</DialogTitle>
            <DialogDescription>
              Submitted tickets are dispatched to the facility engineering teams within your sub-city.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="issue-category">Issue Category</Label>
              <select
                id="issue-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-8 px-3 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] text-xs text-[var(--color-ink)] focus:outline-hidden focus:border-[#00594C]"
              >
                <option value="Plumbing & water pressure">Plumbing & water pressure</option>
                <option value="Electrical & corridor lighting">Electrical & corridor lighting</option>
                <option value="Elevator & vertical transport">Elevator & vertical transport</option>
                <option value="Window glazing & balcony seals">Window glazing & balcony seals</option>
                <option value="Roof waterproofing & gutters">Roof waterproofing & gutters</option>
                <option value="Access control & security gate">Access control & security gate</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="urgency-priority">Priority Triage</Label>
                <select
                  id="urgency-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full h-8 px-3 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] text-xs text-[var(--color-ink)] focus:outline-hidden focus:border-[#00594C]"
                >
                  <option value="Emergency">Emergency (Active flood / power spark)</option>
                  <option value="Standard">Standard (Within 24 business hours)</option>
                  <option value="Scheduled">Scheduled routine check</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="assigned-depot">Sub-City Depot</Label>
                <Input
                  id="assigned-depot"
                  type="text"
                  value={depot}
                  onChange={(e) => setDepot(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="fault-desc">Description of Fault</Label>
              <textarea
                id="fault-desc"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify precise location (e.g. 3rd floor service riser, kitchen sink valve)..."
                className="w-full p-2.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] text-xs text-[var(--color-ink)] focus:outline-hidden focus:border-[#00594C]"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMaintDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Dispatch Work Order
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};
