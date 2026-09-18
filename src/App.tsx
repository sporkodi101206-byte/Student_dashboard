/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { AcademicsView } from './components/AcademicsView';
import { ProfileView } from './components/ProfileView';
import { TransportView } from './components/TransportView';
import { AnalyticsView } from './components/AnalyticsView';
import { TranscriptModal } from './components/TranscriptModal';
import { STUDENT_PROFILE } from './data/studentData';
import { ShieldCheck, School } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isTranscriptOpen, setIsTranscriptOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTranscript={() => setIsTranscriptOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Dynamic Tab Views - Completely Isolated State per Section */}
        <section className="pt-2">
          {/* Profile Section */}
          <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
            <ProfileView />
          </div>

          {/* Academics Section */}
          <div className={activeTab === 'academics' ? 'block' : 'hidden'}>
            <AcademicsView onOpenTranscript={() => setIsTranscriptOpen(true)} />
          </div>

          {/* Transport Section */}
          <div className={activeTab === 'transport' ? 'block' : 'hidden'}>
            <TransportView />
          </div>

          {/* Analytics Section */}
          <div className={activeTab === 'analytics' ? 'block' : 'hidden'}>
            <AnalyticsView />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-600">
            <School className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold text-slate-800">{STUDENT_PROFILE.college}</span>
            <span className="text-slate-300">•</span>
            <span>Madurai, Tamil Nadu</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Academic Session 2024 – 2026</span>
            <span className="text-slate-300">•</span>
            <span>B.Sc. Computer Science (24UCS34)</span>
          </div>
        </div>
      </footer>

      {/* Printable Consolidated Transcript Modal */}
      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
      />
    </div>
  );
}
