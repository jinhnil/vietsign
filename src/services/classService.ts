import ClassModel from "@/domain/entities/Class";
import { mockClasses, ClassItem } from "@/data/classesData";

const USE_API = true;

export async function fetchAllClasses(query?: any): Promise<ClassItem[]> {
  if (!USE_API) return mockClasses;

  try {
    const response = await ClassModel.getAllClasses(query);
    const data = response.data || response;
    return Array.isArray(data) ? data : mockClasses;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return mockClasses;
  }
}

export async function fetchClassById(
  id: number
): Promise<ClassItem | undefined> {
  if (!USE_API) return mockClasses.find((c) => c.id === id);

  try {
    const response = await ClassModel.getClassById(id);
    return (response.data || response) as ClassItem;
  } catch (error) {
    console.error("Error fetching class:", error);
    return mockClasses.find((c) => c.id === id);
  }
}

export async function createClass(data: any) {
  return await ClassModel.createClass(data);
}

export async function updateClass(id: number, data: any) {
  return await ClassModel.updateClass(id, data);
}

export async function deleteClass(id: number) {
  return await ClassModel.deleteClass(id);
}
