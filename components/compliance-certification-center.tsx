"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Upload, CheckCircle, Clock } from "lucide-react"

const CERTIFICATE_TYPES = [
  { name: "Pollution Clearance Certificate", status: "approved" },
  { name: "Energy Report", status: "pending" },
  { name: "Waste Disposal Receipt", status: "pending" },
]

export default function ComplianceCertificationCenter() {
  const [activeTab, setActiveTab] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)

  return (
    <>
      <Card className="p-8 border-0 bg-card rounded-xl">
        <h3 className="text-2xl font-bold text-foreground mb-6">Compliance & Certification Center</h3>

        <div className="flex gap-2 mb-6 border-b border-border">
          {CERTIFICATE_TYPES.map((cert, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 font-medium transition-all ${
                activeTab === index
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cert.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
            {CERTIFICATE_TYPES[activeTab].status === "approved" ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Verified</p>
                  <p className="text-sm text-muted-foreground">EcoVerse Verified Seal Applied</p>
                </div>
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Pending Verification</p>
                  <p className="text-sm text-muted-foreground">Our team is reviewing your submission</p>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}
