import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client factory (lazy)
 *
 * Do not validate environment variables at module import time:
 * - Next.js may evaluate route modules during build/collect phase.
 * - A hard throw here would break builds even when the waitlist route is unused.
 */
let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.NEXT_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check .env.local file.",
    );
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // No user authentication needed
    },
  });

  return supabaseClient;
}

/**
 * Database table type definitions
 */
export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}
