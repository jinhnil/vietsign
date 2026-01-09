// Organizations management data
// Dữ liệu tổ chức - kết nối với API backend /organizations

import { getUserById, type UserItem } from './usersData';

export interface OrganizationItem {
  id: number;
  name: string;
  // Thông tin địa chỉ
  streetAddress: string;      // Số nhà, đường
  wardCode: number;           // Mã phường/xã (từ API)
  provinceCode: number;       // Mã tỉnh/thành phố (từ API)
  // Thông tin liên hệ
  phone: string;
  email: string;
  managerId: number;          // ID của user quản lý
  // Thống kê
  studentCount: number;
  teacherCount: number;
  // Trạng thái
  status: 'active' | 'inactive' | 'maintenance';
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

// Mock data for fallback when API is unavailable
export const mockOrganizations: OrganizationItem[] = [
  { 
    id: 1, 
    name: "Cơ sở Hà Nội", 
    streetAddress: "123 Đường Láng",
    wardCode: 1966,
    provinceCode: 1,
    phone: "024 1234 5678", 
    email: "hanoi@vietsign.edu.vn", 
    managerId: 2,
    studentCount: 150, 
    teacherCount: 12, 
    status: "active",
    description: "Cơ sở chính tại Hà Nội",
    openingHours: "8:00 - 21:00",
    createdAt: "2023-01-01",
    updatedAt: "2024-12-01"
  },
  { 
    id: 2, 
    name: "Cơ sở Hồ Chí Minh", 
    streetAddress: "456 Nguyễn Văn Linh",
    wardCode: 27211,
    provinceCode: 79,
    phone: "028 8765 4321", 
    email: "hcm@vietsign.edu.vn", 
    managerId: 8,
    studentCount: 200, 
    teacherCount: 18, 
    status: "active",
    description: "Cơ sở lớn nhất phía Nam",
    openingHours: "8:00 - 21:00",
    createdAt: "2023-03-15",
    updatedAt: "2024-11-20"
  },
  { 
    id: 3, 
    name: "Cơ sở Đà Nẵng", 
    streetAddress: "789 Nguyễn Văn Linh",
    wardCode: 20194,
    provinceCode: 48,
    phone: "0236 123 4567", 
    email: "danang@vietsign.edu.vn", 
    managerId: 9,
    studentCount: 80, 
    teacherCount: 8, 
    status: "active",
    description: "Cơ sở miền Trung",
    openingHours: "8:00 - 20:00",
    createdAt: "2023-06-01",
    updatedAt: "2024-10-15"
  },
  { 
    id: 4, 
    name: "Cơ sở Cần Thơ", 
    streetAddress: "321 Đường 3/2",
    wardCode: 31117,
    provinceCode: 92,
    phone: "0292 987 6543", 
    email: "cantho@vietsign.edu.vn", 
    managerId: 10,
    studentCount: 45, 
    teacherCount: 5, 
    status: "inactive",
    description: "Cơ sở miền Tây (đang nâng cấp)",
    openingHours: "8:00 - 17:00",
    createdAt: "2023-09-01",
    updatedAt: "2024-12-10"
  },
  { 
    id: 5, 
    name: "Cơ sở Hải Phòng", 
    streetAddress: "567 Lạch Tray",
    wardCode: 11326,
    provinceCode: 31,
    phone: "0225 111 2222", 
    email: "haiphong@vietsign.edu.vn", 
    managerId: 11,
    studentCount: 60, 
    teacherCount: 6, 
    status: "active",
    description: "Cơ sở mới mở",
    openingHours: "8:00 - 20:00",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01"
  },
];

// Backward compatibility aliases
export const mockFacilities = mockOrganizations;

export const organizationStatusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Đang hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Tạm ngưng", color: "bg-gray-100 text-gray-600" },
  maintenance: { label: "Bảo trì", color: "bg-yellow-100 text-yellow-800" },
};

// Backward compatibility alias
export const facilityStatusConfig = organizationStatusConfig;

// Helper functions
export function getOrganizationById(id: number): OrganizationItem | undefined {
  return mockOrganizations.find(f => f.id === id);
}

// Alias for backward compatibility
export const getFacilityById = getOrganizationById;

export function getOrganizationsByProvince(provinceCode: number): OrganizationItem[] {
  return mockOrganizations.filter(f => f.provinceCode === provinceCode);
}

export const getFacilitiesByProvince = getOrganizationsByProvince;

export function getActiveOrganizations(): OrganizationItem[] {
  return mockOrganizations.filter(f => f.status === 'active');
}

export const getActiveFacilities = getActiveOrganizations;

export function getOrganizationsGroupedByProvince(): Record<number, OrganizationItem[]> {
  return mockOrganizations.reduce((acc, org) => {
    if (!acc[org.provinceCode]) {
      acc[org.provinceCode] = [];
    }
    acc[org.provinceCode].push(org);
    return acc;
  }, {} as Record<number, OrganizationItem[]>);
}

export const getFacilitiesGroupedByProvince = getOrganizationsGroupedByProvince;

// Lấy thông tin manager của tổ chức
export function getOrganizationManager(orgId: number): UserItem | undefined {
  const org = getOrganizationById(orgId);
  if (!org) return undefined;
  return getUserById(org.managerId);
}

export const getFacilityManager = getOrganizationManager;

// Lấy tên manager của tổ chức
export function getOrganizationManagerName(orgId: number): string {
  const manager = getOrganizationManager(orgId);
  return manager?.name || 'Chưa có quản lý';
}

export const getFacilityManagerName = getOrganizationManagerName;

// Thống kê
export function getOrganizationsStats() {
  const activeOrgs = mockOrganizations.filter(f => f.status === 'active');
  return {
    totalOrganizations: mockOrganizations.length,
    activeOrganizations: activeOrgs.length,
    totalStudents: mockOrganizations.reduce((sum, f) => sum + f.studentCount, 0),
    totalTeachers: mockOrganizations.reduce((sum, f) => sum + f.teacherCount, 0),
    provinceCount: new Set(mockOrganizations.map(f => f.provinceCode)).size,
    // Backward compatibility
    totalFacilities: mockOrganizations.length,
    activeFacilities: activeOrgs.length,
  };
}

export const getFacilitiesStats = getOrganizationsStats;

// Lấy danh sách unique province codes
export function getUniqueProvinceCodes(): number[] {
  return [...new Set(mockOrganizations.map(f => f.provinceCode))];
}
