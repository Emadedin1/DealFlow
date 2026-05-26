"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/client'
import { listFollowups } from '../../lib/leads'

export default function FollowupsPage() {
  const supabase = createClient()
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      const { data } = await listFollowups(supabase)
      if (mounted) setItems(data ?? [])
    }
    load()
    return () => { mounted = false }
  }, [supabase])

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold">Follow-ups</h1>
      <div className="mt-6 space-y-4">
        {items.length === 0 && <div className="bg-white p-6 rounded border">No upcoming follow-ups.</div>}
        {items.map(i => (
          <Link key={i.id} href={`/leads/${i.id}`} className="block bg-white p-4 rounded border hover:bg-gray-50">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-gray-500">{i.company}</div>
              </div>
              <div className="text-sm text-gray-600">{i.next_follow_up_date}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
