"use client";
import React from "react";
import Link from "next/link";
import { Hand, Mail, Phone, MapPin, Facebook, Youtube } from "lucide-react";

export const Footer: React.FC = () => (
  <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
    {/* Main Footer */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Hand size={26} />
            </div>
            <div>
              <span className="font-bold text-2xl text-white">
                VietSign<span className="text-primary-400">School</span>
              </span>
              <p className="text-xs text-gray-400">Ngôn ngữ ký hiệu Việt Nam</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6">
            Nền tảng học ngôn ngữ ký hiệu hàng đầu Việt Nam. Kết nối cộng đồng, 
            xây dựng tương lai không rào cản.
          </p>
          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Learn */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary-500 rounded"></span>
            Học tập
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/dictionary"
                className="hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                📖 Từ điển ký hiệu
              </Link>
            </li>
            <li>
              <Link
                href="/study"
                className="hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                📚 Bài học
              </Link>
            </li>
            <li>
              <Link
                href="/games"
                className="hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                🎮 Trò chơi
              </Link>
            </li>
            <li>
              <Link
                href="/daily-signs"
                className="hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                📅 Ký hiệu mỗi ngày
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary-500 rounded"></span>
            Về chúng tôi
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="hover:text-primary-400 transition-colors"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="hover:text-primary-400 transition-colors"
              >
                Đội ngũ phát triển
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary-400 transition-colors"
              >
                Liên hệ
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-primary-400 transition-colors"
              >
                Câu hỏi thường gặp
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-primary-500 rounded"></span>
            Liên hệ
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0" />
              <span className="text-gray-400">
                Đại học Bách khoa Hà Nội, Hai Bà Trưng, Hà Nội
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary-400 flex-shrink-0" />
              <a href="mailto:contact@vietsign.vn" className="hover:text-primary-400 transition-colors">
                contact@vietsign.vn
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary-400 flex-shrink-0" />
              <a href="tel:+84123456789" className="hover:text-primary-400 transition-colors">
                (+84) 123 456 789
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} VietSignSchool. Đã đăng ký bản quyền.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-primary-400 transition-colors">
            Chính sách bảo mật
          </Link>
          <Link href="/terms" className="hover:text-primary-400 transition-colors">
            Điều khoản sử dụng
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
