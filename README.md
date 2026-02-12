# 🎓 Smart Initiative Pro - Hệ thống Viết Sáng Kiến Kinh Nghiệm

Ứng dụng hỗ trợ giáo viên viết báo cáo sáng kiến kinh nghiệm theo chuẩn giáo dục Việt Nam, tích hợp AI Gemini.

## 🚀 Deployment trên Vercel

### Bước 1: Chuẩn bị Repository

```bash
# Clone repository về máy
git clone <your-repo-url>
cd sang-kien-tuyet-mat001

# Cài đặt dependencies
npm install
```

### Bước 2: Lấy Gemini API Key

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập Google account
3. Click **"Create API Key"**
4. Copy API key (dạng: `AIzaSy...`)

### Bước 3: Test local

```bash
# Tạo file .env.local
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local

# Chạy dev server
npm run dev
```

### Bước 4: Deploy lên Vercel

1. Push code lên GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Vào Vercel (https://vercel.com):
   - Click **"Add New Project"**
   - Import repository từ GitHub
   - Framework Preset: **Vite**

3. **QUAN TRỌNG: Setup Environment Variables**
   
   Trong màn hình config, thêm:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSy...` (API key của bạn)
   - Environments: Chọn cả 3 (Production, Preview, Development)

4. Click **Deploy**

### Bước 5: Kiểm tra

- Truy cập URL Vercel cung cấp (vd: `https://your-app.vercel.app`)
- Test chức năng AI generate
- Kiểm tra xuất Word

## 📁 Cấu trúc Project

```
sang-kien-tuyet-mat001/
├── App.tsx                    # Component chính
├── index.tsx                  # Entry point
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config
├── vercel.json                # Vercel deployment config
├── .gitignore                 # Git ignore
├── .env.example               # Environment variables template
│
├── components/                # React components
│   ├── FormField.tsx         # Form input field
│   ├── SectionHeader.tsx     # Section header
│   └── ReportPreview.tsx     # Report preview
│
├── services/                  # Business logic
│   ├── geminiService.ts      # Gemini API integration
│   └── wordExportService.ts  # Word export functionality
│
└── types/                     # TypeScript types
    └── index.ts              # Type definitions
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API Key | ✅ Yes |

**Lưu ý**: Tất cả environment variables trong Vite phải có prefix `VITE_`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 📝 Tính năng

- ✅ AI tự động soạn thảo toàn bộ báo cáo
- ✅ AI hỗ trợ từng phần riêng lẻ
- ✅ Xem trước real-time định dạng A4
- ✅ Xuất file Word (.docx)
- ✅ In trực tiếp
- ✅ Giao diện thân thiện, dễ sử dụng

## 🔒 Bảo mật

- API key được lưu trong environment variables
- Không commit API key lên Git
- Sử dụng `.env.local` cho development
- Sử dụng Vercel Environment Variables cho production

## 🐛 Troubleshooting

### Lỗi: "VITE_GEMINI_API_KEY is undefined"
✅ Giải pháp:
1. Kiểm tra tên biến đúng: `VITE_GEMINI_API_KEY`
2. Thêm vào Vercel Environment Variables
3. Redeploy project

### Lỗi build trên Vercel
✅ Giải pháp:
1. Kiểm tra `package.json` dependencies
2. Kiểm tra logs trong Vercel deployment
3. Test build local: `npm run build`

### API không hoạt động
✅ Giải pháp:
1. Kiểm tra API key còn valid
2. Kiểm tra quota Gemini (free: 60 req/min)
3. Check console browser (F12) để xem error

## 📞 Hỗ trợ

- GitHub Issues: [Tạo issue mới](https://github.com/your-repo/issues)
- Email: your-email@example.com

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa

---

**Phát triển bởi: BÙI VĂN ĐẠT**
