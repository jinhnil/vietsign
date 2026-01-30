# So sánh API: Frontend vs Backend

Tài liệu này phác thảo những điểm giống và khác nhau giữa các endpoint API và cấu trúc dữ liệu được sử dụng trong Frontend (Vietsign) và các định nghĩa trong Backend (Vietsignschool_BE).

## 1. Xác thực & Người dùng

### Endpoint

| Hành động       | Đường dẫn Frontend (Suy luận) | Đường dẫn Backend (Swagger)           | Trạng thái    | Ghi chú                                                          |
| --------------- | ----------------------------- | ------------------------------------- | ------------- | ---------------------------------------------------------------- |
| Đăng nhập       | `/auth/login`                 | `/auth/login`                         | ✅ Khớp       |                                                                  |
| Đăng ký         | `/auth/register`              | `/auth/register`                      | ✅ Khớp       |                                                                  |
| Lấy hồ sơ       | `/users/profile`              | `/users/profile`                      | ✅ Khớp       |                                                                  |
| Cập nhật hồ sơ  | `/users/profile`              | `/users/profile`                      | ✅ Khớp       |                                                                  |
| Lấy GV          | `/users/teachers`             | `/users/teachers`                     | ✅ Khớp       |                                                                  |
| Lấy HS          | `/users/students`             | `/users/students`                     | ✅ Khớp       |                                                                  |
| Lấy tất cả User | `/users`                      | _Không được ghi rõ trong lần xem đầu_ | ⚠️ Một phần   | FE gọi root `/users`. BE docs hiển thị các đường dẫn con cụ thể. |
| User chờ duyệt  | `/users/pending`              | _Không tìm thấy trong docs_           | ❌ Không khớp | FE mong đợi endpoint người dùng chờ duyệt.                       |

### Trường dữ liệu (Đối tượng User)

| Trường       | Mong đợi từ Frontend           | Phản hồi Backend (Doc) | Ghi chú                                                    |
| ------------ | ------------------------------ | ---------------------- | ---------------------------------------------------------- |
| ID           | `id`                           | `id` hoặc `user_id`    | BE dùng `user_id` trong một số phản hồi, `id` trong hồ sơ. |
| Vai trò      | `role` (map từ `code`)         | `code`                 | FE map `code` (ví dụ: 'TEACHER') sang `role`.              |
| Ảnh đại diện | `avatar`                       | `avatar_location`      | FE mong đợi `avatar_url` hoặc `avatar`.                    |
| Cơ sở        | `facilityId`                   | `school_id`            | Không khớp quy tắc đặt tên.                                |
| Trạng thái   | `status` ('active'/'inactive') | `is_deleted`           | FE map boolean `is_deleted` sang chuỗi trạng thái.         |

## 2. Lớp học (Classes/Classrooms)

### Endpoint

| Hành động  | Đường dẫn Frontend    | Đường dẫn Backend | Trạng thái    | Ghi chú                                                       |
| ---------- | --------------------- | ----------------- | ------------- | ------------------------------------------------------------- |
| Base URL   | `/classes`            | `/classrooms`     | ❌ Không khớp | Frontend dùng `/classes`, Backend dùng `/classrooms`.         |
| Lấy tất cả | `/classes`            | `/classrooms`     | ❌ Không khớp | Khác đường dẫn gốc.                                           |
| Tạo mới    | `/classes`            | `/classrooms`     | ❌ Không khớp | Khác đường dẫn gốc.                                           |
| Lấy HS     | `/classes/my-classes` | N/A               | ❌ Không khớp | FE có `getStudentClasses`. BE có `/classrooms/{id}/students`. |

## 3. Bài học (Lessons)

### Endpoint

| Hành động      | Đường dẫn Frontend    | Đường dẫn Backend     | Trạng thái | Ghi chú |
| -------------- | --------------------- | --------------------- | ---------- | ------- |
| Base URL       | `/lessons`            | `/lessons`            | ✅ Khớp    |         |
| Lấy theo Topic | `/lessons/topic/{id}` | `/lessons/topic/{id}` | ✅ Khớp    |         |
| Tạo mới        | `/lessons`            | `/lessons`            | ✅ Khớp    |         |

## 4. Từ điển (Vocabulary)

### Endpoint

| Hành động      | Đường dẫn Frontend         | Đường dẫn Backend                             | Trạng thái    | Ghi chú                                                    |
| -------------- | -------------------------- | --------------------------------------------- | ------------- | ---------------------------------------------------------- |
| Base URL       | `/dictionary`              | `/vocabularies`                               | ❌ Không khớp | Frontend dùng `/dictionary`, Backend dùng `/vocabularies`. |
| Tìm kiếm       | `/dictionary/search?q=...` | `/vocabularies/search/by-content?content=...` | ❌ Không khớp | Khác đường dẫn và tham số truy vấn (`q` vs `content`).     |
| Lấy theo Topic | `/dictionary/topic/{id}`   | `/vocabularies/topic/{id}`                    | ⚠️ Một phần   | Cấu trúc đường dẫn khớp, URL gốc khác nhau.                |

## 5. Tổ chức (Organizations)

### Endpoint

| Hành động  | Đường dẫn Frontend | Đường dẫn Backend | Trạng thái | Ghi chú |
| ---------- | ------------------ | ----------------- | ---------- | ------- |
| Base URL   | `/organizations`   | `/organizations`  | ✅ Khớp    |         |
| Lấy tất cả | `/organizations`   | `/organizations`  | ✅ Khớp    |         |
| Tạo mới    | `/organizations`   | `/organizations`  | ✅ Khớp    |         |

## Tóm tắt các hạng mục cần làm

1.  **Đổi tên Base URL ở Frontend**:
    - Đổi resource `ClassModel` từ `classes` sang `classrooms`.
    - Đổi resource `DictionaryModel` từ `dictionary` sang `vocabularies`.
2.  **Cập nhật tham số truy vấn**:
    - Cập nhật tìm kiếm từ điển để dùng `content` thay vì `q`.
3.  **Xác minh ánh xạ dữ liệu**:
    - Đảm bảo `facilityId` map sang `school_id` trong các gọi API.
    - Đảm bảo xử lý `avatar` tuân thủ `avatar_location`.
4.  **Triển khai hoặc sửa các Endpoint thiếu**:
    - Kiểm tra sự tồn tại của API `/users/pending` trên Backend hoặc cập nhật Frontend dùng bộ lọc trên `/users`.
    - Căn chỉnh logic `my-classes` với các endpoint `/classrooms` hoặc `/users` của Backend.

## 6. Phân tích Form dữ liệu & Payload

Phần này phân tích cấu trúc payload để tạo và cập nhật các thực thể.

### Tổ chức (`/organizations`)

| Trường      | Frontend (OrganizationItem) | Backend (requestBody) | Trạng thái    | Ghi chú                                            |
| ----------- | --------------------------- | --------------------- | ------------- | -------------------------------------------------- |
| Tên         | `name`                      | `name`                | ✅ Khớp       |                                                    |
| Loại        | N/A (ngầm định?)            | `type` (Bắt buộc)     | ❌ Thiếu      | FE phải gửi `type` (ví dụ: 'SCHOOL').              |
| Tổ chức cha | N/A                         | `parent_id`           | ❌ Thiếu      | FE phải xử lý phân cấp nếu áp dụng.                |
| Địa chỉ     | `streetAddress`             | `address` / `street`  | ⚠️ Mơ hồ      | BE có các trường `address` và `street` riêng biệt. |
| Tỉnh/TP     | `provinceCode` (số)         | `city` (chuỗi)        | ❌ Không khớp | FE dùng mã, BE dùng tên? Cần map.                  |
| Phường/Xã   | `wardCode` (số)             | `ward` (chuỗi)        | ❌ Không khớp | FE dùng mã, BE dùng tên? Cần map.                  |
| SĐT         | `phone`                     | `phone`               | ✅ Khớp       |                                                    |
| Email       | `email`                     | `email`               | ✅ Khớp       |                                                    |

### Giáo viên (`/users/teachers`)

| Trường    | Frontend (UserItem/Form) | Backend (requestBody) | Trạng thái    | Ghi chú                                                     |
| --------- | ------------------------ | --------------------- | ------------- | ----------------------------------------------------------- |
| Tên       | `name`                   | `name`                | ✅ Khớp       |                                                             |
| Email     | `email`                  | `email`               | ✅ Khớp       |                                                             |
| SĐT       | `phone`                  | `phoneNumber`         | ⚠️ Casing     | BE dùng `phoneNumber` trong POST, `phone_number` trong GET. |
| Ngày sinh | `birthDay`               | `birthDay`            | ✅ Khớp       | Ghi chú camelCase trong Swagger.                            |
| Địa chỉ   | `address`                | `address`             | ✅ Khớp       |                                                             |
| Lớp       | `className`?             | `classRoomName`       | ⚠️ Xác minh   | BE mong đợi chuỗi `classRoomName`.                          |
| Trường    | `facilityId`             | `schoolName`          | ❌ Không khớp | BE tạo bằng `schoolName`, FE thường liên kết bằng ID.       |

### Học sinh (`/users/students`)

| Trường    | Frontend (UserItem/Form) | Backend (requestBody) | Trạng thái  | Ghi chú                            |
| --------- | ------------------------ | --------------------- | ----------- | ---------------------------------- |
| Tên       | `name`                   | `name`                | ✅ Khớp     |                                    |
| Email     | `email`                  | `email`               | ✅ Khớp     |                                    |
| SĐT       | `phone`                  | `phoneNumber`         | ⚠️ Casing   | BE dùng `phoneNumber`.             |
| Ngày sinh | `birthDay`               | `birthDay`            | ✅ Khớp     |                                    |
| Địa chỉ   | `address`                | `address`             | ✅ Khớp     |                                    |
| Lớp       | `className`?             | `classRoomName`       | ⚠️ Xác minh | BE mong đợi chuỗi `classRoomName`. |

### Bài học (`/lessons`)

| Trường     | Frontend (Lesson) | Backend (requestBody) | Trạng thái    | Ghi chú                                        |
| ---------- | ----------------- | --------------------- | ------------- | ---------------------------------------------- |
| Tên        | `name`            | `lesson_name`         | ❌ Không khớp | Map `name` -> `lesson_name`.                   |
| Chủ đề     | `topicId`         | `topic_id`            | ✅ Khớp       | (cần chuyển đổi snake_case nếu không tự động). |
| Lớp        | `classId`         | `classroom_id`        | ❌ Không khớp | Map `classId` -> `classroom_id`.               |
| Thứ tự     | `order`           | `order_number`        | ❌ Không khớp | Map `order` -> `order_number`.                 |
| Ảnh        | `thumbnail`       | `image_url`           | ❌ Không khớp | Map `thumbnail` -> `image_url`.                |
| Video      | `video`           | `video_url`           | ❌ Không khớp | Map `video` -> `video_url`.                    |
| Thời lượng | `duration`        | `duration_minutes`    | ❌ Không khớp | Map `duration` -> `duration_minutes`.          |

### Từ vựng (`/vocabularies`)

| Trường   | Frontend (DictionaryItem) | Backend (requestBody) | Trạng thái    | Ghi chú                                       |
| -------- | ------------------------- | --------------------- | ------------- | --------------------------------------------- |
| Nội dung | `word` / `content`        | `content`             | ✅ Khớp       |                                               |
| Chủ đề   | `topicId`                 | `topic_id`            | ✅ Khớp       |                                               |
| Loại     | `type`                    | `vocabulary_type`     | ❌ Không khớp | Map giá trị: `WORD`, `SENTENCE`, `PARAGRAPH`. |
| Ảnh      | `image`                   | `images_url`          | ❌ Không khớp | Map chuỗi -> chuỗi (tên số nhiều trong BE).   |
| Video    | `video`                   | `videos_url`          | ❌ Không khớp | Map chuỗi -> chuỗi (tên số nhiều trong BE).   |
| Riêng tư | `isPrivate`               | `is_private`          | ✅ Khớp       | (chuyển đổi snake_case).                      |

## Hạng mục hành động cho Form

1.  **Lớp chuyển đổi Payload (Transformation Layer)**:
    - Tạo các hàm mapper trong service để dịch model camelCase của Frontend sang payload snake_case/cụ thể của Backend trước khi gửi request `apiPost`/`apiPut`.
2.  **Tạo Tổ chức**:
    - Thêm `type: 'SCHOOL'` (hoặc mặc định phù hợp) vào payload.
    - Chuyển đổi mã Tỉnh/Phường sang tên chuỗi nếu Backend không hỗ trợ mã, HOẶC cập nhật Backend để hỗ trợ mã (FE thường ưu tiên mã cho dropdown).
3.  **Tạo User**:
    - Xác minh xem `schoolName` trong tạo Giáo viên có thể chấp nhận ID không hay phải tra cứu tên trước. Lý tưởng nhất là BE nên chấp nhận `school_id`.
    - Chuẩn hóa thành `phoneNumber` cho các payload tạo mới.
4.  **Mapping Bài học/Từ vựng**:
    - Map chính xác `thumbnail` -> `image_url` và `video` -> `video_url`.
