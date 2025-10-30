import { realData } from "@/lib/real-data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const industry = realData.industries.find((i) => i.id === params.id)

  if (!industry) {
    return NextResponse.json({ error: "Industry not found" }, { status: 404 })
  }

  return NextResponse.json({ industry })
}
