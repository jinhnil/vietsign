"use client";

import {
  BookOpenCheck,
  Search,
  Plus,
  Users,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Filter,
  Building,
  Edit,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store";
import { statusConfig, ClassItem } from "@/data";
import { fetchAllClasses, createClass } from "@/services/classService";
import {
  fetchUsersByRole,
  fetchUsersByFacility,
  fetchAllUsers,
} from "@/services/userService";
import {
  fetchAllOrganizations,
  OrganizationItem,
} from "@/services/organizationService";
import { OrganizationManagerModel } from "@/domain/entities/Organization";
import {
  Pagination,
  usePagination,
} from "@/shared/components/common/Pagination";
import { Modal } from "@/shared/components/common/Modal";
import { ConfirmModal } from "@/shared/components/common/ConfirmModal";
import { removeVietnameseTones } from "@/shared/utils/text";

const ITEMS_PER_PAGE = 6;

export function ClassesManagement() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy thông tin user từ Redux store
  const { user } = useSelector((state: RootState) => state.admin);

  // State quản lý dữ liệu
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State quản lý giáo viên & cơ sở
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teachersMap, setTeachersMap] = useState<Record<number, string>>({});

  const [facilities, setFacilities] = useState<OrganizationItem[]>([]);
  const [facilitiesMap, setFacilitiesMap] = useState<Record<number, string>>(
    {},
  );

  // State for new class form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    classCode: "",
    classLevel: "1",
    teacherId: "",
    organizationId: "",
    thumbnailPath: "/images/class-default.jpg",
  });

  // Teachers for selected organization in form
  const [formTeachers, setFormTeachers] = useState<any[]>([]);
  const [loadingFormTeachers, setLoadingFormTeachers] = useState(false);
  const [teacherSearch, setTeacherSearch] = useState("");
  const [showTeacherSuggestions, setShowTeacherSuggestions] = useState(false);

  // Filtered teachers based on search
  const filteredFormTeachers = formTeachers.filter((t) =>
    t.name?.toLowerCase().includes(teacherSearch.toLowerCase()),
  );

  // Determine if current user is a teacher
  const isUserTeacher =
    user?.role === "TEACHER" ||
    user?.role?.role === "TEACHER" ||
    user?.code === "TEACHER";

  // Auto-fill organization for teachers
  useEffect(() => {
    if (isUserTeacher && user) {
      const userOrgId =
        user.organizationId || (user as any).organization_id || "";
      if (userOrgId) {
        setFormData((prev) => ({
          ...prev,
          organizationId: String(userOrgId),
          teacherId: user.id || (user as any).user_id || "",
        }));
      }
    }
  }, [user, isUserTeacher, isModalOpen]); // Run when modal opens too

  // Load teachers when organization is selected
  const handleOrganizationChange = async (orgId: string) => {
    setFormData({ ...formData, organizationId: orgId, teacherId: "" });
    setTeacherSearch(""); // Reset teacher search
    setFormTeachers([]); // Clear existing teachers

    if (orgId) {
      setLoadingFormTeachers(true);
      try {
        // Fetch teachers for the selected organization from organization_manager table
        const result = await OrganizationManagerModel.getByOrganization(
          orgId,
          "TEACHER",
        );
        console.log("Teachers for org", orgId, ":", result);
        setFormTeachers(result.users || []);
      } catch (error) {
        console.error("Error loading teachers for organization:", error);
        setFormTeachers([]);
      } finally {
        setLoadingFormTeachers(false);
      }
    }
  };

  // Select a teacher from suggestions
  const handleSelectTeacher = (teacher: any) => {
    setFormData({ ...formData, teacherId: String(teacher.id) });
    setTeacherSearch(teacher.name);
    setShowTeacherSuggestions(false);
  };
  // ... existing loadData useEffect ...

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load independent data in parallel, allow partial failures
        const [classesRes, teachersRes, facilitiesRes] =
          await Promise.allSettled([
            fetchAllClasses(),
            fetchUsersByRole("TEACHER"),
            fetchAllOrganizations(),
          ]);

        if (classesRes.status === "fulfilled") {
          setClasses(classesRes.value);
        } else {
          console.error("Failed to fetch classes:", classesRes.reason);
        }

        if (teachersRes.status === "fulfilled") {
          setTeachers(teachersRes.value);
        } else {
          console.error("Failed to fetch teachers:", teachersRes.reason);
        }

        if (facilitiesRes.status === "fulfilled") {
          setFacilities(facilitiesRes.value);
        } else {
          console.error("Failed to fetch facilities:", facilitiesRes.reason);
        }

        // Create map for quick lookup
        const tMap: Record<number, string> = {};
        const safeTeachers =
          teachersRes.status === "fulfilled" ? teachersRes.value : [];
        safeTeachers.forEach((t: any) => {
          tMap[t.id] = t.name;
        });
        setTeachersMap(tMap);

        const fMap: Record<number, string> = {};
        const safeFacilities =
          facilitiesRes.status === "fulfilled" ? facilitiesRes.value : [];
        safeFacilities.forEach((f: any) => {
          fMap[f.id] = f.name;
        });
        setFacilitiesMap(fMap);
      } catch (error) {
        console.error("Failed to load data", error);
        setClasses([]); // Empty on error, NO MOCK
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // State cho modal xác nhận xóa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<ClassItem | null>(null);

  // Helper functions để lấy tên từ ID
  const getTeacherName = (teacherId: number | null | undefined): string => {
    if (!teacherId) return "Chưa phân công";
    return teachersMap[teacherId] || `GV ID: ${teacherId}`;
  };

  const getFacilityName = (organizationId: number | null): string => {
    if (organizationId === null) return "Online";
    return facilitiesMap[organizationId] || "Không xác định";
  };

  // Lọc classes theo role của user
  const getClassesByRole = (): ClassItem[] => {
    const userRole = user?.role?.role || user?.code;
    const isAdmin = ["Admin", "ADMIN", "SUPER_ADMIN", "TEST"].includes(
      userRole,
    );

    // Admin: hiển thị tất cả các lớp
    if (isAdmin) {
      return classes;
    }

    // FacilityManager: lọc theo tổ chức được quản lý
    if (userRole === "FacilityManager" || userRole === "FACILITY_MANAGER") {
      const userOrgId = user?.organizationId || user?.organization_id;

      if (!userOrgId) {
        return []; // Không có organization được gán
      }

      // Tìm tổ chức của user
      const userOrg = facilities.find((f) => f.id === userOrgId);

      if (!userOrg) {
        return []; // Không tìm thấy tổ chức
      }

      // Nếu là Sở giáo dục (DEPARTMENT), lấy tất cả trường con
      if (userOrg.type === "DEPARTMENT") {
        // Lấy danh sách ID các trường thuộc sở giáo dục này
        const childSchoolIds = facilities
          .filter((f) => f.parentId === userOrgId)
          .map((f) => f.id);

        // Lọc các lớp thuộc các trường này
        return classes.filter(
          (cls) =>
            cls.organizationId !== null &&
            childSchoolIds.includes(cls.organizationId),
        );
      }

      // Nếu là Trường (SCHOOL), chỉ lấy các lớp của trường đó
      return classes.filter((cls) => cls.organizationId === userOrgId);
    }

    // Các role khác: không thấy lớp nào (hoặc có thể customize)
    return [];
  };

  // Áp dụng lọc theo role trước, sau đó lọc theo search và status
  const roleFilteredClasses = getClassesByRole();

  const filteredClasses = roleFilteredClasses.filter((cls) => {
    const teacherName = getTeacherName(cls.teacherId);
    const facilityName = getFacilityName(cls.organizationId);
    const normalizedQuery = removeVietnameseTones(searchQuery);
    const matchesSearch =
      removeVietnameseTones(cls.name).includes(normalizedQuery) ||
      removeVietnameseTones(teacherName).includes(normalizedQuery) ||
      removeVietnameseTones(facilityName).includes(normalizedQuery);
    const matchesStatus = filterStatus === "all" || cls.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const {
    currentPage,
    totalPages,
    paginatedItems,
    paddedItems,
    setCurrentPage,
  } = usePagination(filteredClasses, ITEMS_PER_PAGE);

  // Mở trang chi tiết
  const openDetailPage = (cls: ClassItem) => {
    router.push(`/classes-management/${cls.id}`);
  };

  // Mở trang chi tiết ở chế độ sửa
  const openEditPage = (cls: ClassItem, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/classes-management/${cls.id}`);
  };

  // Mở modal xác nhận xóa
  const openDeleteModal = (cls: ClassItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setClassToDelete(cls);
    setIsDeleteModalOpen(true);
  };

  // Xử lý xóa (Frontend only update for now, ideally call API)
  const handleDelete = () => {
    // Note: Should call deleteClass API here
    if (classToDelete) {
      setClasses((prev) => prev.filter((c) => c.id !== classToDelete.id));
      setIsDeleteModalOpen(false);
      setClassToDelete(null);
    }
  };

  // Helper để tạo mô tả theo role
  const getRoleDescription = (): string => {
    const userRole = user?.role?.role || user?.code;
    const isAdmin = ["Admin", "ADMIN", "SUPER_ADMIN", "TEST"].includes(
      userRole,
    );

    if (isAdmin) {
      return `Quản lý tất cả lớp học trong hệ thống (${roleFilteredClasses.length} lớp)`;
    }

    if (userRole === "FacilityManager" || userRole === "FACILITY_MANAGER") {
      const userOrgId = user?.organizationId || user?.organization_id;
      const userOrg = facilities.find((f) => f.id === userOrgId);

      if (userOrg?.type === "DEPARTMENT") {
        return `Quản lý các lớp học trong các trường thuộc ${userOrg.name} (${roleFilteredClasses.length} lớp)`;
      }

      if (userOrg) {
        return `Quản lý các lớp học tại ${userOrg.name} (${roleFilteredClasses.length} lớp)`;
      }
    }

    return `Quản lý các lớp học (${roleFilteredClasses.length} lớp)`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpenCheck className="w-8 h-8 text-primary-600" />
            Quản lý lớp học
          </h1>
          <p className="text-gray-600 mt-1">{getRoleDescription()}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} /> Tạo lớp học mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm lớp học, giáo viên hoặc cơ sở..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="ongoing">Đang diễn ra</option>
              <option value="upcoming">Sắp diễn ra</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-gray-500">
          Đang tải dữ liệu...
        </div>
      ) : (
        <div className="space-y-4">
          {paddedItems.map((cls, index) => {
            if (!cls)
              return (
                <div
                  key={`empty-${index}`}
                  className="h-[162px]"
                  aria-hidden="true"
                />
              );

            const teacherName = getTeacherName(cls.teacherId);
            const facilityName = getFacilityName(cls.organizationId);

            return (
              <div
                key={cls.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openDetailPage(cls)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl">
                        {cls.name.split(" ").pop()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {cls.name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              statusConfig[cls.status]?.color ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {statusConfig[cls.status]?.label || "Khác"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Building size={14} className="text-gray-400" />
                          <span>{facilityName}</span>
                          {cls.classLevel && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                                {cls.classLevel}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <User size={16} className="text-gray-400" />
                            <span>GV: {teacherName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users size={16} className="text-gray-400" />
                            <span>{cls.students || 0} học sinh</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-1">
                      <button
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        onClick={(e) => openEditPage(cls, e)}
                        title="Chỉnh sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={(e) => openDeleteModal(cls, e)}
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredClasses.length === 0 && !isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <BookOpenCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy lớp học
          </h3>
          <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
        </div>
      ) : !isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={classes.length}
            filteredItems={filteredClasses.length}
            itemName="lớp học"
            onPageChange={setCurrentPage}
          />
        </div>
      ) : null}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tạo lớp học mới"
      >
        <form
          className="space-y-4 overflow-visible"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setIsLoading(true);

              // Validation
              if (!formData.name?.trim()) {
                alert("Vui lòng nhập tên lớp học");
                setIsLoading(false);
                return;
              }
              if (!formData.organizationId) {
                alert("Vui lòng chọn cơ sở đào tạo");
                setIsLoading(false);
                return;
              }

              // If user is TEACHER, auto-assign teacherId to self
              const isTeacher =
                user?.role === "TEACHER" ||
                user?.role?.role === "TEACHER" ||
                user?.code === "TEACHER";
              const teacherIdToSubmit = isTeacher
                ? user?.id || (user as any)?.user_id
                : Number(formData.teacherId);

              const payload = {
                ...formData,
                teacherId: teacherIdToSubmit,
                organizationId: Number(formData.organizationId),
                status: "ongoing", // Default status
              };

              console.log("[ClassForm] Submitting payload:", payload);
              await createClass(payload);
              // Refresh data
              const [classesRes] = await Promise.allSettled([
                fetchAllClasses(),
              ]);
              if (classesRes.status === "fulfilled") {
                setClasses(classesRes.value);
              }
              setIsModalOpen(false);
              // Reset form
              setFormData({
                name: "",
                description: "",
                classCode: "",
                classLevel: "1",
                teacherId: "",
                organizationId: "",
                thumbnailPath: "/images/class-default.jpg",
              });
              alert("Tạo lớp học thành công!");
            } catch (error) {
              console.error(error);
              alert("Lỗi khi tạo lớp học");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Tên lớp học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Lớp 10A1"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Mã lớp học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ví dụ: CLASS001"
                value={formData.classCode}
                onChange={(e) =>
                  setFormData({ ...formData, classCode: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Khối lớp <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.classLevel}
                onChange={(e) =>
                  setFormData({ ...formData, classLevel: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((level) => (
                  <option key={level} value={String(level)}>
                    Lớp {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Cơ sở đào tạo - đưa lên trước */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Cơ sở đào tạo <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                required
                value={formData.organizationId}
                onChange={(e) => handleOrganizationChange(e.target.value)}
              >
                <option value="">Chọn cơ sở (Trường)</option>
                {facilities
                  .filter((facility) => {
                    if (facility.type !== "SCHOOL") return false;
                    if (isUserTeacher) {
                      const userOrgId =
                        user?.organizationId || (user as any)?.organization_id;
                      return Number(facility.id) === Number(userOrgId);
                    }
                    return true;
                  })
                  .map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Chỉ hiện dropdown chọn giáo viên nếu không phải là giáo viên */}
            {user?.role !== "TEACHER" &&
            user?.role?.role !== "TEACHER" &&
            user?.code !== "TEACHER" ? (
              <div className="space-y-1.5 relative">
                <label className="text-sm font-semibold text-gray-700">
                  Giáo viên phụ trách <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    !formData.organizationId
                      ? "Vui lòng chọn cơ sở trước"
                      : loadingFormTeachers
                        ? "Đang tải..."
                        : "Nhập tên giáo viên để tìm..."
                  }
                  value={teacherSearch}
                  onChange={(e) => {
                    setTeacherSearch(e.target.value);
                    setShowTeacherSuggestions(true);
                    // Clear selected teacher if typing new search
                    if (formData.teacherId) {
                      setFormData({ ...formData, teacherId: "" });
                    }
                  }}
                  onFocus={() => setShowTeacherSuggestions(true)}
                  onBlur={() => {
                    // Delay hiding to allow click on suggestion
                    setTimeout(() => setShowTeacherSuggestions(false), 200);
                  }}
                  disabled={!formData.organizationId || loadingFormTeachers}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {/* Hidden input for form validation */}
                <input type="hidden" value={formData.teacherId} required />

                {/* Suggestions dropdown */}
                {showTeacherSuggestions &&
                  formData.organizationId &&
                  filteredFormTeachers.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {filteredFormTeachers.map((teacher) => (
                        <div
                          key={teacher.id}
                          onClick={() => handleSelectTeacher(teacher)}
                          className="px-4 py-2.5 hover:bg-primary-50 cursor-pointer transition-colors flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{teacher.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Selected teacher indicator */}
                {formData.teacherId && (
                  <p className="text-xs text-green-600">
                    ✓ Đã chọn:{" "}
                    {
                      formTeachers.find(
                        (t) => String(t.id) === formData.teacherId,
                      )?.name
                    }
                  </p>
                )}

                {/* No teachers warning */}
                {formData.organizationId &&
                  formTeachers.length === 0 &&
                  !loadingFormTeachers && (
                    <p className="text-xs text-amber-600">
                      Cơ sở này chưa có giáo viên nào
                    </p>
                  )}
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Giáo viên phụ trách
                </label>
                <input
                  type="text"
                  value={user?.name || "Bạn"}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">
                  Bạn sẽ là giáo viên phụ trách lớp này
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
            >
              Tạo lớp học
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa lớp học "${classToDelete?.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
