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

  // Sample demo data when user opens /dashboard?demo=1
  const demoSample = {
    total: 6,
    open_value: 8500,
    won_value: 4200,
    followups_week: 2,
    recent: [
      { id: 'demo-1', name: 'Acme Co', company: 'Acme', deal_value: 1200 },
      { id: 'demo-2', name: 'Beta LLC', company: 'Beta', deal_value: 3000 },
    ],
    by_status: [
      { status: 'New', count: 3 },
      { status: 'Contacted', count: 1 },
      { status: 'Won', count: 1 },
      { status: 'Lost', count: 1 },
    ]
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const params = new URLSearchParams(window.location.search)
        if (params.get('demo') === '1') {
          setStats(demoSample)
          setLoading(false)
          return
        }
      } catch {
        // ignore if window not available
      }
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
