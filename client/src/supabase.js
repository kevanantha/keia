import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qndliyfzwhlzxldpcgsa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZGxpeWZ6d2hsenhsZHBjZ3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI1NDc3MTMsImV4cCI6MTk3ODEyMzcxM30.PWEvHkd1ccFWrMyAZ77JOimEc1rR3XkJYRqcb52wHbw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
