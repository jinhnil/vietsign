# Hướng dẫn tích hợp Supabase & Email

## 1. Kiến trúc Authenticate & Chat

Vì bạn **KHÔNG** muốn đăng ký user vào Supabase Auth, chúng ta sẽ chia tách chức năng như sau:

- **Authentication (Đăng ký/Login)**: Xử lý bởi Backend riêng của bạn (hoặc logic hiện tại).
- **Email System**: Sử dụng **Nodemailer** (`src/services/mailService.ts`) để gửi email xác nhận. Supabase **không** tham gia vào việc gửi email này.
- **Chat System**: Sử dụng **Supabase Database & Realtime**.

## 2. Cập nhật Database cho Chat

Vì User không nằm trong bảng `auth.users` của Supabase, bạn cần sửa lại cấu trúc bảng để lưu `user_id` dưới dạng text (ID từ hệ thống của bạn).

Chạy lệnh SQL sau trong **Supabase SQL Editor**:

```sql
-- Xóa bảng cũ nếu đã lỡ tạo
drop table if exists messages;
drop table if exists conversations;

-- Tạo bảng conversations
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  participant_ids text[] not null, -- ID từ hệ thống của bạn (VD: "user_123")
  last_message text,
  last_message_at timestamp with time zone
);

-- Tạo bảng messages
create table messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text not null,
  sender_id text not null, -- ID từ hệ thống của bạn (không foreign key tới auth.users)
  conversation_id uuid references conversations(id) on delete cascade,
  is_read boolean default false
);

-- Bật Realtime
alter publication supabase_realtime add table messages;
```

## 3. Cấu hình gửi Email (Nodemailer)

Hệ thống sử dụng Gmail hoặc SMTP bất kỳ để gửi mail.
Cập nhật file `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

_(Nếu dùng Gmail, bạn cần tạo "App Password" trong cài đặt bảo mật Google Account)_

## 4. Cách sử dụng

### Gửi Email Xác thực (Server Side)

Trong API Register của bạn:

```typescript
import { mailService } from "@/services/mailService";

// logic tạo user...
const token = generateToken(user.id); // Tạo token xác thực
await mailService.sendAhthConfirmation(user.email, token);
```

### Sử dụng Chat (Client Side)

Trong component Chat:

```typescript
import { chatService } from "@/services/chatService";

// Lấy tin nhắn
const messages = await chatService.getMessages(conversationId);

// Gửi tin nhắn (Gửi ID của user hiện tại vào)
await chatService.sendMessage("Hello", "user_current_id", conversationId);
```
