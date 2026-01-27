import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Message = {
  id: string;
  created_at: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  conversation_id?: string;
  is_read: boolean;
};

export type Conversation = {
  id: string;
  created_at: string;
  updated_at: string;
  participant_ids: string[];
  last_message?: string;
};
