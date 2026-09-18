import React, { useState } from 'react';
import { SEMESTER_RECORDS, CGPA_SUMMARY } from '../data/studentData';
import {
  BarChart3,
  Award,
  Sparkles,
  PieChart,
  Calculator,
  Flame,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  // Target CGPA calculator state
  const [targetCgpa, setTargetCgpa] = useState<number>(8.25);
  // Remaining credits in year 3 (e.g., Sem 5 & 6 ~ 50 credits out of 140)
  const completedCredits = 89;
  const currentCgpa = 8.07;
  const remainingCredits = 51; // 140 - 89 = 51 credits

  // Required GPA for remaining credits: (target * total - current * completed) / remaining
  const totalCredits = completedCredits + remainingCredits;
  const requiredRemainingGpa =
    (targetCgpa * totalCredits - currentCgpa * completedCredits) / remainingCredits;

  const gradesSummary = [
    { grade: 'O', count: 8, label: 'Outstanding (9.0 - 10.0)', color: 'bg-indigo-500', text: 'text-indigo-700', bgLight: 'bg-indigo-50' },
    { grade: 'A', count: 6, label: 'Excellent (8.0 - 8.9)', color: 'bg-emerald-500', text: 'text-emerald-700', bgLight: 'bg-emerald-50' },
    { grade: 'B', count: 12, label: 'Very Good (7.0 - 7.9)', color: 'bg-sky-500', text: 'text-sky-700', bgLight: 'bg-sky-50' },
    { grade: 'C', count: 3, label: 'Good (6.0 - 6.9)', color: 'bg-amber-500', text: 'text-amber-700', bgLight: 'bg-amber-50' },
  ];

  const practicalLabs = [
    { name: 'Data Structures Lab', sem: 'Sem 3', score: '100/100', gp: 10.0 },
    { name: 'Advanced Java Programming Lab', sem: 'Sem 4', score: '100/100', gp: 10.0 },
    { name: 'RDBMS Lab', sem: 'Sem 3', score: '99/100', gp: 9.9 },
    { name: 'Programming in C Lab', sem: 'Sem 1', score: '98/100', gp: 9.8 },
    { name: 'Web Technology Lab', sem: 'Sem 2', score: '98/100', gp: 9.8 },
    { name: 'Java Programming Lab', sem: 'Sem 2', score: '95/100', gp: 9.5 },
    { name: 'PHP Programming Lab', sem: 'Sem 4', score: '94/100', gp: 9.4 },
    { name: 'NSS Extension', sem: 'Sem 4', score: '95/100', gp: 9.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Academic Performance Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical breakdown of course grades, lab practical scores, and CGPA projections
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            29/29 Clear (100% Pass Rate)
          </span>
        </div>
      </div>

      {/* Grade Distribution & Laboratory Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grade Distribution Card */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-600" />
            Letter Grade Distribution (29 Courses)
          </h3>

          <div className="space-y-3.5 pt-2">
            {gradesSummary.map((item) => {
              const pct = ((item.count / 29) * 100).toFixed(1);
              return (
                <div key={item.grade} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      Grade '{item.grade}' — <span className="font-normal text-slate-500">{item.label}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {item.count} courses ({pct}%)
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
            <strong>Key Insight:</strong> Over <strong>48.3%</strong> of courses were completed in top-tier honors bracket (O & A grades), highlighting exceptional mastery in Computer Science coursework.
          </div>
        </div>

        {/* Lab Practical Dominance Card */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Practical Lab Excellence (100% 'O' Grades)
            </h3>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              Avg 9.77 / 10
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {practicalLabs.map((lab) => (
              <div
                key={lab.name}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 hover:border-indigo-300 transition-colors flex items-center justify-between text-xs"
              >
                <div className="pr-2">
                  <div className="font-semibold text-slate-800 line-clamp-1">{lab.name}</div>
                  <div className="text-[11px] text-slate-400">{lab.sem}</div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-indigo-700 bg-white border border-indigo-200 px-1.5 py-0.5 rounded text-[11px]">
                    {lab.score}
                  </span>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">GP {lab.gp.toFixed(1)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target CGPA Simulator for Final Year */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-600" />
          Final Year Target CGPA Simulator
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Estimate the required GPA across upcoming Semesters 5 and 6 (~51 credits) to reach your graduation honors target.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">
              Desired Graduation CGPA:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="8.00"
                max="9.00"
                step="0.05"
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="font-mono font-extrabold text-emerald-700 text-lg">
                {targetCgpa.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500">Current CGPA (89 credits)</span>
            <div className="text-xl font-extrabold text-slate-800 font-mono">8.07</div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-center">
            <span className="text-[11px] text-emerald-800 font-semibold">
              Required Average GPA in Year 3
            </span>
            <div className="text-xl font-extrabold text-emerald-800 font-mono">
              {requiredRemainingGpa > 10
                ? '> 10.0 (Unattainable)'
                : requiredRemainingGpa.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
