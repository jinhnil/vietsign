"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { 
  MessageCircle, 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Users,
  Plus,
  Loader2
} from "lucide-react";
import {
  mockConversations as dataConversations,
  mockMessages as dataMessages,
  mockOnlineStatus,
  getMessagesByConversationId,
  getLastMessageOfConversation,
  getUserOnlineStatus,
  formatMessageTime,
  getOtherParticipant,
  Conversation,
  Message,
} from "@/src/data/messagesData";
import { getUserById, roleLabels } from "@/src/data/usersData";

interface ConversationDisplay {
  id: number;
  name: string;
  avatar: string | null;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  role: string;
  isGroup: boolean;
  memberCount?: number;
}

export const Messages: React.FC = () => {
  const user = useSelector((state: any) => state.admin.user);
  const currentUserId = user?.id || 1; // Default to 1 for demo
  
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(dataMessages);
  const [conversations, setConversations] = useState<Conversation[]>(dataConversations);
  
  // Lazy loading states
  const MESSAGES_PER_PAGE = 10;
  const [displayedMessagesCount, setDisplayedMessagesCount] = useState<Record<number, number>>({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const shouldMaintainScrollRef = useRef<boolean>(false);
  const prevMessagesCountRef = useRef<number>(0);

  // Transform conversations to display format
  const conversationDisplayList = useMemo((): ConversationDisplay[] => {
    return conversations.map(conv => {
      const lastMessage = getLastMessageOfConversation(conv.id);
      let name = "";
      let avatar: string | null = null;
      let role = "";
      let online = false;
      
      if (conv.type === 'private') {
        const otherUserId = getOtherParticipant(conv, currentUserId);
        if (otherUserId) {
          const otherUser = getUserById(otherUserId);
          if (otherUser) {
            name = otherUser.name;
            avatar = otherUser.avatar || null;
            role = roleLabels[otherUser.role] || otherUser.role;
            const onlineStatus = getUserOnlineStatus(otherUserId);
            online = onlineStatus?.isOnline || false;
          }
        }
      } else {
        name = conv.name || 'Nhóm chat';
        role = `${conv.participants.length} thành viên`;
      }

      let lastMessageContent = "";
      if (lastMessage) {
        const sender = getUserById(lastMessage.senderId);
        const senderName = lastMessage.senderId === currentUserId ? "Bạn" : sender?.name?.split(' ').pop() || "";
        lastMessageContent = conv.type === 'group' 
          ? `${senderName}: ${lastMessage.content}`
          : lastMessage.content;
      }

      return {
        id: conv.id,
        name,
        avatar,
        lastMessage: lastMessageContent,
        time: lastMessage ? formatMessageTime(lastMessage.createdAt) : "",
        unread: conv.unreadCount,
        online,
        role,
        isGroup: conv.type === 'group',
        memberCount: conv.participants.length,
      };
    }).sort((a, b) => {
      // Sort by last message time (newest first)
      const timeA = a.time || '';
      const timeB = b.time || '';
      // Compare time strings - they are formatted, so we need to find the original conversation
      const convA = conversations.find(c => c.id === a.id);
      const convB = conversations.find(c => c.id === b.id);
      const dateA = convA?.updatedAt ? new Date(convA.updatedAt).getTime() : 0;
      const dateB = convB?.updatedAt ? new Date(convB.updatedAt).getTime() : 0;
      return dateB - dateA; // Newest first
    });
  }, [conversations, currentUserId]);

  // Auto select first conversation
  useEffect(() => {
    if (conversationDisplayList.length > 0 && selectedConversation === null) {
      setSelectedConversation(conversationDisplayList[0].id);
    }
  }, [conversationDisplayList, selectedConversation]);

  // Get all messages for selected conversation
  const allCurrentMessages = useMemo(() => {
    if (!selectedConversation) return [];
    return messages.filter(m => m.conversationId === selectedConversation);
  }, [messages, selectedConversation]);

  // Get displayed messages (limited by lazy loading)
  const currentMessages = useMemo(() => {
    if (!selectedConversation) return [];
    const displayCount = displayedMessagesCount[selectedConversation] || MESSAGES_PER_PAGE;
    // Show the last N messages
    return allCurrentMessages.slice(-displayCount);
  }, [allCurrentMessages, selectedConversation, displayedMessagesCount]);

  // Check if there are more messages to load
  const hasMoreMessages = useMemo(() => {
    if (!selectedConversation) return false;
    const displayCount = displayedMessagesCount[selectedConversation] || MESSAGES_PER_PAGE;
    return allCurrentMessages.length > displayCount;
  }, [allCurrentMessages, selectedConversation, displayedMessagesCount]);

  // Reset displayed count when changing conversation
  useEffect(() => {
    if (selectedConversation) {
      setDisplayedMessagesCount(prev => ({
        ...prev,
        [selectedConversation]: MESSAGES_PER_PAGE
      }));
      shouldMaintainScrollRef.current = false;
      prevMessagesCountRef.current = 0; // Reset counter
      prevScrollHeightRef.current = 0;
      setIsLoadingMore(false);
      
      // Scroll to bottom when switching conversation
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      }, 50);
    }
  }, [selectedConversation]);

  // Track last message ID for detecting new messages
  const lastMessageId = currentMessages[currentMessages.length - 1]?.id;
  const prevLastMessageIdRef = useRef<number | undefined>(undefined);

  // Scroll to bottom when new message is sent (last message ID changes and it's from current user)
  useEffect(() => {
    const lastMsg = currentMessages[currentMessages.length - 1];
    
    // If last message ID changed and we're not loading more messages
    if (lastMsg && prevLastMessageIdRef.current !== undefined && 
        lastMsg.id !== prevLastMessageIdRef.current && 
        !shouldMaintainScrollRef.current) {
      // New message was added - scroll to bottom
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    
    prevLastMessageIdRef.current = lastMsg?.id;
  }, [lastMessageId]);

  // Maintain scroll position after loading more messages - use useLayoutEffect for synchronous update
  useLayoutEffect(() => {
    if (shouldMaintainScrollRef.current && messagesContainerRef.current && prevScrollHeightRef.current > 0) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
      messagesContainerRef.current.scrollTop = scrollDiff;
      
      // Reset flags
      shouldMaintainScrollRef.current = false;
      prevScrollHeightRef.current = 0;
      setIsLoadingMore(false);
    }
  }, [currentMessages.length]);

  // Load more messages when scrolling to top
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    // Only trigger when very close to top and not already loading
    if (container.scrollTop < 20 && hasMoreMessages && !isLoadingMore && !shouldMaintainScrollRef.current) {
      // Save current scroll height before loading
      prevScrollHeightRef.current = container.scrollHeight;
      shouldMaintainScrollRef.current = true;
      setIsLoadingMore(true);
      
      // Load more messages
      setDisplayedMessagesCount(prev => ({
        ...prev,
        [selectedConversation!]: (prev[selectedConversation!] || MESSAGES_PER_PAGE) + MESSAGES_PER_PAGE
      }));
    }
  }, [hasMoreMessages, isLoadingMore, selectedConversation]);

  const selectedChat = conversationDisplayList.find(c => c.id === selectedConversation);

  const filteredConversations = conversationDisplayList.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg: Message = {
        id: messages.length + 1,
        conversationId: selectedConversation,
        senderId: currentUserId,
        content: newMessage.trim(),
        type: 'text',
        status: 'sent',
        createdAt: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, newMsg]);
      
      // Update conversation's last message
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return { ...conv, updatedAt: newMsg.createdAt };
        }
        return conv;
      }));
      
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectConversation = (convId: number) => {
    setSelectedConversation(convId);
    // Mark as read
    setConversations(prev => prev.map(conv => {
      if (conv.id === convId) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    }));
  };

  return (
    <div 
      className="bg-white fixed top-16 right-0 bottom-0 z-10"
      style={{ 
        left: 'var(--sidebar-width, 0px)',
        transition: "left 0.3s ease-in-out" 
      }}
    >
      <div className="flex h-full">
        {/* Sidebar - Danh sách cuộc trò chuyện */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Tin nhắn</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Tạo cuộc trò chuyện mới">
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <MessageCircle size={40} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Không tìm thấy cuộc trò chuyện</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-gray-50 ${
                    selectedConversation === conv.id 
                      ? "bg-indigo-50 border-l-4 border-l-indigo-600" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {conv.avatar ? (
                      <img 
                        src={conv.avatar} 
                        alt={conv.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {conv.isGroup ? <Users size={20} /> : conv.name.charAt(0)}
                      </div>
                    )}
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 truncate">{conv.name}</h4>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                          {conv.unread > 9 ? "9+" : conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {selectedChat.avatar ? (
                    <img 
                      src={selectedChat.avatar} 
                      alt={selectedChat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {selectedChat.isGroup ? <Users size={18} /> : selectedChat.name.charAt(0)}
                    </div>
                  )}
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedChat.online ? (
                      <span className="text-green-600">Đang hoạt động</span>
                    ) : (
                      selectedChat.role
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              onScroll={handleScroll}
            >
              {/* Loading indicator when loading more messages */}
              {isLoadingMore && (
                <div className="flex justify-center py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                    <span>Đang tải tin nhắn...</span>
                  </div>
                </div>
              )}

              {currentMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MessageCircle size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>Chưa có tin nhắn nào</p>
                    <p className="text-sm">Hãy bắt đầu cuộc trò chuyện!</p>
                  </div>
                </div>
              ) : (
                currentMessages.map((msg) => {
                  const isMe = msg.senderId === currentUserId;
                  const sender = getUserById(msg.senderId);
                  
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      {!isMe && selectedChat.isGroup && (
                        <div className="flex-shrink-0 mr-2">
                          {sender?.avatar ? (
                            <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold">
                              {sender?.name?.charAt(0) || "?"}
                            </div>
                          )}
                        </div>
                      )}
                      <div className={`max-w-[70%]`}>
                        {!isMe && selectedChat.isGroup && (
                          <p className="text-xs text-gray-500 mb-1 ml-1">{sender?.name?.split(' ').pop()}</p>
                        )}
                        <div
                          className={`px-4 py-2.5 rounded-2xl ${
                            isMe
                              ? "bg-indigo-600 text-white rounded-br-md"
                              : "bg-white text-gray-900 shadow-sm border border-gray-100 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 ${
                            isMe ? "text-indigo-200" : "text-gray-400"
                          }`}>
                            <span className="text-xs">{formatMessageTime(msg.createdAt)}</span>
                            {isMe && (
                              msg.status === "read" 
                                ? <CheckCheck size={14} className="text-indigo-200" />
                                : <Check size={14} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip size={20} className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ImageIcon size={20} className="text-gray-500" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Smile size={20} className="text-gray-400 hover:text-gray-600 transition-colors" />
                  </button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={40} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chọn một cuộc trò chuyện</h3>
              <p className="text-gray-500">Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
