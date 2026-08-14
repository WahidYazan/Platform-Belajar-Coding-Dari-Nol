import type { Tutorial } from "../types"

export const reactLanjutan: Tutorial = {
    slug: "react-lanjutan",
    title: "React Lanjutan: useEffect & Data Fetching",
    description:
      "Sinkronkan komponen dengan dunia luar: useEffect, mengambil data dari API, loading state, dan error handling.",
    category: "React",
    level: "Menengah",
    minutes: 16,
    date: "2026-08-14",
    content: [
      {
        type: "p",
        text: "useState mengelola data di dalam komponen. Namun aplikasi nyata perlu berbicara dengan dunia luar: mengambil data dari server, mengikuti ukuran layar, atau menyimpan ke localStorage. Di sinilah useEffect bekerja.",
      },
      { type: "h2", text: "useEffect: kapan dipakai?" },
      {
        type: "p",
        text: "useEffect menjalankan kode setelah komponen di-render. Aturan sederhana: pakai untuk sinkronisasi dengan sistem luar (API, storage, event global) — bukan untuk menghitung data dari props/state.",
      },
      {
        type: "code",
        lang: "jsx",
        filename: "EffectDemo.jsx",
        code: `import { useState, useEffect } from "react";

function WindowTitle() {
  const [title, setTitle] = useState("Beranda");

  // Jalan setelah setiap render
  useEffect(() => {
    document.title = title;
  }, [title]); // hanya saat [title] berubah

  return <input value={title} onChange={(e) => setTitle(e.target.value)} />;
}`,
      },
      {
        type: "list",
        items: [
          "Tanpa array dependency → jalan setiap render.",
          "[title] → jalan hanya saat title berubah.",
          "[] → jalan sekali setelah mount.",
          "Cleanup (return di dalamnya) untuk berhenti berlangganan.",
        ],
      },
      { type: "h2", text: "Fetching data dengan benar" },
      {
        type: "code",
        lang: "jsx",
        filename: "UserList.jsx",
        code: `import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        const res = await fetch("https://api.contoh.com/users");
        if (!res.ok) throw new Error("Gagal memuat");
        const data = await res.json();

        // Cegah setState setelah komponen unmount
        if (!cancelled) {
          setUsers(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => { cancelled = true; }; // cleanup
  }, []);

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "callout",
        title: "Hindari infinite loop",
        tone: "warning",
        text: "Jangan taruh setState() di tubuh efek tanpa dependency yang benar — bisa memicu render → efek → render terus-menerus. Selalu pikirkan array dependency-mu.",
      },
      { type: "h2", text: "Pola: custom hook useFetch" },
      {
        type: "code",
        lang: "jsx",
        filename: "useFetch.js",
        code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const json = await res.json();
        if (!cancelled) { setData(json); setError(null); }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Pakai: const { data, loading, error } = useFetch("/api/users");`,
      },
      { type: "h2", text: "Controlled form & lifting state" },
      {
        type: "code",
        lang: "jsx",
        filename: "SearchBox.jsx",
        code: `function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        onSearch(e.target.value); // kirim ke atas
      }}
      placeholder="Cari..."
    />
  );
}

function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <SearchBox onSearch={setKeyword} />
      <p>Kamu mencari: {keyword}</p>
    </div>
  );
}`,
      },
      {
        type: "callout",
        title: "Saatnya ke Next.js",
        text: "useEffect + fetch bekerja, tapi ada tantangan: loading flicker, tidak SEO-friendly. Next.js menyelesaikannya dengan server components yang mengambil data di server. Lanjut ke tutorial Next.js.",
      },
    ],
  }
