import { Base } from "./base";

export interface Permission {
  code: string;
  name: string;
  description?: string;
  group?: string;
}

export interface Role {
  code: string;
  name: string;
  description?: string;
  permissions?: Permission[];
}

export interface UserPermission {
  userId: number;
  permissions: string[]; // List of permission codes
}

class PermissionModelClass extends Base {
  constructor() {
    super("permissions"); // Maps to /permissions
  }

  // ==================== PERMISSIONS ====================

  // GET /api/permissions - Get all permissions
  getAllPermissions = async (): Promise<any> => {
    // Since super is "permissions", apiGet("") -> /api/permissions
    // But check if Base appends slash.
    // If apiPrefixNode is .../api/permissions, apiGetNode("") might handle it or need adjustment.
    // Base.ts: http.get(`${this.apiPrefixNode}${url}`)
    // If url is "", it is .../api/permissions
    const res = await this.apiGetNode("");
    return res.data;
  };

  // GET /api/permissions/my - Get my permissions
  getMyPermissions = async (): Promise<any> => {
    const res = await this.apiGetNode("/my");
    return res.data;
  };

  // GET /api/permissions/user/{userId} - Get user permissions
  getUserPermissions = async (userId: number): Promise<any> => {
    const res = await this.apiGetNode(`/user/${userId}`);
    return res.data;
  };

  // POST /api/permissions/grant - Grant permission
  grantPermission = async (
    userId: number,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiPostNode("/grant", { userId, permissionCode });
    return res.data;
  };

  // POST /api/permissions/revoke - Revoke permission
  revokePermission = async (
    userId: number,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiPostNode("/revoke", { userId, permissionCode });
    return res.data;
  };

  // ==================== ROLES ====================
  // Routes start with /api/roles, so we use api...WithoutPrefixNode + manually adding /roles

  // GET /api/roles/{roleCode}/permissions
  getRolePermissions = async (roleCode: string): Promise<any> => {
    const res = await this.apiGetWithoutPrefixNode(
      `/roles/${roleCode}/permissions`
    );
    return res.data;
  };

  // POST /api/roles/{roleCode}/permissions - Add permission to role
  addRolePermission = async (
    roleCode: string,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiPostWithoutPrefixNode(
      `/roles/${roleCode}/permissions`,
      { permissionCode }
    );
    return res.data;
  };

  // DELETE /api/roles/{roleCode}/permissions/{permissionCode}
  removeRolePermission = async (
    roleCode: string,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiDeleteWithoutPrefixNode(
      `/roles/${roleCode}/permissions/${permissionCode}`
    );
    return res.data;
  };

  // ==================== ORGANIZATIONS ====================

  // GET /api/organizations/{orgId}/managers
  getOrganizationManagers = async (orgId: number): Promise<any> => {
    const res = await this.apiGetWithoutPrefixNode(
      `/organizations/${orgId}/managers`
    );
    return res.data;
  };

  // POST /api/organizations/{orgId}/assign-manager
  assignOrganizationManager = async (
    orgId: number,
    userId: number
  ): Promise<any> => {
    const res = await this.apiPostWithoutPrefixNode(
      `/organizations/${orgId}/assign-manager`,
      { userId }
    );
    return res.data;
  };

  // DELETE /api/organizations/{orgId}/remove-manager/{userId}
  removeOrganizationManager = async (
    orgId: number,
    userId: number
  ): Promise<any> => {
    const res = await this.apiDeleteWithoutPrefixNode(
      `/organizations/${orgId}/remove-manager/${userId}`
    );
    return res.data;
  };
}

const PermissionModel = new PermissionModelClass();
export default PermissionModel;
