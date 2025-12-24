import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  Video,
  GraduationCap,
  Shield,
  Building,
  FileText,
  BarChart3,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/src/store/slices/adminSlice";

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  allowedRoles: string[]; // Danh sách các role được phép truy cập
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.admin.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Định nghĩa tất cả các menu item và quyền truy cập
  // Note: Roles từ API dùng UPPERCASE: ADMIN, TEACHER, STUDENT, FACILITY_MANAGER
  const MENU_ITEMS: MenuItem[] = [
    {
      icon: <House size={22} />,
      label: "Trang chủ",
      path: "/home",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT"],
    },
    // --- Dành cho Admin & Quản lý ---
    {
      icon: <Shield size={22} />,
      label: "Quản trị hệ thống",
      path: "/dashboard/admin",
      allowedRoles: ["ADMIN"],
    },
    {
      icon: <Building size={22} />,
      label: "Quản lý cơ sở",
      path: "/dashboard/facilities",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER"],
    },
    {
      icon: <Users size={22} />,
      label: "Người dùng",
      path: "/dashboard/users",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER"],
    },

    // --- Dành cho Giáo viên & Học sinh ---
    {
      icon: <Video size={22} />,
      label: "Lớp học",
      path: "/dashboard/classes",
      allowedRoles: ["FACILITY_MANAGER", "TEACHER", "STUDENT"],
    },
    {
      icon: <FileText size={22} />,
      label: "Bài tập & Chấm điểm",
      path: "/dashboard/assignments",
      allowedRoles: ["TEACHER"],
    },
    {
      icon: <BookOpen size={22} />,
      label: "Từ điển",
      path: "/dictionary",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT"],
    },
    {
      icon: <GraduationCap size={22} />,
      label: "Tiến độ học tập",
      path: "/dashboard/progress",
      allowedRoles: ["STUDENT"],
    },
    {
      icon: <BarChart3 size={22} />,
      label: "Báo cáo thống kê",
      path: "/dashboard/reports",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER"],
    },

    // --- Chung ---
    {
      icon: <MessageSquare size={22} />,
      label: "Tin nhắn",
      path: "/dashboard/messages",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT"],
    },
    {
      icon: <Users size={22} />,
      label: "Cộng đồng",
      path: "/dashboard/community",
      allowedRoles: ["TEACHER", "STUDENT"],
    },
  ];

  // Lọc menu dựa trên role của user hiện tại
  const filteredMenuItems = useMemo(() => {
    if (!user) return [];
    return MENU_ITEMS.filter((item) => item.allowedRoles.includes(user.role));
  }, [user]);

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`
        fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out pb-4
        ${isOpen ? "w-60 px-3 overflow-y-auto" : "w-24 px-2 overflow-y-auto"} 
      `}
    >
      <nav className="flex flex-col py-3 space-y-1 h-full">
        {filteredMenuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center rounded-xl transition-colors duration-200 group
                ${isOpen
                  ? "flex-row px-3 py-2.5 gap-4 justify-start" // Expanded: horizontal
                  : "flex-col justify-center items-center py-3 gap-0 h-20" // Collapsed: vertical, centered
                }
                ${active
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-100"
                }
              `}
              title={!isOpen ? item.label : ""}
            >
              <div
                className={`${active
                  ? "text-primary-600"
                  : "text-gray-500 group-hover:text-gray-900"
                  } flex-shrink-0`}
              >
                {item.icon}
              </div>

              <span
                className={`
                transition-all duration-200 leading-tight text-center
                ${isOpen
                    ? "text-sm font-medium w-auto whitespace-nowrap opacity-100" // Open: show text
                    : "text-xs font-medium opacity-100" // Closed: show text small
                  }
              `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <div className="flex-grow"></div>

        <div className={`border-t border-gray-100 mt-2 pt-2`}>
          <Link
            href="/dashboard/settings"
            className={`
                flex items-center rounded-xl transition-colors duration-200 group
                ${isOpen
                ? "flex-row px-3 py-2.5 gap-4 justify-start"
                : "flex-col justify-center items-center py-3 gap-0 h-20"
              }
                text-gray-700 hover:bg-gray-100
              `}
            title={!isOpen ? "Cài đặt" : ""}
          >
            <Settings
              size={22}
              className="text-gray-500 group-hover:text-gray-900 flex-shrink-0"
            />
            <span
              className={`
                transition-all duration-200 leading-tight text-center
                ${isOpen
                  ? "text-sm font-medium whitespace-nowrap"
                  : "text-xs font-medium"
                }
              `}
            >
              Cài đặt
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className={`
                w-full flex items-center rounded-xl transition-colors duration-200 group
                ${isOpen
                ? "flex-row px-3 py-2.5 gap-4 justify-start"
                : "flex-col justify-center items-center py-3 gap-0 h-20"
              }
                text-gray-700 hover:bg-gray-100
              `}
            title={!isOpen ? "Đăng xuất" : ""}
          >
            <LogOut
              size={22}
              className="text-gray-500 group-hover:text-red-600 flex-shrink-0"
            />
            <span
              className={`
                transition-all duration-200 leading-tight text-center
                ${isOpen
                  ? "text-sm font-medium whitespace-nowrap"
                  : "text-xs font-medium"
                }
              `}
            >
              Đăng xuất
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
