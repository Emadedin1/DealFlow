import { SupabaseClient } from '@supabase/supabase-js'

export async function listLeads(supabase: SupabaseClient) {
  return supabase.from('leads').select('*').order('created_at', { ascending: false })
}

export async function getLead(supabase: SupabaseClient, id: string) {
  return supabase.from('leads').select('*').eq('id', id).single()
}

export async function createLead(supabase: SupabaseClient, payload: any) {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) {
    throw new Error(sessionError.message)
  }
  const user_id = sessionData?.session?.user?.id
  if (!user_id) {
    throw new Error('User is not signed in')
  }
  // sanitize payload: convert empty strings for dates/numbers to null
  const sanitized = { ...payload }
  const dateFields = ['last_contacted_date', 'next_follow_up_date']
  for (const f of dateFields) {
    if (sanitized[f] === '') sanitized[f] = null
  }
  if (sanitized.deal_value === '' || sanitized.deal_value == null) {
    sanitized.deal_value = null
  }

  const res = await supabase.from('leads').insert([{ ...sanitized, user_id }])
  if (res.error) {
    // log full Supabase error object for debugging
    console.error('Supabase insert error:', res.error)
    throw new Error(res.error.message || 'Failed to create lead')
  }
  return res.data
}

export async function updateLead(supabase: SupabaseClient, id: string, payload: any) {
  return supabase.from('leads').update(payload).eq('id', id)
}

export async function deleteLead(supabase: SupabaseClient, id: string) {
  return supabase.from('leads').delete().eq('id', id)
}

export async function listFollowups(supabase: SupabaseClient) {
  const today = new Date().toISOString().slice(0,10)
  return supabase.from('leads').select('*').gt('next_follow_up_date', '').gte('next_follow_up_date', today).order('next_follow_up_date')
}

export async function getDashboardStats(supabase: SupabaseClient) {
  // Gather simple stats via multiple queries for clarity
  const total = await supabase.from('leads').select('id', { count: 'exact' })
  const open = await supabase.from('leads').select('deal_value').in('status', ['New','Contacted','Meeting Booked','Proposal Sent'])
  const won = await supabase.from('leads').select('deal_value').eq('status', 'Won')
  const followups = await supabase.from('leads').select('id', { count: 'exact' }).gte('next_follow_up_date', new Date().toISOString().slice(0,10))
  const recent = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5)
  const byStatus = await supabase.rpc('leads_count_by_status')

  const sum = (rows: any) => (rows?.data || []).reduce((s: number, r: any) => s + (r.deal_value || 0), 0)

  return {
    total: total.count || 0,
    open_value: sum(open),
    won_value: sum(won),
    followups_week: followups.count || 0,
    recent: recent.data || [],
    by_status: byStatus.data || []
  }
}
