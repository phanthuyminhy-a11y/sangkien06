# 🚀 QUICK START - HƯỚNG DẪN NHANH

## ⚡ Setup trong 5 phút

### Bước 1: Lấy API Key (2 phút)
1. Mở: https://aistudio.google.com/app/apikey
2. Đăng nhập Google → Click "Create API Key"
3. Copy key (bắt đầu bằng `AIzaSy...`)

### Bước 2: Test Local (2 phút)
```bash
# Tạo file .env.local
echo "VITE_GEMINI_API_KEY=AIzaSy_YOUR_KEY_HERE" > .env.local

# Cài đặt và chạy
npm install
npm run dev
```

Mở http://localhost:3000 để test!

### Bước 3: Deploy Vercel (1 phút)
```bash
# Push lên GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Sau đó:
1. Vào https://vercel.com → Import project từ GitHub
2. **QUAN TRỌNG**: Thêm Environment Variable:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: API key của bạn
3. Click Deploy!

---

## 🎯 Xong rồi!

Truy cập URL Vercel cung cấp để sử dụng app.

**Gặp vấn đề?** Xem:
- `CHECKLIST.md` - Hướng dẫn chi tiết từng bước
- `DEPLOY_GUIDE.md` - Troubleshooting đầy đủ
- `README.md` - Tài liệu tổng quan

---

## 📞 Hỗ trợ

Nếu app không hoạt động:
1. Kiểm tra Console browser (F12) xem có lỗi gì
2. Xem Vercel Deployment Logs
3. Đảm bảo đã thêm `VITE_GEMINI_API_KEY` đúng tên
