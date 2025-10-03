"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpenText, Bell, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { supabaseBrowser } from "@/lib/supabase/browser-client"
import { getUserByEmail } from "@/lib/database/client-queries"
import type { User } from "@/lib/types/database"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const { data: { user: authUser } } = await supabaseBrowser.auth.getUser()
        if (authUser?.email) {
          const userData = await getUserByEmail(authUser.email)
          setUser(userData)
          if (userData?.avatar) {
            const { data, error } = await supabaseBrowser.storage
              .from("avatars")
              .createSignedUrl(userData.avatar, 3600) // 1 hour expiration
            if (error) {
              setAvatarUrl(null)
            } else {
              setAvatarUrl(data.signedUrl)
            }
          }
        } else {
          setUser(null)
          setAvatarUrl(null)
        }
      } catch (err) {
        setUser(null)
        setAvatarUrl(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabaseBrowser.auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (err: any) {
    }
  }

  const handleDashboard = () => {
      router.push('/dashboard/')
    }

  return (
    <header className="border-b bg-sky-50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpenText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart and Sustainable Communities Academy</h1>
              <p className="text-sm text-muted-foreground">Cagayan Valley</p>
            </div>
          </Link>

          {isLoading ? (
            <div className="flex items-center gap-3">
              <Button variant="outline" disabled>Loading...</Button>
            </div>
          ) : user ? (
            <div className="flex items-center gap-4 cursor-pointer">
              {!pathname?.startsWith('/dashboard') && !pathname?.startsWith('/certificates') && (
                <Button variant="outline" className="relative cursor-pointer" size="sm" onClick={handleDashboard}>
                  Dashboard
                </Button>
              )}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatarUrl || user.avatar || "/placeholder.svg"} alt="User" />
                      <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <Badge variant="secondary" className="w-fit mt-1">
                        {user.user_type}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}