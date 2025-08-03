"use client";
import { useState, useEffect } from "react";

export default function ReportsPage() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("gg_dark_mode");
    if (stored) setDarkMode(stored === "true");
  }, []);
  return (
    <main className={
      `min-h-screen flex items-center justify-center ` +
      (darkMode ? "bg-[#18191a]" : "bg-[#f4f5f7]")
    }>
      <div className={`w-full max-w-2xl rounded-3xl shadow-xl p-8 border flex flex-col min-h-[60vh] ` + (darkMode ? "bg-[#23272f] border-[#35373b]" : "bg-[#fcfcfd] border-[#ececec]")}>
        <h1 className={`text-3xl font-serif font-bold tracking-tight mb-4 ` + (darkMode ? "text-[#f7f8fa]" : "text-gray-900")}>Reports</h1>
        <p className={darkMode ? "text-gray-400 text-lg" : "text-gray-500 text-lg"}>View estate reports here. This is a placeholder page.</p>
      </div>
    </main>
  );
} 