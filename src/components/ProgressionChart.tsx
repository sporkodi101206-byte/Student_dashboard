import React, { useState } from 'react';
import { SGPA_PROGRESSION } from '../data/studentData';
import { TrendingUp, Award, ChevronRight } from 'lucide-react';

interface Props {
  onSelectSemester?: (semNumber: number) => void;
  selectedSemester?: number | null;
}

export const ProgressionChart: React.FC<Props> = ({ onSelectSemester, selectedSemester }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = SGPA_PROGRESSION;
  const minVal = 7.0;
  const maxVal = 9.2;
  const range = maxVal - minVal;

  const width = 480;
  const height = 180;
  const paddingX = 42;
  const paddingY = 28;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  // Calculate coordinates
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartW;
    const y = height - paddingY - ((d.sgpa - minVal) / range) * chartH;
    return { ...d, x, y, index: i };
  });

  // SVG path for line
  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // gentle curve
    const prev = points[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, '');

  // SVG path for area fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  // Baseline 8.0 line
  const cgpaY = height - paddingY - ((8.07 - minVal) / range) * chartH;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            SGPA Progression
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-emerald-600 inline-block rounded"></span>
            SGPA
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 border-t border-dashed border-amber-500 inline-block"></span>
            CGPA (8.07)
          </span>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 overflow-visible select-none"
        >
          <defs>
            <linearGradient id="sgpaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#064e3b" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Grid lines horizontal */}
          {[7.5, 8.0, 8.5, 9.0].map((val) => {
            const y = height - paddingY - ((val - minVal) / range) * chartH;
            return (
              <g key={val}>
                <line
                  x1={paddingX - 6}
                  y1={y}
                  x2={width - paddingX + 6}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] font-mono"
                >
                  {val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* CGPA Reference line (8.07) */}
          <line
            x1={paddingX}
            y1={cgpaY}
            x2={width - paddingX}
            y2={cgpaY}
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <text
            x={width - paddingX + 4}
            y={cgpaY + 3}
            className="fill-amber-600 text-[9px] font-semibold"
          >
            CGPA 8.07
          </text>

          {/* Area Fill */}
          <path d={areaD} fill="url(#sgpaGrad)" />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#059669"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#shadow)"
          />

          {/* Vertical Guides & Interactive Points */}
          {points.map((p, i) => {
            const isHovered = hoveredIdx === i;
            const isSelected = selectedSemester === i + 1;
            const isHighest = p.sgpa === 8.77;

            // Delta from previous
            const prevSgpa = i > 0 ? points[i - 1].sgpa : null;
            const delta = prevSgpa !== null ? Number((p.sgpa - prevSgpa).toFixed(2)) : null;

            return (
              <g
                key={p.semester}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onSelectSemester && onSelectSemester(i + 1)}
              >
                {/* Vertical marker line on hover */}
                {(isHovered || isSelected) && (
                  <line
                    x1={p.x}
                    y1={paddingY - 6}
                    x2={p.x}
                    y2={height - paddingY}
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Outer halo */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 8 : isHovered ? 7 : 5}
                  className={`${
                    isSelected
                      ? 'fill-emerald-600 stroke-white stroke-2'
                      : isHovered
                      ? 'fill-emerald-500 stroke-white stroke-2'
                      : 'fill-white stroke-emerald-600 stroke-2'
                  } transition-all duration-200`}
                />

                {/* Inner center dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={2}
                  className={isSelected || isHovered ? 'fill-white' : 'fill-emerald-600'}
                />

                {/* Score value above point */}
                <text
                  x={p.x}
                  y={p.y - 10}
                  textAnchor="middle"
                  className={`text-[11px] font-bold ${
                    isHighest
                      ? 'fill-emerald-700 font-extrabold'
                      : isHovered || isSelected
                      ? 'fill-emerald-600'
                      : 'fill-slate-800'
                  }`}
                >
                  {p.sgpa.toFixed(2)}
                </text>

                {/* Highest badge icon */}
                {isHighest && (
                  <circle
                    cx={p.x + 16}
                    cy={p.y - 11}
                    r={3}
                    className="fill-amber-400"
                  />
                )}

                {/* Semester label at bottom */}
                <text
                  x={p.x}
                  y={height - paddingY + 16}
                  textAnchor="middle"
                  className={`text-[10px] ${
                    isSelected
                      ? 'fill-emerald-800 font-bold'
                      : isHovered
                      ? 'fill-slate-900 font-semibold'
                      : 'fill-slate-600 font-medium'
                  }`}
                >
                  {p.semester}
                </text>
                <text
                  x={p.x}
                  y={height - paddingY + 27}
                  textAnchor="middle"
                  className="text-[8.5px] fill-slate-400"
                >
                  {p.session}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Details Strip beneath chart */}
        <div className="mt-1 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Peak Semester:</span>
            <strong className="text-slate-900 font-semibold">Sem 4 (8.77 SGPA)</strong>
            <span className="text-[11px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-sm">
              +1.02 gain
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">89 Total Credits</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium text-[11px]">4 Semesters Cleared</span>
          </div>
        </div>
      </div>
    </div>
  );
};
