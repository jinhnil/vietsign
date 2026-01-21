import http from "@/core/services/api/http";

const Auth = {
  login: async (data: any) => {
    const response = await http.post("/auth/login", data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await http.post("/auth/register", data);
    return response.data;
  },
  verifyToken: async () => {
    const response = await http.get("/auth/verify");
    return response.data;
  },
};

export default Auth;
