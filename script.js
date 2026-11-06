"use strict";
/* ===== CẤU HÌNH — sửa thông tin cá nhân tại đây ===== */
const SITE = {
  name: "Đinh Thị Tâm Như",
  shortName: "Tâm Như",
  email: "dinhnhu2020hp@gmail.com",
  phone: "0345872938",
  cvUrl: "assets/documents/video-editor.pdf", // để "" để ẩn nút Download CV
  showreelUrl: "",                            // dán link showreel để hiện nút Watch showreel
  social: { TikTok: "", Instagram: "", Facebook: "", YouTube: "", LinkedIn: "" } // link rỗng sẽ tự ẩn
};
/* ===== DANH SÁCH DỰ ÁN — thêm/sửa video tại đây ===== */
const PROJECTS = [
  { id: 1, title: "TOP 5 LÝ DO NÊN CHỌN VNU-SIS", category: "Promotional / Educational", filter: "Promotional",
    role: "Video Editor — Full Post-production", youtubeId: "3RwXhw4CGDg", youtubeUrl: "https://youtube.com/shorts/3RwXhw4CGDg?feature=share",
    description: "Video truyền thông giới thiệu những lý do nổi bật để lựa chọn Trường Khoa học Liên ngành và Nghệ thuật, Đại học Quốc gia Hà Nội.",
    editingFocus: ["Footage Selection", "Visual Storytelling", "Text Animation", "Video Pacing", "Audio Synchronization"] },
  { id: 2, title: "PHỎNG VẤN SINH VIÊN ĐÔ THỊ VNU-SIS", category: "Interview / Educational Content", filter: "Interview",
    role: "Video Editor — Full Post-production", youtubeId: "lGIR8kpjBi4", youtubeUrl: "https://youtube.com/shorts/lGIR8kpjBi4?feature=share",
    description: "Biên tập video phỏng vấn sinh viên về ngành học và trải nghiệm học tập tại VNU-SIS.",
    editingFocus: ["Interview Editing", "Dialogue Pacing", "Subtitles", "Audio Synchronization", "Storytelling"] },
  { id: 3, title: "PHỎNG VẤN SINH VIÊN KIẾN TRÚC & THIẾT KẾ CẢNH QUAN", category: "Interview / Educational Content", filter: "Interview",
    role: "Video Editor — Full Post-production", youtubeId: "_6mLGdwvv00", youtubeUrl: "https://youtube.com/shorts/_6mLGdwvv00?feature=share",
    description: "Biên tập video phỏng vấn sinh viên ngành Kiến trúc và Thiết kế cảnh quan tại VNU-SIS.",
    editingFocus: ["Interview Editing", "Footage Selection", "Dialogue Editing", "Visual Pacing", "Post-production"] },
  { id: 4, title: "NEWS EDITING — 01", category: "News / Informative", filter: "News",
    role: "Video Editor — Full Post-production", youtubeId: "dk7zCEMTNbQ", youtubeUrl: "https://youtube.com/shorts/dk7zCEMTNbQ?feature=share",
    description: "Biên tập nội dung tin tức dạng video ngắn, kết hợp footage minh họa, phụ đề, âm thanh và hiệu ứng để truyền tải thông tin trực quan.",
    editingFocus: ["Footage Research", "B-roll Selection", "Subtitle Editing", "Visual Storytelling", "News Pacing"] },
  { id: 5, title: "NEWS EDITING — 02", category: "News / Informative", filter: "News",
    role: "Video Editor — Full Post-production", youtubeId: "u_I5aJlkHCU", youtubeUrl: "https://youtube.com/shorts/u_I5aJlkHCU?feature=share",
    description: "Video tin tức ngắn chú trọng cách minh họa thông tin bằng footage, nhịp dựng và đồng bộ hình ảnh với nội dung.",
    editingFocus: ["Footage Selection", "B-roll", "Sound Editing", "Text Animation", "Video Pacing"] },
  { id: 6, title: "AI LÀ GIÁN ĐIỆP?", category: "Entertainment / Game Show", filter: "Entertainment",
    role: "Video Editor — Full Post-production", youtubeId: "YozYHw-AHoI", youtubeUrl: "https://youtube.com/shorts/YozYHw-AHoI?feature=share",
    description: "Biên tập video trò chơi giải trí, lựa chọn các tình huống đáng chú ý, xử lý phản ứng người chơi, phụ đề và hiệu ứng âm thanh nhằm tăng tính hấp dẫn và duy trì diễn biến cuộc chơi.",
    editingFocus: ["Highlight Selection", "Reaction Cuts", "Comedy Timing", "Dynamic Captions", "Sound Effects", "Entertainment Pacing"] }
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const STAR = '<svg class="star star-small" aria-hidden="true"><use href="#star"/></svg>';

/* Thông tin cá nhân */
$$("[data-cfg]").forEach(el => el.textContent = SITE[el.dataset.cfg] || "");
if (SITE.showreelUrl) { const s = $("#showreel"); s.href = SITE.showreelUrl; s.hidden = false; }
if (SITE.email) $("#mailBtn").href = "mailto:" + SITE.email;
else { $("#mailBtn").hidden = true; $("#copyBtn").hidden = true; }
if (SITE.cvUrl) $("#cvBtn").href = SITE.cvUrl; else $("#cvBtn").hidden = true;
$("#social").innerHTML = Object.entries(SITE.social).filter(([, u]) => u).map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("");

const live = $("#live");
$("#copyBtn").addEventListener("click", async e => {
  const b = e.currentTarget;
  try { await navigator.clipboard.writeText(SITE.email); }
  catch { const t = document.createElement("textarea"); t.value = SITE.email; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
  b.textContent = "Copied ✓"; live.textContent = "Đã sao chép email";
  setTimeout(() => b.textContent = "Copy email", 2000);
});

/* Thumbnail: thử maxres, lỗi/placeholder thì dùng hqdefault */
function setThumb(img, id) {
  const hi = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, lo = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  img.onload = () => { if (img.src === hi && img.naturalWidth < 320) img.src = lo; };
  img.onerror = () => { if (img.src !== lo) img.src = lo; };
  img.src = hi;
}

/* Render cards */
const grid = $("#grid");
grid.innerHTML = PROJECTS.map(p => `<article class="card" data-f="${esc(p.filter)}">
  <button class="card-btn" data-id="${p.id}" aria-label="Xem video: ${esc(p.title)}">
    <span class="thumb"><img alt="Thumbnail video ${esc(p.title)}" loading="lazy" width="480" height="360"><span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 3l15 9-15 9z"/></svg></span></span>
    <span class="c-body"><small>${esc(p.category)}</small><b>${esc(p.title)}</b><span>${esc(p.role)}</span></span>
  </button><svg class="star star-small" aria-hidden="true"><use href="#star"/></svg></article>`).join("");
$$(".card img", grid).forEach((img, i) => setThumb(img, PROJECTS[i].youtubeId));

/* Filter */
const cards = $$(".card", grid);
$$(".filters button").forEach(btn => btn.addEventListener("click", () => {
  $$(".filters button").forEach(b => b.setAttribute("aria-pressed", b === btn));
  const f = btn.dataset.f;
  cards.forEach(c => {
    const show = f === "All" || c.dataset.f === f;
    if (show === !c.hidden) return;
    if (show) { c.classList.add("out"); c.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => c.classList.remove("out"))); }
    else { c.classList.add("out"); setTimeout(() => { if (c.classList.contains("out")) c.hidden = true; }, 250); }
  });
}));

/* Modal */
const modal = $("#modal"), player = $("#player");
let opener = null;
function openModal(p, from) {
  opener = from;
  $("#mCat").textContent = p.category; $("#mTitle").textContent = p.title;
  $("#mRole").textContent = p.role; $("#mDesc").textContent = p.description;
  $("#mFocus").innerHTML = p.editingFocus.map(t => `<li>${esc(t)}</li>`).join("");
  $("#mYt").href = p.youtubeUrl;
  const f = document.createElement("iframe");
  f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(p.youtubeId)}?autoplay=1&rel=0&playsinline=1`;
  f.title = "Video: " + p.title; f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true;
  player.replaceChildren(f);
  modal.hidden = false; document.body.style.overflow = "hidden";
  requestAnimationFrame(() => { modal.classList.add("open"); $("#close").focus(); });
}
function closeModal() {
  if (modal.hidden) return;
  player.replaceChildren();               // huỷ iframe để video dừng hẳn
  modal.classList.remove("open"); document.body.style.overflow = "";
  setTimeout(() => { modal.hidden = true; }, 250);
  if (opener) opener.focus();
}
grid.addEventListener("click", e => {
  const b = e.target.closest(".card-btn"); if (!b) return;
  openModal(PROJECTS.find(p => p.id === +b.dataset.id), b);
});
$("#close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => {
  if (modal.hidden) return;
  if (e.key === "Escape") return closeModal();
  if (e.key === "Tab") {
    const els = $$("button,a[href]", modal).filter(x => !x.hidden);
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    else if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  }
});

/* Mobile nav */
const burger = $("#burger"), menu = $("#menu");
const setMenu = o => { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Đóng menu" : "Mở menu"); };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));

/* Scroll: nav state, reveal, active link */
const nav = $("#nav");
addEventListener("scroll", () => nav.classList.toggle("sc", scrollY > 10), { passive: true });
if ("IntersectionObserver" in window) {
  const rv = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); } }), { threshold: .12 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; rv.observe(el); });
  const sp = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) $$("#menu a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section").forEach(s => sp.observe(s));
} else $$(".reveal").forEach(el => el.classList.add("in"));
