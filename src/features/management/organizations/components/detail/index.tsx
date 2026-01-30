"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Save,
  X,
  MapPin,
  Phone,
  Mail,
  Users,
  User,
  Clock,
  Calendar,
  Building,
  Loader2,
  GraduationCap,
  School,
  UserCheck,
  UserX,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { OrganizationItem, organizationStatusConfig } from "@/data";
import {
  fetchProvinces,
  fetchProvinceById,
  type Province,
  type Commune,
} from "@/services/vietnamLocationsApi";
import { ConfirmModal } from "@/shared/components/common/ConfirmModal";
import {
  useOrganization,
  useUpdateOrganization,
  useDeleteOrganization,
} from "@/shared/hooks/useOrganizations";
import { message } from "antd";
import { roleLabels, roleColors, UserItem } from "@/services/userService";
import {
  Pagination,
  usePagination,
} from "@/shared/components/common/Pagination";

// --- Sub-component for User Table ---
const UserListTable = ({
  users,
  emptyMessage,
}: {
  users: UserItem[];
  emptyMessage: string;
}) => {
  const router = useRouter();
  const {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    itemsPerPage,
    totalItems,
  } = usePagination(users || [], 10);

  if (!users || users.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-[40%]">
                Người dùng
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-[20%]">
                Vai trò
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-[20%]">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 w-[20%]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedItems.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold overflow-hidden border border-gray-100 shadow-sm">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        (user.name || "U").charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-medium text-gray-900 truncate"
                        title={user.name}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-sm text-gray-500 truncate"
                        title={user.email}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      roleColors[user.role] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {roleLabels[user.role] || user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.status === "active" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <UserCheck size={14} />
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      <UserX size={14} />
                      Không hoạt động
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div
                    className="flex items-center justify-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/users/${user.id}`);
                      }}
                      title="Xem chi tiết"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          filteredItems={totalItems}
          itemName="người dùng"
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export function OrganizationDetail() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  // API Hooks
  const { data: organization, isLoading, isError } = useOrganization(id);
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<OrganizationItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [provinceName, setProvinceName] = useState<string>("");
  const [wardName, setWardName] = useState<string>("");

  const [activeTab, setActiveTab] = useState<
    "info" | "managers" | "teachers" | "students"
  >("info");

  useEffect(() => {
    if (organization) {
      setEditForm({ ...organization });
      loadLocationNames(organization.provinceCode, organization.wardCode);
    }
  }, [organization]);

  const loadLocationNames = async (provinceCode: number, wardCode: number) => {
    try {
      if (!provinceCode || provinceCode <= 0) return;

      const provinces = await fetchProvinces();
      const province = provinces.find((p: Province) => p.id === provinceCode);
      if (province) {
        setProvinceName(province.name);

        if (!wardCode || wardCode <= 0) return;
        const provinceDetail = await fetchProvinceById(provinceCode);
        if (provinceDetail?.communes) {
          const ward = provinceDetail.communes.find(
            (c: Commune) => Number(c.id) === wardCode,
          );
          if (ward) setWardName(ward.name);
        }
      }
    } catch (error) {
      console.error("Failed to load location names:", error);
    }
  };

  const handleSave = () => {
    if (organization && editForm) {
      updateMutation.mutate(
        { id: organization.id, data: editForm },
        {
          onSuccess: () => {
            message.success("Cập nhật thành công");
            setIsEditing(false);
          },
          onError: (error: any) => {
            message.error(error.message || "Cập nhật thất bại");
          },
        },
      );
    }
  };

  const handleDelete = () => {
    if (organization) {
      deleteMutation.mutate(organization.id, {
        onSuccess: () => {
          message.success("Xóa thành công");
          router.push("/organizations-management");
        },
        onError: (error: any) => {
          message.error(error.message || "Xóa thất bại");
        },
      });
    }
  };

  const getFullAddress = () => {
    if (!organization) return "";
    const parts = [];
    if (organization.streetAddress) parts.push(organization.streetAddress);
    if (wardName) parts.push(wardName);
    if (provinceName) parts.push(provinceName); // Province name lấy từ API locations
    return parts.length > 0 ? parts.join(", ") : "Chưa cập nhật địa chỉ";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // Handle case where organization is null or undefined after loading
  const currentOrganization = organization;

  if (isError || !currentOrganization) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Không tìm thấy tổ chức
        </h2>
        <button
          onClick={() => router.push("/organizations-management")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const statusInfo =
    organizationStatusConfig[currentOrganization.status] ||
    organizationStatusConfig.inactive;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button
          onClick={() => router.push("/organizations-management")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Quay lại danh sách</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Building size={32} className="text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">
                  {currentOrganization.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                    {statusInfo.label}
                  </span>
                  {provinceName && (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20">
                      {provinceName}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-6 text-white text-center">
              <div>
                <p className="text-3xl font-bold">
                  {currentOrganization.studentCount}
                </p>
                <p className="text-xs text-white/80">Học sinh</p>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  {currentOrganization.teacherCount}
                </p>
                <p className="text-xs text-white/80">Giáo viên</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-8 pt-4 gap-6 bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab("info")}
            className={`pb-4 px-2 font-medium text-sm flex items-center gap-2 transition-colors relative ${
              activeTab === "info"
                ? "text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Building size={18} />
            Thông tin chung
            {activeTab === "info" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("managers")}
            className={`pb-4 px-2 font-medium text-sm flex items-center gap-2 transition-colors relative ${
              activeTab === "managers"
                ? "text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <User size={18} />
            Quản lý ({currentOrganization.managers?.length || 0})
            {activeTab === "managers" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`pb-4 px-2 font-medium text-sm flex items-center gap-2 transition-colors relative ${
              activeTab === "teachers"
                ? "text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <School size={18} />
            Giáo viên ({currentOrganization.teachers?.length || 0})
            {activeTab === "teachers" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`pb-4 px-2 font-medium text-sm flex items-center gap-2 transition-colors relative ${
              activeTab === "students"
                ? "text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <GraduationCap size={18} />
            Học sinh ({currentOrganization.students?.length || 0})
            {activeTab === "students" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 bg-white min-h-[400px]">
          {activeTab === "info" && (
            <div className="animate-in fade-in duration-300">
              {/* Info Section (Old Content) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Tên tổ chức
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold">
                      {currentOrganization.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Địa chỉ
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.streetAddress || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          streetAddress: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                      <MapPin
                        size={18}
                        className="text-gray-400 flex-shrink-0"
                      />
                      {getFullAddress()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                      <Phone size={18} className="text-gray-400" />
                      {currentOrganization.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                      <Mail size={18} className="text-gray-400" />
                      {currentOrganization.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Quản lý
                  </label>
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                    <User size={18} className="text-gray-400" />
                    {currentOrganization.managers &&
                    currentOrganization.managers.length > 0
                      ? currentOrganization.managers
                          .map((m) => m.name)
                          .join(", ")
                      : "Chưa có quản lý"}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Trạng thái
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.status || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          status: e.target.value as OrganizationItem["status"],
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                    >
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Tạm ngưng</option>
                      <option value="maintenance">Bảo trì</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl">
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Giờ mở cửa
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.openingHours || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          openingHours: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                      <Clock size={18} className="text-gray-400" />
                      {currentOrganization.openingHours || "Chưa cập nhật"}
                    </p>
                  )}
                </div>

                {currentOrganization.createdAt && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Ngày tạo
                    </label>
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                      <Calendar size={18} className="text-gray-400" />
                      {currentOrganization.createdAt}
                    </p>
                  </div>
                )}

                {(currentOrganization.description || isEditing) && (
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Mô tả
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                        {currentOrganization.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Edit Controls for Info Tab */}
                <div className="md:col-span-2 flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({ ...currentOrganization });
                        }}
                        className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-colors font-medium flex items-center gap-2"
                      >
                        <X size={18} />
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
                        disabled={updateMutation.isPending}
                      >
                        <Save size={18} />
                        {updateMutation.isPending
                          ? "Đang lưu..."
                          : "Lưu thay đổi"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-colors font-medium flex items-center gap-2"
                      >
                        <Edit size={18} />
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        Xóa
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "managers" && (
            <div className="animate-in fade-in duration-300">
              <UserListTable
                users={currentOrganization.managers}
                emptyMessage="Chưa có quản lý nào được gán cho cơ sở này"
              />
            </div>
          )}

          {activeTab === "teachers" && (
            <div className="animate-in fade-in duration-300">
              <UserListTable
                users={currentOrganization.teachers}
                emptyMessage="Chưa có giáo viên nào tại cơ sở này"
              />
            </div>
          )}

          {activeTab === "students" && (
            <div className="animate-in fade-in duration-300">
              <UserListTable
                users={currentOrganization.students}
                emptyMessage="Chưa có học sinh nào tại cơ sở này"
              />
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa tổ chức "${currentOrganization.name}"? Hành động này không thể hoàn tác.`}
        confirmText={deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
