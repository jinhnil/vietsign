"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  FileQuestion,
  Layers,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  mockQuestions,
  mockQuestionSets,
  questionTypeConfig,
  getVisibleQuestions,
  getVisibleQuestionSets,
  canEditQuestion,
  canEditQuestionSet,
  getQuestionsInSet,
  type QuestionItem,
  type QuestionSetItem,
} from "@/data/questionsData";
import { getUserById } from "@/data/usersData";
import {
  getOrganizationById,
  mockOrganizations,
} from "@/data/organizationsData";
import { gradeLevels, type GradeLevel } from "@/data/classesData";
import {
  Pagination,
  usePagination,
} from "@/shared/components/common/Pagination";
import { Modal } from "@/shared/components/common/Modal";
import { ConfirmModal } from "@/shared/components/common/ConfirmModal";
import { removeVietnameseTones } from "@/shared/utils/text";

const QUESTIONS_PER_PAGE = 10;
const SETS_PER_PAGE = 9;

type ViewMode = "questions" | "sets";

export function QuestionsManagement() {
  const user = useSelector((state: any) => state.admin.user);
  const userId = user?.id ? Number(user.id) : 0;
  const userRole = user?.code || "USER";
  const userOrgId = user?.facilityId ? Number(user.facilityId) : undefined;

  const [viewMode, setViewMode] = useState<ViewMode>("questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterOrganization, setFilterOrganization] = useState<string>("all");
  const [filterGradeLevel, setFilterGradeLevel] = useState<string>("all");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    QuestionItem | QuestionSetItem | null
  >(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Get visible data based on user role
  const visibleQuestions = useMemo(() => {
    return getVisibleQuestions(userId, userRole, userOrgId);
  }, [userId, userRole, userOrgId]);

  const visibleQuestionSets = useMemo(() => {
    return getVisibleQuestionSets(userId, userRole, userOrgId);
  }, [userId, userRole, userOrgId]);

  // Get unique organizations for filter (only for ADMIN/TEST)
  const availableOrganizations = useMemo(() => {
    if (userRole === "ADMIN" || userRole === "TEST") {
      const orgIds = [
        ...new Set(visibleQuestions.map((q) => q.organizationId)),
      ];
      return orgIds
        .map((id) => getOrganizationById(id))
        .filter((org) => org !== undefined);
    }
    return [];
  }, [visibleQuestions, userRole]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return visibleQuestions.filter((q) => {
      const normalizedQuery = removeVietnameseTones(searchQuery);
      const matchesSearch =
        removeVietnameseTones(q.content).includes(normalizedQuery) ||
        (q.category &&
          removeVietnameseTones(q.category).includes(normalizedQuery));
      const matchesType = filterType === "all" || q.type === filterType;
      const matchesOrg =
        filterOrganization === "all" ||
        q.organizationId === Number(filterOrganization);
      const matchesGrade =
        filterGradeLevel === "all" || q.gradeLevel === filterGradeLevel;
      return matchesSearch && matchesType && matchesOrg && matchesGrade;
    });
  }, [
    visibleQuestions,
    searchQuery,
    filterType,
    filterOrganization,
    filterGradeLevel,
  ]);

  // Filter question sets
  const filteredQuestionSets = useMemo(() => {
    return visibleQuestionSets.filter((qs) => {
      const normalizedQuery = removeVietnameseTones(searchQuery);
      const matchesSearch =
        removeVietnameseTones(qs.name).includes(normalizedQuery) ||
        (qs.category &&
          removeVietnameseTones(qs.category).includes(normalizedQuery));
      const matchesType = filterType === "all" || qs.type === filterType;
      const matchesOrg =
        filterOrganization === "all" ||
        qs.organizationId === Number(filterOrganization);
      const matchesGrade =
        filterGradeLevel === "all" || qs.gradeLevel === filterGradeLevel;
      return matchesSearch && matchesType && matchesOrg && matchesGrade;
    });
  }, [
    visibleQuestionSets,
    searchQuery,
    filterType,
    filterOrganization,
    filterGradeLevel,
  ]);

  // Pagination
  const questionsPagination = usePagination(
    filteredQuestions,
    QUESTIONS_PER_PAGE,
  );
  const setsPagination = usePagination(filteredQuestionSets, SETS_PER_PAGE);

  // Stats
  const stats = {
    totalQuestions: visibleQuestions.length,
    totalSets: visibleQuestionSets.length,
    multipleChoice: visibleQuestions.filter((q) => q.type === "multiple_choice")
      .length,
    practice: visibleQuestions.filter((q) => q.type === "practice").length,
  };

  const handleView = (item: QuestionItem | QuestionSetItem) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleDelete = (item: QuestionItem | QuestionSetItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Mock delete - in real app, call API
    console.log("Deleting item:", selectedItem);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const getCreatorName = (creatorId: number): string => {
    const creator = getUserById(creatorId);
    return creator?.name || "Không xác định";
  };

  const getOrganizationName = (orgId: number): string => {
    const org = getOrganizationById(orgId);
    return org?.name || "Không xác định";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary-600" />
            Quản lý câu hỏi
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý câu hỏi và bộ câu hỏi trong hệ thống
            {userRole !== "ADMIN" && userRole !== "TEST" && (
              <span className="text-primary-600 ml-1">(Cơ sở của bạn)</span>
            )}
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Tạo {viewMode === "questions" ? "câu hỏi" : "bộ câu hỏi"} mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <FileQuestion className="w-6 h-6 text-primary-600 " />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalQuestions}
              </p>
              <p className="text-sm text-gray-500">Câu hỏi</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Layers className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalSets}
              </p>
              <p className="text-sm text-gray-500">Bộ câu hỏi</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.multipleChoice}
              </p>
              <p className="text-sm text-gray-500">Trắc nghiệm</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.practice}
              </p>
              <p className="text-sm text-gray-500">Thực hành</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 flex-shrink-0">
              <button
                onClick={() => setViewMode("questions")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === "questions"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FileQuestion size={18} />
                <span className="hidden sm:inline">Câu hỏi</span>
              </button>
              <button
                onClick={() => setViewMode("sets")}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === "sets"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Layers size={18} />
                <span className="hidden sm:inline">Bộ câu hỏi</span>
              </button>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder={`Tìm kiếm ${
                  viewMode === "questions" ? "câu hỏi" : "bộ câu hỏi"
                }...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all h-[42px]"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-[42px] w-[42px] flex items-center justify-center bg-gray-100 rounded-lg text-gray-400">
              <Filter size={20} />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-[42px] px-3 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tất cả loại</option>
              <option value="multiple_choice">Trắc nghiệm</option>
              <option value="practice">Thực hành</option>
            </select>

            {/* Organization filter - only for ADMIN/TEST */}
            {(userRole === "ADMIN" || userRole === "TEST") && (
              <select
                value={filterOrganization}
                onChange={(e) => setFilterOrganization(e.target.value)}
                className="h-[42px] px-3 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Tất cả cơ sở</option>
                {availableOrganizations.map((org) => (
                  <option key={org!.id} value={org!.id}>
                    {org!.name}
                  </option>
                ))}
              </select>
            )}

            {/* Grade Level filter */}
            <select
              value={filterGradeLevel}
              onChange={(e) => setFilterGradeLevel(e.target.value)}
              className="h-[42px] px-3 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tất cả lớp</option>
              {gradeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "questions" ? (
        /* Questions List */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Câu hỏi
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 w-[140px]">
                    Loại
                  </th>

                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 w-[180px]">
                    Người tạo
                  </th>
                  {(userRole === "ADMIN" || userRole === "TEST") && (
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 w-[200px]">
                      Cơ sở
                    </th>
                  )}
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 w-[120px]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {questionsPagination.paginatedItems.map((question) => {
                  const typeInfo = questionTypeConfig[question.type];
                  const canEdit = canEditQuestion(
                    question,
                    userId,
                    userRole,
                    userOrgId,
                  );

                  return (
                    <tr
                      key={question.id}
                      className="hover:bg-gray-50 transition-colors h-16"
                    >
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">
                          {question.content}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${typeInfo.color}`}
                        >
                          {typeInfo.label}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {getCreatorName(question.creatorId)}
                          </span>
                        </div>
                      </td>
                      {(userRole === "ADMIN" || userRole === "TEST") && (
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Building size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {getOrganizationName(question.organizationId)}
                            </span>
                          </div>
                        </td>
                      )}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(question)}
                            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye size={18} />
                          </button>
                          {canEdit && (
                            <>
                              <button
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(question)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* Empty rows placeholder */}
                {Array.from({
                  length: Math.max(
                    0,
                    QUESTIONS_PER_PAGE -
                      questionsPagination.paginatedItems.length,
                  ),
                }).map((_, idx) => (
                  <tr key={`empty-${idx}`} className="h-16 invisible">
                    <td className="py-4 px-6">Placeholder</td>
                    <td className="py-4 px-4">Placeholder</td>

                    <td className="py-4 px-4">Placeholder</td>
                    {(userRole === "ADMIN" || userRole === "TEST") && (
                      <td className="py-4 px-4">Placeholder</td>
                    )}
                    <td className="py-4 px-6">Placeholder</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="p-12 text-center">
              <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy câu hỏi
              </h3>
              <p className="text-gray-500">
                Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
              </p>
            </div>
          ) : (
            <Pagination
              currentPage={questionsPagination.currentPage}
              totalPages={questionsPagination.totalPages}
              itemsPerPage={QUESTIONS_PER_PAGE}
              totalItems={visibleQuestions.length}
              filteredItems={filteredQuestions.length}
              itemName="câu hỏi"
              onPageChange={questionsPagination.setCurrentPage}
            />
          )}
        </div>
      ) : (
        /* Question Sets List - 9 per page in grid with fixed height cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {setsPagination.paginatedItems.map((set) => {
            const canEdit = canEditQuestionSet(
              set,
              userId,
              userRole,
              userOrgId,
            );
            const questionsInSet = getQuestionsInSet(set.id);
            const typeInfo = questionTypeConfig[set.type];

            return (
              <div
                key={set.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-[280px]"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                        {set.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span
                          className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${typeInfo.color}`}
                        >
                          {typeInfo.label}
                        </span>
                        {set.gradeLevel && (
                          <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {set.gradeLevel}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0 ml-3">
                      <span className="text-lg font-bold text-primary-600">
                        {set.questionIds.length}
                      </span>
                    </div>
                  </div>

                  {set.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-shrink-0">
                      {set.description}
                    </p>
                  )}

                  <div className="space-y-1.5 text-sm mt-auto">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">
                        Người tạo: {getCreatorName(set.creatorId)}
                      </span>
                    </div>
                    {(userRole === "ADMIN" || userRole === "TEST") && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building
                          size={14}
                          className="text-gray-400 flex-shrink-0"
                        />
                        <span className="truncate">
                          {getOrganizationName(set.organizationId)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500">
                    {questionsInSet.length} câu hỏi
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(set)}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                    {canEdit && (
                      <>
                        <button
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(set)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {/* Empty cards placeholder */}
          {Array.from({
            length: Math.max(
              0,
              SETS_PER_PAGE - setsPagination.paginatedItems.length,
            ),
          }).map((_, idx) => (
            <div
              key={`empty-set-${idx}`}
              className="bg-transparent border border-transparent h-[280px] invisible"
            >
              {/* Placeholder content to maintain flow if needed, but invisible handles visibility */}
            </div>
          ))}
        </div>
      )}

      {/* Sets Pagination */}
      {viewMode === "sets" && filteredQuestionSets.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <Pagination
            currentPage={setsPagination.currentPage}
            totalPages={setsPagination.totalPages}
            itemsPerPage={SETS_PER_PAGE}
            totalItems={visibleQuestionSets.length}
            filteredItems={filteredQuestionSets.length}
            itemName="bộ câu hỏi"
            onPageChange={setsPagination.setCurrentPage}
          />
        </div>
      )}

      {viewMode === "sets" && filteredQuestionSets.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy bộ câu hỏi
          </h3>
          <p className="text-gray-500">
            Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
          </p>
        </div>
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedItem(null);
        }}
        title={
          selectedItem
            ? "questionIds" in selectedItem
              ? `Bộ câu hỏi: ${selectedItem.name}`
              : `Câu hỏi #${selectedItem.id}`
            : "Chi tiết"
        }
      >
        {selectedItem && (
          <div className="space-y-4">
            {"questionIds" in selectedItem ? (
              // Question Set View
              <div>
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Số câu hỏi:</span>
                    <span className="ml-2 font-medium">
                      {selectedItem.questionIds.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Lớp:</span>
                    <span className="ml-2 font-medium">
                      {selectedItem.gradeLevel || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Người tạo:</span>
                    <span className="ml-2 font-medium">
                      {getCreatorName(selectedItem.creatorId)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cơ sở:</span>
                    <span className="ml-2 font-medium">
                      {getOrganizationName(selectedItem.organizationId)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Danh sách câu hỏi:
                  </h4>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {getQuestionsInSet(selectedItem.id).map((q, idx) => (
                      <div
                        key={q.id}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-xs text-gray-400">
                          {idx + 1}.
                        </span>
                        <span className="text-sm text-gray-700 line-clamp-1">
                          {q.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Question View
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      questionTypeConfig[selectedItem.type].color
                    }`}
                  >
                    {questionTypeConfig[selectedItem.type].label}
                  </span>
                  {selectedItem.gradeLevel && (
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {selectedItem.gradeLevel}
                    </span>
                  )}
                </div>
                <p className="text-gray-900 font-medium mb-2">
                  {selectedItem.content}
                </p>
                {selectedItem.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {selectedItem.description}
                  </p>
                )}

                {selectedItem.type === "multiple_choice" &&
                  selectedItem.answers && (
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-gray-700">Đáp án:</h4>
                      {selectedItem.answers.map((ans) => (
                        <div
                          key={ans.id}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            ans.isCorrect
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50"
                          }`}
                        >
                          <span className="font-medium">
                            {ans.id.toUpperCase()}.
                          </span>
                          <span>{ans.content}</span>
                          {ans.isCorrect && (
                            <CheckCircle2
                              size={16}
                              className="text-green-600 ml-auto"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                {selectedItem.type === "practice" && (
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-gray-700">
                      Hướng dẫn thực hành:
                    </h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {selectedItem.practiceInstructions}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-gray-500">Người tạo:</span>
                    <span className="ml-2 font-medium">
                      {getCreatorName(selectedItem.creatorId)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cơ sở:</span>
                    <span className="ml-2 font-medium">
                      {getOrganizationName(selectedItem.organizationId)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa ${
          selectedItem && "questionIds" in selectedItem
            ? "bộ câu hỏi"
            : "câu hỏi"
        } này? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />

      {/* Create Modal - Placeholder */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={`Tạo ${viewMode === "questions" ? "câu hỏi" : "bộ câu hỏi"} mới`}
      >
        <div className="text-center py-8">
          <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            Chức năng tạo mới đang được phát triển
          </p>
        </div>
      </Modal>
    </div>
  );
}
