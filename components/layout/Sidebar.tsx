import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-56 p-4 border-r bg-gray-50 hidden md:block">
      <nav className="space-y-2">
        <Link href="/dashboard" className="block py-2 px-2 rounded hover:bg-white">Dashboard</Link>
        <Link href="/leads" className="block py-2 px-2 rounded hover:bg-white">Leads</Link>
        <Link href="/follow-ups" className="block py-2 px-2 rounded hover:bg-white">Follow-ups</Link>
        <Link href="/settings" className="block py-2 px-2 rounded hover:bg-white">Settings</Link>
      </nav>
    </aside>
  )
}
