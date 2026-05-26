import React from 'react'

export default function EmptyState({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="bg-white p-6 rounded border text-center">
      <div className="font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-2">{subtitle}</div>}
    </div>
  )
}
