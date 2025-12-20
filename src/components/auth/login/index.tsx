"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEMO_ACCOUNTS } from "../../../config/mockdata";
import { Copy, CheckCircle } from "lucide-react";
import { useAuth } from "../../../providers/auth-provider";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleDemoFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Tìm tài khoản demo khớp (giả lập backend validation)
    const matchedAccount = DEMO_ACCOUNTS.find(
      (acc) => acc.email === email && acc.password === password
    );

    const userData = matchedAccount
      ? {
          email: matchedAccount.email,
          role: matchedAccount.role,
          name: matchedAccount.label,
          label: matchedAccount.label,
        }
      : {
          email: email,
          role: "User",
          name: email.split("@")[0],
        };

    // Đăng nhập thành công
    login(userData);

    // Chuyển hướng về Dashboard (được coi là Home sau khi đăng nhập)
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
      {/* Form Đăng nhập */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in slide-in-from-bottom-2 m-5">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Chào mừng đến với VietSign
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
              placeholder="ban@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Đăng nhập
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="text-primary-600 font-semibold hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </div>

      {/* Panel Tài khoản Demo */}
      <div
        className="w-full max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-2"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 m-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-100 p-2 rounded-lg">
              <CheckCircle size={20} className="text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-800">
              Tài khoản Demo (Testing)
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Chọn một vai trò để tự động điền thông tin và đăng nhập thử nghiệm:
          </p>

          <div className="grid grid-cols-1 gap-3">
            {DEMO_ACCOUNTS.map((acc, index) => (
              <button
                key={index}
                onClick={() => handleDemoFill(acc.email, acc.password)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02] ${acc.color} bg-opacity-30 border-opacity-50`}
              >
                <div className="text-left">
                  <p className="font-bold text-sm">{acc.label}</p>
                  <p className="text-xs opacity-80">{acc.email}</p>
                </div>
                <Copy size={16} className="opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
