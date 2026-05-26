"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase/client'
import { getLead, deleteLead } from '../../../lib/leads'

export default function LeadDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = createClient()
  const router = useRouter()
  const [lead, setLead] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      const { data } = await getLead(supabase, id)
      if (mounted) setLead(data)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [id, supabase])

  async function handleDelete() {
    if (!confirm('Delete this lead?')) return
    await deleteLead(supabase, id)
    router.push('/leads')
  }

  if (loading) return <div className="container py-8">Loading...</div>
  if (!lead) return <div className="container py-8">Lead not found.</div>

  return (
    <main className="container py-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{lead.name}</h1>
        <div className="flex gap-2">
          <Link href={`/leads/${id}/edit`} className="px-3 py-2 border rounded">Edit</Link>
          <button onClick={handleDelete} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>

      <div className="mt-4 bg-white p-6 rounded border space-y-3">
        <div><strong>Company:</strong> {lead.company}</div>
        <div><strong>Email:</strong> {lead.email || '-'}</div>
        <div><strong>Phone:</strong> {lead.phone || '-'}</div>
        <div><strong>Source:</strong> {lead.source}</div>
        <div><strong>Status:</strong> {lead.status}</div>
        <div><strong>Deal value:</strong> {lead.deal_value ? `$${lead.deal_value}` : '-'}</div>
        <div><strong>Last contacted:</strong> {lead.last_contacted_date || '-'}</div>
        <div><strong>Next follow-up:</strong> {lead.next_follow_up_date || '-'}</div>
        <div><strong>Notes:</strong>
          <div className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{lead.notes || '-'}</div>
        </div>
      </div>
    </main>
  )
}
