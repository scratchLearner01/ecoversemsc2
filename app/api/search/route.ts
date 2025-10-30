import { realData } from "@/lib/real-data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")?.toLowerCase() || ""
  const type = searchParams.get("type") || "all" // all, people, industries, states, cities

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], message: "Query too short" })
  }

  const results: any = {
    people: [],
    industries: [],
    states: [],
    cities: [],
  }

  // Search people
  if (type === "all" || type === "people") {
    results.people = realData.people.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.city.toLowerCase().includes(query) ||
        person.state.toLowerCase().includes(query) ||
        person.bio.toLowerCase().includes(query),
    )
  }

  // Search industries
  if (type === "all" || type === "industries") {
    results.industries = realData.industries.filter(
      (industry) =>
        industry.name.toLowerCase().includes(query) ||
        industry.sector.toLowerCase().includes(query) ||
        industry.location.toLowerCase().includes(query) ||
        industry.description.toLowerCase().includes(query),
    )
  }

  // Search states
  if (type === "all" || type === "states") {
    results.states = realData.searchableData.states.filter((state) => state.toLowerCase().includes(query))
  }

  // Search cities
  if (type === "all" || type === "cities") {
    results.cities = realData.searchableData.cities.filter((city) => city.toLowerCase().includes(query))
  }

  return NextResponse.json({
    results,
    query,
    totalResults: Object.values(results).reduce((sum: number, arr: any) => sum + arr.length, 0),
  })
}
