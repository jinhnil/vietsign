// Facilities management data

export interface FacilityItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  studentCount: number;
  teacherCount: number;
  status: string;
  description?: string;
  openingHours?: string;
}

export const mockFacilities: FacilityItem[] = [
  { 
    id: 1, 
    name: "Cơ sở Hà Nội", 
    address: "123 Đường Láng, Đống Đa, Hà Nội", 
    phone: "024 1234 5678", 
    email: "hanoi@vietsign.edu.vn", 
    manager: "Nguyễn Văn Quản", 
    studentCount: 150, 
    teacherCount: 12, 
    status: "active",
    description: "Cơ sở chính tại Hà Nội",
    openingHours: "8:00 - 21:00"
  },
  { 
    id: 2, 
    name: "Cơ sở Hồ Chí Minh", 
    address: "456 Nguyễn Văn Linh, Quận 7, TP.HCM", 
    phone: "028 8765 4321", 
    email: "hcm@vietsign.edu.vn", 
    manager: "Trần Thị Lan", 
    studentCount: 200, 
    teacherCount: 18, 
    status: "active",
    description: "Cơ sở lớn nhất phía Nam",
    openingHours: "8:00 - 21:00"
  },
  { 
    id: 3, 
    name: "Cơ sở Đà Nẵng", 
    address: "789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng", 
    phone: "0236 123 4567", 
    email: "danang@vietsign.edu.vn", 
    manager: "Lê Minh Tuấn", 
    studentCount: 80, 
    teacherCount: 8, 
    status: "active",
    description: "Cơ sở miền Trung",
    openingHours: "8:00 - 20:00"
  },
  { 
    id: 4, 
    name: "Cơ sở Cần Thơ", 
    address: "321 Đường 3/2, Ninh Kiều, Cần Thơ", 
    phone: "0292 987 6543", 
    email: "cantho@vietsign.edu.vn", 
    manager: "Phạm Văn Hùng", 
    studentCount: 45, 
    teacherCount: 5, 
    status: "inactive",
    description: "Cơ sở miền Tây (đang nâng cấp)",
    openingHours: "8:00 - 17:00"
  },
  { 
    id: 5, 
    name: "Cơ sở Hải Phòng", 
    address: "567 Lạch Tray, Ngô Quyền, Hải Phòng", 
    phone: "0225 111 2222", 
    email: "haiphong@vietsign.edu.vn", 
    manager: "Nguyễn Thị Hằng", 
    studentCount: 60, 
    teacherCount: 6, 
    status: "active",
    description: "Cơ sở mới mở",
    openingHours: "8:00 - 20:00"
  },
];

export const facilityStatusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Đang hoạt động", color: "bg-green-100 text-green-800" },
  inactive: { label: "Tạm ngưng", color: "bg-gray-100 text-gray-600" },
  maintenance: { label: "Bảo trì", color: "bg-yellow-100 text-yellow-800" },
};
