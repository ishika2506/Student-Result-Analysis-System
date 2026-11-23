import React from 'react';
import { GraduationCap, BarChart3, UploadCloud, Search, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: 'overview' | 'upload' | 'search';
  setActiveTab: (tab: 'overview' | 'upload' | 'search') => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onResetData }) => {
  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 pt-3 pb-2">
      <div className="max-w-7xl mx-auto h-14 glass px-4 flex items-center justify-between">
        {/* Logo Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#007AFF] text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-black leading-tight tracking-tight">Result Analysis</h1>
            <p className="text-[11px] text-[rgba(60,60,67,0.60)] leading-none">College Management System</p>
          </div>
        </div>

        {/* Apple iOS Style Segmented Control */}
        <nav className="flex items-center bg-[rgba(60,60,67,0.08)] p-0.5 rounded-[10px] text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'text-[rgba(60,60,67,0.70)] hover:text-black'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Class Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'text-[rgba(60,60,67,0.70)] hover:text-black'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Marks</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] transition-all ${
              activeTab === 'search'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'text-[rgba(60,60,67,0.70)] hover:text-black'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Student Lookup</span>
          </button>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetData}
            title="Reset to default sample dataset"
            className="hidden sm:flex items-center gap-1.5 text-xs text-[rgba(60,60,67,0.65)] hover:text-black px-2.5 py-1.5 rounded-[8px] hover:bg-black/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
