import { realData } from "@/lib/real-data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const state = searchParams.get("state")
  const sort = searchParams.get("sort") || "points"

  let people = [...realData.people]

  if (state && state !== "all") {
    people = people.filter((p) => p.state === state)
  }

  if (sort === "points") {
    people.sort((a, b) => b.ecoPoints - a.ecoPoints)
  } else if (sort === "actions") {
    people.sort((a, b) => b.actions - a.actions)
  } else if (sort === "recent") {
    people.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
  }

  return NextResponse.json({ people, total: people.length })
}
