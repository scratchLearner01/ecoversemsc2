"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SignupStep1Props {
  formData: any
  setFormData: (data: any) => void
}

export default function SignupStep1({ formData, setFormData }: SignupStep1Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="text-sm font-medium text-foreground">Full Name</label>
        <Input
          type="text"
          placeholder="Rohan Mehta"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Gender (Optional)</label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger className="mt-1 rounded-lg border-border">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Date of Birth</label>
          <Input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="mt-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Phone Number</label>
        <Input
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Address</label>
        <Input
          type="text"
          placeholder="Bengaluru, Karnataka"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="mt-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  )
}
