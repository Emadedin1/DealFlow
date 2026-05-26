export default function PipelineSummary({ statuses }: { statuses: any[] }) {
  return (
    <div className="bg-white p-4 rounded border">
      <h3 className="font-semibold">Leads by status</h3>
      <div className="mt-4 space-y-2">
        {statuses.map((s: any) => (
          <div key={s.status} className="flex justify-between">
            <div className="text-sm">{s.status}</div>
            <div className="text-sm font-medium">{s.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
