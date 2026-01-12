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

  // GET /permissions - Get all permissions
  getAllPermissions = async (): Promise<any> => {
    const res = await this.apiGet("");
    return res.data;
  };

  // GET /permissions/my - Get my permissions
  getMyPermissions = async (): Promise<any> => {
    const res = await this.apiGet("/my");
    return res.data;
  };

  // GET /permissions/user/{userId} - Get user permissions
  getUserPermissions = async (userId: number): Promise<any> => {
    const res = await this.apiGet(`/user/${userId}`);
    return res.data;
  };

  // POST /permissions/grant - Grant permission
  grantPermission = async (
    userId: number,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiPost("/grant", { userId, permissionCode });
    return res.data;
  };

  // POST /permissions/revoke - Revoke permission
  revokePermission = async (
    userId: number,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiPost("/revoke", { userId, permissionCode });
    return res.data;
  };

  // ==================== ROLES ====================
  // Routes start with /roles, so we use apiGetWithoutPrefix + manually adding /roles

  // GET /roles/{roleCode}/permissions
  getRolePermissions = async (roleCode: string): Promise<any> => {
    const res = await this.apiGetWithoutPrefix(
      `/roles/${roleCode}/permissions`
    );
    return res.data;
  };

  // POST /roles/{roleCode}/permissions - Add permission to role
  addRolePermission = async (
    roleCode: string,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiPostWithoutPrefix(
      `/roles/${roleCode}/permissions`,
      { permissionCode }
    );
    return res.data;
  };

  // DELETE /roles/{roleCode}/permissions/{permissionCode}
  removeRolePermission = async (
    roleCode: string,
    permissionCode: string
  ): Promise<any> => {
    const res = await this.apiDeleteWithoutPrefix(
      `/roles/${roleCode}/permissions/${permissionCode}`
    );
    return res.data;
  };

  // ==================== ORGANIZATIONS ====================

  // GET /organizations/{orgId}/managers
  getOrganizationManagers = async (orgId: number): Promise<any> => {
    const res = await this.apiGetWithoutPrefix(
      `/organizations/${orgId}/managers`
    );
    return res.data;
  };

  // POST /organizations/{orgId}/assign-manager
  assignOrganizationManager = async (
    orgId: number,
    userId: number
  ): Promise<any> => {
    const res = await this.apiPostWithoutPrefix(
      `/organizations/${orgId}/assign-manager`,
      { userId }
    );
    return res.data;
  };

  // DELETE /organizations/{orgId}/remove-manager/{userId}
  removeOrganizationManager = async (
    orgId: number,
    userId: number
  ): Promise<any> => {
    const res = await this.apiDeleteWithoutPrefix(
      `/organizations/${orgId}/remove-manager/${userId}`
    );
    return res.data;
  };
}

const PermissionModel = new PermissionModelClass();
export default PermissionModel;
