"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
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
  Loader2,
} from "lucide-react";
import {
  getUserOnlineStatus,
  formatMessageTime,
  Conversation,
  Message,
} from "@/data/messagesData";
import { roleLabels, UserItem } from "@/data/usersData";
import { fetchAllUsers } from "@/services/userService";
import { db } from "@/core/config/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  Timestamp,
  doc,
  updateDoc,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Modal } from "@/shared/components/common/Modal";

interface ConversationDisplay {
  id: string;
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

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [usersMap, setUsersMap] = useState<Record<number, UserItem>>({});

  // Create Conversation Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newConvPartnerId, setNewConvPartnerId] = useState("");

  // Refs for scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch Users
  useEffect(() => {
    async function loadUsers() {
      try {
        const { users } = await fetchAllUsers({ limit: 1000 }); // Fetch all
        const map: Record<number, UserItem> = {};
        users.forEach((u) => {
          map[u.id] = u;
        });
        setUsersMap(map);
      } catch (e) {
        console.error("Failed to load users for messages", e);
      }
    }
    loadUsers();
  }, []);

  // 1. Fetch Conversations
  // Query conversations where 'participants' array contains currentUserId
  const conversationsRef = collection(db, "conversations");
  const q = query(
    conversationsRef,
    where("participants", "array-contains", currentUserId)
    // orderBy("updatedAt", "desc") // Requires composite index, skipping for now
  );

  const [conversationsSnapshot, loadingConversations] = useCollection(q);
  const conversationsRaw = conversationsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // 2. Fetch Messages for Selected Conversation
  const messagesRef = selectedConversation
    ? collection(db, "conversations", selectedConversation, "messages")
    : null;

  const messagesQuery = messagesRef
    ? query(messagesRef, orderBy("createdAt", "asc"))
    : null;

  const [messagesSnapshot, loadingMessages] = useCollection(messagesQuery);
  const messagesRaw = messagesSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesRaw && messagesRaw.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesRaw]);

  // Transform conversations
  const conversationDisplayList = useMemo((): ConversationDisplay[] => {
    if (!conversationsRaw) return [];

    return conversationsRaw
      .map((conv: any) => {
        let name = "";
        let avatar: string | null = null;
        let role = "";
        let online = false;

        const type = conv.type || "private";

        if (type === "private") {
          const otherUserId = conv.participants.find(
            (p: number) => p !== currentUserId
          );
          if (otherUserId) {
            const otherUser = usersMap[otherUserId];
            if (otherUser) {
              name = otherUser.name;
              avatar = otherUser.avatar || null;
              role = roleLabels[otherUser.role] || otherUser.role;
              const onlineStatus = getUserOnlineStatus(otherUserId);
              online = onlineStatus?.isOnline || false;
            } else {
              name = `User ${otherUserId}`;
              role = "Người dùng";
            }
          }
        } else {
          name = conv.name || "Nhóm chat";
          role = `${conv.participants.length} thành viên`;
        }

        // Format last message time
        let time = "";
        if (conv.updatedAt) {
          // Handle Firestore Timestamp or ISO string
          const date = conv.updatedAt?.toDate
            ? conv.updatedAt.toDate()
            : new Date(conv.updatedAt);
          time = formatMessageTime(date.toISOString());
        }

        return {
          id: conv.id,
          name,
          avatar,
          lastMessage: conv.lastMessageContent || "",
          time,
          unread: conv.unreadCounts?.[currentUserId] || 0,
          online,
          role,
          isGroup: type === "group",
          memberCount: conv.participants?.length,
          updatedAt: conv.updatedAt, // keep for sorting
        };
      })
      .sort((a: any, b: any) => {
        const dateA = a.updatedAt?.toDate
          ? a.updatedAt.toDate().getTime()
          : new Date(a.updatedAt || 0).getTime();
        const dateB = b.updatedAt?.toDate
          ? b.updatedAt.toDate().getTime()
          : new Date(b.updatedAt || 0).getTime();
        return dateB - dateA;
      });
  }, [conversationsRaw, currentUserId, usersMap]);

  const filteredConversations = conversationDisplayList.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChat = conversationDisplayList.find(
    (c) => c.id === selectedConversation
  );

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const msgContent = newMessage.trim();
      setNewMessage(""); // Clear immediately

      // Add message to subcollection
      const messagesColl = collection(
        db,
        "conversations",
        selectedConversation,
        "messages"
      );
      await addDoc(messagesColl, {
        senderId: currentUserId,
        content: msgContent,
        type: "text",
        status: "sent",
        createdAt: serverTimestamp(),
      });

      // Update conversation document (last message, update time)
      const convDoc = doc(db, "conversations", selectedConversation);
      await updateDoc(convDoc, {
        lastMessageContent: msgContent,
        updatedAt: serverTimestamp(),
        // Increment unread for others (simplified)
        // In real app, you'd update a map of unread counts
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConvPartnerId) return;

    try {
      const partnerId = parseInt(newConvPartnerId);
      if (isNaN(partnerId)) {
        alert("ID người dùng không hợp lệ");
        return;
      }

      // Check if conversation exists (simplified: just create new for now or rely on querying)
      // Usually you query if a private chat with these 2 participants exists

      const newConvRef = await addDoc(collection(db, "conversations"), {
        participants: [currentUserId, partnerId],
        type: "private",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessageContent: "Bắt đầu cuộc trò chuyện",
        unreadCounts: {
          [currentUserId]: 0,
          [partnerId]: 1,
        },
      });

      setIsCreateModalOpen(false);
      setNewConvPartnerId("");
      setSelectedConversation(newConvRef.id);
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Lỗi tạo cuộc trò chuyện: " + error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="bg-white fixed top-16 right-0 bottom-0 z-10"
      style={{
        left: "var(--sidebar-width, 0px)",
        transition: "left 0.3s ease-in-out",
      }}
    >
      <div className="flex h-full">
        {/* Sidebar - Danh sách cuộc trò chuyện */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Tin nhắn</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Tạo cuộc trò chuyện mới"
            >
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
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
            {loadingConversations ? (
              <div className="flex justify-center p-4">
                <Loader2 className="animate-spin text-indigo-600" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <MessageCircle
                  size={40}
                  className="mx-auto mb-2 text-gray-300"
                />
                <p className="text-sm">Không tìm thấy cuộc trò chuyện</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
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
                        {conv.isGroup ? (
                          <Users size={20} />
                        ) : (
                          conv.name.charAt(0)
                        )}
                      </div>
                    )}
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {conv.name}
                      </h4>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-500 truncate">
                        {conv.lastMessage}
                      </p>
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
                      {selectedChat.isGroup ? (
                        <Users size={18} />
                      ) : (
                        selectedChat.name.charAt(0)
                      )}
                    </div>
                  )}
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedChat.name}
                  </h3>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {loadingMessages ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="animate-spin text-indigo-600" />
                </div>
              ) : !messagesRaw || messagesRaw.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MessageCircle
                      size={48}
                      className="mx-auto mb-2 text-gray-300"
                    />
                    <p>Chưa có tin nhắn nào</p>
                    <p className="text-sm">Hãy bắt đầu cuộc trò chuyện!</p>
                  </div>
                </div>
              ) : (
                messagesRaw.map((msg: any) => {
                  const isMe = msg.senderId === currentUserId;
                  const sender = usersMap[msg.senderId];
                  const time = msg.createdAt
                    ? formatMessageTime(
                        msg.createdAt.toDate
                          ? msg.createdAt.toDate().toISOString()
                          : new Date().toISOString()
                      )
                    : "...";

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isMe && selectedChat.isGroup && (
                        <div className="flex-shrink-0 mr-2">
                          {sender?.avatar ? (
                            <img
                              src={sender.avatar}
                              alt={sender.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold">
                              {sender?.name?.charAt(0) || "?"}
                            </div>
                          )}
                        </div>
                      )}
                      <div className={`max-w-[70%]`}>
                        {!isMe && selectedChat.isGroup && (
                          <p className="text-xs text-gray-500 mb-1 ml-1">
                            {sender?.name?.split(" ").pop()}
                          </p>
                        )}
                        <div
                          className={`px-4 py-2.5 rounded-2xl ${
                            isMe
                              ? "bg-indigo-600 text-white rounded-br-md"
                              : "bg-white text-gray-900 shadow-sm border border-gray-100 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">
                            {msg.content}
                          </p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 ${
                              isMe ? "text-indigo-200" : "text-gray-400"
                            }`}
                          >
                            <span className="text-xs">{time}</span>
                            {isMe &&
                              (msg.status === "read" ? (
                                <CheckCheck
                                  size={14}
                                  className="text-indigo-200"
                                />
                              ) : (
                                <Check size={14} />
                              ))}
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
                    <Smile
                      size={20}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    />
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Chọn một cuộc trò chuyện
              </h3>
              <p className="text-gray-500">
                Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn
                tin
              </p>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Tạo cuộc trò chuyện mới"
      >
        <form onSubmit={handleCreateConversation} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Người dùng
            </label>
            <input
              type="number"
              value={newConvPartnerId}
              onChange={(e) => setNewConvPartnerId(e.target.value)}
              placeholder="Nhập ID người dùng (VD: 2)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Nhập ID của người dùng bạn muốn nhắn tin (ví dụ: 1 là Admin, 2 là
              Quản lý, 3 là Giáo viên...)
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Bắt đầu nhắn tin
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
