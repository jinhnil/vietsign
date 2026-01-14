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
  facilityId?: number; // ID cơ sở (thay vì tên)
}

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

export const userStatusConfig: Record<
  string,
  { label: string; color: string }
> = {
  active: { label: "Hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Không hoạt động", color: "bg-gray-100 text-gray-600" },
};

const generateMockUsers = (count: number): UserItem[] => {
  return Array.from({ length: count }).map((_, index) => {
    const id = index + 1;
    // Weighted random role distribution
    let role = "STUDENT";
    const rand = Math.random();
    if (rand < 0.05) role = "ADMIN";
    else if (rand < 0.1) role = "FACILITY_MANAGER";
    else if (rand < 0.25) role = "TEACHER";
    else if (rand < 0.9) role = "STUDENT";
    else if (rand < 0.95) role = "TESTER";
    else role = "USER";

    const status = Math.random() > 0.1 ? "active" : "inactive";

    return {
      id,
      name: `User Test ${id}`,
      email: `user.test.${id}@vietsign.edu.vn`,
      role: role,
      status: status,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
      phone: `09${Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0")}`,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 31536000000)
      ).toISOString(), // Last year
      facilityId:
        role === "FACILITY_MANAGER" || role === "TEACHER"
          ? Math.floor(Math.random() * 5) + 1
          : undefined,
    };
  });
};

export const mockUsers: UserItem[] = generateMockUsers(300);

// Helper functions
export function getUserById(id: number): UserItem | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function getUsersByRole(role: string): UserItem[] {
  return mockUsers.filter((user) => user.role === role);
}

export function getUsersByFacility(facilityId: number): UserItem[] {
  return mockUsers.filter((user) => user.facilityId === facilityId);
}

export function getFacilityManagers(): UserItem[] {
  return mockUsers.filter((user) => user.role === "FACILITY_MANAGER");
}
