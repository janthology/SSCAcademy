import { type NextRequest, NextResponse } from "next/server"
import { getCertificatesByUserId } from "@/lib/database/queries"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId parameter required" }, { status: 400 })
    }

    const certificates = await getCertificatesByUserId(userId)
    return NextResponse.json({ certificates })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 })
  }
}
