# Scripts

Thư mục này chứa các script tiện ích cho dự án VietSign.

## Migration Scripts

### 1. `migrate-architecture.js`

Script tự động tái cấu trúc dự án theo kiến trúc mới trong `ARCHITECTURE.md`.

**Chạy script:**

```bash
node scripts/migrate-architecture.js
```

**Script sẽ thực hiện:**

1. Tạo cấu trúc thư mục mới (`core/`, `shared/`, `domain/`, `features/`)
2. Copy files từ vị trí cũ sang vị trí mới
3. Tự động cập nhật import paths trong các files
4. Tạo các file `index.ts` barrel exports
5. Cập nhật `tsconfig.json` với path aliases mới

**Lưu ý:**

- ⚠️ Hãy backup code trước khi chạy!
- Script KHÔNG xóa các thư mục cũ (để bạn có thể verify trước)

### 2. `cleanup-old-structure.js`

Script xóa các thư mục cũ sau khi migration hoàn tất.

**Chạy script:**

```bash
node scripts/cleanup-old-structure.js --confirm
```

**Script sẽ xóa:**

- `src/config`
- `src/providers`
- `src/store`
- `src/lib`
- `src/model`
- `src/components`
- `src/hooks`
- `src/utils`
- `src/services`

**⚠️ CHỈ chạy script này sau khi:**

1. Đã chạy `migrate-architecture.js` thành công
2. Đã verify app hoạt động với `npm run dev`
3. Đã commit hoặc backup code

## Quy trình Migration đầy đủ

```bash
# 1. Backup code (quan trọng!)
git add . && git commit -m "Backup before migration"

# 2. Chạy migration script
node scripts/migrate-architecture.js

# 3. Verify app hoạt động
npm run dev

# 4. Fix lỗi imports nếu có (thủ công)

# 5. Sau khi verify xong, cleanup old structure
node scripts/cleanup-old-structure.js --confirm

# 6. Final verification
npm run dev

# 7. Commit changes
git add . && git commit -m "Migrate to new architecture"
```
