'use client';

import { BarChart3 } from 'lucide-react';

const ReportsIcon = () => (
  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
);

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] pt-16 lg:pt-0">
      <div className="flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl rounded-3xl shadow-xl p-8 border bg-[#fcfcfd] border-[#ececec]">
          <header className="mb-8 text-center flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <ReportsIcon />
              <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900">Reports</h1>
            </div>
            <p className="text-gray-500 text-lg">Generate insights and reports on your estate.</p>
          </header>
          <div className="text-center text-gray-600">
            <p>Reporting features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 