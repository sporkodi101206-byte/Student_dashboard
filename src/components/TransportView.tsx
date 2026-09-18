import React from 'react';
import {
  Car,
  Clock,
  IndianRupee,
  MapPin,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  Navigation,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { TRANSPORT_DETAILS } from '../data/studentData';

export const TransportView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Route Display */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
              <Navigation className="w-3 h-3 text-emerald-600" />
              <span>Transit Route Overview</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Route: Home → Theppakulam
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Daily college transit corridor between student residence and Thiagarajar College
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              Active Regular Commute
            </span>
          </div>
        </div>

        {/* Visual Route Pathway Graphic */}
        <div className="mt-6 pt-2 pb-3">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-slate-50/80 rounded-xl border border-slate-200/70">
            {/* Origin */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs shrink-0">
                <MapPin className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Origin (Starting Point)
                </div>
                <div className="text-lg font-extrabold text-slate-900">
                  Home
                </div>
                <div className="text-xs text-slate-500">Student Residence</div>
              </div>
            </div>

            {/* Middle Direction & Mode Indicator */}
            <div className="flex flex-col items-center justify-center px-4 py-2 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
                <Car className="w-3.5 h-3.5 text-emerald-600" />
                <span>Auto • 5 Minutes</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-1.5 text-center">
                One-way distance • Direct transit
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs shrink-0">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Destination
                </div>
                <div className="text-lg font-extrabold text-slate-900">
                  Theppakulam
                </div>
                <div className="text-xs text-slate-500">Thiagarajar College Main Gate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Individual Detail Cards for Mode / Time / Fare */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Mode */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Transport Mode
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-medium">Mode</div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Auto
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Shared / dedicated local autorickshaw commute directly connecting residence to college.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Vehicle Type:</span>
            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              Autorickshaw
            </span>
          </div>
        </div>

        {/* Card 2: Time */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Commute Duration
              </span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-medium">One-way Time</div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                5 minutes
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">One-way time:</span>
                <span className="font-semibold text-slate-900 font-mono">5 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Return trip:</span>
                <span className="font-semibold text-slate-900 font-mono">5 minutes</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Round-trip Total:</span>
            <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              10 minutes
            </span>
          </div>
        </div>

        {/* Card 3: Fare */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Commute Fare
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-medium">One-way Fare</div>
              <div className="text-3xl font-extrabold text-emerald-700 tracking-tight font-sans">
                ₹10
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">One-way fare:</span>
                <span className="font-bold text-emerald-700 font-mono">₹10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Return trip fare:</span>
                <span className="font-bold text-emerald-700 font-mono">₹10</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Cost Structure:</span>
            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              Fixed per trip
            </span>
          </div>
        </div>
      </div>

      {/* 3. Detailed Trip Breakdown (Outbound vs Return Trip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Outbound Trip */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Outbound Journey</h4>
                <p className="text-[11px] text-slate-500">Morning College Commute</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ₹10
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">Route:</span>
              <strong className="text-slate-900">Home → Theppakulam</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">Mode:</span>
              <span className="font-semibold text-slate-800">Auto</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">One-way time:</span>
              <span className="font-semibold text-slate-900 font-mono">5 minutes</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">One-way fare:</span>
              <span className="font-bold text-emerald-700 font-mono">₹10</span>
            </div>
          </div>
        </div>

        {/* Return Trip */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Return Trip</h4>
                <p className="text-[11px] text-slate-500">Afternoon Return Commute</p>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              ₹10
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">Route:</span>
              <strong className="text-slate-900">Theppakulam → Home</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">Mode:</span>
              <span className="font-semibold text-slate-800">Auto</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">Return trip time:</span>
              <span className="font-semibold text-slate-900 font-mono">5 minutes</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-slate-500">Return fare:</span>
              <span className="font-bold text-teal-700 font-mono">₹10</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Total-Cost Summary Strip */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-2xl text-white p-6 sm:p-7 shadow-sm border border-emerald-950 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-emerald-200 border border-white/15">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              Summary Expenditure
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Total Daily Transport Cost
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Calculated sum of outbound trip fare (₹10) and return trip fare (₹10)
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-emerald-200">
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                ₹10 (Outbound) + ₹10 (Return)
              </span>
              <span className="text-white/40">•</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                Round-trip duration: 10 mins
              </span>
            </div>
          </div>

          {/* Prominent cost display box */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 text-center min-w-[200px] shrink-0">
            <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
              Daily Expense
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1 font-sans">
              ₹20
            </div>
            <div className="text-xs text-emerald-300 font-semibold mt-1">
              ₹20 / Day
            </div>
          </div>
        </div>

        {/* Projection summary tags */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monthly Estimate (22 working days):</span>
            <strong className="text-white font-mono">₹440</strong>
          </div>
          <div className="flex items-center gap-2">
            <span>Semester Estimate (90 days):</span>
            <strong className="text-white font-mono">₹1,800</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
