// Organizations management data
// Dữ liệu tổ chức - kết nối với API backend /organizations

import { getUserById, getUsersByFacility, type UserItem } from "./usersData";

export interface OrganizationItem {
  id: number;
  name: string;
  // Thông tin địa chỉ
  streetAddress: string; // Số nhà, đường
  wardCode: number; // Mã phường/xã (từ API)
  provinceCode: number; // Mã tỉnh/thành phố (từ API)
  // Thông tin liên hệ
  phone: string;
  email: string;
  managerId: number; // ID của user quản lý
  // Thống kê (Computed directly from lists)
  studentCount: number;
  teacherCount: number;
  // Danh sách thực tế
  managers: UserItem[];
  teachers: UserItem[];
  students: UserItem[];

  // Trạng thái
  status: "active" | "inactive" | "maintenance";
  // Thông tin bổ sung
  description?: string;
  openingHours?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Alias for backward compatibility
export type FacilityItem = OrganizationItem;

// Mã tỉnh/thành phố từ API provinces.open-api.vn
export const PROVINCE_CODES = {
  HA_NOI: 1,
  HO_CHI_MINH: 79,
  DA_NANG: 48,
  CAN_THO: 92,
  HAI_PHONG: 31,
  HUE: 46,
  QUANG_NINH: 22,
  BAC_NINH: 24,
  THANH_HOA: 38,
  NGHE_AN: 40,
};

// Base data structure for organizations
// Lưu ý: managerIds ở đây là giả định ban đầu. Logic nạp dữ liệu thực tế (enrich) có thể ghi đè nếu tìm thấy user có role FACILITY_MANAGER
const baseOrganizations = [
  {
    id: 1,
    name: "Trường PTCS Xã Đàn",
    streetAddress: "123 Đường Láng",
    wardCode: 1966,
    provinceCode: 1,
    phone: "024 1234 5678",
    email: "xadan@vietsign.edu.vn",
    managerIds: 2,
    status: "active" as const,
    description: "Ngôi trường chuyên biệt lâu đời tại Hà Nội",
    openingHours: "8:00 - 17:00",
    createdAt: "2023-01-01",
    updatedAt: "2024-12-01",
  },
  {
    id: 2,
    name: "Trường Hy Vọng Quận 6",
    streetAddress: "456 Nguyễn Văn Linh",
    wardCode: 27211,
    provinceCode: 79,
    phone: "028 8765 4321",
    email: "hyvongq6@vietsign.edu.vn",
    managerIds: 8,
    status: "active" as const,
    description: "Trường chuyên biệt cho trẻ khiếm thính tại TP.HCM",
    openingHours: "7:00 - 17:30",
    createdAt: "2023-03-15",
    updatedAt: "2024-11-20",
  },
  {
    id: 3,
    name: "Trung tâm GDHN Đà Nẵng",
    streetAddress: "789 Nguyễn Văn Linh",
    wardCode: 20194,
    provinceCode: 48,
    phone: "0236 123 4567",
    email: "gdhn.danang@vietsign.edu.vn",
    managerIds: 9,
    status: "active" as const,
    description: "Trung tâm Hỗ trợ phát triển giáo dục hòa nhập Đà Nẵng",
    openingHours: "7:30 - 17:00",
    createdAt: "2023-06-01",
    updatedAt: "2024-10-15",
  },
  {
    id: 4,
    name: "Trường Tương Lai Cần Thơ",
    streetAddress: "321 Đường 3/2",
    wardCode: 31117,
    provinceCode: 92,
    phone: "0292 987 6543",
    email: "tuonglaicantho@vietsign.edu.vn",
    managerIds: 10,
    status: "inactive" as const,
    description: "Trường giáo dục chuyên biệt Tương Lai",
    openingHours: "8:00 - 17:00",
    createdAt: "2023-09-01",
    updatedAt: "2024-12-10",
  },
  {
    id: 5,
    name: "Trường Khiếm thính Hải Phòng",
    streetAddress: "567 Lạch Tray",
    wardCode: 11326,
    provinceCode: 31,
    phone: "0225 111 2222",
    email: "khiemthinhhp@vietsign.edu.vn",
    managerIds: 11,
    status: "active" as const,
    description: "Trường nuôi dạy trẻ khiếm thính Hải Phòng",
    openingHours: "7:30 - 17:30",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
  },
  {
    id: 6,
    name: "Trường Chuyên biệt Tương Lai Huế",
    streetAddress: "99 Lê Lợi",
    wardCode: 19747,
    provinceCode: 46,
    phone: "0234 555 6666",
    email: "tuonglaihue@vietsign.edu.vn",
    managerIds: 12,
    status: "active" as const,
    description: "Trường chuyên biệt Tương Lai - Huế",
    openingHours: "7:30 - 17:00",
    createdAt: "2024-03-01",
    updatedAt: "2024-11-30",
  },
  {
    id: 7,
    name: "Trung tâm BTTE Quảng Ninh",
    streetAddress: "56 Trần Hưng Đạo",
    wardCode: 7285,
    provinceCode: 22,
    phone: "0203 123 4567",
    email: "bttequangninh@vietsign.edu.vn",
    managerIds: 13,
    status: "active" as const,
    description: "Trung tâm Bảo trợ trẻ em có hoàn cảnh đặc biệt",
    openingHours: "8:00 - 18:00",
    createdAt: "2024-05-01",
    updatedAt: "2024-12-01",
  },
  {
    id: 8,
    name: "Trung tâm GDHN Bắc Ninh",
    streetAddress: "12 Lý Thái Tổ",
    wardCode: 8641,
    provinceCode: 24,
    phone: "0222 333 4444",
    email: "gdhnbacninh@vietsign.edu.vn",
    managerIds: 14,
    status: "active" as const,
    description: "Trung tâm hỗ trợ phát triển giáo dục hòa nhập",
    openingHours: "8:00 - 17:30",
    createdAt: "2024-06-15",
    updatedAt: "2024-12-05",
  },
  {
    id: 9,
    name: "Trung tâm BTXH Thanh Hóa",
    streetAddress: "200 Quang Trung",
    wardCode: 14749,
    provinceCode: 38,
    phone: "0237 888 9999",
    email: "btxhthanhhoa@vietsign.edu.vn",
    managerIds: 15,
    status: "active" as const,
    description: "Trung tâm bảo trợ xã hội Thanh Hóa",
    openingHours: "7:30 - 21:00",
    createdAt: "2024-07-01",
    updatedAt: "2024-12-10",
  },
  {
    id: 10,
    name: "Trung tâm GDDN Nghệ An",
    streetAddress: "45 Lê Lợi",
    wardCode: 16186,
    provinceCode: 40,
    phone: "0238 666 7777",
    email: "gddnnghean@vietsign.edu.vn",
    managerIds: 16,
    status: "active" as const,
    description: "Trung tâm giáo dục - dạy nghề người khuyết tật",
    openingHours: "8:00 - 17:00",
    createdAt: "2024-08-15",
    updatedAt: "2024-12-12",
  },
  {
    id: 11,
    name: "Trường PTCS Nhân Chính",
    streetAddress: "22 Thành Công",
    wardCode: 46,
    provinceCode: 1,
    phone: "024 3333 4444",
    email: "nhanchinh@vietsign.edu.vn",
    managerIds: 2,
    status: "active" as const,
    description: "Trường Phổ thông cơ sở Nhân Chính",
    openingHours: "8:00 - 17:00",
    createdAt: "2024-10-01",
    updatedAt: "2024-12-15",
  },
  {
    id: 12,
    name: "Trường GD Chuyên biệt Thảo Điền",
    streetAddress: "15 Lê Thánh Tôn",
    wardCode: 26860,
    provinceCode: 79,
    phone: "028 2222 3333",
    email: "thaodien@vietsign.edu.vn",
    managerIds: 8,
    status: "active" as const,
    description: "Trường Giáo dục Chuyên biệt Thảo Điền",
    openingHours: "7:00 - 17:00",
    createdAt: "2024-11-01",
    updatedAt: "2024-12-20",
  },
  {
    id: 13,
    name: "Trường Chuyên biệt Thanh Tâm",
    streetAddress: "120 Ngô Quyền",
    wardCode: 20245,
    provinceCode: 48,
    phone: "0236 999 8888",
    email: "thanhtam@vietsign.edu.vn",
    managerIds: 9,
    status: "maintenance" as const,
    description: "Trường Chuyên biệt Thanh Tâm - Đà Nẵng",
    openingHours: "Bảo trì",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-25",
  },
  {
    id: 14,
    name: "Trường Dạy Trẻ Khuyết Tật Cần Thơ",
    streetAddress: "88 Mậu Thân",
    wardCode: 31159,
    provinceCode: 92,
    phone: "0292 444 5555",
    email: "daytrekhuyettat@vietsign.edu.vn",
    managerIds: 10,
    status: "active" as const,
    description: "Trường Dạy Trẻ Khuyết Tật TP Cần Thơ",
    openingHours: "7:30 - 17:30",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-28",
  },
  {
    id: 15,
    name: "Trường Khiếm thính Hải Phòng",
    streetAddress: "42 Điện Biên Phủ",
    wardCode: 11332,
    provinceCode: 31,
    phone: "0225 333 4444",
    email: "hpdeaf@vietsign.edu.vn",
    managerIds: 11,
    status: "active" as const,
    description: "Trường Nuôi dạy trẻ khiếm thính Hải Phòng cơ sở 2",
    openingHours: "8:00 - 17:00",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-29",
  },
  {
    id: 16,
    name: "Trung tâm GD Trẻ Khuyết tật Huế",
    streetAddress: "15 Nguyễn Huệ",
    wardCode: 19741,
    provinceCode: 46,
    phone: "0234 111 2222",
    email: "gdtrekhuyettat@vietsign.edu.vn",
    managerIds: 12,
    status: "active" as const,
    description: "Trung tâm Giáo dục Trẻ Khuyết tật",
    openingHours: "7:30 - 17:00",
    createdAt: "2024-12-15",
    updatedAt: "2024-12-30",
  },
];

// Enrich organizations with user lists and counts
export const mockOrganizations: OrganizationItem[] = baseOrganizations.map(
  (org) => {
    const usersInFacility = getUsersByFacility(org.id);
    const managers = usersInFacility.filter(
      (u) => u.role === "FACILITY_MANAGER",
    );
    const teachers = usersInFacility.filter((u) => u.role === "TEACHER");
    const students = usersInFacility.filter((u) => u.role === "STUDENT");

    // Update managerIds based on actual found managers if any,
    // otherwise fallback to base managerIds (though base IDs might not exist in generated usersData)
    const foundManagerIds = managers.map((m) => m.id);
    const finalManagerIds =
      foundManagerIds.length > 0 ? foundManagerIds : org.managerIds;

    return {
      ...org,
      managerId: finalManagerIds,
      managers: managers.length > 0 ? managers : [], // Note: if managers empty, we might want to fetch by IDs from base, but usersData is source of truth.
      teachers,
      students,
      teacherCount: teachers.length,
      studentCount: students.length,
    } as OrganizationItem;
  },
);

// Backward compatibility aliases
export const mockFacilities = mockOrganizations;

export const organizationStatusConfig: Record<
  string,
  { label: string; color: string }
> = {
  active: { label: "Đang hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Tạm ngưng", color: "bg-gray-100 text-gray-600" },
  maintenance: { label: "Bảo trì", color: "bg-yellow-100 text-yellow-800" },
};

// Backward compatibility alias
export const facilityStatusConfig = organizationStatusConfig;

// Helper functions
export function getOrganizationById(id: number): OrganizationItem | undefined {
  return mockOrganizations.find((f) => f.id === id);
}

// Alias for backward compatibility
export const getFacilityById = getOrganizationById;

export function getOrganizationsByProvince(
  provinceCode: number,
): OrganizationItem[] {
  return mockOrganizations.filter((f) => f.provinceCode === provinceCode);
}

export const getFacilitiesByProvince = getOrganizationsByProvince;

export function getActiveOrganizations(): OrganizationItem[] {
  return mockOrganizations.filter((f) => f.status === "active");
}

export const getActiveFacilities = getActiveOrganizations;

export function getOrganizationsGroupedByProvince(): Record<
  number,
  OrganizationItem[]
> {
  return mockOrganizations.reduce(
    (acc, org) => {
      if (!acc[org.provinceCode]) {
        acc[org.provinceCode] = [];
      }
      acc[org.provinceCode].push(org);
      return acc;
    },
    {} as Record<number, OrganizationItem[]>,
  );
}

export const getFacilitiesGroupedByProvince = getOrganizationsGroupedByProvince;

// Lấy danh sách manager của tổ chức
export function getOrganizationManagersList(orgId: number): UserItem[] {
  const org = getOrganizationById(orgId);
  return org ? org.managers : [];
}

// Helper to get PRIMARY manager (first one) for backward compatibility
export function getOrganizationManager(orgId: number): UserItem | undefined {
  const managers = getOrganizationManagersList(orgId);
  return managers.length > 0 ? managers[0] : undefined;
}

export const getFacilityManager = getOrganizationManager;

// Lấy tên manager của tổ chức (hiển thị nhiều tên nếu có)
export function getOrganizationManagerName(orgId: number): string {
  const managers = getOrganizationManagersList(orgId);
  if (managers.length === 0) return "Chưa có quản lý";
  return managers.map((m) => m.name).join(", ");
}

export const getFacilityManagerName = getOrganizationManagerName;

// Thống kê
export function getOrganizationsStats() {
  const activeOrgs = mockOrganizations.filter((f) => f.status === "active");
  return {
    totalOrganizations: mockOrganizations.length,
    activeOrganizations: activeOrgs.length,
    totalStudents: mockOrganizations.reduce(
      (sum, f) => sum + f.studentCount,
      0,
    ),
    totalTeachers: mockOrganizations.reduce(
      (sum, f) => sum + f.teacherCount,
      0,
    ),
    provinceCount: new Set(mockOrganizations.map((f) => f.provinceCode)).size,
    // Backward compatibility
    totalFacilities: mockOrganizations.length,
    activeFacilities: activeOrgs.length,
  };
}

export const getFacilitiesStats = getOrganizationsStats;

// Lấy danh sách unique province codes
export function getUniqueProvinceCodes(): number[] {
  return [...new Set(mockOrganizations.map((f) => f.provinceCode))];
}
