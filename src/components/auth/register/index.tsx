"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, CheckCircle } from "lucide-react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Auth from "@/src/model/Auth";
import { Button, Form, Input, message } from "antd";

import { useMutation } from "@tanstack/react-query";
import Loader from "@/src/components/UI/Loader";

export const Register: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

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

  if (registerMutation.isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
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
  );
};

export default Register;
