import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  FileText,
  Building2,
  Users
} from "lucide-react";

export const CareersPage: React.FC = () => {
  const { showToast } = useApp();

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const jobs = [
    {
      id: "JOB-2025-01",
      title: "Senior Civil Structural Engineer (Residential Towers)",
      department: "Engineering & Construction Supervision",
      location: "Head Office / Bole Sites",
      type: "Permanent Civil Service",
      deadline: "March 30, 2025",
      requirements: [
        "B.Sc / M.Sc in Civil or Structural Engineering from an accredited university.",
        "Minimum 6 years experience in reinforced concrete multi-storey residential towers.",
        "Valid practicing professional license from the Ethiopian Ministry of Urban & Infrastructure."
      ]
    },
    {
      id: "JOB-2025-02",
      title: "Smart Parking & IoT Systems Automation Specialist",
      department: "ICT & Digital Infrastructure",
      location: "Head Office / Gerji & Bulbula Hubs",
      type: "Full-Time Enterprise Contract",
      deadline: "April 15, 2025",
      requirements: [
        "B.Sc in Electrical Engineering, Computer Science, or Mechatronics.",
        "Demonstrated experience with ANPR optical cameras, RFID gate controllers, and loop detectors.",
        "Familiarity with cloud-connected barrier telemetry and real-time database management."
      ]
    },
    {
      id: "JOB-2025-03",
      title: "Public Housing Allocation & Tenancy Relations Officer",
      department: "Housing Administration & Client Services",
      location: "Kirkos / Yeka Sub-City Branches",
      type: "Permanent Civil Service",
      deadline: "April 05, 2025",
      requirements: [
        "B.A in Public Administration, Sociology, Law, or Business Management.",
        "Minimum 3 years of customer-facing public service or tenancy conflict mediation experience.",
        "Fluency in Amharic and Afaan Oromoo is strongly advantageous."
      ]
    },
    {
      id: "JOB-2025-04",
      title: "Senior Legal Counsel (Property & Title Conveyance)",
      department: "Legal Affairs & Compliance",
      location: "Head Office, Mexico Square",
      type: "Permanent Civil Service",
      deadline: "April 20, 2025",
      requirements: [
        "LL.B / LL.M in Law with active Ethiopian Federal Court Bar advocacy license.",
        "Minimum 5 years of real property law, commercial lease agreements, and public procurement dispute resolution."
      ]
    }
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    const ref = `FHC-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(ref);
    showToast(`Application submitted successfully. Ref: ${ref}`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-[#1E1E1E] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          <Briefcase className="w-4 h-4" />
          <span>Public Service Careers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Join the Federal Housing Corporation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Build a rewarding public service career modernizing Ethiopia's urban housing landscape, managing smart infrastructure, and delivering transparent government services.
        </p>
      </div>

      {/* Career Listings */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-[#121212] rounded-2xl p-6 border border-slate-200 dark:border-[#1E1E1E] shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-sm">
                    {job.id}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Deadline: {job.deadline}</span>
                  </span>
                </div>

                <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  {job.title}
                </h2>

                <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{job.department}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{job.location}</span>
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E1E1E] space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Key Qualifications:</div>
                  <ul className="space-y-1">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#1E1E1E] flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{job.type}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job.title);
                    setSubmittedId(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Apply Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Application Modal / Drawer */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#121212] rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-[#1E1E1E] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Apply for Position</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{selectedJob}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {submittedId ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-center space-y-2 text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-bold text-base">Application Successfully Received</div>
                <p className="text-xs">
                  Your reference ID is <strong className="font-mono">{submittedId}</strong>. The HR Department will contact qualified shortlisted candidates for written evaluations.
                </p>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="mt-3 px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Bethlehem Tesfaye"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#1A1A1A] border border-slate-300 dark:border-[#262626] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#1A1A1A] border border-slate-300 dark:border-[#262626] text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+251 911 000000"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#1A1A1A] border border-slate-300 dark:border-[#262626] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Candidate Profile</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
