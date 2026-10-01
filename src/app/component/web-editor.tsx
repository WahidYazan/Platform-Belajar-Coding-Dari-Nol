"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Copy, Check, Sparkles, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebEditorProps {
  initialCode: string;
  lang?: string;
  filename?: string;
  title?: string;
  isCombo?: boolean;
}

export function WebEditor({
  initialCode,
  lang = "html",
  filename = "index.html",
  title,
  isCombo = false,
}: WebEditorProps) {
  const cleanLang = (lang || "html").toLowerCase();
  const isHtmlOrCss = cleanLang === "html" || cleanLang === "css";
  const isJs = cleanLang === "javascript" || cleanLang === "js";

  // Build runnable iframe HTML
  const buildSrcDoc = (srcCode: string) => {
    if (isHtmlOrCss) {
      // If code is pure CSS or has no doctype/body, wrap it nicely with basic boilerplate
      if (cleanLang === "css" || (!srcCode.includes("<body") && !srcCode.includes("<html") && !srcCode.includes("<h1") && !srcCode.includes("<div") && !srcCode.includes("<p"))) {
        const cssContent = cleanLang === "css" ? srcCode : "";
        const hasCss = cssContent.trim().length > 0;
        return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; color: #121212; background: #fffdf5; margin: 0; }
    .demo-box {
      border: 3px solid #000;
      padding: 20px;
      margin: 20px 0;
      background: white;
      box-shadow: 4px 4px 0px 0px #000;
    }
    .demo-text {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .demo-button {
      padding: 12px 24px;
      border: 2px solid black;
      background: #ffde59;
      font-weight: bold;
      cursor: pointer;
      margin-right: 10px;
    }
    ${cssContent}
  </style>
</head>
<body>
  <h2>Preview CSS</h2>
  <p>${hasCss ? 'Styling CSS telah diaplikasikan ke halaman ini.' : 'Tulis CSS di editor untuk melihat hasilnya di sini.'}</p>
  <div class="demo-box">
    <div class="demo-text">Contoh Elemen untuk Edit CSS</div>
    <button class="demo-button">Tombol 1</button>
    <button class="demo-button">Tombol 2</button>
    <p style="margin-top: 15px;">Edit CSS di sebelah kiri untuk mengubah style elemen ini!</p>
  </div>
</body>
<script>
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
</script>
</html>`;
      }

      // If it's HTML, inject Neobrutalist mini styling support if not already present
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { 
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
      padding: 1.25rem; 
      margin: 0; 
      color: #121212; 
      background: #ffffff;
      line-height: 1.5;
    }
    a { color: #ff5b79; font-weight: bold; }
    button { cursor: pointer; }
    header { border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
    nav a { margin-right: 12px; }
    footer { border-top: 2px solid #000; padding-top: 8px; margin-top: 20px; font-size: 0.85em; }
  </style>
</head>
<body>
  ${srcCode.includes("<html") ? srcCode : srcCode}
</body>
<script>
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
</script>
</html>`;
    }

    if (isJs) {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: monospace; padding: 1rem; color: #121212; background: #fafafa; font-size: 13px; }
    .log-item { padding: 4px 0; border-bottom: 1px solid #eee; }
    .log-error { color: #dc2626; font-weight: bold; }
    .log-info { color: #2563eb; }
  </style>
</head>
<body>
  <div id="console-logs"></div>
  <script>
    const logContainer = document.getElementById('console-logs');
    function appendLog(msg, type = 'info') {
      const p = document.createElement('div');
      p.className = 'log-item ' + (type === 'error' ? 'log-error' : 'log-info');
      p.textContent = msg;
      logContainer.appendChild(p);
      window.parent.postMessage({ type: 'CONSOLE_LOG', message: msg }, '*');
    }
    console.log = function(...args) {
      appendLog(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    console.error = function(...args) {
      appendLog(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), 'error');
    };
    window.onerror = function(message, source, lineno, colno, error) {
      appendLog('Error [' + lineno + ':' + colno + ']: ' + message, 'error');
      return true;
    };
    try {
      ${srcCode}
    } catch (err) {
      appendLog('Runtime Error: ' + err.message, 'error');
    }
  </script>
</body>
</html>`;
    }

    // Default runner for other languages (Python, PHP, etc.)
    return `<!DOCTYPE html>
<html>
<body style="font-family: monospace; padding: 1.5rem; background: #18181b; color: #4deeea;">
  <pre>${srcCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body>
</html>`;
  };

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(() => buildSrcDoc(initialCode));
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(buildSrcDoc(code));
    setTimeout(() => setIsRunning(false), 300);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(buildSrcDoc(initialCode));
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-8 overflow-hidden rounded-2xl border-3 border-black shadow-[6px_6px_0px_0px_#000000] transition-all ${
        isCombo ? "bg-[#fffdf5] ring-4 ring-[#ff5b79]/30" : "bg-[#18181b]"
      }`}
    >
      {/* VSCode Window Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-black bg-[#27272a] px-4 py-2.5 gap-2 select-none">
        {/* Window controls & Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full border border-black bg-[#ff5b79]" />
            <span className="size-3 rounded-full border border-black bg-[#ffde59]" />
            <span className="size-3 rounded-full border border-black bg-[#4ade80]" />
          </div>

          <div className="flex items-center gap-2 pl-2">
            <span className="rounded border-2 border-black bg-[#38bdf8] px-2 py-0.5 text-[10px] font-black uppercase text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
              VSCODE WEB
            </span>
            {isCombo && (
              <span className="animate-neo-pop rounded border-2 border-black bg-[#ff5b79] px-2 py-0.5 text-[10px] font-black uppercase text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
                🔥 COMBO PLAYGROUND
              </span>
            )}
            <span className="font-mono text-xs font-bold text-white/90 truncate max-w-[180px] sm:max-w-xs">
              {filename}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border-2 border-black bg-black/40 p-0.5">
            <button
              onClick={() => setActiveTab("code")}
              className={`rounded px-2.5 py-1 text-[11px] font-black uppercase transition-all ${
                activeTab === "code"
                  ? "bg-[#ffde59] text-black shadow-[1.5px_1.5px_0px_0px_#000000]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`rounded px-2.5 py-1 text-[11px] font-black uppercase transition-all ${
                activeTab === "preview"
                  ? "bg-[#4ade80] text-black shadow-[1.5px_1.5px_0px_0px_#000000]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Live Preview
            </button>
          </div>

          <Button
            size="xs"
            onClick={handleRun}
            className="border-2 border-black bg-[#ffde59] text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#000000] hover:bg-[#4ade80] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all gap-1"
          >
            <Play className={`size-3 stroke-[3] fill-black ${isRunning ? "animate-spin" : ""}`} />
            <span>Jalankan</span>
          </Button>

          <Button
            size="xs"
            variant="ghost"
            onClick={handleReset}
            title="Reset kode awal"
            className="border-2 border-black bg-white text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#000000] hover:bg-neutral-200"
          >
            <RotateCcw className="size-3 stroke-[2.5]" />
          </Button>

          <Button
            size="xs"
            variant="ghost"
            onClick={copyToClipboard}
            title="Salin kode"
            className="border-2 border-black bg-white text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#000000] hover:bg-[#4ade80]"
          >
            {copied ? <Check className="size-3 stroke-[3]" /> : <Copy className="size-3 stroke-[2.5]" />}
          </Button>

          <Button
            size="xs"
            variant="ghost"
            onClick={() => setIsFullScreen(!isFullScreen)}
            title={isFullScreen ? "Keluar dari Full Screen" : "Full Screen"}
            className="border-2 border-black bg-white text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ffde59]"
          >
            {isFullScreen ? <Minimize2 className="size-3 stroke-[2.5]" /> : <Maximize2 className="size-3 stroke-[2.5]" />}
          </Button>
        </div>
      </div>

      {title && (
        <div className="border-b-2 border-black bg-[#ffde59]/20 px-4 py-1.5 flex items-center justify-between text-xs font-bold text-black">
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-black" />
            {title}
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-black/70">
            {isCombo ? "GABUNGAN SEMUA KODE (COMBO)" : "UJI COBA INTERAKTIF"}
          </span>
        </div>
      )}

      {/* Editor & Preview Split Grid */}
      <div className={`grid ${isFullScreen ? 'grid-cols-1' : 'grid-cols-1'} min-h-75`}>
        {/* Code Input Area */}
        <div
          className={`${
            activeTab === "code" ? "block" : "hidden"
          } col-span-1 border-b-3 border-black bg-[#18181b] p-3 flex flex-col`}
        >
          <div className="mb-2 flex items-center justify-between text-[11px] font-mono font-bold text-white/60">
            <span>{"// Tulis atau edit kodenya di bawah:"}</span>
            <span>{code.split("\n").length} baris</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setOutput(buildSrcDoc(e.target.value));
            }}
            spellCheck={false}
            placeholder="// Ketik kode di sini untuk mulai belajar...
// Contoh HTML:
// <h1>Halo Dunia!</h1>
// <p>Belajar coding itu seru!</p>

// Contoh CSS:
// body {
//   background: #ffde59;
//   color: black;
// }"
            className="w-full flex-1 min-h-[220px] resize-y rounded-lg border-2 border-black/80 bg-[#09090b] p-3 font-mono text-xs leading-relaxed text-[#4deeea] placeholder-white/30 outline-none focus:border-[#ffde59] focus:ring-1 focus:ring-[#ffde59]"
          />
        </div>

        {/* Live Browser Output Area */}
        <div
          className={`${
            activeTab === "preview" ? "block" : "hidden"
          } col-span-1 bg-white p-3 flex flex-col`}
        >
          {/* Mock Browser Header */}
          <div className="mb-2 flex items-center justify-between rounded-md border-2 border-black bg-[#fffdf5] px-3 py-1 shadow-[2px_2px_0px_0px_#000000]">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-black">
              <span className="size-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span>Browser Output</span>
            </div>
            <span className="font-mono text-[10px] text-black/60 truncate max-w-[160px]">
              localhost:3000/{filename}
            </span>
          </div>

          {/* Iframe View */}
          <div className="relative flex-1 min-h-[220px] rounded-lg border-2 border-black bg-white overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            <iframe
              srcDoc={output}
              title="VSCode Live Preview"
              sandbox="allow-scripts allow-modals"
              className="size-full min-h-[220px] border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
