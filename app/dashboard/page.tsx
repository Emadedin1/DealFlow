"use client"
import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/client'
import { getDashboardStats } from '../../lib/leads'
import StatCard from '../../components/dashboard/StatCard'
import PipelineSummary from '../../components/dashboard/PipelineSummary'

export default function DashboardPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      const statsData = await getDashboardStats(supabase)
      if (mounted) {
        setStats(statsData)
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [supabase])

  if (loading) return <div className="container py-20">Loading...</div>

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatCard label="Total Leads" value={stats.total} />
        <StatCard label="Open Pipeline" value={stats.open_value} />
        <StatCard label="Won Revenue" value={stats.won_value} />
        <StatCard label="Follow-ups This Week" value={stats.followups_week} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <PipelineSummary statuses={stats.by_status} />
        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold">Recent Leads</h3>
          <ul className="mt-4 space-y-2">
            {stats.recent.map((l: any) => (
              <li key={l.id} className="flex justify-between">
                <div>
                  <div className="font-medium">{l.name}</div>
                  <div className="text-sm text-gray-500">{l.company}</div>
                </div>
                <div className="text-sm text-gray-600">{l.deal_value ? `$${l.deal_value}` : '-'}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
