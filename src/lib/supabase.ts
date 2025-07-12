import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://abbjmakhydcpbxdkjtxb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYmptYWtoeWRjcGJ4ZGtqdHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTU3MzUsImV4cCI6MjA2NzgzMTczNX0.pwCKASXt7vsFDwx41XWzGpsD1PC4H78hMhRxvIEmQgk';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Registration = {
  id: string;
  full_name: string;
  mobile_number: string;
  room_number: string;
  group_name: string;
  interests: string[];
  custom_interest: string | null;
  software: string[];
  custom_software: string | null;
  created_at: string;
  updated_at: string;
}; 