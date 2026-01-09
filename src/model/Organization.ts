import { Base } from "./base";

export interface Organization {
    id?: number;
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    logo_url?: string;
    is_active?: boolean;
    created_date?: string;
    modified_date?: string;
}

class OrganizationModelClass extends Base {
    constructor() {
        super("organizations"); // Matches backend /organizations routes
    }

    // GET /organizations - Lấy danh sách tổ chức
    getAll = async (query?: any): Promise<any> => {
        const res = await this.apiGet("", query);
        return res.data;
    };

    // GET /organizations/:id - Lấy thông tin tổ chức
    getById = async (id: number): Promise<any> => {
        const res = await this.apiGet(`/${id}`);
        return res.data;
    };

    // POST /organizations - Tạo tổ chức mới
    create = async (data: Partial<Organization>): Promise<any> => {
        const res = await this.apiPost("", data);
        return res.data;
    };

    // PUT /organizations/:id - Cập nhật tổ chức
    update = async (id: number, data: Partial<Organization>): Promise<any> => {
        const res = await this.apiPut(`/${id}`, data);
        return res.data;
    };

    // DELETE /organizations/:id - Xóa tổ chức
    delete = async (id: number): Promise<any> => {
        const res = await this.apiDelete(`/${id}`);
        return res.data;
    };
}

const OrganizationModel = new OrganizationModelClass();
export default OrganizationModel;
