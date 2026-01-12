import SubmissionModel from "@/src/model/Submission";
import { mockSubmissions, SubmissionItem } from "@/src/data/gradingData";

const USE_API = true;

export async function fetchAllSubmissions(
  query?: any
): Promise<SubmissionItem[]> {
  if (!USE_API) return mockSubmissions;

  try {
    const response = await SubmissionModel.getAllSubmissions(query);
    const data = response.data || response;
    return Array.isArray(data) ? data : mockSubmissions;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return mockSubmissions;
  }
}

export async function fetchSubmissionById(
  id: number
): Promise<SubmissionItem | undefined> {
  if (!USE_API) return mockSubmissions.find((s) => s.id === id);

  try {
    const response = await SubmissionModel.getSubmissionById(id);
    return (response.data || response) as SubmissionItem;
  } catch (error) {
    console.error("Error fetching submission:", error);
    return mockSubmissions.find((s) => s.id === id);
  }
}

export async function createSubmission(data: any) {
  return await SubmissionModel.createSubmission(data);
}

export async function updateSubmission(id: number, data: any) {
  return await SubmissionModel.updateSubmission(id, data);
}

export async function deleteSubmission(id: number) {
  return await SubmissionModel.deleteSubmission(id);
}

export async function gradeSubmission(
  id: number,
  score: number,
  feedback?: string
) {
  if (!USE_API) return;
  return await SubmissionModel.gradeSubmission(id, { score, feedback });
}
