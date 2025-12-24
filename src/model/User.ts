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
        super("user-service/auth");
    }

    getProfile = async (): Promise<any> => {
        const response = await this.apiGet("/me");
        return response;
    };
}

const User = new UserModelClass();
export default User;
