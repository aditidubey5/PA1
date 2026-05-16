// ============================================
// SUPABASE CONFIG
// ============================================

const SUPABASE_URL = "https://jgozwnygkuuxkwxhrhqk.supabase.co";   // ← Correct URL
const SUPABASE_KEY = "sb_publishable_nF2FaubTOihhXqSYyETQzA_iv5huqqH";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Make it globally available
window._supabase = _supabase;

console.log("✅ Supabase client initialized");