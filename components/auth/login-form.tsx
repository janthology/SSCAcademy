"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, Building2 } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabase/browser-client"
import { getUserByEmail } from "@/lib/database/client-queries"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data: authData, error: authError } = await supabaseBrowser.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      const user = await getUserByEmail(formData.email)
      if (!user) {
        setError("User not found")
        return
      }

      // Normalize comparison to avoid case sensitivity
      if (formData.userType.trim().toLowerCase() !== user.user_type.trim().toLowerCase()) {
        setError("User type doesn't match your account")
        return
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userType">I am a...</Label>
          <Select value={formData.userType} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
            <SelectTrigger>
              <Building2 className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select your organization type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual Learner</SelectItem>
              <SelectItem value="lgu">Local Government Unit (LGU)</SelectItem>
              <SelectItem value="suc">State University/College (SUC)</SelectItem>
              <SelectItem value="hei">Higher Education Institution (HEI)</SelectItem>
              <SelectItem value="dost">DOST Personnel</SelectItem>
              <SelectItem value="government">Other Government Agency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

      <div className="text-center">
        <Button variant="link" className="text-sm text-muted-foreground">
          Forgot your password?
        </Button>
      </div>
    </form>
  )
}