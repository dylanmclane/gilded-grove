"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard
} from 'lucide-react';

// Icon components with consistent styling
const DashboardIcon = () => (
  <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);

type Asset = {
  id: number;
  name: string;
  type: string;
  value: string;
  location: string;
};

const initialAssets: Asset[] = [
  { id: 1, name: "Greenwood Estate", type: "Property", value: "$2,500,000", location: "Napa Valley, CA" },
  { id: 2, name: "Vintage Watch Collection", type: "Collectible", value: "$120,000", location: "Main Vault" },
];

export default function DemoEstateMVP() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Asset>>({});
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Optional: persist dark mode in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("gg_dark_mode");
    if (stored) setDarkMode(stored === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("gg_dark_mode", darkMode ? "true" : "false");
  }, [darkMode]);

  function handleSaveAsset(e: React.FormEvent) {
    e.preventDefault();
    if (form.name && form.type && form.value && form.location) {
      setAssets([
        ...assets,
        { id: Date.now(), name: form.name, type: form.type, value: form.value, location: form.location }
      ]);
      setShowForm(false);
      setForm({});
    }
  }

  function handleAISubmit(e: React.FormEvent) {
    e.preventDefault();
    setAiResponse(
      `I'm your estate assistant. (This is a demo response for: "${aiInput}")`
    );
    setAiInput("");
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#18191a]" : "bg-[#f4f5f7]"}`}>
      {/* Dark mode toggle */}
      <div className="flex justify-end p-4">
        <button
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition font-medium text-sm shadow-sm border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec]'} hover:brightness-110`}
          onClick={() => setDarkMode(dm => !dm)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <span role="img" aria-label="moon">🌙</span>
          ) : (
            <span role="img" aria-label="sun">☀️</span>
          )}
          <span className="hidden md:inline">{darkMode ? "Light" : "Dark"} Mode</span>
        </button>
      </div>

      {/* Main Dashboard Content */}
      <div className={`flex flex-col items-center py-12 px-4 ${darkMode ? "bg-[#18191a]" : "bg-[#f4f5f7]"}`}>
        <div className={`w-full max-w-2xl rounded-3xl shadow-xl p-8 border flex flex-col min-h-[80vh] ${darkMode ? "bg-[#23272f] border-[#35373b]" : "bg-[#fcfcfd] border-[#ececec]"}`} style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.08)' }}>
          {/* Dashboard Header */}
          <header className="mb-8 text-center flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <DashboardIcon />
              <h1 className={`text-3xl font-serif font-bold tracking-tight ${darkMode ? "text-[#f7f8fa]" : "text-gray-900"}`}>The Greenwood Family Dashboard</h1>
            </div>
            <p className={darkMode ? "text-gray-400 text-lg" : "text-gray-500 text-lg"}>A clean, modern dashboard for managing your estate&apos;s assets.</p>
          </header>
          {/* Common Access Buttons */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <Link href="/demo/assets">
              <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Assets</button>
            </Link>
            <Link href="/demo/documents">
              <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Documents</button>
            </Link>
            <Link href="/demo/contacts">
              <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Contacts</button>
            </Link>
            <Link href="/demo/reports">
              <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Reports</button>
            </Link>
          </div>
          {/* Asset Table */}
          <div className={`overflow-x-auto rounded-2xl shadow-sm mb-8 border ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-[#fafafd]'}`}>
            <table className="table w-full">
              <thead>
                <tr className={darkMode ? "bg-[#23272f] text-gray-300" : "bg-[#f2f2f7] text-gray-700"}>
                  <th className="py-3">Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {assets.map(asset => (
                  <tr key={asset.id} className={darkMode ? "hover:bg-[#18191a] transition" : "hover:bg-[#f2f2f7] transition"}>
                    <td className={`font-medium py-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>{asset.name}</td>
                    <td className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{asset.type}</td>
                    <td className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{asset.value}</td>
                    <td className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{asset.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showForm && (
            <form onSubmit={handleSaveAsset} className={`rounded-2xl shadow p-6 max-w-md mx-auto mb-8 border ${darkMode ? 'bg-[#18191a] border-[#35373b]' : 'bg-[#f7f8fa] border-[#ececec]'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>Add New Asset</h3>
              <input
                className={`input input-bordered w-full mb-3 rounded-xl border focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                placeholder="Name"
                value={form.name || ""}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <input
                className={`input input-bordered w-full mb-3 rounded-xl border focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                placeholder="Type"
                value={form.type || ""}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <input
                className={`input input-bordered w-full mb-3 rounded-xl border focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                placeholder="Value"
                value={form.value || ""}
                onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <input
                className={`input input-bordered w-full mb-3 rounded-xl border focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                placeholder="Location"
                value={form.location || ""}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className={`rounded-xl px-5 py-2 font-semibold shadow transition w-full ${darkMode ? 'bg-[#007aff] text-white hover:bg-[#005ecb]' : 'bg-[#007aff] text-white hover:bg-[#005ecb]'}`} style={{ minHeight: 44, fontSize: 16 }}>Save</button>
                <button type="button" onClick={() => setShowForm(false)} className={`rounded-xl px-5 py-2 font-semibold shadow transition w-full ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border border-[#ececec] hover:bg-[#e5e5ea]'}`} style={{ minHeight: 44, fontSize: 16 }}>Cancel</button>
              </div>
            </form>
          )}
          {!showForm && (
            <div className="flex justify-center">
              <button onClick={() => setShowForm(true)} className={`rounded-xl px-6 py-3 font-semibold shadow transition ${darkMode ? 'bg-[#007aff] text-white hover:bg-[#005ecb]' : 'bg-[#007aff] text-white hover:bg-[#005ecb]'}`} style={{ minHeight: 44, fontSize: 16 }}>
                + Add Asset
              </button>
            </div>
          )}
          {/* AI Assistant */}
          <div className={`mt-8 rounded-2xl shadow-sm border p-6 ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-[#fafafd]'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>AI Assistant</h3>
            <form onSubmit={handleAISubmit} className="flex gap-2">
              <input
                className={`flex-1 rounded-xl border px-4 py-2 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                placeholder="Ask about your assets..."
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <button type="submit" className={`rounded-xl px-6 py-2 font-semibold shadow transition ${darkMode ? 'bg-[#007aff] text-white hover:bg-[#005ecb]' : 'bg-[#007aff] text-white hover:bg-[#005ecb]'}`} style={{ minHeight: 44, fontSize: 16 }}>
                Ask
              </button>
            </form>
            {aiResponse && (
              <div className={`mt-4 p-4 rounded-xl ${darkMode ? 'bg-[#18191a] border border-[#35373b]' : 'bg-white border border-[#ececec]'}`}>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{aiResponse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 