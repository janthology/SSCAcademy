import { type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname

  // Protected routes
  const protectedRoutes = [
    '/dashboard',
    '/dashboard/*',
    '/certificates',
    '/certificates/*',
    '/courses/*', // Protect /courses/[id]
    '/learning-paths/*' // Protect /learning-paths/[id]
  ]

  if (protectedRoutes.some(route => pathname.startsWith(route.replace('*', ''))) && !session) {
    return Response.redirect(new URL('/login', request.url))
  }

  return
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}