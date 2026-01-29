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

// Vietnamese name components for random generation
const lastNames = [
  "Nguyễn",
  "Trần",
  "Lê",
  "Phạm",
  "Hoàng",
  "Huỳnh",
  "Phan",
  "Vũ",
  "Võ",
  "Đặng",
  "Bùi",
  "Đỗ",
  "Hồ",
  "Ngô",
  "Dương",
  "Lý",
];
const middleNames = [
  "Văn",
  "Thị",
  "Quang",
  "Minh",
  "Thanh",
  "Đức",
  "Hữu",
  "Xuân",
  "Thu",
  "Ngọc",
  "Gia",
  "Khánh",
  "Hoài",
  "Bảo",
  "Công",
];
const firstNames = [
  "Anh",
  "Bình",
  "Châu",
  "Dũng",
  "Dương",
  "Giang",
  "Hà",
  "Hải",
  "Hiếu",
  "Hoà",
  "Hưng",
  "Huy",
  "Khánh",
  "Lan",
  "Linh",
  "Long",
  "Minh",
  "Nam",
  "Nga",
  "Ngọc",
  "Nhi",
  "Nhung",
  "Oanh",
  "Phúc",
  "Quân",
  "Quỳnh",
  "Sơn",
  "Tâm",
  "Thảo",
  "Thắng",
  "Thịnh",
  "Thủy",
  "Toàn",
  "Trang",
  "Trung",
  "Tuấn",
  "Tùng",
  "Uyên",
  "Vân",
  "Việt",
  "Vinh",
  "Yến",
];

const generateVietnameseName = () => {
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const middleName =
    middleNames[Math.floor(Math.random() * middleNames.length)];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  return `${lastName} ${middleName} ${firstName}`;
};

const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

const generateMockUsers = (count: number): UserItem[] => {
  return Array.from({ length: count }).map((_, index) => {
    const id = index + 1;
    // Weighted random role distribution
    let role = "STUDENT";
    const rand = Math.random();
    if (rand < 0.05) role = "ADMIN";
    else if (rand < 0.15)
      role = "FACILITY_MANAGER"; // Increased chance
    else if (rand < 0.35)
      role = "TEACHER"; // Increased chance from 0.25
    else if (rand < 0.9) role = "STUDENT";
    else if (rand < 0.95) role = "TESTER";
    else role = "USER";

    const status = Math.random() > 0.1 ? "active" : "inactive";
    const fullName = generateVietnameseName();
    const emailName = removeVietnameseTones(fullName)
      .toLowerCase()
      .replace(/\s+/g, ".");

    // Assign facility to Managers, Teachers, AND Students
    // Facilities IDs are 1-16
    const facilityId =
      role === "FACILITY_MANAGER" || role === "TEACHER" || role === "STUDENT"
        ? Math.floor(Math.random() * 16) + 1
        : undefined;

    return {
      id,
      name: fullName,
      email: `${emailName}.${id}@vietsign.edu.vn`,
      role: role,
      status: status,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${index}`, // Using notionists style for variety
      phone: `09${Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0")}`,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 31536000000),
      ).toISOString(), // Last year
      facilityId: facilityId,
    };
  });
};

export const mockUsers: UserItem[] = generateMockUsers(500); // Increased from 300 to 500

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
