import React, { useState } from 'react';
import { X, Award, Download, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CertificateModal({ isOpen, onClose }) {
  const { courses, selectedCourseId } = useStore();
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      const certText = `
================================================================================
                    ACADEMIA COLLEGIATE PORTAL
             OFFICIAL DIPLOMA OF CURRICULAR COMPLETION
================================================================================

This certifies that:

                        [ CANDIDATE SCHOLAR ]

has successfully completed all rigorous lecture units, laboratory assignments,
and examination requirements for the accredited university curriculum:

              ${course.code}: ${course.title.toUpperCase()}
                       Under the Supervision of:
                     ${course.instructor}

Date of Conferral: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Verification Hash: 0x8F9B2C4E991A0027BD
Academic Seal: [ VERIFIED ACADEMIC CONSORTIUM ]
================================================================================
      `;

      const blob = new Blob([certText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ACADEMIA_CERTIFICATE_${course.code}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl border-4 border-[#d4af37] p-8 shadow-2xl overflow-hidden my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Presentation Document Box */}
        <div className="border-2 border-[#102a43] p-8 text-center bg-[#fbfdfa] relative">
          <div className="w-16 h-16 rounded-full bg-[#d4af37] text-[#102a43] flex items-center justify-center font-academic-crest text-3xl mx-auto mb-4 shadow-md">
            Ψ
          </div>

          <span className="text-xs uppercase tracking-widest text-[#102a43] font-academic-crest block font-bold">
            ACADEMIA COLLEGIATE INSTITUTE
          </span>

          <h2 className="text-2xl font-bold font-academic-crest text-[#102a43] mt-2 mb-4">
            Certificate of Curricular Completion
          </h2>

          <p className="text-xs text-slate-500 font-serif-title italic mb-4">
            This formal award is presented to
          </p>

          <h3 className="text-xl font-bold font-serif-title text-[#102a43] border-b-2 border-[#d4af37] pb-2 max-w-sm mx-auto">
            Honored Candidate Scholar
          </h3>

          <p className="text-xs text-slate-600 font-serif-title mt-4 max-w-md mx-auto leading-relaxed">
            for successfully completing all didactic modules, research assignments, and examinations in:
          </p>

          <h4 className="text-base font-bold font-academic-crest text-[#102a43] mt-2">
            {course.code}: {course.title}
          </h4>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-left text-[11px] text-slate-500 font-serif-title">
            <div>
              <span className="block font-bold text-[#102a43]">{course.instructor}</span>
              <span>Faculty Dean</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-[#102a43]">
                {new Date().toLocaleDateString()}
              </span>
              <span>Conferral Date</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-5 py-2.5 bg-[#102a43] hover:bg-[#243b53] text-[#d4af37] text-xs font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating Certificate...' : 'Download Verified Certificate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
