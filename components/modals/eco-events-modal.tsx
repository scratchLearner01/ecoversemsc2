"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, Calendar, MapPin } from "lucide-react"

interface EcoEventsModalProps {
  onClose: () => void
}

const events = [
  {
    id: 1,
    name: "Clean City Drive",
    date: "Dec 15, 2025",
    location: "Bengaluru",
    participants: 234,
    points: 10,
  },
  {
    id: 2,
    name: "Solar Challenge",
    date: "Dec 20, 2025",
    location: "Online",
    participants: 567,
    points: 15,
  },
  {
    id: 3,
    name: "Tree-a-thon",
    date: "Dec 22, 2025",
    location: "Cubbon Park",
    participants: 189,
    points: 20,
  },
  {
    id: 4,
    name: "Plastic Cleanup Drive",
    date: "Dec 25, 2025",
    location: "Ulsoor Lake",
    participants: 145,
    points: 25,
  },
]

export default function EcoEventsModal({ onClose }: EcoEventsModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [joined, setJoined] = useState<number[]>([])

  const handleJoin = (eventId: number) => {
    setJoined([...joined, eventId])
    setTimeout(() => {
      setSelectedEvent(null)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md rounded-2xl p-6 border-0 relative max-h-96 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {selectedEvent === null ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Eco Events</h2>
              <p className="text-muted-foreground mt-1">Join community sustainability drives</p>
            </div>

            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{event.name}</h3>
                    <span className="text-sm font-bold text-primary">+{event.points} pts</span>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <p className="text-xs">{event.participants} participants</p>
                  </div>

                  {joined.includes(event.id) && <div className="mt-2 text-xs font-medium text-primary">Joined</div>}
                </div>
              ))}
            </div>
          </div>
        ) : joined.includes(selectedEvent) ? (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-bounce-pop">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground">Event Joined!</h2>
              <p className="text-muted-foreground mt-1">You're now part of this campaign</p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Participation points</p>
              <p className="text-3xl font-bold text-primary">+10 EcoPoints</p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {events.find((e) => e.id === selectedEvent) && (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {events.find((e) => e.id === selectedEvent)?.name}
                  </h2>
                  <p className="text-muted-foreground mt-1">Join this eco-friendly campaign</p>
                </div>

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{events.find((e) => e.id === selectedEvent)?.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{events.find((e) => e.id === selectedEvent)?.location}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setSelectedEvent(null)}
                    variant="outline"
                    className="flex-1 rounded-lg border-border hover:bg-muted bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => handleJoin(selectedEvent)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                  >
                    Join Event
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
