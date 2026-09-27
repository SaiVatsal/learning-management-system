import React, { useState } from 'react';
import { BookPlus, Sparkles, TrendingDown, Users, BarChart3, CheckCircle, FilePlus, Video } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function InstructorStudioPage() {
  const { courses, addNewCourse, generateAiCourseThumbnail } = useStore();

  const [courseCode, setCourseCode] = useState('ELEC-501');
  const [title, setTitle] = useState('');
  const [dept, setDept] = useState('Electrical & Computer Systems');
  const [desc, setDesc] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState('');

  const handleGenerateThumbnail = async () => {
    setIsGenerating(true);
    const thumb = await generateAiCourseThumbnail(title);
    setCoverImg(thumb);
    setIsGenerating(false);
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalCover =
      coverImg.trim() ||
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';

    addNewCourse({
      code: courseCode,
      title,
      department: dept,
      instructor: 'Prof. Julian Sterling, Ph.D.',
      coverImage: finalCover,
      description: desc || 'Accredited university syllabus curriculum.',
      modules: [
        {
          id: `MOD-${Date.now()}`,
          title: 'Module 1: Introductory Lecture & Primer',
          lessons: [
            {
              id: `LES-${Date.now()}`,
              title: '1.1 Foundational Principles',
              type: 'video',
              duration: '30 min',
              content: 'Primary curriculum overview and syllabus requirements.',
              completed: false
            }
          ]
        }
      ],
      quiz: {
        id: `QZ-${Date.now()}`,
        title: `${title} Unit 1 Assessment`,
        questions: [
          {
            id: 'q1',
            text: 'What constitutes the foundational theorem of this course?',
            options: ['First Principle Axiom', 'Secondary Corollary', 'Tertiary Hypothesis'],
            correctIndex: 0
          }
        ]
      }
    });

    setTitle('');
    setDesc('');
    setCoverImg('');
    setToast('Course curriculum successfully published to campus catalog!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest font-academic-crest">
          Faculty Administration Studio
        </span>
        <h1 className="text-3xl font-bold font-serif-title text-[#102a43]">
          Curriculum Builder & Learner Retention Analytics
        </h1>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2 text-xs">
            <span className="font-bold uppercase">Active Matriculated Scholars</span>
            <Users className="w-4 h-4 text-[#102a43]" />
          </div>
          <div className="text-3xl font-black font-academic-crest text-[#102a43]">240 Students</div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">↑ 14% this semester</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2 text-xs">
            <span className="font-bold uppercase">Course Completion Rate</span>
            <BarChart3 className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-black font-academic-crest text-[#102a43]">68.5% Avg</div>
          <span className="text-[11px] text-slate-500 font-serif-title mt-1 block">Collegiate average: 61%</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2 text-xs">
            <span className="font-bold uppercase">Primary Drop-off Node</span>
            <TrendingDown className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-rose-900 font-serif-title">Module 2.3 (Lab Proofs)</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Recommended: Add supplementary office hours</span>
        </div>
      </div>

      {/* Course Builder Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
          <BookPlus className="w-5 h-5 text-[#102a43]" />
          <h2 className="text-xl font-bold font-serif-title text-[#102a43]">
            Publish New University Curriculum
          </h2>
        </div>

        <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Course Code</label>
              <input
                type="text"
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#102a43]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Curriculum Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Quantum Computing Architectures & Qubit Control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#102a43]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Academic Department</label>
            <input
              type="text"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#102a43]"
            />
          </div>

          {/* AI Cover Thumbnail Hook */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#102a43] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                Automated AI Course Cover Generation Pipeline
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Generates an academic textbook-style cover image if no faculty photography is supplied.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Cover URL or click Generate"
                value={coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                className="flex-1 bg-white border border-slate-200 p-2 text-xs rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={handleGenerateThumbnail}
                disabled={isGenerating}
                className="px-4 py-2 bg-[#102a43] text-[#d4af37] font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm"
              >
                {isGenerating ? 'Generating...' : 'AI Thumbnail'}
              </button>
            </div>

            {coverImg && (
              <img src={coverImg} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-slate-300 mt-2" />
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Syllabus Monograph</label>
            <textarea
              rows={3}
              placeholder="Prerequisites, syllabus goals, lecture methodology..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#102a43]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#102a43] hover:bg-[#243b53] text-[#d4af37] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
          >
            Publish Accredited Curriculum
          </button>
        </form>
      </div>
    </div>
  );
}
