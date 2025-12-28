import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  BookOpen,
  Settings,
  LogOut,
  Users,
  GraduationCap,
  Building,
  BarChart3,
  Bell,
  Wrench,
  ClipboardCheck,
  Gamepad2,
  BookOpenCheck,
  PenLine,
  FileEdit,
  UserPlus,
  LayoutDashboard,
  Library,
  Calendar,
  Lightbulb,
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
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.admin.user);

  const handleLogout = () => {
    dispatch(logout());
    // Redirect về trang chủ sau khi đăng xuất
    router.push("/");
  };

  // Định nghĩa tất cả các menu item và quyền truy cập
  // Note: Roles từ API dùng UPPERCASE: ADMIN, TEACHER, STUDENT, FACILITY_MANAGER, TEST
  // Admin: home, dashboard, quản lý người dùng, quản lý cơ sở, quản lý học tập, quản lý lớp học, thông báo, quản lý công cụ, quản lý kiểm tra, thống kê, quản lý từ điển, quản lý trò chơi
  // FACILITY_MANAGER: home, dashboard, quản lý người dùng, quản lý học tập, quản lý lớp học, thông báo, quản lý công cụ, quản lý kiểm tra, thống kê, từ điển, quản lý trò chơi
  // TEACHER: home, dashboard, thông báo, quản lý lớp học, quản lý học tập, thống kê, quản lý kiểm tra, chấm điểm, từ điển, trò chơi
  // STUDENT: home, dashboard, thông báo, quản lý học tập, thống kê, làm bài kiểm tra, học tập, đăng ký lớp học, từ điển, trò chơi
  // TEST: Truy cập tất cả các trang
  const MENU_ITEMS: MenuItem[] = [
    // === CHUNG CHO TẤT CẢ ===
    {
      icon: <House size={22} />,
      label: "Trang chủ",
      path: "/home",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
    },
    {
      icon: <LayoutDashboard size={22} />,
      label: "Dashboard",
      path: "/dashboard",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
    },
    
    // === QUẢN LÝ (ADMIN & FACILITY_MANAGER) ===
    {
      icon: <Users size={22} />,
      label: "Quản lý người dùng",
      path: "/users",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEST"],
    },
    {
      icon: <Building size={22} />,
      label: "Quản lý cơ sở",
      path: "/facilities",
      allowedRoles: ["ADMIN", "TEST"],
    },
    {
      icon: <GraduationCap size={22} />,
      label: "Quản lý học tập",
      path: "/learning",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
    },
    {
      icon: <BookOpenCheck size={22} />,
      label: "Quản lý lớp học",
      path: "/classes",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "TEST"],
    },
    {
      icon: <Bell size={22} />,
      label: "Thông báo",
      path: "/notifications",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
    },
    {
      icon: <Wrench size={22} />,
      label: "Quản lý công cụ",
      path: "/tools",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEST"],
    },
    {
      icon: <ClipboardCheck size={22} />,
      label: "Quản lý kiểm tra",
      path: "/exams",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "TEST"],
    },
    {
      icon: <BarChart3 size={22} />,
      label: "Thống kê",
      path: "/statistics",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
    },
    {
      icon: <Library size={22} />,
      label: "Quản lý từ điển",
      path: "/dictionary-management",
      allowedRoles: ["ADMIN", "TEST"],
    },
    {
      icon: <Gamepad2 size={22} />,
      label: "Quản lý trò chơi",
      path: "/games-management",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEST"],
    },
    
    // === CHỈ FACILITY_MANAGER, TEACHER, STUDENT ===
    {
      icon: <BookOpen size={22} />,
      label: "Từ điển",
      path: "/dictionary",
      allowedRoles: ["FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
    },
    
    // === CHỈ TEACHER & STUDENT ===
    {
      icon: <Gamepad2 size={22} />,
      label: "Trò chơi",
      path: "/games",
      allowedRoles: ["TEACHER", "STUDENT", "TEST"],
    },
    
    // === CHỈ TEACHER ===
    {
      icon: <PenLine size={22} />,
      label: "Chấm điểm",
      path: "/grading",
      allowedRoles: ["TEACHER", "TEST"],
    },
    
    // === CHỈ STUDENT ===
    {
      icon: <FileEdit size={22} />,
      label: "Làm bài kiểm tra",
      path: "/take-exam",
      allowedRoles: ["STUDENT", "TEST"],
    },
    {
      icon: <BookOpenCheck size={22} />,
      label: "Học tập",
      path: "/study",
      allowedRoles: ["STUDENT", "TEST"],
    },
    {
      icon: <UserPlus size={22} />,
      label: "Đăng ký lớp học",
      path: "/class-registration",
      allowedRoles: ["STUDENT", "TEST"],
    },
    
    // === TRANG BỔ SUNG ===
    {
      icon: <Lightbulb size={22} />,
      label: "Học ngôn ngữ",
      path: "/learn",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
    },
    {
      icon: <Calendar size={22} />,
      label: "Ký hiệu mỗi ngày",
      path: "/daily-signs",
      allowedRoles: ["ADMIN", "FACILITY_MANAGER", "TEACHER", "STUDENT", "TEST"],
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
