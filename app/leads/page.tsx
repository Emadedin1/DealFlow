"use client"
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/client'
import { listLeads } from '../../lib/leads'
import LeadTable from '../../components/leads/LeadTable'

export default function LeadsPage() {
  const supabase = createClient()
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      const { data } = await listLeads(supabase)
      if (mounted) setLeads(data ?? [])
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [supabase])

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (status && l.status !== status) return false
      const q = query.toLowerCase()
      if (!q) return true
      return [l.name, l.company, l.email].some((f: string) => (f || '').toLowerCase().includes(q))
    })
  }, [leads, query, status])

  return (
    <main className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Link href="/leads/new" className="px-3 py-2 bg-blue-600 text-white rounded">Add Lead</Link>
      </div>

      <div className="mt-4 flex gap-2">
        <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="p-2 border rounded w-full" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border rounded">
          <option value="">All statuses</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Meeting Booked</option>
          <option>Proposal Sent</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
      </div>

      <div className="mt-6">
        {loading ? <div>Loading...</div> : <LeadTable leads={filtered} />}
      </div>
    </main>
  )
}
