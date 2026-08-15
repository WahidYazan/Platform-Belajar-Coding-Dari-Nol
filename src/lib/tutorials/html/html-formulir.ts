import type { Tutorial } from "../types"

export const htmlFormulir: Tutorial = {
    slug: "html-formulir",
    title: "HTML Lanjutan: Form, Tabel & Media",
    description:
      "Pelajari input form, tabel data, dan elemen media — komponen penting website nyata yang jarang dibahas di tutorial dasar.",
    category: "HTML",
    level: "Pemula",
    minutes: 13,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "Halaman statis saja tidak cukup — website nyata butuh form (pendaftaran, pencarian, komentar), tabel (data, harga), dan media (gambar, video). Tutorial ini melengkapi HTML dasarmu.",
      },
      { type: "h2", text: "Form & input" },
      {
        type: "p",
        text: "Form adalah jembatan antara pengguna dan server. Setiap input wajib punya atribut name — inilah kunci data yang dikirim.",
      },
      {
        type: "code",
        lang: "html",
        filename: "form.html",
        code: `<form action="/register" method="post">
  <div>
    <label for="nama">Nama</label>
    <input
      type="text"
      id="nama"
      name="nama"
      placeholder="Nama lengkap"
      required
    />
  </div>

  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
  </div>

  <div>
    <label for="umur">Umur</label>
    <input type="number" id="umur" name="umur" min="13" max="100" />
  </div>

  <div>
    <label for="kota">Kota</label>
    <select id="kota" name="kota">
      <option value="jakarta">Jakarta</option>
      <option value="bandung">Bandung</option>
      <option value="surabaya">Surabaya</option>
    </select>
  </div>

  <div>
    <label for="pesan">Pesan</label>
    <textarea id="pesan" name="pesan" rows="4"></textarea>
  </div>

  <button type="submit">Daftar</button>
</form>`,
      },
      {
        type: "list",
        items: [
          "type=\"email\"/\"number\" — browser memvalidasi otomatis.",
          "required — input wajib diisi.",
          "label + for/id — wajib untuk aksesibilitas (dan bisa diklik untuk fokus).",
          "name — nama field saat data dikirim ke server.",
        ],
      },
      { type: "h2", text: "Tabel data" },
      {
        type: "code",
        lang: "html",
        filename: "tabel.html",
        code: `<table>
  <thead>
    <tr>
      <th>Materi</th>
      <th>Durasi</th>
      <th>Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML Dasar</td>
      <td>4 minggu</td>
      <td>Pemula</td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>6 minggu</td>
      <td>Pemula</td>
    </tr>
  </tbody>
</table>`,
      },
      {
        type: "p",
        text: "Tabel dipakai untuk data terstruktur (bukan layout!). Gunakan <thead> untuk baris judul dan <tbody> untuk data. Tambahkan CSS border-collapse agar rapi.",
      },
      { type: "h2", text: "Media: gambar, audio, video" },
      {
        type: "code",
        lang: "html",
        filename: "media.html",
        code: `<!-- Gambar: alt wajib untuk aksesibilitas -->
<img
  src="profil.jpg"
  alt="Foto profil Budi"
  width="200"
  loading="lazy"
/>

<!-- Audio -->
<audio controls src="suara.mp3"></audio>

<!-- Video -->
<video controls width="480" src="tutorial.mp4"></video>`,
      },
      {
        type: "list",
        items: [
          "loading=\"lazy\" — gambar dimuat hanya saat mendekati layar (performa).",
          "controls — menampilkan tombol play/pause.",
          "Selalu sediakan atribut alt yang menjelaskan isi gambar.",
        ],
      },
      {
        type: "callout",
        title: "Validasi bukan pengganti server",
        tone: "warning",
        text: "Validasi browser (required, type=email) hanya untuk pengalaman pengguna. Penjahat bisa mengirim data apa pun langsung ke server. Validasi sejati harus dilakukan di server/backend.",
      },
      {
        type: "p",
        text: "Dengan form, tabel, dan media, kamu sudah bisa membangun halaman nyata. Langkah berikutnya: hiasi semuanya dengan CSS.",
      },
    ],
  }
