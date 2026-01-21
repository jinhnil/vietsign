"use client";

import {
  ClipboardCheck,
  Plus,
  Calendar,
  Clock,
  Users,
  FileText,
  ChevronRight,
  Filter,
  BookOpen,
  Edit,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  mockExams,
  examStatusConfig,
  ExamItem,
  mockQuestions,
  mockQuestionSets,
  QuestionItem,
  QuestionSetItem,
} from "@/data";
import { fetchAllExams } from "@/services/examService";
import { fetchAllClasses } from "@/services/classService";
import { Pagination, usePagination } from "@/shared/components/common/Pagination";
import { Modal } from "@/shared/components/common/Modal";
import { ConfirmModal } from "@/shared/components/common/ConfirmModal";

const ITEMS_PER_PAGE = 8;

export function ExamsManagement() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State quản lý dữ liệu
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [classesMap, setClassesMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [examsData, classesData] = await Promise.all([
          fetchAllExams(),
          fetchAllClasses(),
        ]);

        setExams(examsData);

        // Create map for classes
        const map: Record<number, string> = {};
        classesData.forEach((c) => {
          map[c.id] = c.name;
        });
        setClassesMap(map);
      } catch (error) {
        console.error("Failed to load data", error);
        setExams(mockExams);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // State cho modal xác nhận xóa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<ExamItem | null>(null);

  // Helper function để lấy tên lớp từ classId
  const getClassName = (classId: number): string => {
    return classesMap[classId] || "Không xác định";
  };

  const filteredExams = exams.filter(
    (exam) => filterStatus === "all" || exam.status === filterStatus
  );
  const {
    currentPage,
    totalPages,
    paginatedItems,
    paddedItems,
    setCurrentPage,
  } = usePagination(filteredExams, ITEMS_PER_PAGE);

  // Mở trang chi tiết
  const openDetailPage = (exam: ExamItem) => {
    router.push(`/exams/${exam.id}`);
  };

  // Mở trang chi tiết ở chế độ sửa
  const openEditPage = (exam: ExamItem, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/exams/${exam.id}`);
  };

  // Mở modal xác nhận xóa
  const openDeleteModal = (exam: ExamItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setExamToDelete(exam);
    setIsDeleteModalOpen(true);
  };

  // Xử lý xóa
  const handleDelete = () => {
    if (examToDelete) {
      setExams((prev) => prev.filter((e) => e.id !== examToDelete.id));
      setIsDeleteModalOpen(false);
      setExamToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-primary-600" />
            Quản lý kiểm tra
          </h1>
          <p className="text-gray-600 mt-1">
            Tạo và quản lý các bài kiểm tra ({exams.length} bài)
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium shadow-sm"
        >
          <Plus size={20} /> Tạo bài kiểm tra
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white"
          >
            <option value="all">Tất cả</option>
            <option value="upcoming">Sắp diễn ra</option>
            <option value="ongoing">Đang diễn ra</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {paddedItems.map((exam, index) => {
          if (!exam)
            return (
              <div
                key={`empty-${index}`}
                className="h-[130px]"
                aria-hidden="true"
              />
            );

          const className = getClassName(exam.classId);

          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openDetailPage(exam)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {exam.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          examStatusConfig[exam?.status]?.color || "bg-gray-100"
                        }`}
                      >
                        {examStatusConfig[exam?.status]?.label ||
                          examStatusConfig["upcoming"].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <BookOpen size={14} className="text-gray-400" />
                      <span>{className}</span>
                      {exam.type && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                            {exam.type}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-gray-400" />
                        {exam.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-gray-400" />
                        {exam.time} - {exam.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-gray-400" />
                        {exam.students} học sinh
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText size={16} className="text-gray-400" />
                        {exam.questions} câu hỏi
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={(e) => openEditPage(exam, e)}
                    title="Chỉnh sửa"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={(e) => openDeleteModal(exam, e)}
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={exams.length}
            filteredItems={filteredExams.length}
            itemName="bài kiểm tra"
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <ClipboardCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy bài kiểm tra
          </h3>
          <p className="text-gray-500">Thử thay đổi bộ lọc trạng thái</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tạo bài kiểm tra mới"
      >
        <CreateExamForm onClose={() => setIsModalOpen(false)} />
      </Modal>

      {/* Modal xác nhận xóa */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa bài kiểm tra "${examToDelete?.title}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
  function CreateExamForm({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
      title: "",
      classId: "",
      type: "Định kỳ",
      date: "",
      time: "",
      duration: "",
      description: "",
      contentType: "sets" as "sets" | "questions",
      selectedIds: [] as number[],
    });

    // Calculate exam type (practice/multiple_choice) based on "type" label
    const examType =
      formData.type === "Thực hành" ? "practice" : "multiple_choice";

    // Filter available content
    const availableContent =
      formData.contentType === "sets"
        ? mockQuestionSets.filter((s) => s.type === examType)
        : mockQuestions.filter((q) => q.type === examType);

    const handleToggleSelect = (id: number) => {
      setFormData((prev) => {
        const isSelected = prev.selectedIds.includes(id);
        return {
          ...prev,
          selectedIds: isSelected
            ? prev.selectedIds.filter((itemId) => itemId !== id)
            : [...prev.selectedIds, id],
        };
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Submitting new exam:", {
        ...formData,
        examType,
        // In real app, we would calculate question count here
        questions:
          formData.contentType === "questions"
            ? formData.selectedIds.length
            : "Tự động tính từ bộ câu hỏi",
      });
      onClose();
    };

    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Tên bài kiểm tra
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ví dụ: Kiểm tra cuối kỳ"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Lớp học
            </label>
            <select
              value={formData.classId}
              onChange={(e) =>
                setFormData({ ...formData, classId: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
              required
            >
              <option value="">Chọn lớp học</option>
              <option value="1">Lớp V001 (Cơ bản)</option>
              <option value="2">Lớp V002 (Nâng cao)</option>
              <option value="3">Lớp C1 (Đầu vào)</option>
              <option value="5">Lớp K1 (Trẻ em)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Loại bài thi
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                  selectedIds: [],
                })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white"
              required
            >
              <option value="Định kỳ">Định kỳ (Trắc nghiệm)</option>
              <option value="Giữa kỳ">Giữa kỳ (Trắc nghiệm)</option>
              <option value="Cuối kỳ">Cuối kỳ (Trắc nghiệm)</option>
              <option value="Thực hành">Thực hành</option>
              <option value="Nhanh">Kiểm tra nhanh (Trắc nghiệm)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Ngày thi
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Giờ thi
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
              <input
                type="number"
                placeholder="Phút"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-24 px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Nhập mô tả..."
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
            ></textarea>
          </div>

          {/* Content Selection */}
          <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-gray-900">
                Nội dung bài thi ({formData.selectedIds.length} đã chọn)
              </label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      contentType: "sets",
                      selectedIds: [],
                    })
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    formData.contentType === "sets"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Bộ câu hỏi
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      contentType: "questions",
                      selectedIds: [],
                    })
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    formData.contentType === "questions"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Câu hỏi lẻ
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden h-64 flex flex-col">
              <div className="overflow-y-auto p-2 space-y-2 flex-1">
                {availableContent.length > 0 ? (
                  availableContent.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleSelect(item.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.selectedIds.includes(item.id)
                          ? "bg-primary-50 border-primary-200"
                          : "bg-white border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                          formData.selectedIds.includes(item.id)
                            ? "bg-primary-600 border-primary-600"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {formData.selectedIds.includes(item.id) && (
                          <ClipboardCheck size={12} className="text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {formData.contentType === "sets"
                            ? item.name
                            : item.content}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {item.description || item.category}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                    <p className="text-sm">
                      Không tìm thấy nội dung phù hợp với loại bài thi này.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-sm"
          >
            Tạo bài thi
          </button>
        </div>
      </form>
    );
  }
}
