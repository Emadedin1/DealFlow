import React from 'react'

export default function StatusBadge({ status }: { status: string }) {
  const color = status === 'Won' ? 'bg-green-100 text-green-800' : status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
  return <span className={`px-2 py-1 rounded text-sm ${color}`}>{status}</span>
}
