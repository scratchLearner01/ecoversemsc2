"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import IndustryDashboardNavbar from "@/components/industry-dashboard-navbar"
import { CheckCircle, Clock, AlertCircle, ChevronDown, FileText, MessageSquare } from "lucide-react"

interface AuditSubmission {
  id: string
  title: string
  dateSubmitted: string
  agency: string
  co2Claimed: string
  status: "pending" | "verified" | "revision"
  proof: string
  aiVerification: string
  ecoPoints: number
}

export default function GreenAuditCenterPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState<"pending" | "verified" | "revision">("pending")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<AuditSubmission | null>(null)
  const [filterDate, setFilterDate] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "industry") {
      router.push("/login")
      return
    }
  }, [router])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Demo data for submissions
  const submissions: AuditSubmission[] = [
    {
      id: "1",
      title: "Installed Solar Roof Panels",
      dateSubmitted: "Oct 22, 2025",
      agency: "MPCB",
      co2Claimed: "2.3 tons/month",
      status: "pending",
      proof: "solar_installation_report.pdf",
      aiVerification: "Passed basic checks. Awaiting field audit.",
      ecoPoints: 80,
    },
    {
      id: "2",
      title: "Waste Water Treatment System",
      dateSubmitted: "Oct 18, 2025",
      agency: "CPCB",
      co2Claimed: "1.8 tons/month",
      status: "pending",
      proof: "wwt_system_docs.pdf",
      aiVerification: "Pending verification agency review.",
      ecoPoints: 65,
    },
    {
      id: "3",
      title: "LED Lighting Upgrade",
      dateSubmitted: "Oct 15, 2025",
      agency: "MPCB",
      co2Claimed: "0.9 tons/month",
      status: "pending",
      proof: "led_upgrade_report.pdf",
      aiVerification: "Awaiting manual field verification.",
      ecoPoints: 45,
    },
    {
      id: "4",
      title: "Renewable Energy Integration",
      dateSubmitted: "Oct 10, 2025",
      agency: "MPCB",
      co2Claimed: "3.2 tons/month",
      status: "verified",
      proof: "renewable_energy_cert.pdf",
      aiVerification: "Verified and approved.",
      ecoPoints: 120,
    },
    {
      id: "5",
      title: "Plastic Waste Reduction Program",
      dateSubmitted: "Oct 8, 2025",
      agency: "CPCB",
      co2Claimed: "0.5 tons/month",
      status: "verified",
      proof: "plastic_reduction_report.pdf",
      aiVerification: "Verified and approved.",
      ecoPoints: 35,
    },
    {
      id: "6",
      title: "Water Conservation Initiative",
      dateSubmitted: "Oct 5, 2025",
      agency: "MPCB",
      co2Claimed: "1.1 tons/month",
      status: "verified",
      proof: "water_conservation_docs.pdf",
      aiVerification: "Verified and approved.",
      ecoPoints: 55,
    },
    {
      id: "7",
      title: "Carbon Offset Program",
      dateSubmitted: "Oct 20, 2025",
      agency: "CPCB",
      co2Claimed: "2.0 tons/month",
      status: "revision",
      proof: "carbon_offset_report.pdf",
      aiVerification: "Needs clarification on methodology.",
      ecoPoints: 0,
    },
    {
      id: "8",
      title: "Green Building Certification",
      dateSubmitted: "Oct 12, 2025",
      agency: "MPCB",
      co2Claimed: "1.5 tons/month",
      status: "revision",
      proof: "green_building_cert.pdf",
      aiVerification: "Missing supporting documentation.",
      ecoPoints: 0,
    },
  ]

  const filteredSubmissions = submissions.filter((sub) => sub.status === activeTab)

  const stats = {
    total: submissions.length,
    verified: submissions.filter((s) => s.status === "verified").length,
    pending: submissions.filter((s) => s.status === "pending").length,
    revision: submissions.filter((s) => s.status === "revision").length,
    totalPoints: submissions.filter((s) => s.status === "verified").reduce((sum, s) => sum + s.ecoPoints, 0),
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "revision":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
      case "verified":
        return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
      case "revision":
        return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
      default:
        return ""
    }
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <IndustryDashboardNavbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <main className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Green Audit Center</h1>
            <p className="text-muted-foreground mb-6">Track the status of your environmental initiatives and audits.</p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Filter by Date</label>
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Dates</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Filter by Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="energy">Energy</option>
                  <option value="waste">Waste Management</option>
                  <option value="water">Water Conservation</option>
                  <option value="emissions">Emissions Reduction</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tab View */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "pending"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clock className="w-4 h-4" />
              Pending Review ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab("verified")}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "verified"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Verified Actions ({stats.verified})
            </button>
            <button
              onClick={() => setActiveTab("revision")}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === "revision"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Needs Revision ({stats.revision})
            </button>
          </div>

          {/* Submission Cards */}
          <div className="space-y-4 mb-8">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`border rounded-lg p-6 transition-all duration-200 ${getStatusColor(submission.status)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">{getStatusIcon(submission.status)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{submission.title}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Date Submitted</p>
                            <p className="font-medium text-foreground">{submission.dateSubmitted}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Verification Agency</p>
                            <p className="font-medium text-foreground">{submission.agency}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">CO₂ Reduction Claimed</p>
                            <p className="font-medium text-foreground">{submission.co2Claimed}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className="font-medium text-foreground capitalize">{submission.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedCard(expandedCard === submission.id ? null : submission.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          expandedCard === submission.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedCard === submission.id && (
                    <div className="mt-4 pt-4 border-t border-current border-opacity-20 space-y-4 animate-fade-in">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">AI Verification</p>
                        <p className="text-foreground">{submission.aiVerification}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission)
                            setShowDetailsModal(true)
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          View Details
                        </button>
                        {submission.status === "pending" && (
                          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            Request Manual Review
                          </button>
                        )}
                        {submission.status === "verified" && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            <span className="font-medium">+{submission.ecoPoints} Eco Points</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No submissions in this category.</p>
              </div>
            )}
          </div>

          {/* Summary Banner */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Submissions</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Verified</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.verified}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Needs Review</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.revision}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Eco Points</p>
                <p className="text-2xl font-bold text-primary">{stats.totalPoints}</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Tax Benefit Eligibility</p>
              <p className="text-foreground font-medium">Eligible for 8% tax reduction this quarter</p>
            </div>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {showDetailsModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">{selectedSubmission.title}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Uploaded Documents</h3>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{selectedSubmission.proof}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">AI Audit Report</h3>
                <p className="text-foreground bg-muted p-3 rounded-lg">{selectedSubmission.aiVerification}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Verifier Comments</h3>
                <p className="text-foreground bg-muted p-3 rounded-lg">
                  {selectedSubmission.status === "verified"
                    ? "All checks passed. Action verified and approved."
                    : selectedSubmission.status === "pending"
                      ? "Awaiting field verification from the agency."
                      : "Please provide additional documentation as requested."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Next Steps</h3>
                <p className="text-foreground bg-muted p-3 rounded-lg">
                  {selectedSubmission.status === "verified"
                    ? "Your action has been verified. Eco points will be credited within 24 hours."
                    : selectedSubmission.status === "pending"
                      ? "Field audit scheduled for next week. Please ensure site accessibility."
                      : "Please resubmit with the requested documentation within 7 days."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
