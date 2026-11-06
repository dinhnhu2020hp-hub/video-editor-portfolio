# Portfolio Short-form Video Editor

Website portfolio một trang (HTML + CSS + JavaScript thuần, không cần build). Video được **nhúng từ YouTube**, không lưu trong repository. Ngôi sao 4 cánh là SVG, dùng lại qua `<use href="#star">`.

## 1. Cấu trúc thư mục
```
index.html
css/style.css
js/script.js          <- cấu hình SITE và PROJECTS nằm ở đầu file
assets/images/        site-cover.jpg, portrait.jpg
assets/documents/     video-editor.pdf (CV)
```
## 2. Thay ảnh cá nhân
Ghi đè `assets/images/site-cover.jpg` (Hero) và `assets/images/portrait.jpg` (About), giữ nguyên tên file.

## 3. Thay tên và thông tin liên hệ
Sửa object `SITE` ở đầu `js/script.js` (name, shortName, email, phone, social). Link mạng xã hội để `""` thì tự ẩn. Nếu `email` rỗng, nút Contact và Copy email tự ẩn.

## 4. Thay YouTube ID / thêm video mới / đổi danh mục
Trong mảng `PROJECTS`, mỗi video là một object. Để thêm video, copy một object, đổi `id` (số không trùng), `title`, `category`, `role`, `description`, `youtubeId` (đoạn sau `/shorts/`), `youtubeUrl`, `editingFocus`. Trường `filter` quyết định nhóm lọc: `Promotional`, `Interview`, `News` hoặc `Entertainment`. Muốn thêm nhóm mới, thêm một nút `<button data-f="TênNhóm">` trong `.filters` ở `index.html`.

## 5. Đổi màu sắc
Sửa các biến trong `:root` ở đầu `css/style.css` (`--p`, `--d`, `--n`, `--sky`, `--lt`).

## 6. Cập nhật CV và showreel
Thay file `assets/documents/video-editor.pdf` (cùng tên), hoặc đổi `cvUrl` trong `SITE`. Dán link vào `showreelUrl` để nút Watch showreel xuất hiện.

## 7. Chạy local
Mở `index.html` bằng trình duyệt, hoặc chạy `python3 -m http.server 8000` trong thư mục rồi vào http://localhost:8000. (Mở bằng `file://` thì video YouTube có thể báo lỗi nhúng; dùng server local sẽ ổn.)

## 8. Đưa lên GitHub Pages
1. Tạo repository mới trên github.com (ví dụ `portfolio`, để Public).
2. Bấm **Add file → Upload files**, kéo toàn bộ nội dung thư mục (index.html, css, js, assets, README.md, .gitignore) vào, rồi **Commit changes**.
3. Vào **Settings → Pages**. Ở **Build and deployment**, chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`, bấm **Save**.
4. Đợi 1–2 phút. Link sẽ là `https://TÊN-GITHUB.github.io/TÊN-REPO/`.

## 9. Video không phát?
- Kiểm tra `youtubeId` đúng 11 ký tự (ID thứ ba bắt đầu bằng dấu `_`).
- Video phải ở chế độ Public hoặc Unlisted và cho phép nhúng.
- Không mở bằng `file://` (xem mục 7).
- Nút **Watch on YouTube** trong cửa sổ video luôn mở video gốc.
