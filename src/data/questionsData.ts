// Questions management data
// Quản lý câu hỏi và bộ câu hỏi

import { mockUsers, getUserById, type UserItem } from "./usersData";
import { mockOrganizations, getOrganizationById } from "./organizationsData";
import { gradeLevels, type GradeLevel } from "./classesData";

// ==================== INTERFACES ====================

export type QuestionType = "multiple_choice" | "practice";

export interface AnswerOption {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface QuestionItem {
  id: number;
  type: QuestionType;
  // Common fields
  content: string; // Nội dung câu hỏi (trắc nghiệm) hoặc từ cần thực hành
  description?: string; // Mô tả chi tiết
  category?: string; // Danh mục (VD: "Ký hiệu cơ bản", "Số đếm", "Màu sắc"...)
  videoUrl?: string; // Video minh họa (nếu có)
  imageUrl?: string; // Hình ảnh minh họa (nếu có)

  // For multiple choice
  answers?: AnswerOption[];

  // For practice
  practiceWord?: string; // Từ cần thực hành
  practiceInstructions?: string; // Hướng dẫn thực hành chi tiết

  // Class/Grade Level
  gradeLevel?: GradeLevel; // Cấp lớp (Lớp 1, 2, 3, 4, 5)
  classId?: number; // ID lớp học liên quan

  // Ownership & Permissions
  creatorId: number; // ID người tạo
  organizationId: number; // ID cơ sở giáo dục
  allowedEditorIds: number[]; // Danh sách ID người được phép sửa

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface QuestionSetItem {
  id: number;
  name: string;
  description?: string;
  type: QuestionType; // Loại bộ câu hỏi (trắc nghiệm hoặc thực hành, không hỗn hợp)
  questionIds: number[]; // Danh sách ID câu hỏi trong bộ

  // Class/Grade Level
  gradeLevel?: GradeLevel;
  classId?: number;

  // Ownership & Permissions
  creatorId: number;
  organizationId: number;
  allowedEditorIds: number[];

  // Metadata
  createdAt: string;
  updatedAt: string;
  category?: string;
}

// ==================== CONFIG ====================

export const questionTypeConfig: Record<
  QuestionType,
  { label: string; color: string }
> = {
  multiple_choice: { label: "Trắc nghiệm", color: "bg-blue-100 text-blue-800" },
  practice: { label: "Thực hành", color: "bg-purple-100 text-purple-800" },
};

export const questionCategories = [
  "Ký hiệu cơ bản",
  "Số đếm",
  "Màu sắc",
  "Gia đình",
  "Thời gian",
  "Địa điểm",
  "Cảm xúc",
  "Hoạt động hàng ngày",
  "Thực phẩm",
  "Động vật",
  "Giao thông",
  "Trường học",
  "Y tế",
  "Nghề nghiệp",
  "Khác",
];

// ==================== MOCK DATA GENERATION ====================

const generateMockQuestions = (count: number): QuestionItem[] => {
  const teachers = mockUsers.filter((u) => u.role === "TEACHER");
  const organizations = mockOrganizations.slice(0, 5); // Use first 5 organizations

  if (organizations.length === 0) {
    return [];
  }

  return Array.from({ length: count }).map((_, index) => {
    const id = index + 1;
    const isMultipleChoice = Math.random() > 0.4; // 60% multiple choice
    const type: QuestionType = isMultipleChoice
      ? "multiple_choice"
      : "practice";
    const category =
      questionCategories[Math.floor(Math.random() * questionCategories.length)];
    const org = organizations[Math.floor(Math.random() * organizations.length)];
    const creator =
      teachers.length > 0
        ? teachers[Math.floor(Math.random() * teachers.length)]
        : { id: 1 };

    // Grade Level
    const gradeLevel =
      gradeLevels[Math.floor(Math.random() * gradeLevels.length)];

    // Optional class association
    // Mock classes removed
    const classId = undefined;

    // Generate allowed editors (random subset of teachers from same org)
    const orgTeachers = teachers.filter((t) => t.organizationId === org.id);
    const allowedEditorIds = orgTeachers
      .slice(0, Math.floor(Math.random() * 3))
      .map((t) => t.id)
      .filter((eid) => eid !== creator.id);

    const baseQuestion: Partial<QuestionItem> = {
      id,
      type,
      category,
      gradeLevel,
      classId,
      creatorId: creator.id,
      organizationId: org.id,
      allowedEditorIds,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 31536000000),
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.floor(Math.random() * 2592000000),
      ).toISOString(),
    };

    if (isMultipleChoice) {
      const correctIndex = Math.floor(Math.random() * 4);
      return {
        ...baseQuestion,
        content: `Câu hỏi trắc nghiệm số ${id}: Ký hiệu nào sau đây biểu thị "${category}"?`,
        description: `Đây là câu hỏi kiểm tra kiến thức về ${category.toLowerCase()}.`,
        answers: [
          {
            id: "a",
            content: `Đáp án A - ${category} (${id})`,
            isCorrect: correctIndex === 0,
          },
          {
            id: "b",
            content: `Đáp án B - Khác ${id}`,
            isCorrect: correctIndex === 1,
          },
          {
            id: "c",
            content: `Đáp án C - Sai ${id}`,
            isCorrect: correctIndex === 2,
          },
          {
            id: "d",
            content: `Đáp án D - Không đúng ${id}`,
            isCorrect: correctIndex === 3,
          },
        ],
        videoUrl:
          Math.random() > 0.7 ? `https://example.com/video/${id}` : undefined,
      } as QuestionItem;
    } else {
      // Sample video URLs for practice (use public domain sample videos)
      const sampleVideos = [
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      ];

      // Practice words based on category
      const practiceWords: { [key: string]: string[] } = {
        "Ký hiệu cơ bản": [
          "Xin chào",
          "Tạm biệt",
          "Cảm ơn",
          "Xin lỗi",
          "Vâng/Đúng",
          "Không",
        ],
        "Số đếm": ["Một", "Hai", "Ba", "Bốn", "Năm", "Mười"],
        "Màu sắc": ["Đỏ", "Xanh", "Vàng", "Trắng", "Đen", "Hồng"],
        "Gia đình": ["Bố", "Mẹ", "Anh", "Chị", "Em", "Ông", "Bà"],
        "Thời gian": [
          "Hôm nay",
          "Ngày mai",
          "Hôm qua",
          "Bây giờ",
          "Sáng",
          "Tối",
        ],
        "Địa điểm": ["Nhà", "Trường", "Bệnh viện", "Công viên", "Chợ"],
        "Cảm xúc": ["Vui", "Buồn", "Giận", "Sợ", "Yêu", "Thích"],
        "Hoạt động hàng ngày": ["Ăn", "Uống", "Ngủ", "Đi", "Làm việc"],
        "Thực phẩm": ["Cơm", "Phở", "Bánh mì", "Trái cây", "Nước"],
        "Động vật": ["Chó", "Mèo", "Chim", "Cá", "Gà"],
        "Giao thông": ["Xe máy", "Ô tô", "Xe đạp", "Máy bay", "Tàu"],
        "Trường học": ["Thầy giáo", "Cô giáo", "Học sinh", "Sách", "Bút"],
        "Y tế": ["Bác sĩ", "Y tá", "Thuốc", "Đau", "Khỏe"],
        "Nghề nghiệp": [
          "Bác sĩ",
          "Giáo viên",
          "Công nhân",
          "Nông dân",
          "Kỹ sư",
        ],
        Khác: ["Tôi", "Bạn", "Chúng ta", "Họ", "Ai"],
      };

      const categoryWords = practiceWords[category] || practiceWords["Khác"];
      const wordIndex = id % categoryWords.length;
      const practiceWord = categoryWords[wordIndex];

      // Only some questions have video (to match requirement)
      const hasVideo = Math.random() > 0.3; // 70% have video
      const videoUrl = hasVideo
        ? sampleVideos[id % sampleVideos.length]
        : undefined;

      return {
        ...baseQuestion,
        content: `Thực hành ký hiệu: ${practiceWord}`,
        practiceWord: practiceWord,
        practiceInstructions: `Hãy thực hiện ký hiệu cho từ "${practiceWord}" theo các bước sau:\n1. Giữ tay ở vị trí ban đầu\n2. Thực hiện động tác như trong video mẫu\n3. Lặp lại 3-5 lần để ghi nhớ\n4. So sánh với video và điều chỉnh nếu cần`,
        description: `Ký hiệu "${practiceWord}" - thuộc danh mục ${category.toLowerCase()}. Đây là ký hiệu thường dùng trong giao tiếp hàng ngày.`,
        videoUrl,
      } as QuestionItem;
    }
  });
};

const generateMockQuestionSets = (
  count: number,
  questions: QuestionItem[],
): QuestionSetItem[] => {
  const teachers = mockUsers.filter((u) => u.role === "TEACHER");
  const organizations = mockOrganizations.slice(0, 5);

  if (organizations.length === 0) {
    return [];
  }

  return Array.from({ length: count }).map((_, index) => {
    const id = index + 1;
    const org = organizations[Math.floor(Math.random() * organizations.length)];
    const creator =
      teachers.length > 0
        ? teachers[Math.floor(Math.random() * teachers.length)]
        : { id: 1 };
    const category =
      questionCategories[Math.floor(Math.random() * questionCategories.length)];

    // Grade Level
    const gradeLevel =
      gradeLevels[Math.floor(Math.random() * gradeLevels.length)];

    // Determine set type (not mixed - either all multiple_choice or all practice)
    const setType: QuestionType =
      Math.random() > 0.5 ? "multiple_choice" : "practice";

    // Get questions from the same organization with matching type
    const orgQuestions = questions.filter(
      (q) => q.organizationId === org.id && q.type === setType,
    );
    const numQuestions = Math.min(
      orgQuestions.length,
      Math.floor(Math.random() * 10) + 5,
    );
    const selectedQuestions = orgQuestions.slice(0, numQuestions);

    // Generate allowed editors
    const orgTeachers = teachers.filter((t) => t.organizationId === org.id);
    const allowedEditorIds = orgTeachers
      .slice(0, Math.floor(Math.random() * 2))
      .map((t) => t.id)
      .filter((eid) => eid !== creator.id);

    const typeLabel =
      setType === "multiple_choice" ? "Trắc nghiệm" : "Thực hành";

    return {
      id,
      name: `Bộ ${typeLabel} ${category} - ${gradeLevel} - ${id}`,
      description: `Bộ câu hỏi ${typeLabel.toLowerCase()} về chủ đề ${category.toLowerCase()} dành cho ${gradeLevel}. Bao gồm ${
        selectedQuestions.length
      } câu hỏi.`,
      type: setType,
      questionIds: selectedQuestions.map((q) => q.id),
      creatorId: creator.id,
      organizationId: org.id,
      allowedEditorIds,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 31536000000),
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.floor(Math.random() * 2592000000),
      ).toISOString(),
      category,
      gradeLevel,
    };
  });
};

// ==================== EXPORT DATA ====================

export const mockQuestions: QuestionItem[] = generateMockQuestions(100);
export const mockQuestionSets: QuestionSetItem[] = generateMockQuestionSets(
  30,
  mockQuestions,
);

// ==================== HELPER FUNCTIONS ====================

export function getQuestionById(id: number): QuestionItem | undefined {
  return mockQuestions.find((q) => q.id === id);
}

export function getQuestionSetById(id: number): QuestionSetItem | undefined {
  return mockQuestionSets.find((qs) => qs.id === id);
}

export function getQuestionsByOrganization(orgId: number): QuestionItem[] {
  return mockQuestions.filter((q) => q.organizationId === orgId);
}

export function getQuestionSetsByOrganization(
  orgId: number,
): QuestionSetItem[] {
  return mockQuestionSets.filter((qs) => qs.organizationId === orgId);
}

export function getQuestionsByCreator(creatorId: number): QuestionItem[] {
  return mockQuestions.filter((q) => q.creatorId === creatorId);
}

export function getQuestionSetsByCreator(creatorId: number): QuestionSetItem[] {
  return mockQuestionSets.filter((qs) => qs.creatorId === creatorId);
}

export function getQuestionsByGradeLevel(
  gradeLevel: GradeLevel,
): QuestionItem[] {
  return mockQuestions.filter((q) => q.gradeLevel === gradeLevel);
}

export function getQuestionSetsByGradeLevel(
  gradeLevel: GradeLevel,
): QuestionSetItem[] {
  return mockQuestionSets.filter((qs) => qs.gradeLevel === gradeLevel);
}

export function getQuestionsInSet(setId: number): QuestionItem[] {
  const set = getQuestionSetById(setId);
  if (!set) return [];
  return set.questionIds
    .map((qId) => getQuestionById(qId))
    .filter((q): q is QuestionItem => q !== undefined);
}

// Permission checks
export function canEditQuestion(
  question: QuestionItem,
  userId: number,
  userRole: string,
  userOrgId?: number,
): boolean {
  // ADMIN can edit anything
  if (userRole === "ADMIN" || userRole === "TEST") return true;

  // FACILITY_MANAGER can edit questions in their organization
  if (userRole === "FACILITY_MANAGER") {
    return question.organizationId === userOrgId;
  }

  // TEACHER can edit if they created it or are in allowedEditors
  if (userRole === "TEACHER") {
    return (
      question.creatorId === userId ||
      question.allowedEditorIds.includes(userId)
    );
  }

  return false;
}

export function canEditQuestionSet(
  questionSet: QuestionSetItem,
  userId: number,
  userRole: string,
  userOrgId?: number,
): boolean {
  // ADMIN can edit anything
  if (userRole === "ADMIN" || userRole === "TEST") return true;

  // FACILITY_MANAGER can edit sets in their organization
  if (userRole === "FACILITY_MANAGER") {
    return questionSet.organizationId === userOrgId;
  }

  // TEACHER can edit if they created it or are in allowedEditors
  if (userRole === "TEACHER") {
    return (
      questionSet.creatorId === userId ||
      questionSet.allowedEditorIds.includes(userId)
    );
  }

  return false;
}

// Get questions visible to a user based on their role and organization
export function getVisibleQuestions(
  userId: number,
  userRole: string,
  userOrgId?: number,
): QuestionItem[] {
  // ADMIN sees all
  if (userRole === "ADMIN" || userRole === "TEST") {
    return mockQuestions;
  }

  // FACILITY_MANAGER and TEACHER see only their organization's questions
  if (userOrgId) {
    return mockQuestions.filter((q) => q.organizationId === userOrgId);
  }

  return [];
}

export function getVisibleQuestionSets(
  userId: number,
  userRole: string,
  userOrgId?: number,
): QuestionSetItem[] {
  // ADMIN sees all
  if (userRole === "ADMIN" || userRole === "TEST") {
    return mockQuestionSets;
  }

  // FACILITY_MANAGER and TEACHER see only their organization's sets
  if (userOrgId) {
    return mockQuestionSets.filter((qs) => qs.organizationId === userOrgId);
  }

  return [];
}

// Get creator info
export function getQuestionCreator(questionId: number): UserItem | undefined {
  const question = getQuestionById(questionId);
  if (!question) return undefined;
  return getUserById(question.creatorId);
}

export function getQuestionSetCreator(setId: number): UserItem | undefined {
  const set = getQuestionSetById(setId);
  if (!set) return undefined;
  return getUserById(set.creatorId);
}

// Stats
export function getQuestionsStats() {
  return {
    totalQuestions: mockQuestions.length,
    multipleChoice: mockQuestions.filter((q) => q.type === "multiple_choice")
      .length,
    practice: mockQuestions.filter((q) => q.type === "practice").length,
    totalSets: mockQuestionSets.length,
  };
}
