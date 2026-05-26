export default function StatCard({ label, value }: { label: string, value: any }) {
  return (
    <div className="bg-white p-4 rounded border">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value ?? '-'}</div>
    </div>
  )
}
