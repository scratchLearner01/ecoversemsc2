"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CountUpNumber from "@/components/count-up-number"
import { History } from "lucide-react"

export default function StatusBar() {
  const [showHistory, setShowHistory] = useState(false)

  return (
    <>
      <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 border-primary/20 rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* EcoPoints */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current EcoPoints</p>
            <div className="flex items-baseline gap-2">
              <CountUpNumber end={3180} duration={1000} className="text-3xl md:text-4xl font-bold text-primary" />
              <span className="text-sm font-medium bg-primary/20 text-primary px-3 py-1 rounded-full">
                Green Champion
              </span>
            </div>
          </div>

          {/* City Rank */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">City Rank</p>
            <p className="text-3xl md:text-4xl font-bold text-secondary">
              #<CountUpNumber end={3} duration={1000} />
            </p>
            <p className="text-xs text-muted-foreground">in Bengaluru</p>
          </div>

          {/* Global Rank */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Global Rank</p>
            <p className="text-3xl md:text-4xl font-bold text-secondary">
              #<CountUpNumber end={2348} duration={1000} />
            </p>
            <p className="text-xs text-muted-foreground">overall</p>
          </div>

          {/* Last Action */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Last Verified Action</p>
            <p className="text-sm font-semibold text-foreground">Planted a tree</p>
            <p className="text-lg font-bold text-primary">+50 points</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(true)}
              className="text-primary hover:bg-primary/10 p-0 h-auto"
            >
              <History className="w-4 h-4 mr-1" />
              View History
            </Button>
          </div>
        </div>
      </Card>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-2xl p-6 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">Point History</h2>
            <div className="space-y-3">
              {[
                { action: "Planted a tree", points: 50, date: "Today" },
                { action: "Recycled waste", points: 30, date: "Yesterday" },
                { action: "Used smart dustbin", points: 20, date: "2 days ago" },
                { action: "Participated in eco event", points: 10, date: "3 days ago" },
                { action: "Donated to NGO", points: 40, date: "1 week ago" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <p className="font-bold text-primary">+{item.points}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setShowHistory(false)}
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </>
  )
}
