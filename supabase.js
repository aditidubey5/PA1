// ============================================
// SUPABASE CONFIG
// ============================================

const SUPABASE_URL = "https://jgozwnygkuuxkwhrhqk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nF2FaubTOihhXqSYyETQzA_iv5huqqH";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Make it globally available
window._supabase = _supabase;

console.log("✅ Supabase client initialized successfully");

export default _supabase;