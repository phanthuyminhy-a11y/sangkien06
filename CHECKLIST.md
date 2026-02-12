# ✅ CHECKLIST DEPLOY LÊN VERCEL

## 📦 BƯỚC 1: CẬP NHẬT FILES TRONG PROJECT

Copy các file sau vào root project của bạn:

- [ ] `vercel.json` - Cấu hình Vercel
- [ ] `vite.config.ts` - Cấu hình Vite
- [ ] `.gitignore` - Ignore files (đổi tên từ _gitignore)
- [ ] `.env.example` - Template environment variables
- [ ] `index.html` - HTML đã sửa (xóa importmap và link CSS)
- [ ] `README.md` - Hướng dẫn mới

### Tạo thư mục `components/`
- [ ] `components/FormField.tsx`
- [ ] `components/SectionHeader.tsx`
- [ ] `components/ReportPreview.tsx`

### Tạo thư mục `services/`
- [ ] `services/geminiService.ts` - **QUAN TRỌNG**: Tích hợp Gemini API
- [ ] `services/wordExportService.ts` - Xuất Word

### Tạo thư mục `types/`
- [ ] `types/index.ts` - TypeScript types

---

## 🔑 BƯỚC 2: LẤY GEMINI API KEY

- [ ] Truy cập: https://aistudio.google.com/app/apikey
- [ ] Đăng nhập Google
- [ ] Click "Create API Key"
- [ ] Copy API key (bắt đầu bằng `AIzaSy...`)
- [ ] Lưu lại an toàn

---

## 💻 BƯỚC 3: TEST LOCAL (Tùy chọn nhưng nên làm)

```bash
# Tạo file .env.local
VITE_GEMINI_API_KEY=your_actual_api_key_here

# Cài đặt
npm install

# Chạy thử
npm run dev
```

- [ ] App chạy được ở http://localhost:3000
- [ ] Chức năng AI hoạt động
- [ ] Không có lỗi trong console

---

## 🚀 BƯỚC 4: PUSH LÊN GITHUB

```bash
git add .
git commit -m "Setup project for Vercel deployment"
git push origin main
```

- [ ] Code đã push lên GitHub
- [ ] Kiểm tra repository có đầy đủ files

---

## 🌐 BƯỚC 5: DEPLOY TRÊN VERCEL

### 5.1. Import Project
- [ ] Vào https://vercel.com
- [ ] Click "Add New" → "Project"
- [ ] Chọn repository GitHub
- [ ] Click "Import"

### 5.2. Cấu hình Build Settings
Vercel tự động detect, nhưng kiểm tra:
- [ ] Framework Preset: `Vite`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### 5.3. **QUAN TRỌNG NHẤT: Environment Variables**
- [ ] Click "Environment Variables"
- [ ] Add new variable:
  - Name: `VITE_GEMINI_API_KEY`
  - Value: `AIzaSy...` (API key của bạn)
  - Environments: ✅ Production ✅ Preview ✅ Development
- [ ] Click "Add"

### 5.4. Deploy
- [ ] Click "Deploy"
- [ ] Đợi 2-3 phút
- [ ] Deploy thành công ✅

---

## ✅ BƯỚC 6: KIỂM TRA SAU KHI DEPLOY

- [ ] Truy cập URL Vercel (vd: https://your-app.vercel.app)
- [ ] Giao diện hiển thị đúng
- [ ] Nhập tên sáng kiến
- [ ] Click "TỰ ĐỘNG SOẠN THẢO" - kiểm tra AI hoạt động
- [ ] Kiểm tra nút "Xuất Word"
- [ ] Kiểm tra nút "In nhanh"

---

## 🔧 BƯỚC 7: NÉU CÓ LỖI

### Lỗi: "API Key undefined"
- [ ] Vào Vercel Dashboard → Settings → Environment Variables
- [ ] Kiểm tra có biến `VITE_GEMINI_API_KEY` chưa
- [ ] Nếu chưa → Add
- [ ] Nếu rồi → Redeploy (Deployments → ... → Redeploy)

### Lỗi build
- [ ] Vào Vercel Deployments → Xem logs
- [ ] Copy lỗi
- [ ] Fix trong code
- [ ] Push lại lên GitHub (auto redeploy)

### API không hoạt động
- [ ] Kiểm tra API key còn valid: https://aistudio.google.com/app/apikey
- [ ] Kiểm tra quota Gemini (free: 60 req/min)
- [ ] Mở Console browser (F12) xem lỗi gì

---

## 📊 TIẾN TRÌNH

```
[ ] Cập nhật files → [ ] Lấy API key → [ ] Test local → [ ] Push GitHub → [ ] Deploy Vercel → [ ] Kiểm tra → [✅] HOÀN THÀNH
```

---

## 📞 CẦN TRỢ GIÚP?

Nếu gặp khó khăn ở bước nào, note lại:
1. Bước đang làm
2. Thông báo lỗi (nếu có)
3. Screenshot (nếu cần)

---

**Chúc bạn deploy thành công! 🎉**
