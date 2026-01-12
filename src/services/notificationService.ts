import NotificationModel from "@/src/model/Notification";
import {
  mockNotifications,
  NotificationItem,
} from "@/src/data/notificationsData";

const USE_API = true;

export async function fetchAllNotifications(
  query?: any
): Promise<NotificationItem[]> {
  if (!USE_API) return mockNotifications;

  try {
    const response = await NotificationModel.getAllNotifications(query);
    const data = response.data || response;
    return Array.isArray(data) ? data : mockNotifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return mockNotifications;
  }
}

export async function fetchNotificationById(
  id: number
): Promise<NotificationItem | undefined> {
  if (!USE_API) return mockNotifications.find((n) => n.id === id);

  try {
    const response = await NotificationModel.getNotificationById(id);
    return (response.data || response) as NotificationItem;
  } catch (error) {
    console.error("Error fetching notification:", error);
    return mockNotifications.find((n) => n.id === id);
  }
}

export async function createNotification(data: any) {
  return await NotificationModel.createNotification(data);
}

export async function updateNotification(id: number, data: any) {
  return await NotificationModel.updateNotification(id, data);
}

export async function deleteNotification(id: number) {
  return await NotificationModel.deleteNotification(id);
}

export async function markAsRead(id: number) {
  if (!USE_API) return;
  return await NotificationModel.markAsRead(id);
}

export async function markAllAsRead() {
  if (!USE_API) return;
  return await NotificationModel.markAllAsRead();
}
