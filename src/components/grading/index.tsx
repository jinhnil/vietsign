"use client";

import { PenLine, Filter, CheckCircle, Clock, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";
import { mockSubmissions, submissionStatusConfig } from "@/src/data";


export function GradingManagement() {
  const [filterStatus, setFilterStatus] = useState("all");
  const filteredSubmissions = mockSubmissions.filter(sub => filterStatus === "all" || sub.status === filterStatus);
  const pendingCount = mockSubmissions.filter(s => s.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <PenLine className="w-8 h-8 text-primary-600" />
            Chấm điểm
            {pendingCount > 0 && <span className="px-2.5 py-0.5 text-sm font-medium bg-amber-500 text-white rounded-full">{pendingCount}</span>}
          </h1>
          <p className="text-gray-600 mt-1">Chấm điểm bài làm của học sinh</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center"><Clock className="w-6 h-6 text-amber-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{pendingCount}</p><p className="text-sm text-gray-500">Chờ chấm điểm</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><CheckCircle className="w-6 h-6 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-900">{mockSubmissions.filter(s => s.status === "graded").length}</p><p className="text-sm text-gray-500">Đã chấm</p></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-gray-400" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none bg-white">
            <option value="all">Tất cả</option>
            <option value="pending">Chờ chấm</option>
            <option value="graded">Đã chấm</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSubmissions.map((sub) => (
          <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">{sub.student.charAt(0)}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{sub.student}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${submissionStatusConfig[sub.status].color}`}>{submissionStatusConfig[sub.status].label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5"><FileText size={16} className="text-gray-400" />{sub.exam}</div>
                    <div className="flex items-center gap-1.5"><Clock size={16} className="text-gray-400" />{sub.submittedAt}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {sub.score !== null && <div className="text-center"><p className="text-2xl font-bold text-primary-600">{sub.score}</p><p className="text-xs text-gray-500">Điểm</p></div>}
                <button className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100">
                  {sub.status === "pending" ? "Chấm điểm" : "Xem chi tiết"} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
