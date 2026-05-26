import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  try {
    const supabase = createSupabaseClient(request, response)
    await supabase.auth.getSession()
  } catch {
    // Keep the request moving even if session refresh is unavailable.
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
