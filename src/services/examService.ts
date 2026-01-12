import ExamModel from "@/src/model/Exam";
import { mockExams, ExamItem } from "@/src/data/examsData";

const USE_API = true;

export async function fetchAllExams(query?: any): Promise<ExamItem[]> {
  if (!USE_API) return mockExams;

  try {
    const response = await ExamModel.getAllExams(query);
    const data = response.data || response;
    return Array.isArray(data) ? data : mockExams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return mockExams;
  }
}

export async function fetchExamById(id: number): Promise<ExamItem | undefined> {
  if (!USE_API) return mockExams.find((e) => e.id === id);

  try {
    const response = await ExamModel.getExamById(id);
    return (response.data || response) as ExamItem;
  } catch (error) {
    console.error("Error fetching exam:", error);
    return mockExams.find((e) => e.id === id);
  }
}

export async function createExam(data: any) {
  return await ExamModel.createExam(data);
}

export async function updateExam(id: number, data: any) {
  return await ExamModel.updateExam(id, data);
}

export async function deleteExam(id: number) {
  return await ExamModel.deleteExam(id);
}
