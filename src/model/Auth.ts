import { Base } from "./base";

class AuthModelClass extends Base {
    constructor() {
        super("auth");
    }

    // Đăng nhập
    login = async (body?: any) => {
        const res = await this.apiPost("/login", body);
        return res.data;
    };

    // Đăng ký
    register = async (body?: any) => {
        console.log(body);
        return await this.apiPost("/register", body);
    };

    // validate otp
    // validateOtp = async (body?: any) => {
    //     return await this.apiPost("/auth/register", body);
    // };
}

const AuthModel = new AuthModelClass();
export default AuthModel;
