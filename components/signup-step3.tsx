import { Checkbox } from "@/components/ui/checkbox"

interface SignupStep3Props {
  formData: any
}

export default function SignupStep3({ formData }: SignupStep3Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Review Your Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium text-foreground">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium text-foreground">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address:</span>
            <span className="font-medium text-foreground">{formData.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vehicle Type:</span>
            <span className="font-medium text-foreground capitalize">{formData.vehicleType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Solar User:</span>
            <span className="font-medium text-foreground">{formData.solarUser ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox id="consent" className="mt-1" />
        <label htmlFor="consent" className="text-sm text-foreground cursor-pointer leading-relaxed">
          I allow EcoVerse to use my anonymized data for sustainability insights and research purposes.
        </label>
      </div>

      <p className="text-xs text-muted-foreground">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
