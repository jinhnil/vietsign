import { Base } from "./base";

export interface User {
    id?: string;
    email: string;
    name: string;
    role: UserRole;
    label?: string;
    avatar?: string;
}

export interface UserRole {
    role: 'Admin' | 'FacilityManager' | 'Teacher' | 'Student' | 'User';
    label: string;
}

class UserModelClass extends Base {
    constructor() {
        super("users");
    }

    // Thông tin cá nhân
    getProfile = async (): Promise<any> => {
        const res = await this.apiGet("/profile");
        return res.data;
    };
}

const User = new UserModelClass();
export default User;
