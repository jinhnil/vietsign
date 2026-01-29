# Cấu trúc API Backend & Phân tích thiếu hụt (Gap Analysis)

## Tổng quan

Tài liệu này phác thảo cấu trúc API hiện tại của dự án `Vietsignschool_BE` và xác định các API còn thiếu mà ứng dụng Frontend yêu cầu.

## 1. Các API Backend Hiện Có

Backend được xây dựng với Node.js/Express và được tổ chức thành các route chính (core routes) và các route theo tính năng (Teaching Management).

### Core Routes (Route cốt lõi)

#### Xác thực (`/auth`)

- `POST /auth/login`: Đăng nhập người dùng
- `POST /auth/register`: Đăng ký người dùng

#### Quản lý Người dùng (`/users`)

- **Hồ sơ cá nhân**
  - `GET /users/profile`: Lấy hồ sơ người dùng hiện tại
  - `PUT /users/profile`: Cập nhật hồ sơ người dùng hiện tại
- **Giáo viên**
  - `GET /users/teachers`: Danh sách giáo viên
  - `POST /users/teachers`: Tạo giáo viên mới
  - `GET /users/teachers/:id`: Lấy chi tiết giáo viên
  - `PUT /users/teachers/:id`: Cập nhật giáo viên
  - `DELETE /users/teachers/:id`: Xóa giáo viên
- **Học sinh**
  - `GET /users/students`: Danh sách học sinh
  - `POST /users/students`: Tạo học sinh mới
  - `GET /users/students/:id`: Lấy chi tiết học sinh
  - `PUT /users/students/:id`: Cập nhật học sinh
  - `DELETE /users/students/:id`: Xóa học sinh
- **Theo dõi học tập (Student Tracking)**
  - `POST /users/students/tracking/view-lesson`: Ghi nhận đã xem bài học
  - `POST /users/students/tracking/view-vocabulary`: Ghi nhận đã xem từ vựng
  - `GET /users/students/progress/learning`: Lấy tiến độ học tập

#### Quản lý Tổ chức/Cơ sở (`/organizations`)

- `GET /organizations`: Danh sách tổ chức
- `GET /organizations/:id`: Lấy chi tiết tổ chức
- `POST /organizations`: Tạo tổ chức mới
- `PUT /organizations/:id`: Cập nhật tổ chức
- `DELETE /organizations/:id`: Xóa tổ chức

#### Quản lý Cơ sở (`/organization-managers`)

- `POST /organization-managers`: Gán quản lý cho tổ chức
- `DELETE /organization-managers`: Gỡ bỏ vai trò quản lý

### Quản lý Giảng dạy (`/teaching-management`)

#### Lớp học (`/teaching-management/classrooms`)

- `POST /`: Tạo lớp học
- `GET /`: Lấy tất cả lớp học
- `GET /:classroomId`: Lấy chi tiết lớp học
- `PUT /:classroomId`: Cập nhật lớp học
- `DELETE /:classroomId`: Xóa lớp học
- `POST /:classroomId/students`: Thêm học sinh vào lớp
- `GET /:classroomId/students`: Lấy danh sách học sinh trong lớp
- `DELETE /:classroomId/students`: Xóa học sinh khỏi lớp

#### Tiến độ (`/teaching-management/progress`)

- `GET /my-progress`: Lấy tiến độ của người dùng hiện tại
- `GET /classroom/:classroomId/summary`: Tóm tắt tiến độ lớp học
- `GET /student/:studentId`: Tiến độ của học sinh cụ thể
- `GET /student/:studentId/exams`: Lịch sử làm bài kiểm tra
- `GET /student/:studentId/lessons`: Tiến độ bài học
- `GET /student/:studentId/vocabularies`: Tiến độ từ vựng
- `GET /student/:studentId/trends`: Xu hướng học tập

#### Bài kiểm tra (`/teaching-management/exams`)

- `POST /`: Tạo bài kiểm tra
- `GET /`: Lấy tất cả bài kiểm tra
- `GET /statistics`: Thống kê bài kiểm tra
- `GET /classroom/:classroom_id`: Bài kiểm tra theo lớp học
- `POST /:exam_id/submit`: Nộp bài kiểm tra
- `GET /:exam_id/results`: Lấy kết quả bài kiểm tra
- `GET /:exam_id`: Lấy chi tiết bài kiểm tra

#### Các module giảng dạy khác (Suy luận)

- **Bài học** (`/teaching-management/lessons`)
- **Từ vựng** (`/teaching-management/vocabularies`)
- **Chủ đề** (`/teaching-management/topics`)
- **Câu hỏi** (`/teaching-management/questions`)

---

## 2. Các API Còn Thiếu (Yêu cầu từ Frontend)

Dựa trên cấu trúc dữ liệu và tính năng của Frontend, các API sau đây có vẻ còn thiếu hoặc chưa đầy đủ trong Backend:

### 1. Hệ thống Trò chơi (`src/features/games`, `src/data/gamesData.ts`)

Frontend có phần Trò chơi riêng với các cấp độ và tính điểm.
**Các Endpoint còn thiếu:**

- `GET /games`: Lấy danh sách trò chơi
- `GET /games/:id`: Lấy chi tiết và cấu hình trò chơi
- `GET /games/:id/levels`: Lấy danh sách cấp độ (levels) cho trò chơi
- `POST /games/:id/play`: Bắt đầu phiên chơi (tùy chọn)
- `POST /games/:id/score`: Gửi điểm/kết quả chơi game
- `GET /games/leaderboard`: Lấy bảng xếp hạng (toàn cầu hoặc theo game)

### 2. Tự học / Khóa học công khai (`src/features/learn`, `src/data/selfLearnData.ts`)

FE phân biệt giữa `Học tập` (Study - theo lớp học có quản lý) và `Tự học` (Learn - công khai, tự do). BE `teaching-management` hiện tại có vẻ tập trung vào các lớp học được quản lý.
**Các Endpoint còn thiếu:**

- `GET /courses/public`: Danh sách khóa học tự học công khai
- `GET /courses/public/:id`: Lấy chi tiết khóa học công khai
- `POST /courses/public/:id/enroll`: Đăng ký tham gia khóa học công khai
- `GET /courses/public/:id/progress`: Lấy tiến độ cho khóa học tự học cụ thể

### 3. Mỗi ngày một ký hiệu (`src/features/daily-signs`, `src/data/dailySignsData.ts`)

Tính năng hiển thị một ký hiệu mới mỗi ngày.
**Các Endpoint còn thiếu:**

- `GET /daily-signs/today`: Lấy ký hiệu của ngày hôm nay
- `GET /daily-signs/history`: Lấy lịch sử các ký hiệu trước đó
- `POST /daily-signs/check-in`: Đánh dấu đã học ký hiệu ngày (để tính chuỗi streak)

### 4. Thông báo (`src/features/notifications`, `src/data/notificationsData.ts`)

Hệ thống cảnh báo và cập nhật cho người dùng.
**Các Endpoint còn thiếu:**

- `GET /notifications`: Lấy thông báo của người dùng
- `PUT /notifications/:id/read`: Đánh dấu thông báo đã đọc
- `PUT /notifications/read-all`: Đánh dấu tất cả đã đọc

### 5. Từ điển (Nâng cao) (`src/features/dictionary`)

Mặc dù `vocabularies` đã tồn tại trong `teaching-management`, từ điển công khai có thể cần tìm kiếm tối ưu hơn.
**Nhu cầu tiềm năng:**

- `GET /dictionary/search?q=`: Tìm kiếm từ điển công khai (có thể sử dụng endpoint `vocabularies` nhưng cần cho phép truy cập public hoặc xác thực tối thiểu).

### 6. Cài đặt hệ thống / Cấu hình

- `GET /settings`: Lấy cài đặt toàn hệ thống (ví dụ: chế độ bảo trì, cờ tính năng - feature flags)

## 3. Khuyến nghị

1.  **Triển khai Game Routes:** Tạo một tính năng `games` mới trong BE để xử lý logic trò chơi và tính điểm.
2.  **Tách biệt Tự học và Lớp học:** Làm rõ xem `teaching-management` có bao gồm các khóa học công khai không hay cần một module `courses` riêng.
3.  **Thêm Thông báo:** Triển khai hệ thống thông báo tiêu chuẩn.
4.  **Nội dung hàng ngày:** Thêm scheduler đơn giản hoặc endpoint cho Daily Signs.
