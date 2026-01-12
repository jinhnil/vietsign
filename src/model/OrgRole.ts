import { Base } from "./base";

export class OrgRoleModel extends Base {
  constructor() {
    super("org-roles");
  }

  getAllOrgRoles = async (query?: any) => {
    const res = await this.apiGet("/all", query);
    return res.data;
  };

  getOrgRoleById = async (id: number) => {
    const res = await this.apiGet(`/${id}`);
    return res.data;
  };

  createOrgRole = async (data: any) => {
    const res = await this.apiPost("/create", data);
    return res.data;
  };

  updateOrgRole = async (id: number, data: any) => {
    const res = await this.apiPut(`/${id}`, data);
    return res.data;
  };

  deleteOrgRole = async (id: number) => {
    const res = await this.apiDelete(`/${id}`);
    return res.data;
  };
}

const OrgRoles = new OrgRoleModel();
export default OrgRoles;
