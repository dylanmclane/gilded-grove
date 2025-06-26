"use client";

import { useState } from "react";

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
const navItems = [
  { label: "Dashboard", icon: EstateIcon },
  { label: "Assets", icon: EstateIcon },
  { label: "Documents", icon: EstateIcon },
  { label: "Contacts", icon: EstateIcon },
  { label: "Reports", icon: EstateIcon },
  { label: "Settings", icon: EstateIcon },
];

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

  function handleAddAsset() {
    setShowForm(true);
    setForm({});
  }

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
    <main className="min-h-screen bg-gradient-to-br from-[#232a23] via-[#2e332e] to-[#b7e4c7] flex">
      {/* Sidebar */}
      <nav
        className={`transition-all duration-300 bg-base-200/90 border-r border-base-300/60 shadow-xl flex flex-col py-8 px-3
          ${sidebarOpen ? "w-56" : "w-16"} min-h-screen z-30`}
      >
        <button
          className="mb-8 flex items-center justify-center rounded-full hover:bg-[#d6b86b]/10 transition p-2"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label={sidebarOpen ? "Collapse menu" : "Expand menu"}
        >
          <HamburgerIcon open={sidebarOpen} />
        </button>
        <div className="flex flex-col gap-2">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-base-content/90 hover:bg-[#d6b86b]/10 transition w-full ${sidebarOpen ? "justify-start" : "justify-center"}`}
            >
              <Icon />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </div>
      </nav>
      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl bg-base-200/80 rounded-2xl shadow-2xl p-8 border border-base-300/60 flex flex-col min-h-[80vh]">
          {/* Dashboard Header */}
          <header className="mb-8 text-center flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <EstateIcon />
              <h1 className="text-4xl font-serif font-bold text-[#d6b86b] tracking-wider">The Greenwood Family Dashboard</h1>
            </div>
            <p className="text-base-content/70 text-lg">A luxury-inspired MVP for managing your estate's assets.</p>
          </header>
          {/* Common Access Buttons */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <button className="btn btn-outline border-[#d6b86b] text-[#d6b86b] hover:bg-[#d6b86b]/10">Assets</button>
            <button className="btn btn-outline border-[#d6b86b] text-[#d6b86b] hover:bg-[#d6b86b]/10">Documents</button>
            <button className="btn btn-outline border-[#d6b86b] text-[#d6b86b] hover:bg-[#d6b86b]/10">Contacts</button>
            <button className="btn btn-outline border-[#d6b86b] text-[#d6b86b] hover:bg-[#d6b86b]/10">Reports</button>
          </div>
          {/* Asset Table */}
          <div className="overflow-x-auto rounded-xl shadow mb-8">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-300/60">
                  <th>Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {assets.map(asset => (
                  <tr key={asset.id}>
                    <td className="font-medium">{asset.name}</td>
                    <td>{asset.type}</td>
                    <td>{asset.value}</td>
                    <td>{asset.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showForm && (
            <form onSubmit={handleSaveAsset} className="bg-base-100/90 rounded-xl shadow-lg p-6 max-w-md mx-auto mb-8 border border-base-300/40">
              <h3 className="text-lg font-semibold mb-4 text-[#d6b86b]">Add New Asset</h3>
              <input
                className="input input-bordered w-full mb-3"
                placeholder="Name"
                value={form.name || ""}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                className="input input-bordered w-full mb-3"
                placeholder="Type"
                value={form.type || ""}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                required
              />
              <input
                className="input input-bordered w-full mb-3"
                placeholder="Value"
                value={form.value || ""}
                onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                required
              />
              <input
                className="input input-bordered w-full mb-3"
                placeholder="Location"
                value={form.location || ""}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          )}
          {/* AI Input Section */}
          <div className="mt-auto flex flex-col items-center pt-8">
            <form onSubmit={handleAISubmit} className="w-full max-w-md flex gap-2">
              <input
                className="input input-bordered flex-1 text-lg px-4 py-3 rounded-full bg-base-100/90 border-[#d6b86b] focus:border-[#228B22] focus:ring-2 focus:ring-[#228B22] placeholder:text-base-content/60"
                placeholder="How can I help?"
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-accent rounded-full px-6 text-lg font-semibold bg-gradient-to-r from-[#d6b86b] via-[#b7e4c7] to-[#228B22] border-none text-[#232a23] hover:brightness-110 shadow-xl">
                Ask
              </button>
            </form>
            {aiQuery && (
              <div className="mt-6 w-full max-w-md bg-base-100/80 rounded-xl shadow p-4 border border-base-300/30">
                <div className="text-base-content/70 mb-2"><span className="font-semibold text-base-content">You:</span> {aiQuery}</div>
                <div className="text-base-content/80"><span className="font-semibold text-[#d6b86b]">AI:</span> {aiResponse}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 