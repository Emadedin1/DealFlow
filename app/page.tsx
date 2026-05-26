import Link from 'next/link'

export default function Home() {
  return (
    <main className="container py-20">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold">Track every lead, follow-up, and deal in one clean CRM.</h1>
          <p className="mt-4 text-gray-600">DealFlow helps freelancers and student entrepreneurs manage their client pipeline without messy spreadsheets.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded">Get Started</Link>
            <Link href="/dashboard" className="px-4 py-2 border border-gray-200 rounded">View Demo</Link>
          </div>
        </div>
        <div>
          <div className="grid gap-4">
            <div className="p-6 bg-white rounded shadow-sm border">
              <h3 className="font-semibold">Lead Pipeline</h3>
              <p className="text-sm text-gray-500 mt-2">Manage stages, deal values, and next steps.</p>
            </div>
            <div className="p-6 bg-white rounded shadow-sm border">
              <h3 className="font-semibold">Follow-up Tracking</h3>
              <p className="text-sm text-gray-500 mt-2">Never miss a follow-up again.</p>
            </div>
            <div className="p-6 bg-white rounded shadow-sm border">
              <h3 className="font-semibold">Revenue Dashboard</h3>
              <p className="text-sm text-gray-500 mt-2">See pipeline value and won deals.</p>
            </div>
            <div className="p-6 bg-white rounded shadow-sm border">
              <h3 className="font-semibold">Client Notes</h3>
              <p className="text-sm text-gray-500 mt-2">Keep context for every lead.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
