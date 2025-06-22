
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vpgjsythkzvitxynbelr.supabase.co';
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ2pzeXRoa3p2aXR4eW5iZWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODA5MDYsImV4cCI6MjA2NjA1NjkwNn0.vpEmcVEKR1wilpXpfENc1FQVptkSqW9uYnSHSD-FitU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
