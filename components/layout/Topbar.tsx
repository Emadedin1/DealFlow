"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/client'

export default function Topbar() {
  const supabase = createClient()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then((r: any) => {
      if (!mounted) return
      setEmail(r?.data?.user?.email ?? null)
    }).catch(() => setEmail(null))
    return () => { mounted = false }
  }, [supabase])

  async function signOut() {
    await supabase.auth.signOut()
    location.assign('/')
  }

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b bg-white">
      <div>
        <Link href="/" className="font-semibold text-lg">DealFlow</Link>
      </div>

      <div className="flex items-center gap-4">
        {email ? (
          <>
            <div className="text-sm text-gray-700">Signed in as <span className="font-medium">{email}</span></div>
            <button onClick={signOut} className="text-sm text-red-600">Log out</button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm text-gray-700">Login</Link>
            <Link href="/signup" className="text-sm text-blue-600">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  )
}
