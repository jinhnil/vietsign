"use client";

import { Bell, Check, CheckCheck, Trash2, Filter, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const mockNotifications = [
  { id: 1, title: "Lớp học mới đã được tạo", message: "Lớp A3 đã được tạo.", type: "info", isRead: false, createdAt: "5 phút trước", sender: "Hệ thống" },
  { id: 2, title: "Bài kiểm tra sắp diễn ra", message: "Kiểm tra cuối kỳ lớp B2 ngày 15/01.", type: "warning", isRead: false, createdAt: "1 giờ trước", sender: "Admin" },
  { id: 3, title: "Hoàn thành khóa học", message: "Chúc mừng! Bạn đã hoàn thành khóa học.", type: "success", isRead: true, createdAt: "Hôm qua", sender: "Hệ thống" },
  { id: 4, title: "Lịch học thay đổi", message: "Lớp A1 nghỉ học ngày 20/01.", type: "error", isRead: true, createdAt: "2 ngày trước", sender: "GV Trần Lan" },
];

const typeConfig: Record<string, { icon: React.ReactNode; bgColor: string; iconColor: string }> = {
  info: { icon: <Info size={20} />, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  warning: { icon: <AlertTriangle size={20} />, bgColor: "bg-amber-100", iconColor: "text-amber-600" },
  success: { icon: <CheckCircle size={20} />, bgColor: "bg-green-100", iconColor: "text-green-600" },
  error: { icon: <XCircle size={20} />, bgColor: "bg-red-100", iconColor: "text-red-600" },
};

export function NotificationsManagement() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState("all");

  const filteredNotifications = notifications.filter(notif => filterType === "all" || (filterType === "unread" ? !notif.isRead : notif.type === filterType));
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const markAsRead = (id: number) => setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  const deleteNotification = (id: number) => setNotifications(notifications.filter(n => n.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary-600" />
            Thông báo
            {unreadCount > 0 && <span className="px-2.5 py-0.5 text-sm font-medium bg-red-500 text-white rounded-full">{unreadCount}</span>}
          </h1>
          <p className="text-gray-600 mt-1">Quản lý thông báo của bạn</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium">
            <CheckCheck size={18} /> Đánh dấu tất cả đã đọc
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white">
            <option value="all">Tất cả</option>
            <option value="unread">Chưa đọc</option>
            <option value="info">Thông tin</option>
            <option value="warning">Cảnh báo</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {filteredNotifications.map((notif) => {
          const config = typeConfig[notif.type];
          return (
            <div key={notif.id} className={`p-5 hover:bg-gray-50 ${!notif.isRead ? 'bg-primary-50/30' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center ${config.iconColor}`}>{config.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-medium ${!notif.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notif.title} {!notif.isRead && <span className="inline-block w-2 h-2 bg-primary-500 rounded-full ml-2"></span>}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500"><span>{notif.sender}</span><span>•</span><span>{notif.createdAt}</span></div>
                </div>
                <div className="flex items-center gap-1">
                  {!notif.isRead && <button onClick={() => markAsRead(notif.id)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Check size={18} /></button>}
                  <button onClick={() => deleteNotification(notif.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có thông báo</h3>
          </div>
        )}
      </div>
    </div>
  );
}
