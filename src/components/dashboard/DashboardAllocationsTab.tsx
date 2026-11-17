import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Building2,
  Check,
  X
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Button } from "../ui/button";

export const DashboardAllocationsTab: React.FC = () => {
  const { allocationApplications, showToast } = useApp();
  const [filterSubCity, setFilterSubCity] = useState("all");

  const handleApprove = (id: string, name: string) => {
    showToast(`Allocation application ${id} for ${name} approved. Formal allotment notice queued.`, "success");
  };

  const handleWaitlist = (id: string) => {
    showToast(`Application ${id} moved to municipal waitlist queue.`, "info");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xs">
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg">
                Civil Service Housing Allocation Queue
              </CardTitle>
              <CardDescription className="text-xs">
                Review verified public servants, quota priority scores, and unit allotment determinations.
              </CardDescription>
            </div>
            <div className="text-xs font-semibold text-[#00594C]">
              {allocationApplications.length} Active Applicants
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Application ID</TableHead>
                  <TableHead className="text-xs">Applicant Legal Name</TableHead>
                  <TableHead className="text-xs">Employer / Agency</TableHead>
                  <TableHead className="text-xs">Preference</TableHead>
                  <TableHead className="text-xs">Quota Score</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-right text-xs">Officer Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocationApplications.map((app) => (
                  <TableRow key={app.id} className="text-xs">
                    <TableCell className="font-mono font-semibold text-[var(--color-ink)]">
                      {app.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-[var(--color-ink)]">{app.applicantName}</div>
                      <div className="text-[10px] text-[var(--color-slate)] font-mono">{app.faydaId}</div>
                    </TableCell>
                    <TableCell className="text-[var(--color-slate)]">
                      {app.employer}
                    </TableCell>
                    <TableCell>
                      <div>{app.subCityPreference}</div>
                      <div className="text-[10px] text-[var(--color-slate)]">{app.bedroomPreference} Bedrooms</div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono-num font-bold text-sm text-[#00594C]">
                        {app.priorityScore} / 100
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        app.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : app.status === "under_review"
                          ? "bg-emerald-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {app.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(app.id, app.applicantName)}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] h-7 px-2 font-semibold"
                        >
                          <Check className="w-3 h-3 mr-0.5" />
                          <span>Allot</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleWaitlist(app.id)}
                          className="text-[11px] h-7 px-2 border-[var(--color-line)] text-[var(--color-slate)]"
                        >
                          Waitlist
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
