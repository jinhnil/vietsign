import { Base } from "./base";

export interface Permission {
    code: string;
    name: string;
    description?: string;
    module?: string;
}

export interface RolePermission {
    roleCode: string;
    permissions: Permission[];
}

class PermissionModelClass extends Base {
    constructor() {
        super("api"); // Matches backend /api routes for permissions
    }

    // ==================== PERMISSION ROUTES ====================

    // GET /api/permissions - Lấy danh sách tất cả quyền (Admin only)
    getAllPermissions = async (): Promise<any> => {
        const res = await this.apiGet("/permissions");
        return res.data;
    };

    // GET /api/permissions/my - Lấy quyền của user hiện tại
    getMyPermissions = async (): Promise<any> => {
        const res = await this.apiGet("/permissions/my");
        return res.data;
    };

    // GET /api/permissions/user/:userId - Lấy quyền của user khác (Admin only)
    getUserPermissions = async (userId: number): Promise<any> => {
        const res = await this.apiGet(`/permissions/user/${userId}`);
        return res.data;
    };

    // POST /api/permissions/grant - Cấp quyền cho user (Admin only)
    grantPermission = async (userId: number, permissionCode: string): Promise<any> => {
        const res = await this.apiPost("/permissions/grant", { userId, permissionCode });
        return res.data;
    };

    // POST /api/permissions/revoke - Thu hồi quyền (Admin only)
    revokePermission = async (userId: number, permissionCode: string): Promise<any> => {
        const res = await this.apiPost("/permissions/revoke", { userId, permissionCode });
        return res.data;
    };

    // ==================== ROLE PERMISSION ROUTES ====================

    // GET /api/roles/:roleCode/permissions - Lấy quyền của role
    getRolePermissions = async (roleCode: string): Promise<any> => {
        const res = await this.apiGet(`/roles/${roleCode}/permissions`);
        return res.data;
    };

    // POST /api/roles/:roleCode/permissions - Thêm quyền cho role
    addRolePermission = async (roleCode: string, permissionCode: string): Promise<any> => {
        const res = await this.apiPost(`/roles/${roleCode}/permissions`, { permissionCode });
        return res.data;
    };

    // DELETE /api/roles/:roleCode/permissions/:permissionCode - Xóa quyền khỏi role
    removeRolePermission = async (roleCode: string, permissionCode: string): Promise<any> => {
        const res = await this.apiDelete(`/roles/${roleCode}/permissions/${permissionCode}`);
        return res.data;
    };

    // ==================== ORGANIZATION MANAGER ROUTES ====================

    // POST /api/organizations/:orgId/assign-manager - Gán người phụ trách
    assignOrganizationManager = async (orgId: number, userId: number): Promise<any> => {
        const res = await this.apiPost(`/organizations/${orgId}/assign-manager`, { userId });
        return res.data;
    };

    // DELETE /api/organizations/:orgId/remove-manager/:userId - Gỡ người phụ trách
    removeOrganizationManager = async (orgId: number, userId: number): Promise<any> => {
        const res = await this.apiDelete(`/organizations/${orgId}/remove-manager/${userId}`);
        return res.data;
    };

    // GET /api/organizations/:orgId/managers - Lấy danh sách người phụ trách
    getOrganizationManagers = async (orgId: number): Promise<any> => {
        const res = await this.apiGet(`/organizations/${orgId}/managers`);
        return res.data;
    };
}

const PermissionModel = new PermissionModelClass();
export default PermissionModel;
