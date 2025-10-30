import { realData } from "@/lib/real-data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")
  const sort = searchParams.get("sort") || "rating"

  let resources = [...realData.resources]

  if (category && category !== "all") {
    resources = resources.filter((r) => r.category === category)
  }

  if (sort === "rating") {
    resources.sort((a, b) => b.rating - a.rating)
  } else if (sort === "price-low") {
    resources.sort((a, b) => a.price - b.price)
  } else if (sort === "price-high") {
    resources.sort((a, b) => b.price - a.price)
  }

  return NextResponse.json({ resources, total: resources.length })
}
