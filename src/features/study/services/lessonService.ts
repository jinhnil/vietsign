import LessonModel from "@/domain/entities/Lesson";
import {
  learnCategories,
  LearnItem,
  LearnCategory,
} from "@/data/learnData";

const USE_API = true;

export interface Lesson extends LearnItem {
  category?: string; // Add category field for flat list handling
}

export async function fetchAllLessons(query?: any): Promise<Lesson[]> {
  if (!USE_API) {
    // Flatten mock data for fallback
    const flatLessons: Lesson[] = [];
    learnCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        flatLessons.push({ ...item, category: cat.id });
      });
    });
    return flatLessons;
  }

  try {
    const response = await LessonModel.getAllLessons(query);
    const data = response.data || response;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching lessons:", error);
    // Flatten mock data for fallback
    const flatLessons: Lesson[] = [];
    learnCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        flatLessons.push({ ...item, category: cat.id });
      });
    });
    return flatLessons;
  }
}

export async function fetchLessonById(id: number): Promise<Lesson | undefined> {
  const flatLessons: Lesson[] = [];
  learnCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      flatLessons.push({ ...item, category: cat.id });
    });
  });

  if (!USE_API) return flatLessons.find((l) => l.id === id);

  try {
    const response = await LessonModel.getLessonById(id);
    return (response.data || response) as Lesson;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return flatLessons.find((l) => l.id === id);
  }
}

export async function createLesson(data: any) {
  return await LessonModel.createLesson(data);
}

export async function updateLesson(id: number, data: any) {
  return await LessonModel.updateLesson(id, data);
}

export async function deleteLesson(id: number) {
  return await LessonModel.deleteLesson(id);
}
