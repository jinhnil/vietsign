import { Base } from "./base";
import { User } from "./User";

class AuthModelClass extends Base {
    constructor() {
        super("user-service");
    }

    login = async (body?: any) => {
        const res = await this.apiPost("/auth/login", body);
        return res.data;
    };
    // Đăng ký
    register = async (body?: any) => {
        return await this.apiPost("/register/generate-otp", body);
    };

    // validate otp
    validateOtp = async (body?: any) => {
        return await this.apiPost("/register/validate-otp", body);
    };
}

const AuthModel = new AuthModelClass();
export default AuthModel;
