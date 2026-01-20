"use client";

import {
  Building,
  Search,
  Plus,
  MapPin,
  Users,
  Phone,
  Mail,
  Edit,
  Trash2,
  MoreVertical,
  Map,
  User,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  organizationStatusConfig,
  getUniqueProvinceCodes,
  OrganizationItem,
} from "@/src/data";
import {
  fetchProvinces,
  fetchProvinceById,
  type Province,
  type Commune,
} from "@/src/services/vietnamLocationsApi";
import { fetchUsersByRole } from "@/src/services/userService";
import { Pagination, usePagination } from "@/src/components/common/Pagination";
import { Modal } from "@/src/components/common/Modal";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";
import {
  useOrganizations,
  useCreateOrganization,
  useDeleteOrganization,
} from "@/src/hooks/useOrganizations";
import { message } from "antd";

const ITEMS_PER_PAGE = 6;

// Cache cho tên tỉnh và phường/xã
interface LocationNames {
  provinces: Record<number, string>;
  wards: Record<number, string>;
}

import { removeVietnameseTones } from "@/src/utils/text";

export function OrganizationsManagement() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProvince, setFilterProvince] = useState<number | "all">("all");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [locationNames, setLocationNames] = useState<LocationNames>({
    provinces: {},
    wards: {},
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalProvince, setSelectedModalProvince] = useState<
    number | ""
  >("");
  const [modalWards, setModalWards] = useState<Commune[]>([]);
  const [loadingWards, setLoadingWards] = useState(false);
  const [managerMap, setManagerMap] = useState<Record<number, string>>({});

  // API Hooks
  const { data: organizationsData, isLoading, isError } = useOrganizations();
  const createMutation = useCreateOrganization();
  const deleteMutation = useDeleteOrganization();

  // Chuyển đổi dữ liệu từ API nếu cần thiết hoặc sử dụng trực tiếp
  const organizations: OrganizationItem[] = Array.isArray(organizationsData)
    ? organizationsData
    : [];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] =
    useState<OrganizationItem | null>(null);

  // Load managers
  useEffect(() => {
    async function loadManagers() {
      try {
        // Fetch potential managers (Teachers and Admins)
        const [teachers, admins] = await Promise.all([
          fetchUsersByRole("TEACHER"),
          fetchUsersByRole("ADMIN"),
        ]);
        const map: Record<number, string> = {};
        // Assuming the service returns arrays of users
        (teachers || []).forEach((u: any) => (map[u.id] = u.name));
        (admins || []).forEach((u: any) => (map[u.id] = u.name));
        setManagerMap(map);
      } catch (e) {
        console.error("Failed to load managers", e);
      }
    }
    loadManagers();
  }, []);

  // Lấy danh sách tỉnh/thành phố từ API
  useEffect(() => {
    async function loadProvinces() {
      try {
        const data = await fetchProvinces();
        setProvinces(data);

        // Lưu tên tỉnh vào cache
        const provinceNames: Record<number, string> = {};
        data.forEach((p) => {
          provinceNames[parseInt(p.id)] = p.name;
        });

        // Cập nhật tên tỉnh vào cache
        setLocationNames((prev) => ({ ...prev, provinces: provinceNames }));
      } catch (error) {
        console.error("Failed to load provinces:", error);
      } finally {
        setLoadingProvinces(false);
      }
    }
    loadProvinces();
  }, []);

  // Lấy tên phường/xã từ API khi có danh sách tỉnh và organizations
  useEffect(() => {
    async function loadWards() {
      if (provinces.length === 0 || organizations.length === 0) return;

      // Lấy danh sách province code từ organizations hiện có
      const uniqueProvinceCodes = [
        ...new Set(organizations.map((f) => f.provinceCode)),
      ];
      const wardNames: Record<number, string> = {};

      // Lấy thông tin phường/xã cho từng tỉnh có cơ sở
      for (const provinceCode of uniqueProvinceCodes) {
        try {
          const provinceDetail = await fetchProvinceById(provinceCode);
          if (provinceDetail && provinceDetail.communes) {
            // Tìm ward trong danh sách communes
            for (const commune of provinceDetail.communes) {
              const wardCode = parseInt(commune.id);
              // Kiểm tra xem ward này có trong danh sách cơ sở không
              const organizationWithWard = organizations.find(
                (f) => f.wardCode === wardCode
              );
              if (organizationWithWard) {
                wardNames[wardCode] = commune.name;
              }
            }
          }
        } catch (error) {
          console.error(
            `Failed to load wards for province ${provinceCode}:`,
            error
          );
        }
      }

      setLocationNames((prev) => ({ ...prev, wards: wardNames }));
    }
    loadWards();
  }, [provinces, organizationsData]);

  // Helper để lấy tên tỉnh
  const getProvinceName = (provinceCode: number): string => {
    if (!provinceCode || provinceCode <= 0) return "";
    return locationNames.provinces[provinceCode] || `Tỉnh #${provinceCode}`;
  };

  // Helper để lấy tên phường/xã
  const getWardName = (wardCode: number): string => {
    if (!wardCode || wardCode <= 0) return "";
    return locationNames.wards[wardCode] || "";
  };

  // Helper để tạo địa chỉ đầy đủ
  const getFullAddress = (organization: OrganizationItem): string => {
    const parts = [];
    if (organization.streetAddress) parts.push(organization.streetAddress);

    const wardName = getWardName(organization.wardCode);
    if (wardName) parts.push(wardName);

    const provinceName = getProvinceName(organization.provinceCode);
    if (provinceName) parts.push(provinceName);

    return parts.length > 0 ? parts.join(", ") : "Chưa có địa chỉ";
  };

  // Lọc cơ sở theo tìm kiếm và tỉnh/thành phố
  const filteredOrganizations = organizations.filter((organization) => {
    const provinceName = getProvinceName(organization.provinceCode);
    const fullAddress = getFullAddress(organization);
    const normalizedQuery = removeVietnameseTones(searchQuery);
    const matchesSearch =
      removeVietnameseTones(organization.name).includes(normalizedQuery) ||
      removeVietnameseTones(fullAddress).includes(normalizedQuery) ||
      removeVietnameseTones(provinceName).includes(normalizedQuery);
    const matchesProvince =
      filterProvince === "all" || organization.provinceCode === filterProvince;
    return matchesSearch && matchesProvince;
  });

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems,
    paddedItems,
    setCurrentPage,
  } = usePagination(filteredOrganizations, ITEMS_PER_PAGE);

  // Xử lý khi chọn tỉnh trong modal
  const handleProvinceChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceCode = e.target.value;
    setSelectedModalProvince(provinceCode ? Number(provinceCode) : "");
    setModalWards([]);

    if (provinceCode) {
      setLoadingWards(true);
      try {
        const provinceDetail = await fetchProvinceById(Number(provinceCode));
        if (provinceDetail && provinceDetail.communes) {
          setModalWards(provinceDetail.communes);
        }
      } catch (error) {
        console.error("Failed to load wards for modal:", error);
      } finally {
        setLoadingWards(false);
      }
    }
  };

  // Mở trang chi tiết
  const openDetailPage = (organization: OrganizationItem) => {
    router.push(`/organizations-management/${organization.id}`);
  };

  // Mở trang chi tiết ở chế độ sửa
  const openEditPage = (
    organization: OrganizationItem,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    router.push(`/organizations-management/${organization.id}`);
  };

  // Mở modal xác nhận xóa
  const openDeleteModal = (
    organization: OrganizationItem,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setOrganizationToDelete(organization);
    setIsDeleteModalOpen(true);
  };

  // Xử lý xóa
  const handleDelete = () => {
    if (organizationToDelete) {
      deleteMutation.mutate(organizationToDelete.id, {
        onSuccess: () => {
          message.success("Đã xóa tổ chức thành công");
          setIsDeleteModalOpen(false);
          setOrganizationToDelete(null);
        },
        onError: (error: any) => {
          message.error(error.message || "Xóa thất bại");
        },
      });
    }
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Thu thập dữ liệu từ form
    const newData = {
      name: formData.get("name") as string,
      streetAddress: formData.get("streetAddress") as string,
      provinceCode: Number(selectedModalProvince),
      wardCode: Number(formData.get("wardCode")),
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      status: "active", // Mặc định
      studentCount: 0,
      teacherCount: 0,
      managerIds: [], // Cần logic chọn manager
    };

    createMutation.mutate(newData as any, {
      onSuccess: () => {
        message.success("Thêm tổ chức mới thành công");
        setIsModalOpen(false);
      },
      onError: (error: any) => {
        message.error(error.message || "Thêm mới thất bại");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
        <p>Không thể tải dữ liệu tổ chức.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Building className="w-8 h-8 text-primary-600" />
            Quản lý tổ chức giáo dục
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý các tổ chức đào tạo trong hệ thống ({organizations.length}{" "}
            tổ chức)
          </p>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedModalProvince("");
            setModalWards([]);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} /> Thêm tổ chức mới
        </button>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Tổng tổ chức</p>
          <p className="text-2xl font-bold text-gray-900">
            {organizations.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Đang hoạt động</p>
          <p className="text-2xl font-bold text-green-600">
            {organizations.filter((f) => f.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Tổng học sinh</p>
          <p className="text-2xl font-bold text-primary-600">
            {organizations.reduce((sum, f) => sum + (f.studentCount || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Tổng giáo viên</p>
          <p className="text-2xl font-bold text-amber-600">
            {organizations.reduce((sum, f) => sum + (f.teacherCount || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Số tỉnh/TP</p>
          <p className="text-2xl font-bold text-purple-600">
            {new Set(organizations.map((f) => f.provinceCode)).size}
          </p>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, địa chỉ hoặc tỉnh/thành phố..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Map size={20} className="text-gray-400" />
            <select
              value={filterProvince}
              onChange={(e) =>
                setFilterProvince(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white min-w-[180px]"
              disabled={loadingProvinces}
            >
              <option value="all">Tất cả tỉnh/TP</option>
              {getUniqueProvinceCodes().map((code) => (
                <option key={code} value={code}>
                  {getProvinceName(code)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Danh sách tổ chức */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paddedItems.map((organization, index) => {
          if (!organization)
            return (
              <div
                key={`empty-${index}`}
                className="h-[350px]"
                aria-hidden="true"
              />
            );

          const statusInfo =
            organizationStatusConfig[organization.status] ||
            organizationStatusConfig.inactive;
          const fullAddress = getFullAddress(organization);
          const provinceName = getProvinceName(organization.provinceCode);

          return (
            <div
              key={organization.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openDetailPage(organization)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {organization.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                      <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {provinceName}
                      </span>
                    </div>
                  </div>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin
                      size={18}
                      className="text-gray-400 flex-shrink-0 mt-0.5"
                    />
                    <p>{fullAddress}</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} className="text-gray-400" />
                    <span>{organization.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-gray-400" />
                    <span>{organization.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-primary-500" />
                    <span className="text-sm">
                      <span className="font-semibold text-gray-900">
                        {organization.studentCount}
                      </span>
                      <span className="text-gray-500"> học sinh</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-green-500" />
                    <span className="text-sm">
                      <span className="font-semibold text-gray-900">
                        {organization.teacherCount}
                      </span>
                      <span className="text-gray-500"> giáo viên</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-blue-500" />
                    <div>
                      <span className="text-sm text-gray-500">Quản lý: </span>
                      <span className="text-sm font-medium text-gray-900">
                        {organization.managers &&
                        organization.managers.length > 0
                          ? organization.managers.map((m) => m.name).join(", ")
                          : "Chưa có quản lý"}
                      </span>
                    </div>
                  </div>
                  {organization.openingHours && (
                    <span className="text-xs text-gray-400">
                      🕐 {organization.openingHours}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  onClick={(e) => openEditPage(organization, e)}
                >
                  <Edit size={16} />
                  Chỉnh sửa
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  onClick={(e) => openDeleteModal(organization, e)}
                >
                  <Trash2 size={16} />
                  Xóa
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrganizations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy tổ chức
          </h3>
          <p className="text-gray-500">
            Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={organizations.length}
            filteredItems={filteredOrganizations.length}
            itemName="tổ chức"
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Modal thêm tổ chức mới */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thêm tổ chức mới"
      >
        <form className="space-y-4" onSubmit={handleCreate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Tên tổ chức <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên tổ chức"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Địa chỉ chi tiết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                placeholder="Số nhà, tên đường..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Tỉnh / Thành phố <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedModalProvince}
                onChange={handleProvinceChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                required
              >
                <option value="">Chọn tỉnh/TP</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Phường / Xã <span className="text-red-500">*</span>
              </label>
              <select
                name="wardCode"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                required
                disabled={!selectedModalProvince || loadingWards}
              >
                <option value="">
                  {loadingWards ? "Đang tải..." : "Chọn phường/xã"}
                </option>
                {modalWards.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="024..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="organization@vietsign.edu.vn"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
            </div>
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
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Đang lưu..." : "Lưu tổ chức"}
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
        message={`Bạn có chắc chắn muốn xóa tổ chức "${organizationToDelete?.name}" ư? Hành động này không thể hoàn tác.`}
        confirmText={deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
