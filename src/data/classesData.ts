// Classes/Courses data
// Sử dụng ID để liên kết với các bảng khác

import { getUserById, mockUsers, UserItem } from "./usersData";
import { getOrganizationById as getFacilityById } from "./organizationsData";

// Cấp lớp học
export type GradeLevel = "Lớp 1" | "Lớp 2" | "Lớp 3" | "Lớp 4" | "Lớp 5";

export const gradeLevels: GradeLevel[] = [
  "Lớp 1",
  "Lớp 2",
  "Lớp 3",
  "Lớp 4",
  "Lớp 5",
];

export const gradeLevelConfig: Record<
  GradeLevel,
  { label: string; color: string }
> = {
  "Lớp 1": { label: "Lớp 1", color: "bg-blue-100 text-blue-800" },
  "Lớp 2": { label: "Lớp 2", color: "bg-green-100 text-green-800" },
  "Lớp 3": { label: "Lớp 3", color: "bg-amber-100 text-amber-800" },
  "Lớp 4": { label: "Lớp 4", color: "bg-purple-100 text-purple-800" },
  "Lớp 5": { label: "Lớp 5", color: "bg-red-100 text-red-800" },
};

export interface ClassItem {
  id: number;
  name: string;
  teacherId: number; // ID giáo viên (thay vì tên)
  students: number;
  maxStudents: number;
  schedule: string;
  startDate: string;
  endDate: string;
  status: "ongoing" | "upcoming" | "completed";
  facilityId: number | null; // ID cơ sở (null = Online)
  description?: string;
  level?: string;
  gradeLevel: GradeLevel; // Cấp lớp tiểu học
  studentIds: number[]; // Danh sách ID học sinh trong lớp
}

const generateMockClasses = (count: number): ClassItem[] => {
  const teachers = mockUsers.filter((u) => u.role === "TEACHER");
  const students = mockUsers.filter((u) => u.role === "STUDENT");

  if (teachers.length === 0 || students.length === 0) {
    console.warn(
      "Generating mock classes but found no teachers or students in mockUsers"
    );
  }

  return Array.from({ length: count }).map((_, index) => {
    const id = index + 1;
    const teacher =
      teachers.length > 0
        ? teachers[Math.floor(Math.random() * teachers.length)]
        : { id: 1, name: "Unknown" };
    const facilityId =
      Math.random() > 0.2 ? Math.floor(Math.random() * 5) + 1 : null;

    // Pick random students
    const classSize = Math.floor(Math.random() * 15) + 10; // 10-25 students
    const shuffledStudents = [...students].sort(() => 0.5 - Math.random());
    const selectedStudents = shuffledStudents.slice(0, classSize);
    const studentIds = selectedStudents.map((s) => s.id);

    // Grade Level (Tiểu học)
    const gradeLevel =
      gradeLevels[Math.floor(Math.random() * gradeLevels.length)];

    // Generate Name and Props
    const levels = [
      "Cơ bản",
      "Nâng cao",
      "Chuyên sâu",
      "Chuyên ngành",
      "Đặc biệt",
    ];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const types = ["A", "B", "C", "D", "K", "O", "T", "L", "S"];
    const type = types[Math.floor(Math.random() * types.length)];
    const series = Math.floor(Math.random() * 5) + 1;
    const name = `${gradeLevel} - Ký hiệu ${level} ${type}${series}`;

    // Schedule
    const days = ["Thứ 2, 4, 6", "Thứ 3, 5, 7", "Thứ 7, CN", "Hàng ngày"];
    const times = ["08:00", "09:30", "14:00", "17:30", "19:00"];
    const schedule = `${days[Math.floor(Math.random() * days.length)]} - ${
      times[Math.floor(Math.random() * times.length)]
    }`;

    // Dates
    const startOffset = Math.floor(Math.random() * 180) - 90; // +/- 90 days from now
    const startDateDate = new Date(
      Date.now() + startOffset * 24 * 60 * 60 * 1000
    );
    const durationDays = 90; // 3 months
    const endDateDate = new Date(
      startDateDate.getTime() + durationDays * 24 * 60 * 60 * 1000
    );

    const now = new Date();
    let status: "ongoing" | "upcoming" | "completed";
    if (now < startDateDate) status = "upcoming";
    else if (now > endDateDate) status = "completed";
    else status = "ongoing";

    return {
      id,
      name,
      teacherId: teacher.id,
      students: classSize,
      maxStudents: classSize + Math.floor(Math.random() * 10),
      schedule,
      startDate: startDateDate.toLocaleDateString("en-GB"),
      endDate: endDateDate.toLocaleDateString("en-GB"),
      status,
      facilityId,
      description: `Khóa học ${name.toLowerCase()} dành cho học viên ${level.toLowerCase()}. Giáo viên hướng dẫn: ${
        teacher.name
      }.`,
      level,
      gradeLevel,
      studentIds,
    };
  });
};

export const mockClasses: ClassItem[] = generateMockClasses(50);

export const statusConfig: Record<string, { label: string; color: string }> = {
  ongoing: { label: "Đang diễn ra", color: "bg-green-100 text-green-800" },
  upcoming: { label: "Sắp diễn ra", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Đã hoàn thành", color: "bg-gray-100 text-gray-600" },
};

export const levels = [
  { id: "all", label: "Tất cả cấp độ" },
  { id: "basic", label: "Cơ bản" },
  { id: "advanced", label: "Nâng cao" },
  { id: "specialized", label: "Chuyên ngành" },
  { id: "special", label: "Đặc biệt" },
];

// Helper functions
export function getClassById(id: number): ClassItem | undefined {
  return mockClasses.find((c) => c.id === id);
}

export function getClassTeacherName(classId: number): string {
  const classItem = getClassById(classId);
  if (!classItem) return "Không xác định";
  const teacher = getUserById(classItem.teacherId);
  return teacher?.name || "Không xác định";
}

export function getClassFacilityName(classId: number): string {
  const classItem = getClassById(classId);
  if (!classItem) return "Không xác định";
  if (classItem.facilityId === null) return "Online";
  const facility = getFacilityById(classItem.facilityId);
  return facility?.name || "Không xác định";
}

export function getClassesByFacility(facilityId: number | null): ClassItem[] {
  return mockClasses.filter((c) => c.facilityId === facilityId);
}

export function getClassesByTeacher(teacherId: number): ClassItem[] {
  return mockClasses.filter((c) => c.teacherId === teacherId);
}

export function getClassesByStatus(status: ClassItem["status"]): ClassItem[] {
  return mockClasses.filter((c) => c.status === status);
}

export function getClassesByGradeLevel(gradeLevel: GradeLevel): ClassItem[] {
  return mockClasses.filter((c) => c.gradeLevel === gradeLevel);
}

export function getClassStudents(classId: number): UserItem[] {
  const classItem = getClassById(classId);
  if (!classItem || !classItem.studentIds) return [];

  return classItem.studentIds
    .map((id) => getUserById(id))
    .filter((u): u is UserItem => u !== undefined);
}
