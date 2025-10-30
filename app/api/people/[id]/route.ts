import { realData } from "@/lib/real-data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const person = realData.people.find((p) => p.id === params.id)

  if (!person) {
    return NextResponse.json({ error: "Person not found" }, { status: 404 })
  }

  return NextResponse.json({ person })
}
