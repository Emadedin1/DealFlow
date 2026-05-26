"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      // Provide clearer guidance for common Supabase email errors
      if (error.message?.toLowerCase().includes('rate')) {
        setError('Sign-up email rate limit exceeded. Try again later or use the demo.')
      } else {
        setError(error.message)
      }
    } else {
      // If session was created immediately, continue to dashboard
      router.push('/dashboard')
    }
  }

  return (
    <main className="container py-20 max-w-md">
      <h1 className="text-2xl font-bold">Create an account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white p-6 rounded border">
        <label className="block">
          <div className="text-sm font-medium">Email</div>
          <input required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>
        <label className="block">
          <div className="text-sm font-medium">Password</div>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign up</button>
          <a href="/dashboard?demo=1" className="px-4 py-2 border rounded text-gray-700">View demo</a>
        </div>
      </form>
    </main>
  )
}
