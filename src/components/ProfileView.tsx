import React from 'react';
import { STUDENT_PROFILE, CGPA_SUMMARY, SEMESTER_RECORDS } from '../data/studentData';
import {
  User,
  GraduationCap,
  Building2,
  Mail,
  ShieldCheck,
  Calendar,
  Award,
  BookOpen,
  FileCheck,
  Sparkles,
  QrCode,
  Hash,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Student Identification Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Decorative Top Banner */}
        <div className="h-28 sm:h-32 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 relative">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute top-4 right-4 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-xs border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Verified Student Record
            </span>
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="px-5 sm:px-8 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            {/* Avatar & Main Identity */}
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-md border border-slate-200/80 shrink-0">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex flex-col items-center justify-center font-bold text-2xl tracking-wider shadow-inner">
                  <span>SP</span>
                  <span className="text-[10px] font-mono font-normal opacity-75">B.Sc. CS</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {STUDENT_PROFILE.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {STUDENT_PROFILE.enrollmentStatus}
                  </span>
                </div>
                <p className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  {STUDENT_PROFILE.program}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {STUDENT_PROFILE.college} • {STUDENT_PROFILE.department}
                </p>
              </div>
            </div>

            {/* Registration Tag */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-right shrink-0">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Register Number
              </div>
              <div className="text-base font-extrabold text-slate-900 font-mono tracking-wide">
                {STUDENT_PROFILE.regNo}
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/60">
              <span className="text-[11px] text-slate-500 font-medium">Current CGPA</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5 flex items-baseline gap-1">
                <span className="text-emerald-700">{CGPA_SUMMARY.cgpa.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-normal">/ 10</span>
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/60">
              <span className="text-[11px] text-slate-500 font-medium">Earned Credits</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">
                89 <span className="text-xs text-slate-400 font-normal">/ 89 Completed</span>
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/60">
              <span className="text-[11px] text-slate-500 font-medium">Batch / Duration</span>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {STUDENT_PROFILE.batch}
              </div>
            </div>

            <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/60">
              <span className="text-[11px] text-slate-500 font-medium">Academic Standing</span>
              <div className="text-xs font-bold text-emerald-800 mt-1 truncate" title={CGPA_SUMMARY.standing}>
                {CGPA_SUMMARY.standing}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Detailed Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Institutional & Academic Details */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Institutional Record
          </h3>

          <dl className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">Student Name</dt>
              <dd className="font-semibold text-slate-900">{STUDENT_PROFILE.name}</dd>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">Register Number</dt>
              <dd className="font-mono font-semibold text-slate-900">{STUDENT_PROFILE.regNo}</dd>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">Gender</dt>
              <dd className="font-medium text-slate-800">{STUDENT_PROFILE.gender}</dd>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">Program & Degree</dt>
              <dd className="font-semibold text-emerald-800">{STUDENT_PROFILE.program}</dd>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">College / Institution</dt>
              <dd className="font-medium text-slate-900 text-right">{STUDENT_PROFILE.college}</dd>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">Affiliation</dt>
              <dd className="text-slate-700">Autonomous (Madurai Kamaraj Univ)</dd>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">College Email</dt>
              <dd className="font-mono text-emerald-700 font-medium">{STUDENT_PROFILE.email}</dd>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <dt className="text-slate-500">Academic Batch</dt>
              <dd className="font-medium text-slate-800">{STUDENT_PROFILE.batch}</dd>
            </div>
          </dl>
        </div>

        {/* Degree Progress & Curriculum Milestones */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Degree Roadmap & Credit Audit
            </h3>

            {/* Credit Progress Bar */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">Completed Credits (89 / 140 required)</span>
                <span className="text-emerald-700">63.5%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                  style={{ width: '63.5%' }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Semester 1 - 4 (Cleared)</span>
                <span>Semester 5 - 6 (Upcoming)</span>
              </div>
            </div>

            {/* Term Summary Checklist */}
            <div className="space-y-2.5">
              {SEMESTER_RECORDS.map((sem) => (
                <div
                  key={sem.semesterNumber}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <div>
                      <span className="font-semibold text-slate-800">{sem.semesterLabel}</span>
                      <span className="text-slate-400 ml-1.5">({sem.examSession})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-600">{sem.credits} cr</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-emerald-700">
                      SGPA {sem.sgpa.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Autonomous Examination Wing</span>
            <span className="font-mono">Office of Controller of Exams</span>
          </div>
        </div>
      </div>
    </div>
  );
};
