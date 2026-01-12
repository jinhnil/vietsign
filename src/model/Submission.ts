import { Base } from "./base";

export class SubmissionModel extends Base {
  constructor() {
    super("submissions");
  }

  getAllSubmissions = async (query?: any) => {
    const res = await this.apiGet("", query);
    return res.data;
  };

  getSubmissionById = async (id: number) => {
    const res = await this.apiGet(`/${id}`);
    return res.data;
  };

  createSubmission = async (data: any) => {
    const res = await this.apiPost("", data);
    return res.data;
  };

  updateSubmission = async (id: number, data: any) => {
    const res = await this.apiPut(`/${id}`, data);
    return res.data;
  };

  deleteSubmission = async (id: number) => {
    const res = await this.apiDelete(`/${id}`);
    return res.data;
  };

  gradeSubmission = async (
    id: number,
    data: { score: number; feedback?: string }
  ) => {
    const res = await this.apiPut(`/${id}/grade`, data);
    return res.data;
  };
}

const Submissions = new SubmissionModel();
export default Submissions;
