"use client"
import LeadForm from '../../../components/leads/LeadForm'
import { createClient } from '../../../lib/supabase/client'
import { createLead } from '../../../lib/leads'
import { useRouter } from 'next/navigation'

export default function NewLeadPage() {
  const supabase = createClient()
  const router = useRouter()

  async function onCreate(data: any) {
    await createLead(supabase, data)
    router.push('/leads')
  }

  return (
    <main className="container py-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Add Lead</h1>
      <div className="mt-4 bg-white p-6 rounded border">
        <LeadForm onSubmit={onCreate} />
      </div>
    </main>
  )
}
