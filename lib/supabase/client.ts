import { createClient as create } from '@supabase/supabase-js'

// Returns a Supabase client when env vars are present.
// If env vars are missing (e.g., during static build), return a safe stub
// to avoid runtime errors during prerendering.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (url && key) return create(url, key)

  // Minimal stub used when Supabase is not configured during build.
  const noop = async () => ({ data: null, error: { message: 'Supabase not configured' } })
  return {
    auth: {
      signInWithPassword: noop,
      signUp: noop,
      getUser: async () => ({ data: { user: null } }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({ select: async () => ({ data: [], error: null, count: 0 }), insert: async () => ({ data: [], error: null }), update: async () => ({ data: [], error: null }), delete: async () => ({ data: [], error: null }), order: () => ({}) }),
    rpc: async () => ({ data: [] }),
  } as any
}

export default createClient
