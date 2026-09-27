import React from 'react';
import { BookOpen, Award, MessageSquare, BarChart, CheckCircle2, UserCheck, GraduationCap, Video, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SidebarPortal({ activeTab, setActiveTab, onOpenCertificate }) {
  const { userRole, setUserRole, courses, selectedCourseId, setSelectedCourseId } = useStore();

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Calculate overall progress for active course
  const allLessons = currentCourse.modules.flatMap((m) => m.lessons);
  const completedLessons = allLessons.filter((l) => l.completed).length;
  const progressPct = allLessons.length > 0 ? Math.round((completedLessons / allLessons.length) * 100) : 0;

  return (
    <aside className="w-80 bg-[#102a43] text-white flex flex-col justify-between border-r border-[#243b53] min-h-screen p-6">
      <div>
        {/* Academic Crest & University Logo */}
        <div className="flex items-center gap-3 pb-6 border-b border-[#243b53]">
          <div className="w-10 h-10 rounded bg-[#d4af37] text-[#102a43] flex items-center justify-center font-academic-crest font-black text-xl shadow-lg">
            Ψ
          </div>
          <div>
            <h1 className="font-academic-crest text-lg font-bold tracking-wider leading-none">
              ACADEMIA
            </h1>
            <span className="text-[10px] text-slate-300 font-serif-title italic">
              Collegiate Portal • Est. 1892
            </span>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="mt-4 p-2 bg-[#0b1d3a] rounded-lg border border-[#243b53] flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold">Portal Mode:</span>
          <select
            value={userRole}
            onChange={(e) => {
              setUserRole(e.target.value);
              if (e.target.value === 'instructor') setActiveTab('instructor');
              if (e.target.value === 'student') setActiveTab('learn');
            }}
            className="bg-[#102a43] text-[#d4af37] font-bold px-2 py-1 rounded border border-[#243b53] focus:outline-none cursor-pointer"
          >
            <option value="student">Student Portal</option>
            <option value="instructor">Instructor Studio</option>
          </select>
        </div>

        {/* Course Selector Dropdown */}
        <div className="mt-4">
          <label className="block text-[11px] text-slate-400 uppercase font-semibold mb-1">
            Active Matriculation:
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full bg-[#0b1d3a] border border-[#243b53] text-xs text-white p-2 rounded focus:outline-none"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}: {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Student Progress Indicator */}
        <div className="mt-6 p-4 bg-[#0b1d3a] border border-[#243b53] rounded-xl space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Course Completion</span>
            <span className="text-[#d4af37] font-bold">{progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-[#102a43] rounded-full overflow-hidden">
            <div className="h-full bg-[#d4af37] transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-[10px] text-slate-400">
            {completedLessons} of {allLessons.length} syllabus modules finished.
          </p>

          {progressPct >= 100 ? (
            <button
              onClick={onOpenCertificate}
              className="w-full mt-2 py-2 bg-[#d4af37] hover:bg-[#b89428] text-[#102a43] font-bold text-xs rounded uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>Claim Official Certificate</span>
            </button>
          ) : (
            <button
              onClick={onOpenCertificate}
              className="w-full mt-2 py-1.5 bg-[#243b53] hover:bg-[#334e68] text-slate-300 text-[11px] rounded font-semibold flex items-center justify-center gap-1"
            >
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Preview Completion Certificate</span>
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="mt-6 space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('learn')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              activeTab === 'learn'
                ? 'bg-[#d4af37] text-[#102a43] font-bold shadow-sm'
                : 'text-slate-300 hover:bg-[#0b1d3a]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum & Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              activeTab === 'quiz'
                ? 'bg-[#d4af37] text-[#102a43] font-bold shadow-sm'
                : 'text-slate-300 hover:bg-[#0b1d3a]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Interactive Quizzes</span>
          </button>

          <button
            onClick={() => setActiveTab('forum')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
              activeTab === 'forum'
                ? 'bg-[#d4af37] text-[#102a43] font-bold shadow-sm'
                : 'text-slate-300 hover:bg-[#0b1d3a]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Course Discussion Forum</span>
          </button>

          {userRole === 'instructor' && (
            <button
              onClick={() => setActiveTab('instructor')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'instructor'
                  ? 'bg-[#d4af37] text-[#102a43] font-bold shadow-sm'
                  : 'text-slate-300 hover:bg-[#0b1d3a]'
              }`}
            >
              <BarChart className="w-4 h-4 text-[#d4af37]" />
              <span>Faculty Studio & Analytics</span>
            </button>
          )}
        </nav>
      </div>

      {/* Footer Profile */}
      <div className="pt-4 border-t border-[#243b53] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#243b53] border border-[#d4af37] flex items-center justify-center text-[#d4af37] font-bold text-xs">
          ST
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Student Scholar</span>
          <span className="text-[10px] text-slate-400">ID: 2026-MAT-9081</span>
        </div>
      </div>
    </aside>
  );
}
