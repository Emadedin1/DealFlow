import Link from 'next/link'

export default function LeadTable({ leads }: { leads: any[] }) {
  if (leads.length === 0) return <div className="bg-white p-6 rounded border">No leads yet.</div>

  return (
    <table className="w-full bg-white rounded border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="p-3">Name</th>
          <th className="p-3">Company</th>
          <th className="p-3">Status</th>
          <th className="p-3">Deal Value</th>
          <th className="p-3">Next Follow-up</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(l => (
          <tr key={l.id} className="border-b hover:bg-gray-50">
            <td className="p-3"><Link href={`/leads/${l.id}`} className="font-medium">{l.name}</Link></td>
            <td className="p-3">{l.company}</td>
            <td className="p-3">{l.status}</td>
            <td className="p-3">{l.deal_value ? `$${l.deal_value}` : '-'}</td>
            <td className="p-3">{l.next_follow_up_date || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
