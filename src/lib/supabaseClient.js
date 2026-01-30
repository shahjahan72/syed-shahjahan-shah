import { createClient } from '@supabase/supabase-js';

// Reads env vars from import.meta.env (Vite)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // In production you should ensure these are set in your environment (Vercel Project settings).
  console.warn('Supabase client not fully configured. Set VITE_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL and ANON KEY.');
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');
export default supabase;