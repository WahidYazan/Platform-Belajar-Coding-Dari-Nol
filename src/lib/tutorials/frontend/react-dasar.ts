import type { Tutorial } from "../types"

export const reactDasar: Tutorial = {
    slug: "react-dasar",
    title: "React Dasar: Component & Props",
    description:
      "Bangun antarmuka dengan komponen yang bisa dipakai ulang, kenali JSX, props, dan state.",
    category: "React",
    level: "Menengah",
    minutes: 16,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "React adalah library JavaScript untuk membangun antarmuka pengguna. Idenya sederhana tapi revolusioner: semua yang kamu lihat adalah komponen fungsi JavaScript yang mengembalikan UI.",
      },
      { type: "h2", text: "Komponen pertama" },
      {
        type: "code",
        lang: "jsx",
        filename: "App.jsx",
        code: `// Komponen: fungsi yang mengembalikan JSX
function Welcome() {
  return <h1>Selamat datang di aplikasiku!</h1>;
}

// JSX = JavaScript + HTML. Eksekusi di dalam {}
function App() {
  const name = "Budi";
  return (
    <div>
      <Welcome />
      <p>Halo, {name}!</p>
      <p>{1 + 2} orang online</p>
    </div>
  );
}

export default App;`,
      },
      {
        type: "list",
        items: [
          "Komponen dimulai dengan huruf kapital (Welcome, App) wajib untuk membedakan dari tag HTML.",
          "JSX memungkinkan menulis struktur UI seperti HTML di dalam JavaScript.",
          "Ekspresi JavaScript ditulis di dalam { }.",
          "Setiap komponen harus mengembalikan satu elemen akar.",
        ],
      },
      { type: "h2", text: "Props: data masuk ke komponen" },
      {
        type: "code",
        lang: "jsx",
        filename: "UserCard.jsx",
        code: `function UserCard({ name, role, isActive }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
      {isActive && <span className="badge">Aktif</span>}
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard name="Budi" role="Frontend Dev" isActive={true} />
      <UserCard name="Sari" role="Backend Dev" isActive={false} />
    </div>
  );
}`,
      },
      {
        type: "callout",
        title: "Props itu read-only",
        tone: "warning",
        text: "Komponen tidak boleh mengubah props-nya sendiri. Props hanya dari orang tua ke anak (one-way). Jika data perlu berubah, gunakan state.",
      },
      { type: "h2", text: "State: data yang bisa berubah" },
      {
        type: "code",
        lang: "jsx",
        filename: "Counter.jsx",
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Hitungan: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Tambah
      </button>
    </div>
  );
}`,
      },
      {
        type: "list",
        items: [
          "useState(0) menyimpan nilai awal 0 dan mengembalikan [nilai, setter].",
          "Jangan ubah state langsung (count++) selalu pakai setter (setCount).",
          "Saat state berubah, komponen di-render ulang otomatis.",
          "Inilah kekuatan React: UI selalu sinkron dengan data.",
        ],
      },
      { type: "h2", text: "Render list dengan map" },
      {
        type: "code",
        lang: "jsx",
        filename: "TodoList.jsx",
        code: `const todos = [
  { id: 1, title: "Belajar React" },
  { id: 2, title: "Buat project" },
];

function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "callout",
        title: "Kenapa key?",
        text: "key memberi React cara mengidentifikasi setiap item sehingga render ulang efisien. Selalu pakai id unik, jangan index array.",
      },
      {
        type: "p",
        text: "Konsep component, props, dan state ini adalah segalanya di React. Setelah nyaman, lanjut ke useEffect dan data fetching, lalu pelajari Next.js sebagai framework produksi.",
      },
    ],
  }
