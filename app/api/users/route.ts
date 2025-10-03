import { type NextRequest, NextResponse } from "next/server"
import { getAllUsers, getUsersByType } from "@/lib/database/queries"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userType = searchParams.get("type")

    const users = userType ? await getUsersByType(userType) : await getAllUsers()

    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
