# 🚀 Hướng Dẫn Deploy Lên Vercel

## 📋 Bước 1: Chuẩn bị file project

### 1.1. Thêm các file sau vào root project:
- ✅ `vercel.json` - Cấu hình Vercel
- ✅ `vite.config.ts` - Cấu hình Vite
- ✅ `.gitignore` - Ignore files
- ✅ `.env.example` - Template biến môi trường

### 1.2. Sửa file `index.html`:
Xóa dòng:
```html
<link rel="stylesheet" href="/index.css">
```
Xóa importmap (vì đã có trong package.json):
```html
<script type="importmap">...</script>
```

---

## 🔑 Bước 2: Lấy Gemini API Key

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập Google account
3. Click **"Create API Key"**
4. Chọn project hoặc tạo project mới
5. Copy API key (dạng: `AIzaSy...`)

---

## 📤 Bước 3: Push code lên GitHub

```bash
# Tạo repository mới trên GitHub
# Clone về máy (nếu chưa có)

# Copy tất cả file vào folder project
# Đảm bảo có đủ các file:
# - App.tsx
# - index.tsx
# - index.html
# - package.json
# - tsconfig.json
# - vercel.json
# - vite.config.ts
# - .gitignore
# - .env.example

# Commit và push
git add .
git commit -m "Initial commit - Smart Initiative Pro"
git push origin main
```

---

## 🌐 Bước 4: Deploy lên Vercel

### 4.1. Import project
1. Truy cập: https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Chọn repository GitHub vừa tạo
4. Click **"Import"**

### 4.2. Cấu hình Build Settings
Vercel tự động detect Vite, nhưng hãy kiểm tra:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4.3. **QUAN TRỌNG: Setup Environment Variables**

Trong màn hình import project, tìm mục **"Environment Variables"**:

1. Click **"Add"**
2. Điền:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSy...` (API key bạn vừa lấy)
3. Chọn môi trường: `Production`, `Preview`, `Development` (tick cả 3)
4. Click **"Add"**

![Environment Variables](https://i.imgur.com/example.png)

### 4.4. Deploy
- Click **"Deploy"**
- Đợi 2-3 phút để build
- Xong! 🎉

---

## 🔧 Bước 5: Sửa code để dùng API Key từ Environment

Bạn cần tạo file service để gọi Gemini API. Ví dụ:

### File: `services/geminiService.ts`

```typescript
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('⚠️ Thiếu GEMINI_API_KEY trong environment variables!');
}

export async function generateSectionContent(section: string, title: string): Promise<string> {
  // Code gọi Gemini API
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Viết ${section} cho sáng kiến: ${title}` }]
        }]
      })
    }
  );
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
```

### File: `services/wordExportService.ts`

```typescript
export async function exportToWord(data: any) {
  // Code xuất Word
  console.log('Exporting to Word...', data);
}
```

---

## 🔄 Update API Key sau khi deploy

Nếu cần thay đổi API key:

1. Vào Vercel Dashboard
2. Chọn project
3. Vào tab **"Settings"** → **"Environment Variables"**
4. Edit hoặc thêm `VITE_GEMINI_API_KEY`
5. **Redeploy**: Vào tab "Deployments" → Click "..." → "Redeploy"

---

## ✅ Kiểm tra API Key hoạt động

Mở Console trình duyệt (F12):
```javascript
console.log('API Key:', import.meta.env.VITE_GEMINI_API_KEY);
// Không hiển thị full key ra console trong production!
```

---

## 🐛 Troubleshooting

### Lỗi: "VITE_GEMINI_API_KEY is undefined"
- ✅ Đảm bảo tên biến đúng: `VITE_GEMINI_API_KEY` (có prefix `VITE_`)
- ✅ Redeploy sau khi thêm environment variable
- ✅ Kiểm tra trong Vercel Settings → Environment Variables

### Lỗi Build trên Vercel
- ✅ Kiểm tra `package.json` có đầy đủ dependencies
- ✅ Kiểm tra `vite.config.ts` syntax đúng
- ✅ Xem logs chi tiết trong Vercel deployment

### API Key không hoạt động
- ✅ Kiểm tra API key còn valid tại https://aistudio.google.com/app/apikey
- ✅ Kiểm tra quota Gemini API (free tier: 60 requests/minute)
- ✅ Kiểm tra CORS nếu gọi từ browser

---

## 📝 Cấu trúc file project chuẩn

```
sang-kien-tuyet-mat001/
├── App.tsx
├── index.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── .gitignore
├── .env.example
├── components/
│   ├── FormField.tsx
│   ├── SectionHeader.tsx
│   └── ReportPreview.tsx
├── services/
│   ├── geminiService.ts
│   └── wordExportService.ts
└── types/
    └── index.ts
```

---

## 🎯 Tóm tắt các bước quan trọng

1. ✅ Tạo file `vercel.json`, `vite.config.ts`, `.gitignore`
2. ✅ Lấy Gemini API Key từ https://aistudio.google.com/app/apikey
3. ✅ Push code lên GitHub
4. ✅ Import vào Vercel
5. ✅ **Setup Environment Variable**: `VITE_GEMINI_API_KEY`
6. ✅ Deploy
7. ✅ Kiểm tra app hoạt động

---

## 🔗 Links hữu ích

- Vercel Dashboard: https://vercel.com/dashboard
- Google AI Studio: https://aistudio.google.com/
- Gemini API Docs: https://ai.google.dev/docs
- Vite Env Variables: https://vitejs.dev/guide/env-and-mode.html

---

**Chúc bạn deploy thành công! 🚀**
