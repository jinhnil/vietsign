import { supabase, Message } from "@/core/lib/supabaseClient";

/**
 * Service quản lý tin nhắn Real-time với Supabase
 */
export const chatService = {
  /**
   * Lấy danh sách tin nhắn của một cuộc hội thoại
   */
  getMessages: async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data as Message[];
  },

  /**
   * Gửi tin nhắn mới
   */
  sendMessage: async (
    content: string,
    senderId: string,
    conversationId: string,
  ) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          content,
          sender_id: senderId,
          conversation_id: conversationId,
          is_read: false,
        },
      ])
      .select();

    if (error) throw error;
    return data[0] as Message;
  },

  /**
   * Đăng ký nhận tin nhắn mới realtime
   */
  subscribeToMessages: (
    conversationId: string,
    callback: (payload: any) => void,
  ) => {
    return supabase
      .channel(`chat:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        callback,
      )
      .subscribe();
  },

  /**
   * Đánh dấu tin nhắn đã đọc
   */
  markAsRead: async (messageIds: string[]) => {
    const { error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .in("id", messageIds);

    if (error) throw error;
  },

  /**
   * Tạo cuộc hội thoại mới (nếu chưa có)
   */
  createConversation: async (participantIds: string[]) => {
    // Logic kiểm tra hoặc tạo conversation mới
    // Đây là ví dụ đơn giản
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ participant_ids: participantIds }])
      .select();

    if (error) throw error;
    return data[0];
  },
};
