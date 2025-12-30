// Facilities management data
// Sử dụng mã tỉnh/thành phố và phường/xã từ API: https://provinces.open-api.vn/api/v2
// Sử dụng managerId để liên kết với bảng users
// Tên phường/xã và tỉnh/thành phố được lấy từ API khi hiển thị

import { getUserById, type UserItem } from './usersData';

export interface FacilityItem {
  id: number;
  name: string;
  // Thông tin địa chỉ - chỉ lưu code, tên lấy từ API
  streetAddress: string;      // Số nhà, đường
  wardCode: number;           // Mã phường/xã (từ API)
  provinceCode: number;       // Mã tỉnh/thành phố (từ API)
  // Thông tin liên hệ
  phone: string;
  email: string;
  managerId: number;          // ID của user quản lý (thay vì tên trực tiếp)
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

// Mã tỉnh/thành phố từ API provinces.open-api.vn
// 1: Hà Nội, 79: TP.HCM, 48: Đà Nẵng, 92: Cần Thơ, 31: Hải Phòng
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

export const mockFacilities: FacilityItem[] = [
  { 
    id: 1, 
    name: "Cơ sở Hà Nội", 
    streetAddress: "123 Đường Láng",
    wardCode: 1966,        // Phường Láng Thượng, Đống Đa
    provinceCode: 1,       // Hà Nội
    phone: "024 1234 5678", 
    email: "hanoi@vietsign.edu.vn", 
    managerId: 2,          // Trần Thị Quản Lý (user id: 2)
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
    wardCode: 27211,       // Phường Tân Phong, Quận 7
    provinceCode: 79,      // TP.HCM
    phone: "028 8765 4321", 
    email: "hcm@vietsign.edu.vn", 
    managerId: 8,          // Bùi Thị Lan (user id: 8)
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
    wardCode: 20194,       // Phường Hải Châu 1, Hải Châu
    provinceCode: 48,      // Đà Nẵng
    phone: "0236 123 4567", 
    email: "danang@vietsign.edu.vn", 
    managerId: 9,          // Lê Minh Tuấn (user id: 9)
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
    wardCode: 31117,       // Phường An Hội, Ninh Kiều
    provinceCode: 92,      // Cần Thơ
    phone: "0292 987 6543", 
    email: "cantho@vietsign.edu.vn", 
    managerId: 10,         // Phạm Văn Hùng (user id: 10)
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
    wardCode: 11326,       // Phường Lạch Tray, Ngô Quyền
    provinceCode: 31,      // Hải Phòng
    phone: "0225 111 2222", 
    email: "haiphong@vietsign.edu.vn", 
    managerId: 11,         // Nguyễn Thị Hằng (user id: 11)
    studentCount: 60, 
    teacherCount: 6, 
    status: "active",
    description: "Cơ sở mới mở",
    openingHours: "8:00 - 20:00",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01"
  },
  { 
    id: 6, 
    name: "Cơ sở Huế", 
    streetAddress: "99 Lê Lợi",
    wardCode: 19747,       // Phường Phú Hội, TP Huế
    provinceCode: 46,      // Huế
    phone: "0234 555 6666", 
    email: "hue@vietsign.edu.vn", 
    managerId: 12,         // Trần Văn Minh (user id: 12)
    studentCount: 55, 
    teacherCount: 7, 
    status: "active",
    description: "Cơ sở cố đô Huế",
    openingHours: "8:00 - 20:00",
    createdAt: "2024-03-01",
    updatedAt: "2024-11-30"
  },
];

export const facilityStatusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Đang hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Tạm ngưng", color: "bg-gray-100 text-gray-600" },
  maintenance: { label: "Bảo trì", color: "bg-yellow-100 text-yellow-800" },
};

// Helper functions
export function getFacilityById(id: number): FacilityItem | undefined {
  return mockFacilities.find(f => f.id === id);
}

export function getFacilitiesByProvince(provinceCode: number): FacilityItem[] {
  return mockFacilities.filter(f => f.provinceCode === provinceCode);
}

export function getActiveFacilities(): FacilityItem[] {
  return mockFacilities.filter(f => f.status === 'active');
}

export function getFacilitiesGroupedByProvince(): Record<number, FacilityItem[]> {
  return mockFacilities.reduce((acc, facility) => {
    if (!acc[facility.provinceCode]) {
      acc[facility.provinceCode] = [];
    }
    acc[facility.provinceCode].push(facility);
    return acc;
  }, {} as Record<number, FacilityItem[]>);
}

// Lấy thông tin manager của cơ sở
export function getFacilityManager(facilityId: number): UserItem | undefined {
  const facility = getFacilityById(facilityId);
  if (!facility) return undefined;
  return getUserById(facility.managerId);
}

// Lấy tên manager của cơ sở
export function getFacilityManagerName(facilityId: number): string {
  const manager = getFacilityManager(facilityId);
  return manager?.name || 'Chưa có quản lý';
}

// Thống kê
export function getFacilitiesStats() {
  const activeFacilities = mockFacilities.filter(f => f.status === 'active');
  return {
    totalFacilities: mockFacilities.length,
    activeFacilities: activeFacilities.length,
    totalStudents: mockFacilities.reduce((sum, f) => sum + f.studentCount, 0),
    totalTeachers: mockFacilities.reduce((sum, f) => sum + f.teacherCount, 0),
    provinceCount: new Set(mockFacilities.map(f => f.provinceCode)).size,
  };
}

// Lấy danh sách unique province codes
export function getUniqueProvinceCodes(): number[] {
  return [...new Set(mockFacilities.map(f => f.provinceCode))];
}
