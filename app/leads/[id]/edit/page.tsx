"use client"
import LeadForm from '../../../../components/leads/LeadForm'
import { createClient } from '../../../../lib/supabase/client'
import { getLead, updateLead } from '../../../../lib/leads'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditLead({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = createClient()
  const router = useRouter()
  const [lead, setLead] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const { data } = await getLead(supabase, id)
      if (mounted) setLead(data)
    }
    load()
    return () => { mounted = false }
  }, [id, supabase])

  async function onSave(data: any) {
    await updateLead(supabase, id, data)
    router.push(`/leads/${id}`)
  }

  if (!lead) return <div className="container py-8">Loading...</div>

  return (
    <main className="container py-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Edit Lead</h1>
      <div className="mt-4 bg-white p-6 rounded border">
        <LeadForm initial={lead} onSubmit={onSave} />
      </div>
    </main>
  )
}
