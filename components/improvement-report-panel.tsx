"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Upload, X } from "lucide-react"

const IMPROVEMENT_CATEGORIES = [
  "Energy Efficiency",
  "Waste Reduction",
  "Tree Plantation",
  "Water Conservation",
  "Recycling Initiative",
]

export default function ImprovementReportPanel() {
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setShowModal(false)
      setDescription("")
      setCategory("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <>
      <Card className="p-8 border-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">Submit Your Green Actions</h3>
            <p className="text-muted-foreground mt-1">Boost your score with environmental improvements</p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            New Improvement Report
          </Button>
        </div>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-card rounded-xl animate-slide-in-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">New Improvement Report</h2>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    placeholder="Describe your environmental improvement..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select category</option>
                    {IMPROVEMENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Proof
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
