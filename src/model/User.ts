import { Base } from "./base";

export interface User {
  user_id?: number;
  id?: string;
  email: string;
  name: string;
  phone_number?: string;
  code?: string; // role code from backend (ADMIN, STUDENT, TEACHER, etc.)
  role?: UserRole;
  label?: string;
  avatar?: string;
  avatar_url?: string;
  is_deleted?: boolean;
  is_oauth2?: boolean;
  approval_status?: "PENDING" | "APPROVED" | "REJECTED";
  created_date?: string;
  modified_date?: string;
}

export interface UserRole {
  role: "Admin" | "FacilityManager" | "Teacher" | "Student" | "User";
  label: string;
}

// Map backend role codes to frontend roles
export const mapRoleCode = (code: string): UserRole => {
  const roleMap: { [key: string]: UserRole } = {
    ADMIN: { role: "Admin", label: "Quản trị viên" },
    FACILITY_MANAGER: { role: "FacilityManager", label: "Quản lý cơ sở" },
    TEACHER: { role: "Teacher", label: "Giáo viên" },
    STUDENT: { role: "Student", label: "Học sinh" },
    USER: { role: "User", label: "Người dùng" },
  };
  return roleMap[code] || { role: "User", label: "Người dùng" };
};

class UserModelClass extends Base {
  constructor() {
    super("user"); // Matches backend /user routes
  }

  // ==================== USER'S OWN PROFILE ====================

  // GET /user/profile - Lấy thông tin cá nhân
  getProfile = async (): Promise<any> => {
    const res = await this.apiGet("/profile");
    return res.data;
  };

  // PUT /user/profile - Cập nhật thông tin cá nhân
  updateProfile = async (data: Partial<User>): Promise<any> => {
    const res = await this.apiPut("/profile", data);
    return res.data;
  };

  // PUT /user/change-password - Đổi mật khẩu
  changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<any> => {
    const res = await this.apiPut("/change-password", data);
    return res.data;
  };

  // POST /user/avatar/upload - Upload avatar (multipart/form-data)
  uploadAvatar = async (formData: FormData): Promise<any> => {
    const res = await this.apiUploadFile("/avatar/upload", formData);
    return res.data;
  };

  // PUT /user/avatar/url - Cập nhật avatar bằng URL
  updateAvatarUrl = async (avatarUrl: string): Promise<any> => {
    const res = await this.apiPut("/avatar/url", { avatar_url: avatarUrl });
    return res.data;
  };

  // DELETE /user/account - Xóa tài khoản
  deleteAccount = async (password: string): Promise<any> => {
    const res = await this.apiDelete("/account");
    return res.data;
  };

  // GET /user/activity-log - Lịch sử hoạt động
  getActivityLog = async (query?: any): Promise<any> => {
    const res = await this.apiGet("/activity-log", query);
    return res.data;
  };

  // ==================== ADMIN FUNCTIONS ====================

  // GET /user/all - Lấy danh sách tất cả user (Admin only)
  getAllUsers = async (query?: any): Promise<any> => {
    const res = await this.apiGet("/all", query);
    return res.data;
  };

  // GET /user/:userId - Lấy thông tin user theo ID (Admin only)
  getUserById = async (userId: number): Promise<any> => {
    const res = await this.apiGet(`/${userId}`);
    return res.data;
  };

  // POST /user/create - Tạo user mới (Admin only)
  createUser = async (data: Partial<User>): Promise<any> => {
    const res = await this.apiPost("/create", data);
    return res.data;
  };

  // PUT /user/:userId - Cập nhật user (Admin only)
  updateUser = async (userId: number, data: Partial<User>): Promise<any> => {
    const res = await this.apiPut(`/${userId}`, data);
    return res.data;
  };

  // DELETE /user/:userId - Xóa user (Admin only)
  deleteUser = async (userId: number): Promise<any> => {
    const res = await this.apiDelete(`/${userId}`);
    return res.data;
  };

  // PUT /user/:userId/restore - Khôi phục user đã xóa (Admin only)
  restoreUser = async (userId: number): Promise<any> => {
    const res = await this.apiPut(`/${userId}/restore`, {});
    return res.data;
  };

  // PUT /user/:userId/reset-password - Reset mật khẩu user (Admin only)
  resetUserPassword = async (
    userId: number,
    newPassword: string
  ): Promise<any> => {
    const res = await this.apiPut(`/${userId}/reset-password`, { newPassword });
    return res.data;
  };

  // PUT /user/:userId/change-role - Thay đổi role (Admin only)
  changeUserRole = async (userId: number, roleCode: string): Promise<any> => {
    const res = await this.apiPut(`/${userId}/change-role`, { role: roleCode });
    return res.data;
  };

  // ==================== ACCOUNT APPROVAL ====================

  // GET /user/pending - Danh sách tài khoản chờ phê duyệt
  getPendingUsers = async (query?: any): Promise<any> => {
    const res = await this.apiGet("/pending", query);
    return res.data;
  };

  // GET /user/approval-stats - Thống kê phê duyệt
  getApprovalStats = async (): Promise<any> => {
    const res = await this.apiGet("/approval-stats");
    return res.data;
  };

  // PUT /user/:userId/approve - Phê duyệt tài khoản
  approveUser = async (userId: number): Promise<any> => {
    const res = await this.apiPut(`/${userId}/approve`, {});
    return res.data;
  };

  // PUT /user/:userId/reject - Từ chối tài khoản
  rejectUser = async (userId: number, reason?: string): Promise<any> => {
    const res = await this.apiPut(`/${userId}/reject`, { reason });
    return res.data;
  };

  // POST /user/bulk-approve - Phê duyệt nhiều tài khoản
  bulkApproveUsers = async (userIds: number[]): Promise<any> => {
    const res = await this.apiPost("/bulk-approve", { userIds });
    return res.data;
  };

  // GET /user/:userId/approval-history - Lịch sử phê duyệt
  getUserApprovalHistory = async (userId: number): Promise<any> => {
    const res = await this.apiGet(`/${userId}/approval-history`);
    return res.data;
  };
}

const UserModel = new UserModelClass();
export default UserModel;
