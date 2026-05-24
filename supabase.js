// ============================================
// SUPABASE CONFIG
// ============================================

const SUPABASE_URL = "https://jgozwnygkuuxkwxhrhqk.supabase.co";

// Use the LEGACY ANON key (eyJ...) from:
// Supabase Dashboard → Settings → API Keys → "Legacy anon, service_role API keys" tab
// NOT the sb_publishable_ key — that one breaks auth
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb3p3bnlna3V1eGt3eGhyaHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjk2OTMsImV4cCI6MjA5MTg0NTY5M30.P4_DfxF-68nNyrwKwgGOw_CZQR4TS_BvEwhUolsMEu0";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
    flowType: "implicit",
  },
});

window._supabase = _supabase;

console.log("✅ Supabase client initialized");
