"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Zap, Leaf, Gauge } from "lucide-react"

interface SignupStep2Props {
  formData: any
  setFormData: (data: any) => void
}

export default function SignupStep2({ formData, setFormData }: SignupStep2Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
          <Car className="w-4 h-4 text-primary" />
          Type of Vehicle
        </label>
        <Select
          value={formData.vehicleType}
          onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
        >
          <SelectTrigger className="rounded-lg border-border focus:ring-2 focus:ring-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="ev">Electric Vehicle (EV)</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="petrol">Petrol</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.vehicleType === "ev" && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <label className="text-sm font-semibold text-foreground">Upload EV Registration Proof</label>
          <Input type="file" accept="image/*" className="mt-2 rounded-lg border-border" />
        </div>
      )}

      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
        <Checkbox
          id="solar"
          checked={formData.solarUser}
          onCheckedChange={(checked) => setFormData({ ...formData, solarUser: checked })}
        />
        <label
          htmlFor="solar"
          className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2 flex-1"
        >
          <Zap className="w-4 h-4 text-primary" />I use Solar Energy
        </label>
      </div>

      {formData.solarUser && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <label className="text-sm font-semibold text-foreground">Upload Solar Proof</label>
          <Input type="file" accept="image/*" className="mt-2 rounded-lg border-border" />
        </div>
      )}

      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
        <Checkbox
          id="waste"
          checked={formData.wasteSegregation}
          onCheckedChange={(checked) => setFormData({ ...formData, wasteSegregation: checked })}
        />
        <label
          htmlFor="waste"
          className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2 flex-1"
        >
          <Leaf className="w-4 h-4 text-primary" />I practice Waste Segregation
        </label>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
          <Gauge className="w-4 h-4 text-primary" />
          Average Commute Distance (km/week)
        </label>
        <Input
          type="number"
          placeholder="50"
          value={formData.commuteDistance}
          onChange={(e) => setFormData({ ...formData, commuteDistance: e.target.value })}
          className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Profile Photo (Optional)</label>
        <Input type="file" accept="image/*" className="rounded-lg border-border" />
      </div>
    </div>
  )
}
