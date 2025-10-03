import { type NextRequest, NextResponse } from "next/server"
import { getEnrollmentsByUserId, getEnrollmentsByCourseId } from "@/lib/database/queries"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const courseId = searchParams.get("courseId")

    let enrollments
    if (userId) {
      enrollments = await getEnrollmentsByUserId(userId)
    } else if (courseId) {
      enrollments = await getEnrollmentsByCourseId(courseId)
    } else {
      return NextResponse.json({ error: "userId or courseId parameter required" }, { status: 400 })
    }

    return NextResponse.json({ enrollments })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 })
  }
}
