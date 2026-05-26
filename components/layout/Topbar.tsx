"use client"
import Link from 'next/link'
import { createClient } from '../../lib/supabase/client'

export default function Topbar() {
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    location.assign('/')
  }

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b bg-white">
      <div className="font-semibold">DealFlow</div>
      <div className="flex items-center gap-3">
        <Link href="/leads" className="text-sm text-gray-700">Leads</Link>
        <Link href="/follow-ups" className="text-sm text-gray-700">Follow-ups</Link>
        <Link href="/settings" className="text-sm text-gray-700">Settings</Link>
        <button onClick={signOut} className="text-sm text-red-600">Log out</button>
      </div>
    </div>
  )
}
