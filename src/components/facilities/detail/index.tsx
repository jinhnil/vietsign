"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Trash2, Save, X, MapPin, Phone, Mail, Users, User, Clock, Calendar, Building, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { OrganizationItem, facilityStatusConfig } from "@/src/data";
import { getUserById } from "@/src/data/usersData";
import { fetchProvinces, fetchProvinceById } from "@/src/services/vietnamLocationsApi";
import { ConfirmModal } from "@/src/components/common/ConfirmModal";
import { useOrganization, useUpdateOrganization, useDeleteOrganization } from "@/src/hooks/useOrganizations";
import { message } from "antd";

export function FacilityManagementDetail() {
  const params = useParams();
  const router = useRouter();
  
  const id = Number(params.id);
  
  // API Hooks
  const { data: facility, isLoading, isError } = useOrganization(id);
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<OrganizationItem>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [provinceName, setProvinceName] = useState<string>("");
  const [wardName, setWardName] = useState<string>("");

  useEffect(() => {
    if (facility) {
      setEditForm({ ...facility });
      loadLocationNames(facility.provinceCode, facility.wardCode);
    }
  }, [facility]);

  const loadLocationNames = async (provinceCode: number, wardCode: number) => {
    try {
      if (!provinceCode || provinceCode <= 0) return;
      
      const provinces = await fetchProvinces();
      const province = provinces.find(p => parseInt(p.id) === provinceCode);
      if (province) {
        setProvinceName(province.name);
        
        if (!wardCode || wardCode <= 0) return;
        const provinceDetail = await fetchProvinceById(provinceCode);
        if (provinceDetail?.communes) {
          const ward = provinceDetail.communes.find(c => parseInt(c.id) === wardCode);
          if (ward) setWardName(ward.name);
        }
      }
    } catch (error) {
      console.error('Failed to load location names:', error);
    }
  };

  const handleSave = () => {
    if (facility && editForm) {
      updateMutation.mutate({ id: facility.id, data: editForm }, {
        onSuccess: () => {
          message.success("Cập nhật thành công");
          setIsEditing(false);
        },
        onError: (error: any) => {
          message.error(error.message || "Cập nhật thất bại");
        }
      });
    }
  };

  const handleDelete = () => {
    if (facility) {
      deleteMutation.mutate(facility.id, {
        onSuccess: () => {
            message.success("Xóa thành công");
            router.push("/facilities");
        },
        onError: (error: any) => {
            message.error(error.message || "Xóa thất bại");
        }
      });
    }
  };

  const getFullAddress = () => {
    if (!facility) return "";
    const parts = [];
    if (facility.streetAddress) parts.push(facility.streetAddress);
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

  // Handle case where facility is null or undefined after loading
  const currentFacility = facility;

  if (isError || !currentFacility) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy cơ sở</h2>
        <button 
          onClick={() => router.push("/facilities")}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const statusInfo = facilityStatusConfig[currentFacility.status] || facilityStatusConfig.inactive;
  const manager = getUserById(currentFacility.managerId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <button 
          onClick={() => router.push("/facilities")}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all font-medium border border-transparent hover:border-gray-200 hover:shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Building size={32} className="text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{currentFacility.name}</h1>
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
                <p className="text-3xl font-bold">{currentFacility.studentCount}</p>
                <p className="text-xs text-white/80">Học sinh</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{currentFacility.teacherCount}</p>
                <p className="text-xs text-white/80">Giáo viên</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Tên cơ sở</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.name || ""} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all text-lg font-medium" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 text-lg font-bold">{currentFacility.name}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Địa chỉ</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.streetAddress || ""} 
                  onChange={(e) => setEditForm({ ...editForm, streetAddress: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                  {getFullAddress()}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
              {isEditing ? (
                <input 
                  type="tel" 
                  value={editForm.phone || ""} 
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Phone size={18} className="text-gray-400" />
                  {currentFacility.phone}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              {isEditing ? (
                <input 
                  type="email" 
                  value={editForm.email || ""} 
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Mail size={18} className="text-gray-400" />
                  {currentFacility.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Quản lý</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                <User size={18} className="text-gray-400" />
                {manager?.name || 'Chưa có quản lý'}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Trạng thái</label>
              {isEditing ? (
                <select 
                  value={editForm.status || ""} 
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as OrganizationItem['status'] })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Tạm ngưng</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Giờ mở cửa</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editForm.openingHours || ""} 
                  onChange={(e) => setEditForm({ ...editForm, openingHours: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" />
                  {currentFacility.openingHours || "Chưa cập nhật"}
                </p>
              )}
            </div>

            {currentFacility.createdAt && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ngày tạo</label>
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center gap-2">
                  <Calendar size={18} className="text-gray-400" />
                  {currentFacility.createdAt}
                </p>
              </div>
            )}

            {(currentFacility.description || isEditing) && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Mô tả</label>
                {isEditing ? (
                  <textarea 
                    value={editForm.description || ""} 
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none" 
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{currentFacility.description}</p>
                )}
              </div>
            )}

            <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="bg-primary-50 rounded-xl p-4 text-center">
                <Users size={24} className="text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary-600">{currentFacility.studentCount}</p>
                <p className="text-sm text-gray-500">Học sinh</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <Users size={24} className="text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{currentFacility.teacherCount}</p>
                <p className="text-sm text-gray-500">Giáo viên</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({ ...currentFacility });
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
                {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa cơ sở "${currentFacility.name}"? Hành động này không thể hoàn tác.`}
        confirmText={deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}
