"use client"
import Link from 'next/link'
import { createClient } from '../../lib/supabase/client'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const supabase = createClient()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then((r: any) => setEmail(r.data?.user?.email ?? null))
  }, [supabase])

  function logout() {
    supabase.auth.signOut().then(() => location.assign('/'))
  }

  return (
    <main className="container py-8 max-w-md">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-6 bg-white p-6 rounded border">
        {email ? (
          <>
            <div className="mb-4">
              <div className="text-sm text-gray-500">Signed in as</div>
              <div className="font-medium">{email}</div>
            </div>
            <button onClick={logout} className="px-3 py-2 bg-red-600 text-white rounded">Log out</button>
          </>
        ) : (
          <div>
            <div className="mb-4 text-sm text-gray-600">You are not signed in.</div>
            <div className="flex gap-2">
              <Link href="/login" className="px-3 py-2 bg-gray-100 rounded">Login</Link>
              <Link href="/signup" className="px-3 py-2 bg-blue-600 text-white rounded">Sign up</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
