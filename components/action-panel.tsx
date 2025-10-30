"use client"

import { useState } from "react"
import ActionCard from "@/components/action-card"
import SmartDustbinModal from "@/components/modals/smart-dustbin-modal"
import PlantTreeModal from "@/components/modals/plant-tree-modal"
import RecycleWasteModal from "@/components/modals/recycle-waste-modal"
import DonateNGOModal from "@/components/modals/donate-ngo-modal"
import EcoEventsModal from "@/components/modals/eco-events-modal"
import { Trash2, Trees, Recycle, Heart, Zap } from "lucide-react"

export default function ActionPanel() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const actions = [
    {
      id: "dustbin",
      icon: Trash2,
      title: "Use Smart Dustbin",
      description: "Scan QR code on registered dustbins",
      points: "+20",
    },
    {
      id: "tree",
      icon: Trees,
      title: "Plant a Tree",
      description: "Upload video or photo with GPS",
      points: "+50",
    },
    {
      id: "recycle",
      icon: Recycle,
      title: "Recycle Waste",
      description: "Log recycled materials by category",
      points: "+15-40",
    },
    {
      id: "donate",
      icon: Heart,
      title: "Donate or NGO Work",
      description: "Contribute to verified NGOs",
      points: "+30-50",
    },
    {
      id: "events",
      icon: Zap,
      title: "Participate in Eco Events",
      description: "Join community sustainability drives",
      points: "+10",
    },
  ]

  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Log Your Actions & Earn EcoPoints</h2>
          <p className="text-muted-foreground mt-1">Complete verified sustainability actions to earn rewards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              icon={action.icon}
              title={action.title}
              description={action.description}
              points={action.points}
              onClick={() => setActiveModal(action.id)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {activeModal === "dustbin" && <SmartDustbinModal onClose={() => setActiveModal(null)} />}
      {activeModal === "tree" && <PlantTreeModal onClose={() => setActiveModal(null)} />}
      {activeModal === "recycle" && <RecycleWasteModal onClose={() => setActiveModal(null)} />}
      {activeModal === "donate" && <DonateNGOModal onClose={() => setActiveModal(null)} />}
      {activeModal === "events" && <EcoEventsModal onClose={() => setActiveModal(null)} />}
    </>
  )
}
