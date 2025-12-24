import { Base } from "./base";

export interface User {
    id?: string;
    email: string;
    name: string;
    role: string;
    label?: string;
    avatar?: string;
}

export interface UserRole {
    role: 'Admin' | 'FacilityManager' | 'Teacher' | 'Student';
    label: string;
}

class UserModelClass extends Base {
    constructor() {
        super("user-service");
    }

    // Thông tin cá nhân
    getProfile = async (): Promise<any> => {
        const res = await this.apiGet("/users/me/v2");
        return res.data;
    };
}

const User = new UserModelClass();
export default User;
