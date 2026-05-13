const SUPABASE_URL = "https://jgozwnygkuuxkwxhrhqk.supabase.co";
const SUPABASE_KEY = "sb_publishable_nF2FaubTOihhXqSYyETQzA_iv5huqqH";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window._supabase = _supabase;