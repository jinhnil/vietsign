// Users management data

export interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  facilityId?: number;  // ID cơ sở (thay vì tên)
}

export const mockUsers: UserItem[] = [
  { id: 1, name: "Nguyễn Văn Admin", email: "admin@vietsign.edu.vn", role: "ADMIN", status: "active", phone: "0901234567", createdAt: "01/01/2024" },
  { id: 2, name: "Trần Thị Quản Lý", email: "manager@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0912345678", createdAt: "15/01/2024", facilityId: 1 },
  { id: 3, name: "Lê Văn Giáo Viên", email: "teacher@vietsign.edu.vn", role: "TEACHER", status: "active", phone: "0923456789", createdAt: "01/02/2024", facilityId: 2 },
  { id: 4, name: "Phạm Thị Học Sinh", email: "student@vietsign.edu.vn", role: "STUDENT", status: "active", phone: "0934567890", createdAt: "10/02/2024", facilityId: 1 },
  { id: 5, name: "Hoàng Văn Nam", email: "nam@vietsign.edu.vn", role: "STUDENT", status: "inactive", phone: "0945678901", createdAt: "20/02/2024", facilityId: 3 },
  { id: 6, name: "Vũ Thị Hoa", email: "hoa@vietsign.edu.vn", role: "TEACHER", status: "active", phone: "0956789012", createdAt: "01/03/2024", facilityId: 1 },
  { id: 7, name: "Đặng Văn Tùng", email: "tung@vietsign.edu.vn", role: "STUDENT", status: "active", phone: "0967890123", createdAt: "15/03/2024", facilityId: 2 },
  { id: 8, name: "Bùi Thị Lan", email: "lan@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0978901234", createdAt: "01/04/2024", facilityId: 2 },
  // Thêm các manager cho các cơ sở khác
  { id: 9, name: "Lê Minh Tuấn", email: "tuan@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0236123456", createdAt: "01/06/2023", facilityId: 3 },
  { id: 10, name: "Phạm Văn Hùng", email: "hung@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0292987654", createdAt: "01/09/2023", facilityId: 4 },
  { id: 11, name: "Nguyễn Thị Hằng", email: "hang@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0225111222", createdAt: "15/01/2024", facilityId: 5 },
  { id: 12, name: "Trần Văn Minh", email: "minh@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0234555666", createdAt: "01/03/2024", facilityId: 6 },
];

export const roleLabels: Record<string, string> = {
  ADMIN: "Quản trị viên",
  FACILITY_MANAGER: "Quản lý cơ sở",
  TEACHER: "Giáo viên",
  STUDENT: "Học sinh",
  USER: "Người dùng",
};

export const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-800",
  FACILITY_MANAGER: "bg-blue-100 text-blue-800",
  TEACHER: "bg-green-100 text-green-800",
  STUDENT: "bg-amber-100 text-amber-800",
  USER: "bg-teal-100 text-teal-800",
};

export const userStatusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Không hoạt động", color: "bg-gray-100 text-gray-600" },
};

// Helper functions
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
