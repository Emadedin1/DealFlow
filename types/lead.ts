export type Lead = {
  id: string
  user_id: string
  name: string
  company?: string
  email?: string
  phone?: string
  source?: string
  status: string
  deal_value?: number | null
  next_follow_up_date?: string | null
  last_contacted_date?: string | null
  notes?: string
  created_at?: string
  updated_at?: string
}
