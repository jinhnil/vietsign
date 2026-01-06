"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/src/store/slices/adminSlice";
import { DEMO_ACCOUNTS } from "@/src/config/mockdata";
import { Copy, CheckCircle } from "lucide-react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Auth from "@/src/model/Auth";
import UserCode from "@/src/model/User";
import { Button, Form, Input, message } from "antd";

import { useMutation } from "@tanstack/react-query";
import Loader from "@/src/components/UI/Loader";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: Auth.login,
    onSuccess: async (res) => {
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      // const userProfile = await UserCode.getProfile();
      // dispatch(login(userProfile.data));
      // localStorage.setItem("user", JSON.stringify(userProfile.data));
      if (res.user) {
        dispatch(login(res.user));
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      message.success("Đăng nhập thành công");
      router.push("/home");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message
        || error?.response?.data?.error
        || error?.message
        || "Đăng nhập thất bại. Vui lòng thử lại.";
      message.error(errorMessage);
    },
  });

  const handleSubmit = (values: any) => {
    loginMutation.mutate(values);
  };

  const handleDemoFill = (demoEmail: string, demoPass: string) => {
    form.setFieldsValue({
      email: demoEmail,
      password: demoPass,
    });
  };

  if (loginMutation.isPending) {
    return <Loader />;
  }


  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
      {/* Form Đăng nhập */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 m-5">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Đăng nhập VietSignSchool
        </h2>

        <Form
          form={form}
          name="login_form"
          className="space-y-6"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Tài khoản / Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" }
            ]}
          >
            <Input
              placeholder="Nhập email hoặc tên tài khoản"
              className="py-2"
              prefix={<MailOutlined className="text-gray-400" size={16} />}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="••••••••"
              className="py-2"
              prefix={<LockOutlined className="text-gray-400" size={16} />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 h-10 font-semibold"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

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

export default Login;
