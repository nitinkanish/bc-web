import { getCurrentIPLMatch } from "@/lib/cricket-api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const match = await getCurrentIPLMatch()

    return NextResponse.json({
      match,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in current-match API route:", error)
    return NextResponse.json({ error: "Failed to fetch current match" }, { status: 500 })
  }
}
