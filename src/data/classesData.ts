export interface ClassItem {
  id: number;
  name: string;
  teacher: string;
  students: number;
  maxStudents: number;
  schedule: string;
  startDate: string;
  endDate: string;
  status: string;
  facility: string;
  description?: string;
  level?: string;
}

export const mockClasses: ClassItem[] = [
  { id: 1, name: "Lớp Ký hiệu cơ bản A1", teacher: "Trần Thị Lan", students: 25, maxStudents: 30, schedule: "Thứ 2, 4, 6 - 9:00", startDate: "15/01/2025", endDate: "15/04/2025", status: "ongoing", facility: "Cơ sở Hà Nội", description: "Khóa học dành cho người mới bắt đầu", level: "Cơ bản" },
  { id: 2, name: "Lớp Ký hiệu nâng cao B2", teacher: "Nguyễn Văn Minh", students: 18, maxStudents: 20, schedule: "Thứ 3, 5 - 14:00", startDate: "01/02/2025", endDate: "01/05/2025", status: "ongoing", facility: "Cơ sở HCM", description: "Khóa học nâng cao kỹ năng giao tiếp", level: "Nâng cao" },
  { id: 3, name: "Lớp Ký hiệu giao tiếp C1", teacher: "Lê Thị Hương", students: 0, maxStudents: 25, schedule: "Thứ 2, 4 - 18:00", startDate: "01/03/2025", endDate: "01/06/2025", status: "upcoming", facility: "Cơ sở Đà Nẵng", description: "Khóa học giao tiếp chuyên sâu", level: "Chuyên sâu" },
  { id: 4, name: "Lớp Ký hiệu cơ bản A2", teacher: "Phạm Văn Đức", students: 28, maxStudents: 30, schedule: "Thứ 3, 5, 7 - 10:00", startDate: "01/10/2024", endDate: "01/01/2025", status: "completed", facility: "Cơ sở Hà Nội", description: "Khóa học cơ bản cấp độ 2", level: "Cơ bản" },
  { id: 5, name: "Lớp Ký hiệu trẻ em K1", teacher: "Nguyễn Thị Mai", students: 15, maxStudents: 20, schedule: "Thứ 7, CN - 9:00", startDate: "10/01/2025", endDate: "10/04/2025", status: "ongoing", facility: "Cơ sở Hà Nội", description: "Khóa học dành cho trẻ em 6-12 tuổi", level: "Cơ bản" },
  { id: 6, name: "Lớp Ký hiệu y tế M1", teacher: "Bác sĩ Trần Văn An", students: 12, maxStudents: 15, schedule: "Thứ 4, 6 - 18:00", startDate: "15/02/2025", endDate: "15/05/2025", status: "upcoming", facility: "Cơ sở HCM", description: "Khóa học ký hiệu chuyên ngành y tế", level: "Chuyên ngành" },
  { id: 7, name: "Lớp Ký hiệu doanh nghiệp E1", teacher: "Lê Văn Hùng", students: 10, maxStudents: 12, schedule: "Thứ 2, 4 - 19:00", startDate: "01/02/2025", endDate: "01/05/2025", status: "ongoing", facility: "Cơ sở HCM", description: "Khóa học ký hiệu cho môi trường doanh nghiệp", level: "Chuyên ngành" },
  { id: 8, name: "Lớp Ký hiệu cơ bản A3", teacher: "Hoàng Thị Hà", students: 22, maxStudents: 25, schedule: "Thứ 3, 5 - 9:00", startDate: "20/01/2025", endDate: "20/04/2025", status: "ongoing", facility: "Cơ sở Đà Nẵng", description: "Khóa học cơ bản cấp độ 3", level: "Cơ bản" },
  { id: 9, name: "Lớp Ký hiệu nâng cao B3", teacher: "Vũ Thị Thanh", students: 16, maxStudents: 18, schedule: "Thứ 2, 4, 6 - 14:00", startDate: "05/02/2025", endDate: "05/05/2025", status: "upcoming", facility: "Cơ sở Hà Nội", description: "Khóa học nâng cao cấp độ 3", level: "Nâng cao" },
  { id: 10, name: "Lớp Ký hiệu giáo dục D1", teacher: "Nguyễn Văn Tùng", students: 20, maxStudents: 20, schedule: "Thứ 7 - 8:00", startDate: "01/12/2024", endDate: "01/03/2025", status: "completed", facility: "Cơ sở HCM", description: "Khóa học ký hiệu cho giáo viên", level: "Chuyên ngành" },
  { id: 11, name: "Lớp Ký hiệu online O1", teacher: "Trần Thị Lan", students: 35, maxStudents: 50, schedule: "Thứ 2, 4 - 20:00", startDate: "10/01/2025", endDate: "10/04/2025", status: "ongoing", facility: "Online", description: "Khóa học trực tuyến cho người bận rộn", level: "Cơ bản" },
  { id: 12, name: "Lớp Ký hiệu online O2", teacher: "Nguyễn Văn Minh", students: 28, maxStudents: 40, schedule: "Thứ 3, 5 - 20:00", startDate: "15/01/2025", endDate: "15/04/2025", status: "ongoing", facility: "Online", description: "Khóa học trực tuyến nâng cao", level: "Nâng cao" },
  { id: 13, name: "Lớp Ký hiệu trẻ em K2", teacher: "Phạm Thị Hoa", students: 18, maxStudents: 20, schedule: "Thứ 7, CN - 14:00", startDate: "01/02/2025", endDate: "01/05/2025", status: "upcoming", facility: "Cơ sở Đà Nẵng", description: "Khóa học trẻ em cấp độ 2", level: "Cơ bản" },
  { id: 14, name: "Lớp Ký hiệu gia đình F1", teacher: "Lê Thị Hương", students: 8, maxStudents: 10, schedule: "CN - 10:00", startDate: "20/01/2025", endDate: "20/04/2025", status: "ongoing", facility: "Cơ sở Hà Nội", description: "Khóa học dành cho cả gia đình", level: "Cơ bản" },
  { id: 15, name: "Lớp Ký hiệu cấp tốc I1", teacher: "Hoàng Văn Nam", students: 10, maxStudents: 12, schedule: "Hàng ngày - 9:00", startDate: "01/02/2025", endDate: "15/02/2025", status: "upcoming", facility: "Cơ sở HCM", description: "Khóa học cấp tốc 2 tuần", level: "Cơ bản" },
  { id: 16, name: "Lớp Ký hiệu nâng cao B1", teacher: "Trần Văn Bình", students: 14, maxStudents: 18, schedule: "Thứ 2, 4 - 16:00", startDate: "01/11/2024", endDate: "01/02/2025", status: "completed", facility: "Cơ sở Hà Nội", description: "Khóa học nâng cao cấp độ 1", level: "Nâng cao" },
  { id: 17, name: "Lớp Ký hiệu du lịch T1", teacher: "Nguyễn Thị Hằng", students: 20, maxStudents: 25, schedule: "Thứ 6 - 18:00", startDate: "10/02/2025", endDate: "10/05/2025", status: "upcoming", facility: "Cơ sở Đà Nẵng", description: "Khóa học ký hiệu phục vụ du lịch", level: "Chuyên ngành" },
  { id: 18, name: "Lớp Ký hiệu pháp luật L1", teacher: "Luật sư Phạm Văn Hải", students: 8, maxStudents: 10, schedule: "Thứ 3 - 18:00", startDate: "01/03/2025", endDate: "01/06/2025", status: "upcoming", facility: "Cơ sở HCM", description: "Khóa học ký hiệu chuyên ngành pháp luật", level: "Chuyên ngành" },
  { id: 19, name: "Lớp Ký hiệu nghệ thuật A1", teacher: "Họa sĩ Lê Văn Sơn", students: 12, maxStudents: 15, schedule: "Thứ 7 - 14:00", startDate: "15/01/2025", endDate: "15/04/2025", status: "ongoing", facility: "Cơ sở Hà Nội", description: "Khóa học kết hợp ký hiệu và nghệ thuật", level: "Đặc biệt" },
  { id: 20, name: "Lớp Ký hiệu thể thao S1", teacher: "HLV Nguyễn Văn Toàn", students: 15, maxStudents: 20, schedule: "Thứ 4, 6 - 17:00", startDate: "01/02/2025", endDate: "01/05/2025", status: "upcoming", facility: "Cơ sở Đà Nẵng", description: "Khóa học ký hiệu trong thể thao", level: "Chuyên ngành" },
];

export const statusConfig: Record<string, { label: string; color: string }> = {
  ongoing: { label: "Đang diễn ra", color: "bg-green-100 text-green-800" },
  upcoming: { label: "Sắp diễn ra", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Đã hoàn thành", color: "bg-gray-100 text-gray-600" },
};

export const facilities = [
  { id: "all", label: "Tất cả cơ sở" },
  { id: "hanoi", label: "Cơ sở Hà Nội" },
  { id: "hcm", label: "Cơ sở HCM" },
  { id: "danang", label: "Cơ sở Đà Nẵng" },
  { id: "online", label: "Online" },
];

export const levels = [
  { id: "all", label: "Tất cả cấp độ" },
  { id: "basic", label: "Cơ bản" },
  { id: "advanced", label: "Nâng cao" },
  { id: "specialized", label: "Chuyên ngành" },
  { id: "special", label: "Đặc biệt" },
];
