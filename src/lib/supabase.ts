import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default function SupabaseServer(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}