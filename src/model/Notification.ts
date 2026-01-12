import { Base } from "./base";

export class NotificationModel extends Base {
  constructor() {
    super("notifications");
  }

  getAllNotifications = async (query?: any) => {
    const res = await this.apiGet("/all", query);
    return res.data;
  };

  getNotificationById = async (id: number) => {
    const res = await this.apiGet(`/${id}`);
    return res.data;
  };

  createNotification = async (data: any) => {
    const res = await this.apiPost("/create", data);
    return res.data;
  };

  updateNotification = async (id: number, data: any) => {
    const res = await this.apiPut(`/${id}`, data);
    return res.data;
  };

  deleteNotification = async (id: number) => {
    const res = await this.apiDelete(`/${id}`);
    return res.data;
  };

  markAsRead = async (id: number) => {
    const res = await this.apiPut(`/${id}/read`, { isRead: true });
    return res.data;
  };

  markAllAsRead = async () => {
    const res = await this.apiPut(`/read-all`, {});
    return res.data;
  };
}

const Notifications = new NotificationModel();
export default Notifications;
