import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rrsqiohhmpqdvtooytpc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyc3Fpb2hobXBxZHZ0b295dHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTM1MTAsImV4cCI6MjA2ODY2OTUxMH0.R1ZU2e-x20s1B3Es_CVTLzpApfGOwSBU976AljWdhzQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
