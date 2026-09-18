import React from 'react';
import { STUDENT_PROFILE, CGPA_SUMMARY, SEMESTER_RECORDS } from '../data/studentData';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TranscriptModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Top Header (excluded in print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">Consolidated Academic Transcript</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Transcript Document Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 font-sans" id="printable-transcript">
          {/* Institutional Header */}
          <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Autonomous College • Affiliated to Madurai Kamaraj University
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              {STUDENT_PROFILE.college}
            </h1>
            <div className="text-xs text-slate-600 font-medium">
              Madurai - 625 009, Tamil Nadu, India | Re-accredited with 'A++' Grade by NAAC
            </div>
            <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider pt-1">
              Consolidated Grade Card (Semesters I – IV)
            </div>
          </div>

          {/* Student Profile Meta Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block">Candidate Name:</span>
              <strong className="text-slate-900 font-bold">{STUDENT_PROFILE.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Register Number:</span>
              <strong className="text-slate-900 font-mono font-bold">{STUDENT_PROFILE.regNo}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Degree & Major:</span>
              <strong className="text-slate-900 font-semibold">{STUDENT_PROFILE.program}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Gender:</span>
              <strong className="text-slate-900">{STUDENT_PROFILE.gender}</strong>
            </div>
          </div>

          {/* Semesters 1 to 4 Mini Tables */}
          <div className="space-y-5">
            {SEMESTER_RECORDS.map((sem) => (
              <div key={sem.semesterNumber} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100/90 px-3.5 py-1.5 flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200">
                  <span>
                    {sem.semesterLabel} — {sem.examSession}
                  </span>
                  <span className="font-mono text-emerald-800">
                    Credits: {sem.credits} | SGPA: {sem.sgpa.toFixed(2)}
                  </span>
                </div>

                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-1.5 px-3">Course Name</th>
                      <th className="py-1.5 px-2 text-center">Int</th>
                      <th className="py-1.5 px-2 text-center">Ext</th>
                      <th className="py-1.5 px-2 text-center">Total</th>
                      <th className="py-1.5 px-2 text-center">Grade Pt</th>
                      <th className="py-1.5 px-2 text-center">Grade</th>
                      <th className="py-1.5 px-2 text-center">Credits</th>
                      <th className="py-1.5 px-3 text-center">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sem.courses.map((c, i) => (
                      <tr key={i}>
                        <td className="py-1.5 px-3 text-slate-800 font-medium">{c.courseName}</td>
                        <td className="py-1.5 px-2 text-center font-mono text-slate-600">{c.internal}</td>
                        <td className="py-1.5 px-2 text-center font-mono text-slate-600">{c.external}</td>
                        <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-900">{c.final}</td>
                        <td className="py-1.5 px-2 text-center font-mono">{c.gradePoint.toFixed(1)}</td>
                        <td className="py-1.5 px-2 text-center font-bold text-slate-800">{c.grade}</td>
                        <td className="py-1.5 px-2 text-center font-mono">{c.credit}</td>
                        <td className="py-1.5 px-3 text-center font-semibold text-emerald-700">{c.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Cumulative CGPA Summary Banner */}
          <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">
                Cumulative Grade Point Average (CGPA)
              </div>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                {CGPA_SUMMARY.cgpa.toFixed(2)} / 10.0
              </div>
              <div className="text-emerald-400 font-semibold">{CGPA_SUMMARY.standing}</div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-slate-400 block">Total Earned Credits</span>
                <strong className="text-base text-white font-mono">{CGPA_SUMMARY.totalCredits}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Result</span>
                <strong className="text-base text-emerald-400">PASSED</strong>
              </div>
            </div>
          </div>

          {/* Institutional Sign-off Footer */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs text-slate-500">
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-300 pt-1 font-semibold text-slate-800">
                Prepared by
              </div>
            </div>
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-300 pt-1 font-semibold text-slate-800">
                Verified by Section Officer
              </div>
            </div>
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-300 pt-1 font-bold text-slate-900">
                Controller of Examinations
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
