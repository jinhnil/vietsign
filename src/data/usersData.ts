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
  facility?: string;
}

export const mockUsers: UserItem[] = [
  { id: 1, name: "Nguyễn Văn Admin", email: "admin@vietsign.edu.vn", role: "ADMIN", status: "active", phone: "0901234567", createdAt: "01/01/2024", facility: "Tất cả" },
  { id: 2, name: "Trần Thị Quản Lý", email: "manager@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0912345678", createdAt: "15/01/2024", facility: "Cơ sở Hà Nội" },
  { id: 3, name: "Lê Văn Giáo Viên", email: "teacher@vietsign.edu.vn", role: "TEACHER", status: "active", phone: "0923456789", createdAt: "01/02/2024", facility: "Cơ sở HCM" },
  { id: 4, name: "Phạm Thị Học Sinh", email: "student@vietsign.edu.vn", role: "STUDENT", status: "active", phone: "0934567890", createdAt: "10/02/2024", facility: "Cơ sở Hà Nội" },
  { id: 5, name: "Hoàng Văn Nam", email: "nam@vietsign.edu.vn", role: "STUDENT", status: "inactive", phone: "0945678901", createdAt: "20/02/2024", facility: "Cơ sở Đà Nẵng" },
  { id: 6, name: "Vũ Thị Hoa", email: "hoa@vietsign.edu.vn", role: "TEACHER", status: "active", phone: "0956789012", createdAt: "01/03/2024", facility: "Cơ sở Hà Nội" },
  { id: 7, name: "Đặng Văn Tùng", email: "tung@vietsign.edu.vn", role: "STUDENT", status: "active", phone: "0967890123", createdAt: "15/03/2024", facility: "Cơ sở HCM" },
  { id: 8, name: "Bùi Thị Lan", email: "lan@vietsign.edu.vn", role: "FACILITY_MANAGER", status: "active", phone: "0978901234", createdAt: "01/04/2024", facility: "Cơ sở HCM" },
];

export const roleLabels: Record<string, string> = {
  ADMIN: "Quản trị viên",
  FACILITY_MANAGER: "Quản lý cơ sở",
  TEACHER: "Giáo viên",
  STUDENT: "Học sinh",
};

export const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-800",
  FACILITY_MANAGER: "bg-blue-100 text-blue-800",
  TEACHER: "bg-green-100 text-green-800",
  STUDENT: "bg-amber-100 text-amber-800",
};

export const userStatusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Không hoạt động", color: "bg-gray-100 text-gray-600" },
};
