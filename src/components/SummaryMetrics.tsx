import React from 'react';
import { ProgressionChart } from './ProgressionChart';
import { STUDENT_PROFILE, CGPA_SUMMARY, SGPA_PROGRESSION } from '../data/studentData';
import { Award, GraduationCap, CheckCircle2, TrendingUp, Sparkles, ArrowUpRight, Bus } from 'lucide-react';

interface Props {
  onSelectSemester: (semNumber: number) => void;
  selectedSemester: number | null;
  onNavigateTab?: (tabId: string) => void;
}

export const SummaryMetrics: React.FC<Props> = ({
  onSelectSemester,
  selectedSemester,
  onNavigateTab,
}) => {
  return (
    <section className="space-y-4">
      {/* Top Academic Banner / Hero Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Prominent CGPA Display (4 cols on lg) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top meta */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" />
                Autonomous Grading (UGC)
              </span>
              <span className="text-xs text-slate-400 font-mono tracking-wider">
                {STUDENT_PROFILE.regNo}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              Cumulative Grade Point Average
            </p>

            {/* Huge CGPA number */}
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
                {CGPA_SUMMARY.cgpa.toFixed(2)}
              </span>
              <span className="text-slate-400 text-lg font-medium">/ 10.0</span>
            </div>

            {/* Standing pill */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              {CGPA_SUMMARY.standing}
            </div>
          </div>

          {/* Bottom stats inside CGPA card */}
          <div className="mt-6 pt-4 border-t border-slate-700/60 grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/40">
              <div className="text-xs text-slate-400">Total Credits</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {CGPA_SUMMARY.totalCredits}
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/40">
              <div className="text-xs text-slate-400">Semesters</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">
                4 / 4
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/40">
              <div className="text-xs text-slate-400">Arrears</div>
              <div className="text-lg font-bold text-teal-300 mt-0.5 flex items-center justify-center gap-1">
                <span>0</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle & Right Column: Interactive SGPA Progression Chart (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  SGPA Progression (4 Semesters)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any semester point or button below to inspect that term's course ledger
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {SGPA_PROGRESSION.map((sem) => {
                  const isSelected = selectedSemester === sem.credits ? false : null;
                  return (
                    <button
                      key={sem.semester}
                      onClick={() => {
                        onSelectSemester(Number(sem.semester.replace('Sem ', '')));
                      }}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                        selectedSemester === Number(sem.semester.replace('Sem ', ''))
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                      }`}
                      title={`Open ${sem.semester} table`}
                    >
                      {sem.semester}: <span className="font-bold">{sem.sgpa}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progression Chart */}
            <ProgressionChart
              selectedSemester={selectedSemester}
              onSelectSemester={(semNum) => {
                onSelectSemester(semNum);
              }}
            />
          </div>

          {/* Quick links & summary pills */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-500">
                Progression Track:
              </span>
              <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                7.63 → 8.11 → 7.75 → 8.77
              </span>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('academic-courses-container');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Browse All 29 Courses
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quick Highlights Bento Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Pass Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">29 / 29</span>
            <span className="text-xs font-medium text-emerald-700">100% Passed</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Zero backlogs across all 4 sessions</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Outstanding Grades</span>
            <Award className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-indigo-900">8 'O' Grades</span>
            <span className="text-xs font-semibold text-indigo-600">Grade Pt 9.3 - 10</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Both Java & DS Practical 100/100</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Degree Progression</span>
            <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">89 Credits</span>
            <span className="text-xs font-medium text-teal-700">63.5% Degree</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">4 of 6 semesters completed</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Daily Commute</span>
            <Bus className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">₹20 / Day</span>
            <span className="text-xs font-medium text-emerald-700">5 min Auto</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Home ↔ Theppakulam
          </p>
        </div>
      </div>
    </section>
  );
};
