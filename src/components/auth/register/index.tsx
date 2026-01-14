"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/src/store/slices/adminSlice";
import { mapRoleCode } from "@/src/model/User";
import { CheckCircle, Sparkles } from "lucide-react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Auth from "@/src/model/Auth";
import { Button, Form, Input, message } from "antd";

import { useMutation } from "@tanstack/react-query";
import Loader from "@/src/components/UI/Loader";

export const Register: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const registerMutation = useMutation({
    mutationFn: (values: any) => Auth.register(values),
    onSuccess: async (res) => {
      console.log(res);
      message.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực OTP.");
      router.push("/login");
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });

  const handleSubmit = (values: any) => {
    registerMutation.mutate(values);
  };

  // DEMO MODE: Đăng ký demo và đăng nhập trực tiếp
  const handleDemoRegister = () => {
    const formValues = form.getFieldsValue();

    // Validate form có giá trị
    if (!formValues.name || !formValues.email || !formValues.password) {
      message.warning("Vui lòng điền đầy đủ thông tin để đăng ký Demo!");
      return;
    }

    // Tạo mock user từ thông tin form
    const mockUser = {
      id: Math.floor(Math.random() * 10000) + 1000,
      email: formValues.email,
      name: formValues.name,
      code: "USER",
      role: mapRoleCode("USER"),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formValues.email}`,
    };

    // Set local storage
    localStorage.setItem("access_token", `demo_token_register_${Date.now()}`);
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Dispatch login action
    dispatch(login(mockUser));

    // Notify and redirect
    message.success(`Đăng ký Demo thành công! Chào mừng ${formValues.name}`);
    router.push("/home");
  };

  // Đăng ký nhanh với thông tin mẫu
  const handleQuickDemoRegister = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const mockUser = {
      id: randomId,
      email: `demo.user.${randomId}@vietsign.demo`,
      name: `Demo User ${randomId}`,
      code: "USER",
      role: mapRoleCode("USER"),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=demo${randomId}`,
    };

    // Set local storage
    localStorage.setItem("access_token", `demo_token_quick_${Date.now()}`);
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Dispatch login action
    dispatch(login(mockUser));

    // Notify and redirect
    message.success(`Đăng ký Demo nhanh thành công! Chào mừng ${mockUser.name}`);
    router.push("/home");
  };

  if (registerMutation.isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Đăng ký tài khoản
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Bắt đầu hành trình học ASL của bạn
          </p>

          <Form
            form={form}
            name="register_form"
            className="space-y-5"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input
                placeholder="Nguyen Van A"
                className="py-2"
                prefix={<UserOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input
                placeholder="you@example.com"
                className="py-2"
                prefix={<MailOutlined className="text-gray-400" />}

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
                prefix={<LockOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 h-10 font-semibold"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          {/* Demo Registration Buttons */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <button
              onClick={handleDemoRegister}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-all hover:shadow-md font-medium"
            >
              <CheckCircle size={18} />
              Đăng ký Demo (Dùng thông tin trên)
            </button>

            <button
              onClick={handleQuickDemoRegister}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all hover:shadow-md font-medium"
            >
              <Sparkles size={18} />
              Đăng ký nhanh (Tự động tạo tài khoản)
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-primary-600 font-semibold hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

