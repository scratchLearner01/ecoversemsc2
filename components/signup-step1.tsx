"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react"

interface SignupStep1Props {
  formData: any
  setFormData: (data: any) => void
}

export default function SignupStep1({ formData, setFormData }: SignupStep1Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-primary" />
          Full Name
        </label>
        <Input
          type="text"
          placeholder="Rohan Mehta"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            Gender (Optional)
          </label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger className="rounded-lg border-border focus:ring-2 focus:ring-primary">
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
          <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            Date of Birth
          </label>
          <Input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-primary" />
          Email
        </label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
          <Phone className="w-4 h-4 text-primary" />
          Phone Number
        </label>
        <Input
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-primary" />
          Address
        </label>
        <Input
          type="text"
          placeholder="Bengaluru, Karnataka"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
    </div>
  )
}
