import { NextResponse } from "next/server"
import { getEnrollmentStats, getUserStats, getCourseStats } from "@/lib/database/queries"

export async function GET() {
  try {
    const [enrollmentStats, userStats, courseStats] = await Promise.all([
      getEnrollmentStats(),
      getUserStats(),
      getCourseStats(),
    ])

    return NextResponse.json({
      enrollments: enrollmentStats,
      users: userStats,
      courses: courseStats,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
