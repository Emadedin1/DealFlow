import Link from 'next/link'
import StatusBadge from './StatusBadge'

export default function LeadCard({ lead }: any) {
  return (
    <Link href={`/leads/${lead.id}`} className="block bg-white p-4 rounded border hover:bg-gray-50">
      <div className="flex justify-between">
        <div>
          <div className="font-medium">{lead.name}</div>
          <div className="text-sm text-gray-500">{lead.company}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">{lead.deal_value ? `$${lead.deal_value}` : '-'}</div>
          <div className="mt-1"><StatusBadge status={lead.status} /></div>
        </div>
      </div>
    </Link>
  )
}
