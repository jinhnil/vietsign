/**
 * User Data Service
 * 
 * Service này cung cấp các hàm để lấy dữ liệu người dùng.
 * Có thể fetch từ API hoặc sử dụng mock data khi cần.
 */

import UserModel from '@/src/model/User';
import { mockUsers, UserItem, roleLabels, roleColors, userStatusConfig } from './usersData';

// Re-export types và constants
export { roleLabels, roleColors, userStatusConfig } from './usersData';
export type { UserItem } from './usersData';

// Flag để toggle giữa API và mock data
const USE_API = true; // Đặt thành false để sử dụng mock data

/**
 * Convert API user to UserItem format
 */
function convertApiUserToUserItem(apiUser: any): UserItem {
    return {
        id: apiUser.user_id,
        name: apiUser.name,
        email: apiUser.email,
        role: apiUser.code || 'USER',
        status: apiUser.is_deleted ? 'inactive' : 'active',
        avatar: apiUser.avatar_url,
        phone: apiUser.phone_number,
        createdAt: apiUser.created_date 
            ? new Date(apiUser.created_date).toLocaleDateString('vi-VN')
            : new Date().toLocaleDateString('vi-VN'),
        facilityId: apiUser.facility_id,
    };
}

/**
 * Lấy tất cả users từ API (hoặc mock data)
 */
export async function fetchAllUsers(query?: any): Promise<UserItem[]> {
    if (!USE_API) {
        return mockUsers;
    }

    try {
        const response = await UserModel.getAllUsers(query);
        if (response.users && Array.isArray(response.users)) {
            return response.users.map(convertApiUserToUserItem);
        }
        return mockUsers; // Fallback
    } catch (error) {
        console.error('Error fetching users from API, falling back to mock data:', error);
        return mockUsers;
    }
}

/**
 * Lấy user theo ID từ API (hoặc mock data)
 */
export async function fetchUserById(id: number): Promise<UserItem | undefined> {
    if (!USE_API) {
        return mockUsers.find(u => u.id === id);
    }

    try {
        const response = await UserModel.getUserById(id);
        if (response.user) {
            return convertApiUserToUserItem(response.user);
        }
        return undefined;
    } catch (error) {
        console.error(`Error fetching user ${id} from API, falling back to mock data:`, error);
        return mockUsers.find(u => u.id === id);
    }
}

/**
 * Lấy users theo role
 */
export async function fetchUsersByRole(role: string): Promise<UserItem[]> {
    const allUsers = await fetchAllUsers({ role });
    return allUsers.filter(u => u.role === role);
}

/**
 * Lấy users theo facility
 */
export async function fetchUsersByFacility(facilityId: number): Promise<UserItem[]> {
    const allUsers = await fetchAllUsers({ facilityId });
    return allUsers.filter(u => u.facilityId === facilityId);
}

/**
 * Lấy danh sách facility managers
 */
export async function fetchFacilityManagers(): Promise<UserItem[]> {
    return fetchUsersByRole('FACILITY_MANAGER');
}

/**
 * Lấy pending users (chờ phê duyệt)
 */
export async function fetchPendingUsers(): Promise<UserItem[]> {
    if (!USE_API) {
        return [];
    }

    try {
        const response = await UserModel.getPendingUsers();
        if (response.users && Array.isArray(response.users)) {
            return response.users.map(convertApiUserToUserItem);
        }
        return [];
    } catch (error) {
        console.error('Error fetching pending users:', error);
        return [];
    }
}

/**
 * Lấy thống kê approval
 */
export async function fetchApprovalStats(): Promise<any> {
    if (!USE_API) {
        return { pending: 0, approved: 0, rejected: 0 };
    }

    try {
        return await UserModel.getApprovalStats();
    } catch (error) {
        console.error('Error fetching approval stats:', error);
        return { pending: 0, approved: 0, rejected: 0 };
    }
}

// Sync versions (fallback to mock data) - for components that don't support async
export function getUserById(id: number): UserItem | undefined {
    return mockUsers.find(u => u.id === id);
}

export function getUsersByRole(role: string): UserItem[] {
    return mockUsers.filter(u => u.role === role);
}

export function getUsersByFacility(facilityId: number): UserItem[] {
    return mockUsers.filter(u => u.facilityId === facilityId);
}

export function getFacilityManagers(): UserItem[] {
    return mockUsers.filter(u => u.role === 'FACILITY_MANAGER');
}

// Export mock data for direct access when needed
export { mockUsers };
