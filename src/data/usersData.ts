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
  { id: 1, name: "Nguyễn Văn Admin", email: "admin@vietsign.edu.vn", role: "ADMIN", status: "active", phone: "0901234567", createdAt: "01/01/2024", avatar: "https://i.pravatar.cc/150?u=admin@vietsign.edu.vn" },
  { id: 2, name: "Trần Thị Quản Lý", email: "manager@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0912345678", createdAt: "15/01/2024", facilityId: 1, avatar: "https://i.pravatar.cc/150?u=manager@vietsign.edu.vn" },
  { id: 3, name: "Lê Văn Giáo Viên", email: "teacher@vietsign.edu.vn", role: "TEACHER", status: "active", phone: "0923456789", createdAt: "01/02/2024", facilityId: 2, avatar: "https://i.pravatar.cc/150?u=teacher@vietsign.edu.vn" },
  { id: 4, name: "Phạm Thị Học Sinh", email: "student@vietsign.edu.vn", role: "STUDENT", status: "active", phone: "0934567890", createdAt: "10/02/2024", facilityId: 1, avatar: "https://i.pravatar.cc/150?u=student@vietsign.edu.vn" },
  { id: 5, name: "Hoàng Văn Nam", email: "nam@vietsign.edu.vn", role: "STUDENT", status: "inactive", phone: "0945678901", createdAt: "20/02/2024", facilityId: 3, avatar: "https://i.pravatar.cc/150?u=nam@vietsign.edu.vn" },
  { id: 6, name: "Vũ Thị Hoa", email: "hoa@vietsign.edu.vn", role: "TEACHER", status: "active", phone: "0956789012", createdAt: "01/03/2024", facilityId: 1, avatar: "https://i.pravatar.cc/150?u=hoa@vietsign.edu.vn" },
  { id: 7, name: "Đặng Văn Tùng", email: "tung@vietsign.edu.vn", role: "STUDENT", status: "active", phone: "0967890123", createdAt: "15/03/2024", facilityId: 2, avatar: "https://i.pravatar.cc/150?u=tung@vietsign.edu.vn" },
  { id: 8, name: "Bùi Thị Lan", email: "lan@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0978901234", createdAt: "01/04/2024", facilityId: 2, avatar: "https://i.pravatar.cc/150?u=lan@vietsign.edu.vn" },
  // Thêm các manager cho các cơ sở khác
  { id: 9, name: "Lê Minh Tuấn", email: "tuan@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0236123456", createdAt: "01/06/2023", facilityId: 3, avatar: "https://i.pravatar.cc/150?u=tuan@vietsign.edu.vn" },
  { id: 10, name: "Phạm Văn Hùng", email: "hung@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0292987654", createdAt: "01/09/2023", facilityId: 4, avatar: "https://i.pravatar.cc/150?u=hung@vietsign.edu.vn" },
  { id: 11, name: "Nguyễn Thị Hằng", email: "hang@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0225111222", createdAt: "15/01/2024", facilityId: 5, avatar: "https://i.pravatar.cc/150?u=hang@vietsign.edu.vn" },
  { id: 12, name: "Trần Văn Minh", email: "minh@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0234555666", createdAt: "01/03/2024", facilityId: 6, avatar: "https://i.pravatar.cc/150?u=minh@vietsign.edu.vn" },
  { id: 13, name: "Lê Thị Hồng", email: "hong@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0987654321", createdAt: "10/03/2024", facilityId: 7, avatar: "https://i.pravatar.cc/150?u=hong@vietsign.edu.vn" },
  { id: 14, name: "Phạm Minh Hoàng", email: "hoang@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0922334455", createdAt: "12/03/2024", facilityId: 8, avatar: "https://i.pravatar.cc/150?u=hoang@vietsign.edu.vn" },
  { id: 15, name: "Vũ Nam Anh", email: "namanh@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0911223344", createdAt: "15/03/2024", facilityId: 9, avatar: "https://i.pravatar.cc/150?u=namanh@vietsign.edu.vn" },
  { id: 16, name: "Đặng Thu Hà", email: "thuha@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0933445566", createdAt: "18/03/2024", facilityId: 10, avatar: "https://i.pravatar.cc/150?u=thuha@vietsign.edu.vn" },
  { id: 17, name: "Ngô Quốc Bảo", email: "quocbao@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0944556677", createdAt: "20/03/2024", avatar: "https://i.pravatar.cc/150?u=quocbao@vietsign.edu.vn" },
  ...Array.from({ length: 200 }, (_, i) => {
    const id = i + 18;
    const roles = ["STUDENT", "TEACHER", "USER", "STUDENT", "STUDENT"];
    const role = roles[i % roles.length];
    const email = `user${id}@vietsign.edu.vn`;
    const facilityId = (i % 16) + 1;
    const surnames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng"];
    const middles = ["Văn", "Thị", "Minh", "Đức", "Hồng", "Gia", "Bảo"];
    const names = ["Anh", "Bình", "Chi", "Dũng", "Giang", "Hương", "Khánh", "Linh", "Minh", "Nam", "Phúc", "Quân", "Sơn", "Trang", "Tuấn", "Việt"];
    const name = `${surnames[i % 10]} ${middles[i % 7]} ${names[i % 16]}`;
    return {
      id,
      name,
      email,
      role,
      status: i % 20 === 0 ? "inactive" : "active",
      phone: `09${Math.floor(Math.random() * 90000000 + 10000000)}`,
      createdAt: `${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}/05/2024`,
      facilityId: role === "USER" ? undefined : facilityId,
      avatar: `https://i.pravatar.cc/150?u=${email}`
    };
  })
];

export const roleLabels: Record<string, string> = {
  ADMIN: "Quản trị viên",
  FACILITY_MANAGER: "Quản lý cơ sở",
  TEACHER: "Giáo viên",
  STUDENT: "Học sinh",
  USER: "Người dùng",
  TESTER: "Tester",
};

export const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-800",
  FACILITY_MANAGER: "bg-blue-100 text-blue-800",
  TEACHER: "bg-green-100 text-green-800",
  STUDENT: "bg-amber-100 text-amber-800",
  USER: "bg-teal-100 text-teal-800",
  TESTER: "bg-orange-100 text-orange-800",
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
