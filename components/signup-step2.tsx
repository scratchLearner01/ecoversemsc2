"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface SignupStep2Props {
  formData: any
  setFormData: (data: any) => void
}

export default function SignupStep2({ formData, setFormData }: SignupStep2Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">Type of Vehicle</label>
        <Select
          value={formData.vehicleType}
          onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
        >
          <SelectTrigger className="rounded-lg border-border">
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
        <div>
          <label className="text-sm font-medium text-foreground">Upload EV Registration Proof</label>
          <Input type="file" accept="image/*" className="mt-1 rounded-lg border-border" />
        </div>
      )}

      <div className="flex items-center space-x-3">
        <Checkbox
          id="solar"
          checked={formData.solarUser}
          onCheckedChange={(checked) => setFormData({ ...formData, solarUser: checked })}
        />
        <label htmlFor="solar" className="text-sm font-medium text-foreground cursor-pointer">
          I use Solar Energy
        </label>
      </div>

      {formData.solarUser && (
        <div>
          <label className="text-sm font-medium text-foreground">Upload Solar Proof</label>
          <Input type="file" accept="image/*" className="mt-1 rounded-lg border-border" />
        </div>
      )}

      <div className="flex items-center space-x-3">
        <Checkbox
          id="waste"
          checked={formData.wasteSegregation}
          onCheckedChange={(checked) => setFormData({ ...formData, wasteSegregation: checked })}
        />
        <label htmlFor="waste" className="text-sm font-medium text-foreground cursor-pointer">
          I practice Waste Segregation
        </label>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Average Commute Distance (km/week)</label>
        <Input
          type="number"
          placeholder="50"
          value={formData.commuteDistance}
          onChange={(e) => setFormData({ ...formData, commuteDistance: e.target.value })}
          className="mt-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Profile Photo (Optional)</label>
        <Input type="file" accept="image/*" className="mt-1 rounded-lg border-border" />
      </div>
    </div>
  )
}
