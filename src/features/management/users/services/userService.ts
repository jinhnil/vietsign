/**
 * User Data Service
 *
 * Service này cung cấp các hàm để lấy dữ liệu người dùng từ API.
 */

import UserModel from "@/domain/entities/User";
import {
  UserItem,
  roleLabels,
  roleColors,
  userStatusConfig,
  mockUsers,
  getUserById as getMockUserById,
  getUsersByRole as getMockUsersByRole,
} from "@/data/usersData";

// Re-export types và constants
export { roleLabels, roleColors, userStatusConfig } from "@/data/usersData";
export type { UserItem } from "@/data/usersData";

/**
 * Convert API user to UserItem format
 */
function convertApiUserToUserItem(apiUser: any): UserItem {
  return {
    id: apiUser.user_id,
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.code || "USER",
    status: apiUser.is_deleted ? "inactive" : "active",
    avatar: apiUser.avatar_url,
    phone: apiUser.phone_number,
    createdAt: apiUser.created_date
      ? new Date(apiUser.created_date).toLocaleDateString("vi-VN")
      : new Date().toLocaleDateString("vi-VN"),
    facilityId: apiUser.facility_id,
  };
}

export interface UserListResponse {
  users: UserItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Lấy tất cả users từ API, nếu không thành công sử dụng mock data
 */
export async function fetchAllUsers(query?: any): Promise<UserListResponse> {
  try {
    const response = await UserModel.getAllUsers(query);

    let users: UserItem[] = [];
    if (response.users && Array.isArray(response.users)) {
      users = response.users.map(convertApiUserToUserItem);
    } else if (response.content && Array.isArray(response.content)) {
      users = response.content.map(convertApiUserToUserItem);
    } else if (response.data && Array.isArray(response.data)) {
      users = response.data.map(convertApiUserToUserItem);
    } else if (Array.isArray(response)) {
      users = response.map(convertApiUserToUserItem);
    }

    return {
      users,
      total: response.total || users.length,
      page: response.page || 1,
      limit: response.limit || users.length,
      totalPages: response.totalPages || 1,
    };
  } catch (error) {
    console.error("Error fetching users from API", error);
    console.warn("Using mock user data as fallback");

    // Use mock data as fallback
    let filteredUsers = [...mockUsers];

    // Apply filters if provided
    if (query?.role) {
      filteredUsers = filteredUsers.filter(u => u.role === query.role);
    }
    if (query?.facilityId) {
      filteredUsers = filteredUsers.filter(u => u.facilityId === query.facilityId);
    }
    if (query?.status) {
      filteredUsers = filteredUsers.filter(u => u.status === query.status);
    }

    // Pagination
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit),
    };
  }
}

/**
 * Lấy user theo ID từ API, nếu không thành công sử dụng mock data
 */
export async function fetchUserById(id: number): Promise<UserItem | undefined> {
  try {
    const response = await UserModel.getUserById(id);
    if (response.user) {
      return convertApiUserToUserItem(response.user);
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching user ${id} from API`, error);
    console.warn(`Using mock user data for user ${id} as fallback`);

    // Use mock data as fallback
    return getMockUserById(id);
  }
}

/**
 *nếu không thành công sử dụng mock data
 */
export async function fetchUsersByRole(role: string): Promise<UserItem[]> {
  try {
    const result = await fetchAllUsers({ role });
    return result.users;
  } catch (error) {
    console.error(`Error fetching users by role ${role}`, error);
    console.warn(`Using mock user data for role ${role} as fallback`);

    // Use mock data as fallback
    return getMockUsersByRole(role);
  }
}

/**
 * Lấy users theo facility
 */
export async function fetchUsersByFacility(
  facilityId: number
): Promise<UserItem[]> {
  const result = await fetchAllUsers({ facilityId });
  return result.users;
}

/**
 * Lấy danh sách facility managers, nếu không thành công sử dụng mock data
 */
export async function fetchFacilityManagers(): Promise<UserItem[]> {
  return fetchUsersByRole("FACILITY_MANAGER");
}

/**
 * Lấy danh sách pending users, nếu không thành công sử dụng mock data
 */
export async function fetchPendingUsers(): Promise<UserItem[]> {
  try {
    const response = await UserModel.getPendingUsers();
    if (response.users && Array.isArray(response.users)) {
      return response.users.map(convertApiUserToUserItem);
    }
    return [];
  } catch (error) {
    console.error("Error fetching pending users:", error);
    console.warn("Using mock user data as fallback for pending users");

    // Return mock users that are inactive (as mock pending users)
    return mockUsers.filter(u => u.status === "inactive");
  }
}

/**
 * Lấy thống kê approval
 */
export async function fetchApprovalStats(): Promise<any> {
  try {
    return await UserModel.getApprovalStats();
  } catch (error) {
    console.error("Error fetching approval stats:", error);
    return { pending: 0, approved: 0, rejected: 0 };
  }
}

/**
 * Tạo người dùng mới
 */
export async function createUser(data: any): Promise<any> {
  return await UserModel.createUser(data);
}

/**
 * Cập nhật thông tin người dùng
 */
export async function updateUser(userId: number, data: any): Promise<any> {
  return await UserModel.updateUser(userId, data);
}

/**
 * Xóa người dùng
 */
export async function deleteUser(userId: number): Promise<any> {
  return await UserModel.deleteUser(userId);
}

/**
 * Khôi phục người dùng
 */
export async function restoreUser(userId: number): Promise<any> {
  return await UserModel.restoreUser(userId);
}

/**
 * Reset mật khẩu
 */
export async function resetPassword(
  userId: number,
  newPassword: string
): Promise<any> {
  return await UserModel.resetUserPassword(userId, newPassword);
}

/**
 * Thay đổi vai trò
 */
export async function changeUserRole(
  userId: number,
  roleCode: string
): Promise<any> {
  return await UserModel.changeUserRole(userId, roleCode);
}
