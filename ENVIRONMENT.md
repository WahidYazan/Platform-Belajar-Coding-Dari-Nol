# Environment Variables untuk Deployment

Dokumen ini berisi daftar lengkap environment variable yang wajib diisi saat deployment
(Development, Production/Docker, maupun Vercel).

---

## Ringkasan

| Variable | Wajib | Ter-expose ke Browser | Dibaca di |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Ya | Ya | `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya | Ya | `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts` |
| `NEXT_PUBLIC_SITE_URL` | Ya | Ya | `src/app/auth/callback/route.ts`, `src/app/(auth)/forgot-password/page.tsx` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Ya | Tidak | `src/app/api/chat/route.ts` (otomatis oleh `@ai-sdk/google`) |

---

## 1. Supabase Auth

### `NEXT_PUBLIC_SUPABASE_URL`
- **Wajib**: Ya
- Contoh: `https://xxxxxxxxxxxx.supabase.co`
- Sumber: Supabase Dashboard → **Project Settings → API → Project URL**

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Wajib**: Ya
- Sources: Supabase Dashboard → **Project Settings → API → Project `anon` / `public` key**
- Catatan: ini key publik (aman untuk sisi client, sudah diatur RLS di sisi Supabase).
  **Jangan pernah** memakai `service_role` key di sini.

> Karena prefix `NEXT_PUBLIC_`, nilainya akan **ter-inline ke dalam bundle JavaScript**
> dan bisa dibaca siapa pun. Pastikan tidak ada secret yang sensitif di dalamnya.

---

## 2. URL Publik Aplikasi

### `NEXT_PUBLIC_SITE_URL`
- **Wajib**: Ya
- Contoh: `https://sinau-coding.com` (tanpa trailing slash, tanpa path)
- Dipakai untuk:
  - Redirect callback OAuth / reset password (`/auth/callback`) agar tidak salah arah ke origin internal container.
  - Menentukan origin canonical pada halaman **Lupa Password**.
- Kalau kosong, callback akan jatuh ke `request.nextUrl.origin`, yang di balik reverse proxy
  bisa mengarah ke `http://localhost:3001` sehingga link reset password user rusak.
- Karena `NEXT_PUBLIC_`, juga ikut ter-inline ke bundle client.

---

## 3. AI Chat Assistant (Google Gemini)

### `GOOGLE_GENERATIVE_AI_API_KEY`
- **Wajib**: Ya (aplikasi akan error 500 di `/api/chat` bila kosong)
- Sumber: <https://aistudio.google.com/apikey>
- **Server-only** — jangan pernah memakai prefix `NEXT_PUBLIC_` untuk key ini.
- Provider `@ai-sdk/google` membacanya otomatis dari environment, jadi tidak perlu
  menuliskan manual di kode.

---

## 4. Variable yang Ditetapkan Otomatis (tidak perlu diisi manual)

| Variable | Sumber |
|---|---|
| `NODE_ENV` | `Dockerfile` baris 22 (`production`) |
| `PORT` | `Dockerfile` baris 23 (`3001`) |
| `HOSTNAME` | `Dockerfile` baris 24 (`0.0.0.0`) |

> Kalau di Vercel / platform yang managing env sendiri, `NODE_ENV` dan `PORT`
> sudah tersedia otomatis.

---

## Template

```bash
# ============ Supabase Auth ============
NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."

# ============ URL Publik Aplikasi ============
NEXT_PUBLIC_SITE_URL="https://domain-anda.com"

# ============ Google Gemini (AI Chat Assistant) ============
GOOGLE_GENERATIVE_AI_API_KEY="AIza..."
```

---

## Cara Mengisi per Platform

### A. Docker / VPS sendiri

Karena `output: "standalone"`, nilai `NEXT_PUBLIC_*` **di-inline saat `npm run build`**.
Artinya env var harus tersedia di **build stage**, bukan hanya saat runtime.

`Dockerfile` sudah mendeklarasikan sebagai `ARG` + `ENV` di stage `builder`:

```dockerfile
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL
```

Build dengan menyuntikkan nilainya:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxxxxxx.supabase.co" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..." \
  --build-arg NEXT_PUBLIC_SITE_URL="https://domain-anda.com" \
  -t nama-image .
```

`GOOGLE_GENERATIVE_AI_API_KEY` **tidak** di-build-time, cukup di runtime:

```bash
docker run -d -p 3001:3001 \
  -e GOOGLE_GENERATIVE_AI_API_KEY="AIza..." \
  --name nama-container nama-image
```

> ⚠️ **Catatan (perlu diperiksa di `Dockerfile`)**
> `Dockerfile` saat ini **belum mendeklarasikan `GOOGLE_GENERATIVE_AI_API_KEY`**.
> Karena `output: "standalone"`, module yang membaca env saat runtime tetap bisa
> mengambil nilainya dari `docker run -e`, jadi env ini minimal cukup di-pass saat runtime.
> Agar lebih aman dan konsisten, tambahkan juga `ARG`/`ENV`-nya di stage `builder`.
> Pastikan port mapping dan `NEXT_PUBLIC_SITE_URL` sudah disesuaikan dengan domain publik Anda.

### B. Vercel

1. Buka project → **Settings → Environment Variables**.
2. Tambahkan keempat variable di atas.
3. **Production** — untuk domain production.
   **Preview** — opsional, untuk setiap PR/deploy preview.
   **Development** — untuk `npm run dev` lokal.
4. Deploy ulang (`Redeploy`) supaya variable baru terbaca.

Tidak perlu `ARG` apa pun; Vercel melakukan build di servernya sendiri dan otomatis
menyuntikkan env ke build step.

### C. Shared hosting / cPanel (Node.js App)

Isi lewat UI **"Environment Variables"** pada pengaturan aplikasi, atau taruh file
`.env.production` di root project sebelum build. Pastikan `npm run build` dijalankan
setelah env terpasang.

---

## Checklist Sebelum Deploy

- [ ] `NEXT_PUBLIC_SUPABASE_URL` terisi dan bisa diakses
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = key **anon/public**, bukan `service_role`
- [ ] `NEXT_PUBLIC_SITE_URL` memakai domain publik + `https://`, tanpa trailing slash
- [ ] `GOOGLE_GENERATIVE_AI_API_KEY` terisi dan kuota masih tersedia
- [ ] Di **Supabase → Authentication → URL Configuration**, `Site URL` dan
      `Redirect URLs` sudah mengarah ke domain publik Anda
      (minimal tambahkan `/auth/callback*`)
- [ ] `.env` tidak ikut ter-commit ke repository (sudah ada di `.gitignore` & `.dockerignore`)
- [ ] Semua key yang pernah pernah ter-expose (commit, paste di chat, screenshot)
      sudah di-**rotate/revoke** di dashboard masing-masing provider

---

## Troubleshooting

| Gejala | Penyebab & Solusi |
|---|---|
| `TypeError: Cannot read properties of undefined` saat create Supabase client | `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` kosong di **build stage**. Pastikan `--build-arg` diteruskan. |
| Link reset password mengarah ke `localhost` | `NEXT_PUBLIC_SITE_URL` belum diisi atau tidak terbaca. |
| `/api/chat` balas 500 dengan pesan API key | `GOOGLE_GENERATIVE_AI_API_KEY` belum di-set di runtime container. |
| Perubahan env tidak terlihat setelah rebuild | Nilai `NEXT_PUBLIC_*` ter-cache di build lama. Wajib **build ulang**, bukan hanya restart container. |
| Login Google/GitHub gagal | Redirect URL di Supabase belum mendaftarkan domain production. |
