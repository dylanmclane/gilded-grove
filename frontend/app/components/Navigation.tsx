'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Home
} from 'lucide-react';

// Icon components with consistent styling
const DashboardIcon = () => (
  <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);
const AssetsIcon = () => (
  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);
const DocumentsIcon = () => (
  <FileText className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);
const ContactsIcon = () => (
  <Users className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);
const ReportsIcon = () => (
  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);
const SettingsIcon = () => (
  <Settings className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);
const HomeIcon = () => (
  <Home className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="text-[#d6b86b]">
    {open ? (
      <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
    ) : (
      <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
    )}
  </div>
);

const navLinks = [
  { label: "Home", icon: HomeIcon, href: "/" },
  { label: "Dashboard", icon: DashboardIcon, href: "/demo" },
  { label: "Assets", icon: AssetsIcon, href: "/demo/assets" },
  { label: "Documents", icon: DocumentsIcon, href: "/demo/documents" },
  { label: "Contacts", icon: ContactsIcon, href: "/demo/contacts" },
  { label: "Reports", icon: ReportsIcon, href: "/demo/reports" },
  { label: "Settings", icon: SettingsIcon, href: "/demo/settings" },
] as const;

export default function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#181b2c] border border-[#d4af37]/60 shadow-lg lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        <HamburgerIcon open={sidebarOpen} />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full w-64 bg-[#181b2c] border-r border-[#d4af37]/60 shadow-xl flex flex-col py-8 px-3">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8 gap-3">
            {/* Golden Oak Tree with Clear GG Logo */}
            <div className="flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Oak crown/leaves background */}
                <path d="M24 8 C30 8 36 12 36 18 C36 24 30 28 24 28 C18 28 12 24 12 18 C12 12 18 8 24 8 Z" fill="#d4af37" opacity="0.8"/>
                
                {/* First "G" - clear letter shape */}
                <path d="M16 16 C16 12 20 8 24 8 C28 8 32 12 32 16 L32 20 C32 24 28 28 24 28 L20 28 L20 24 L24 24 C26 24 28 22 28 20 C28 18 26 16 24 16 L20 16 L20 12 L24 12 C26 12 28 14 28 16 L32 16" fill="#8b7355" stroke="#6b5b3f" strokeWidth="1"/>
                
                {/* Second "G" - clear letter shape */}
                <path d="M32 16 C36 16 40 20 40 24 C40 28 36 32 32 32 L28 32 L28 28 L32 28 C34 28 36 26 36 24 C36 22 34 20 32 20 L28 20 L28 16 L32 16" fill="#bfa14a" stroke="#8b7355" strokeWidth="1"/>
                
                {/* Tree trunk base */}
                <path d="M20 32 L28 32 L28 40 L20 40 Z" fill="#8b7355" stroke="#6b5b3f" strokeWidth="1"/>
                
                {/* Leaf accents */}
                <path d="M18 12 C20 10 24 10 26 12 C24 14 20 14 18 12 Z" fill="#bfa14a"/>
                <path d="M30 12 C32 10 36 10 38 12 C36 14 32 14 30 12 Z" fill="#bfa14a"/>
                
                {/* Acorns */}
                <ellipse cx="22" cy="36" rx="1" ry="1.5" fill="#d4af37"/>
                <ellipse cx="26" cy="36" rx="1" ry="1.5" fill="#d4af37"/>
                <path d="M22 35 L22 33 L23 33 L23 35 Z" fill="#8b7355"/>
                <path d="M26 35 L26 33 L27 33 L27 35 Z" fill="#8b7355"/>
              </svg>
            </div>
            <div className="text-[#d4af37] font-serif text-xl font-bold">Gilded Grove</div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 flex-1">
            {navLinks.map((nav) => {
              const { label, icon: Icon, href } = nav;
              const isActive = pathname === href;
              
              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition w-full ${
                    isActive 
                      ? "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40" 
                      : "text-gray-300 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Signup Link */}
          <div className="mt-auto pt-4 border-t border-[#d4af37]/20">
            <Link
              href="/signup"
              className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition w-full text-gray-300 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-sm">Request Invitation</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
} 