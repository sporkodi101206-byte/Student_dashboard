import React from 'react';
import { STUDENT_PROFILE, CGPA_SUMMARY } from '../data/studentData';
import {
  GraduationCap,
  User,
  Car,
  BarChart2,
  FileText,
  Shield,
  Printer,
  Sparkles,
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onOpenTranscript: () => void;
}

export const Header: React.FC<Props> = ({ activeTab, setActiveTab, onOpenTranscript }) => {
  const navTabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      badge: STUDENT_PROFILE.regNo,
    },
    {
      id: 'academics',
      label: 'Academics',
      icon: GraduationCap,
      badge: '4 Sems',
    },
    {
      id: 'transport',
      label: 'Transport',
      icon: Car,
      badge: '₹20/day',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart2,
      badge: '8.07 CGPA',
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Brand / Profile Bar */}
        <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
          {/* Institution & Student Meta */}
          <div className="flex items-center gap-3">
            {/* Institution Crest Placeholder / Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-xs ring-2 ring-emerald-600/20 shrink-0">
              <span>TC</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">
                  {STUDENT_PROFILE.college}
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium">
                  Autonomous • Madurai
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{STUDENT_PROFILE.name}</span>
                <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {STUDENT_PROFILE.regNo}
                </span>
              </h1>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onOpenTranscript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer border border-slate-200/80"
              title="Open Official Consolidated Marks Transcript"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Transcript Card</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              title="Print Dashboard"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 -mb-px scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 shadow-2xs font-bold border border-emerald-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm ${
                      isActive
                        ? 'bg-emerald-200/70 text-emerald-900 font-bold'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
