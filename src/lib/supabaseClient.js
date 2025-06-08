
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxenodgmejjdlaepkvvz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZW5vZGdtZWpqZGxhZXBrdnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNzgzNDAsImV4cCI6MjA2NDk1NDM0MH0.T0kFBlIUDfD-fh7sZpOeHsVwdXZfHbwc33K_pH45KdI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
