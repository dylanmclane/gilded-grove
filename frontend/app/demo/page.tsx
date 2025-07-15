"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icon SVGs
const EstateIcon = () => (
  <svg className="w-8 h-8 text-[#d6b86b] mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-7 9 7M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 001 1h3m-10 0h4" />
  </svg>
);
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg className="w-7 h-7 text-[#d6b86b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    )}
  </svg>
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
  const [aiQuery, setAiQuery] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", icon: EstateIcon, href: "/demo/dashboard" },
    { label: "Assets", icon: EstateIcon, href: "/demo/assets" },
    { label: "Documents", icon: EstateIcon, href: "/demo/documents" },
    { label: "Contacts", icon: EstateIcon, href: "/demo" }, // Demo as Contacts placeholder
    { label: "Reports", icon: EstateIcon, href: "/demo/reports" },
    { label: "Settings", icon: EstateIcon, href: "/demo/settings" },
  ] as const;

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
    setAiQuery(aiInput);
    setAiResponse(
      `I'm your estate assistant. (This is a demo response for: "${aiInput}")`
    );
    setAiInput("");
  }

  return (
    <main className={
      `min-h-screen flex ` +
      (darkMode ? "bg-[#18191a]" : "bg-[#f4f5f7]")
    }>
      {/* Sidebar */}
      <nav
        className={
          `transition-all duration-300 shadow-lg flex flex-col py-8 px-3 ${sidebarOpen ? "w-60" : "w-16"} min-h-screen z-30 rounded-r-3xl border-r ` +
          (darkMode ? "bg-[#23272f] border-[#23272f]" : "bg-white border-[#ececec]")
        }
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)' }}
      >
        {/* Dark mode toggle */}
        <div className="flex items-center justify-center mb-8">
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
        <button
          className="mb-8 flex items-center justify-center rounded-full hover:bg-[#f2f2f7] transition p-2"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label={sidebarOpen ? "Collapse menu" : "Expand menu"}
        >
          <HamburgerIcon open={sidebarOpen} />
        </button>
        <div className="flex flex-col gap-2">
          {navLinks.map((nav) => {
            const { label, icon: Icon, href } = nav;
            return (
              <Link
                key={label}
                href={href}
                className={
                  `flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition w-full ${sidebarOpen ? "justify-start" : "justify-center"} ` +
                  (darkMode ?
                    (pathname === href ? "bg-[#18191a] text-[#f7f8fa]" : "text-[#f7f8fa] hover:bg-[#23272f]") :
                    (pathname === href ? "bg-[#e5e5ea] text-gray-900" : "text-gray-800 hover:bg-[#f2f2f7]")
                  )
                }
                style={{ fontSize: sidebarOpen ? '1.1rem' : '1.3rem', minHeight: 48 }}
              >
                <Icon />
                {sidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Main Dashboard Content */}
      <div className={`flex-1 flex flex-col items-center py-12 px-4 ` + (darkMode ? "bg-[#18191a]" : "bg-[#f4f5f7]")}>
        <div className={`w-full max-w-2xl rounded-3xl shadow-xl p-8 border flex flex-col min-h-[80vh] ` + (darkMode ? "bg-[#23272f] border-[#35373b]" : "bg-[#fcfcfd] border-[#ececec]")} style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.08)' }}>
          {/* Dashboard Header */}
          <header className="mb-8 text-center flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <EstateIcon />
              <h1 className={`text-3xl font-serif font-bold tracking-tight ` + (darkMode ? "text-[#f7f8fa]" : "text-gray-900")}>The Greenwood Family Dashboard</h1>
            </div>
            <p className={darkMode ? "text-gray-400 text-lg" : "text-gray-500 text-lg"}>A clean, modern dashboard for managing your estate&apos;s assets.</p>
          </header>
          {/* Common Access Buttons */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Assets</button>
            <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Documents</button>
            <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Contacts</button>
            <button className={`rounded-xl px-5 py-2 font-semibold shadow-sm transition border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec] hover:bg-[#e5e5ea]'}`}>Reports</button>
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
                className={`input input-bordered w-full mb-3 rounded-xl border bg-white focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] text-gray-900'}`}
                placeholder="Name"
                value={form.name || ""}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <input
                className={`input input-bordered w-full mb-3 rounded-xl border bg-white focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] text-gray-900'}`}
                placeholder="Type"
                value={form.type || ""}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <input
                className={`input input-bordered w-full mb-3 rounded-xl border bg-white focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] text-gray-900'}`}
                placeholder="Value"
                value={form.value || ""}
                onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <input
                className={`input input-bordered w-full mb-3 rounded-xl border bg-white focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] text-gray-900'}`}
                placeholder="Location"
                value={form.location || ""}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className={`rounded-xl px-5 py-2 font-semibold shadow transition w-full ${darkMode ? 'bg-[#007aff] text-white hover:bg-[#005ecb]' : 'bg-[#007aff] text-white hover:bg-[#005ecb]'}`} style={{ minHeight: 44, fontSize: 16 }}>Save</button>
                <button type="button" className={`rounded-xl px-5 py-2 font-semibold shadow transition w-full ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border border-[#35373b] hover:bg-[#18191a]' : 'bg-[#f2f2f7] text-gray-800 border border-[#ececec] hover:bg-[#e5e5ea]'}`} style={{ minHeight: 44, fontSize: 16 }} onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          )}
          {/* AI Input Section */}
          <div className="mt-auto flex flex-col items-center pt-8">
            <form onSubmit={handleAISubmit} className="w-full max-w-md flex gap-2">
              <input
                className={`input input-bordered flex-1 text-lg px-4 py-3 rounded-xl border focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff] placeholder:text-gray-400 ${darkMode ? 'border-[#35373b] bg-[#23272f] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900'}`}
                placeholder="How can I help?"
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                required
                style={{ minHeight: 44, fontSize: 16 }}
              />
              <button type="submit" className={`rounded-xl px-6 text-lg font-semibold shadow transition ${darkMode ? 'bg-[#007aff] text-white hover:bg-[#005ecb]' : 'bg-[#007aff] text-white hover:bg-[#005ecb]'}`} style={{ minHeight: 44 }}>Ask</button>
            </form>
            {aiQuery && (
              <div className={`mt-6 w-full max-w-md rounded-2xl shadow p-4 border ${darkMode ? 'bg-[#18191a] border-[#35373b]' : 'bg-[#f7f8fa] border-[#ececec]'}`}>
                <div className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className={`font-semibold ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-700'}`}>You:</span> {aiQuery}</div>
                <div className={darkMode ? 'text-[#f7f8fa]' : 'text-gray-700'}><span className="font-semibold text-[#007aff]">AI:</span> {aiResponse}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 