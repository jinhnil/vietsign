import { Base } from "./base";

class AuthModelClass extends Base {
    constructor() {
        super("auth");
    }

    // POST /auth/login - Đăng nhập
    login = async (body?: any) => {
        const res = await this.apiPost("/login", body);
        return res.data;
    };

    // POST /auth/register - Đăng ký
    register = async (body?: any) => {
        console.log(body);
        const res = await this.apiPost("/register", body);
        return res.data;
    };

    // POST /auth/forgot-password - Quên mật khẩu
    forgotPassword = async (email: string) => {
        const res = await this.apiPost("/forgot-password", { email });
        return res.data;
    };

    // POST /auth/reset-password - Đặt lại mật khẩu
    resetPassword = async (token: string, newPassword: string) => {
        const res = await this.apiPost("/reset-password", { token, newPassword });
        return res.data;
    };
}

const AuthModel = new AuthModelClass();
export default AuthModel;

