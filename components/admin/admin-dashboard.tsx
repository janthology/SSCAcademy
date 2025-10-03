import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Building2,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      description: "+89 this month",
      icon: Users,
      color: "text-blue-600",
      trend: "+12%",
    },
    {
      title: "Active Courses",
      value: "24",
      description: "3 pending approval",
      icon: BookOpen,
      color: "text-green-600",
      trend: "+8%",
    },
    {
      title: "Certificates Issued",
      value: "892",
      description: "156 this month",
      icon: Award,
      color: "text-purple-600",
      trend: "+24%",
    },
    {
      title: "Completion Rate",
      value: "78%",
      description: "+5% from last month",
      icon: TrendingUp,
      color: "text-orange-600",
      trend: "+5%",
    },
  ]

  const recentActivity = [
    {
      type: "user",
      message: "New LGU registration from Tuguegarao City",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "text-blue-600",
    },
    {
      type: "course",
      message: "IoT Fundamentals course completed by 15 users",
      time: "1 hour ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "certificate",
      message: "25 certificates generated for Digital Governance course",
      time: "3 hours ago",
      icon: Award,
      color: "text-purple-600",
    },
    {
      type: "alert",
      message: "Server maintenance scheduled for tonight",
      time: "5 hours ago",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
  ]

  const regionalStats = [
    { province: "Cagayan", users: 456, completion: 82 },
    { province: "Isabela", users: 389, completion: 75 },
    { province: "Nueva Vizcaya", users: 234, completion: 79 },
    { province: "Quirino", users: 123, completion: 71 },
    { province: "Batanes", users: 45, completion: 88 },
  ]

  const pendingActions = [
    {
      title: "Course Approvals",
      count: 3,
      description: "New courses waiting for review",
      action: "Review",
      href: "/admin/courses?filter=pending",
    },
    {
      title: "User Verifications",
      count: 12,
      description: "Organization accounts pending verification",
      action: "Verify",
      href: "/admin/users?filter=pending",
    },
    {
      title: "Certificate Issues",
      count: 2,
      description: "Certificate generation errors",
      action: "Resolve",
      href: "/admin/certificates?filter=issues",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif">Admin Dashboard</h1>
          <p className="text-muted-foreground">Cagayan Valley Smart City Academy Platform Overview</p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <MapPin className="w-4 h-4" />
          Region 2 - Cagayan Valley
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform events and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <activity.icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Regional Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Regional Statistics
              </CardTitle>
              <CardDescription>User distribution and completion rates by province</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {regionalStats.map((region) => (
                <div key={region.province} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{region.province}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{region.users} users</span>
                      <span>{region.completion}% completion</span>
                    </div>
                  </div>
                  <Progress value={region.completion} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending Actions
              </CardTitle>
              <CardDescription>Items requiring admin attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{action.title}</h4>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="mb-2">
                      {action.count}
                    </Badge>
                    <Button size="sm" variant="outline" className="block bg-transparent" asChild>
                      <Link href={action.href}>{action.action}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/courses/new">
                  <BookOpen className="w-4 h-4" />
                  Create New Course
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/users">
                  <Users className="w-4 h-4" />
                  Manage Users
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/admin/organizations">
                  <Building2 className="w-4 h-4" />
                  Organization Management
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Platform Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Certificate Service</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup Status</span>
                <Badge variant="secondary">Last: 2 hours ago</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
