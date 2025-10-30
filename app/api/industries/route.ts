import { realData } from "@/lib/real-data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sector = searchParams.get("sector")
  const sort = searchParams.get("sort") || "points"

  let industries = [...realData.industries]

  if (sector && sector !== "all") {
    industries = industries.filter((i) => i.sector === sector)
  }

  if (sort === "points") {
    industries.sort((a, b) => b.ecoPoints - a.ecoPoints)
  } else if (sort === "rating") {
    industries.sort((a, b) => b.rating - a.rating)
  } else if (sort === "employees") {
    industries.sort((a, b) => b.employees - a.employees)
  }

  return NextResponse.json({ industries, total: industries.length })
}
