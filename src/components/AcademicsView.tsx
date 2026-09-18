import React, { useState, useMemo } from 'react';
import { SEMESTER_RECORDS, CGPA_SUMMARY } from '../data/studentData';
import { Course, SemesterRecord } from '../types';
import { SummaryMetrics } from './SummaryMetrics';
import {
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  Filter,
  Download,
  Info,
} from 'lucide-react';

interface Props {
  onOpenTranscript?: () => void;
}

export const AcademicsView: React.FC<Props> = ({ onOpenTranscript }) => {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  // Keep track of which semesters are expanded (default: all open)
  const [expandedSemesters, setExpandedSemesters] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const handleSelectSemester = (semNum: number) => {
    setSelectedSemester(semNum);
    setExpandedSemesters((prev) => ({ ...prev, [semNum]: true }));
    const el = document.getElementById(`semester-${semNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleSemester = (semNum: number) => {
    setExpandedSemesters((prev) => ({
      ...prev,
      [semNum]: !prev[semNum],
    }));
  };

  const expandAll = () => {
    setExpandedSemesters({ 1: true, 2: true, 3: true, 4: true });
  };

  const collapseAll = () => {
    setExpandedSemesters({ 1: false, 2: false, 3: false, 4: false });
  };

  // Grade badge styling helper
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'O':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 font-bold';
      case 'A':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
      case 'B':
        return 'bg-sky-50 text-sky-700 border-sky-200 font-bold';
      case 'C':
        return 'bg-amber-50 text-amber-700 border-amber-200 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Filter courses within each semester
  const filteredSemesters = useMemo(() => {
    return SEMESTER_RECORDS.map((sem) => {
      const filteredCourses = sem.courses.filter((course) => {
        const matchesSearch =
          searchQuery.trim() === '' ||
          course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.grade.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesGrade = gradeFilter === 'ALL' || course.grade === gradeFilter;
        const matchesType = typeFilter === 'ALL' || course.type === typeFilter;

        return matchesSearch && matchesGrade && matchesType;
      });

      return {
        ...sem,
        courses: filteredCourses,
        originalCount: sem.courses.length,
      };
    });
  }, [searchQuery, gradeFilter, typeFilter]);

  const totalFilteredCourses = filteredSemesters.reduce((acc, sem) => acc + sem.courses.length, 0);

  return (
    <div className="space-y-6">
      {/* Top Academic Progression & Metrics */}
      <SummaryMetrics
        selectedSemester={selectedSemester}
        onSelectSemester={handleSelectSemester}
      />

      {/* Courses Action and Filter Control Bar */}
      <div id="academic-courses-container" className="space-y-5">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search course name, subject, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right: Grade & Type Filters + Expand/Collapse Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Grade filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <span className="text-slate-500 px-1.5 font-medium hidden sm:inline">Grade:</span>
            {['ALL', 'O', 'A', 'B', 'C'].map((g) => (
              <button
                key={g}
                onClick={() => setGradeFilter(g)}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  gradeFilter === g
                    ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Expand/Collapse Toggle */}
          <div className="flex items-center border-l border-slate-200 pl-2 gap-1.5">
            <button
              onClick={expandAll}
              className="px-2.5 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md font-medium transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md font-medium transition-colors"
            >
              Collapse All
            </button>
            {onOpenTranscript && (
              <button
                onClick={onOpenTranscript}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Transcript</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Info Bar if filtered */}
      {(searchQuery || gradeFilter !== 'ALL' || typeFilter !== 'ALL') && (
        <div className="flex items-center justify-between text-xs bg-emerald-50/60 border border-emerald-200/70 text-emerald-900 px-3.5 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              Showing <strong>{totalFilteredCourses}</strong> of 29 courses
              {gradeFilter !== 'ALL' && ` with Grade '${gradeFilter}'`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setGradeFilter('ALL');
              setTypeFilter('ALL');
            }}
            className="text-xs font-semibold underline hover:text-emerald-950"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4 Semesters: Expandable Tables (one per semester) */}
      <div className="space-y-4">
        {filteredSemesters.map((semester) => {
          const isExpanded = !!expandedSemesters[semester.semesterNumber];
          const isTargeted = selectedSemester === semester.semesterNumber;

          return (
            <div
              key={semester.semesterNumber}
              id={`semester-${semester.semesterNumber}`}
              className={`bg-white rounded-xl border transition-all duration-200 shadow-2xs overflow-hidden ${
                isTargeted
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Expandable Header Accordion Trigger */}
              <button
                onClick={() => toggleSemester(semester.semesterNumber)}
                className="w-full px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 via-white to-slate-50 hover:bg-slate-100/60 text-left transition-colors cursor-pointer border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shadow-2xs ${
                      semester.sgpa >= 8.5
                        ? 'bg-emerald-600 text-white'
                        : semester.sgpa >= 8.0
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-800 text-white'
                    }`}
                  >
                    S{semester.semesterNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900 tracking-tight">
                        {semester.semesterLabel}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md font-mono">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {semester.examSession}
                      </span>
                      {semester.sgpa === 8.77 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300/80 px-2 py-0.5 rounded-full">
                          <Award className="w-3 h-3 text-amber-600" />
                          Highest SGPA
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {semester.courses.length} courses listed
                      {semester.courses.length !== semester.originalCount &&
                        ` (${semester.originalCount} total)`}
                    </p>
                  </div>
                </div>

                {/* Right: Semester Summary Tags & Chevron */}
                <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-auto w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Credits Badge */}
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">
                        Credits
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {semester.credits}
                      </div>
                    </div>

                    <div className="h-6 w-px bg-slate-200"></div>

                    {/* SGPA Badge */}
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">
                        SGPA
                      </div>
                      <div className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {semester.sgpa.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors ml-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Table Content when expanded */}
              {isExpanded && (
                <div className="p-0 animate-in fade-in duration-200">
                  {semester.courses.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">
                      No courses in this semester match your search or filter.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 text-slate-600 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-200">
                            <th className="py-3 px-4 font-semibold">Course Name</th>
                            <th className="py-3 px-3 text-center font-semibold whitespace-nowrap">
                              Internal
                            </th>
                            <th className="py-3 px-3 text-center font-semibold whitespace-nowrap">
                              External
                            </th>
                            <th className="py-3 px-3 text-center font-semibold whitespace-nowrap">
                              Final
                            </th>
                            <th className="py-3 px-3 text-center font-semibold whitespace-nowrap">
                              Grade Point
                            </th>
                            <th className="py-3 px-3 text-center font-semibold whitespace-nowrap">
                              Grade
                            </th>
                            <th className="py-3 px-3 text-center font-semibold whitespace-nowrap">
                              Credit
                            </th>
                            <th className="py-3 px-4 text-center font-semibold whitespace-nowrap">
                              Result
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {semester.courses.map((course, idx) => {
                            const isLab = course.type === 'Practical';
                            return (
                              <tr
                                key={course.id || idx}
                                className={`hover:bg-slate-50/70 transition-colors ${
                                  course.grade === 'O' ? 'bg-indigo-50/20' : ''
                                }`}
                              >
                                {/* Course Name with optional type chip */}
                                <td className="py-3 px-4 text-slate-900 font-medium">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-900">
                                      {course.courseName}
                                    </span>
                                    {isLab && (
                                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200">
                                        Lab
                                      </span>
                                    )}
                                    {course.type === 'Language' && (
                                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                        Language
                                      </span>
                                    )}
                                    {course.type === 'Extension' && (
                                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                                        Extension
                                      </span>
                                    )}
                                  </div>
                                </td>

                                {/* Internal */}
                                <td className="py-3 px-3 text-center font-mono text-slate-700 whitespace-nowrap">
                                  {course.internal}
                                </td>

                                {/* External */}
                                <td className="py-3 px-3 text-center font-mono text-slate-700 whitespace-nowrap">
                                  {course.external}
                                </td>

                                {/* Final */}
                                <td className="py-3 px-3 text-center font-mono font-semibold text-slate-900 whitespace-nowrap">
                                  {course.final}
                                </td>

                                {/* Grade Point */}
                                <td className="py-3 px-3 text-center font-mono font-bold text-slate-800 whitespace-nowrap">
                                  {course.gradePoint.toFixed(1)}
                                </td>

                                {/* Grade */}
                                <td className="py-3 px-3 text-center whitespace-nowrap">
                                  <span
                                    className={`inline-block px-2.5 py-0.5 rounded-md text-xs border ${getGradeBadge(
                                      course.grade
                                    )}`}
                                  >
                                    {course.grade}
                                  </span>
                                </td>

                                {/* Credit */}
                                <td className="py-3 px-3 text-center font-mono text-slate-800 font-medium whitespace-nowrap">
                                  {course.credit}
                                </td>

                                {/* Result */}
                                <td className="py-3 px-4 text-center whitespace-nowrap">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    {course.result}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        {/* Table Footer Subtotal */}
                        <tfoot>
                          <tr className="bg-slate-50 text-slate-700 font-semibold border-t border-slate-200 text-xs">
                            <td className="py-2.5 px-4 font-bold text-slate-900">
                              Semester {semester.semesterNumber} Totals
                            </td>
                            <td colSpan={3} className="py-2.5 px-3 text-center text-slate-500 font-normal">
                              Evaluated under Thiagarajar Autonomous Scheme
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold font-mono text-emerald-800">
                              SGPA: {semester.sgpa.toFixed(2)}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-400">
                              -
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold font-mono text-slate-900">
                              {semester.credits} Credits
                            </td>
                            <td className="py-2.5 px-4 text-center text-emerald-700 font-bold">
                              All Pass
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Grading Scale Legend Note */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800">Grading Scale Guide:</span>
          <span className="text-slate-600">
            <strong>O (Outstanding)</strong>: 9.0–10.0 | <strong>A (Excellent)</strong>: 8.0–8.9 | <strong>B (Very Good)</strong>: 7.0–7.9 | <strong>C (Good)</strong>: 6.0–6.9
          </span>
        </div>

        <div className="text-slate-500 text-[11px]">
          Cumulative Credits: <strong className="text-slate-800">{CGPA_SUMMARY.totalCredits} / 89</strong> (100% Cleared)
        </div>
      </div>
      </div>
    </div>
  );
};
