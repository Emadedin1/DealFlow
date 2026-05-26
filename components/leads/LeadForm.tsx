"use client"
import React, { useState } from 'react'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'

const STATUSES = ['New','Contacted','Meeting Booked','Proposal Sent','Won','Lost']
const SOURCES = ['Cold Email','Cold Call','Referral','LinkedIn','Website','Other']

export default function LeadForm({ initial = {}, onSubmit }: any) {
  const [form, setForm] = useState({
    name: initial.name || '',
    company: initial.company || '',
    email: initial.email || '',
    phone: initial.phone || '',
    source: initial.source || 'Other',
    status: initial.status || 'New',
    deal_value: initial.deal_value || '',
    last_contacted_date: initial.last_contacted_date || '',
    next_follow_up_date: initial.next_follow_up_date || '',
    notes: initial.notes || ''
  })
  const [error, setError] = useState<string | null>(null)

  function update(field: string, value: any) { setForm(prev => ({ ...prev, [field]: value })) }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.name) return setError('Name is required')
    if (!form.status) return setError('Status is required')
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) return setError('Email is invalid')
    const payload = { ...form, deal_value: form.deal_value ? Number(form.deal_value) : null }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <Input value={form.name} onChange={(e:any)=>update('name', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Company</label>
        <Input value={form.company} onChange={(e:any)=>update('company', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Email</label>
          <Input value={form.email} onChange={(e:any)=>update('email', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <Input value={form.phone} onChange={(e:any)=>update('phone', e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Source</label>
          <Select value={form.source} onChange={(e:any)=>update('source', e.target.value)}>
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm">Status</label>
          <Select value={form.status} onChange={(e:any)=>update('status', e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Deal value (CAD)</label>
          <Input value={form.deal_value} onChange={(e:any)=>update('deal_value', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Last contacted</label>
          <Input type="date" value={form.last_contacted_date} onChange={(e:any)=>update('last_contacted_date', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm">Next follow-up</label>
        <Input type="date" value={form.next_follow_up_date} onChange={(e:any)=>update('next_follow_up_date', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Notes</label>
        <Textarea value={form.notes} onChange={(e:any)=>update('notes', e.target.value)} />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  )
}
