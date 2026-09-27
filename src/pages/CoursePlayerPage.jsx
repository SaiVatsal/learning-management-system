import React, { useState } from 'react';
import { PlayCircle, FileText, CheckCircle, Clock, BookOpen, Send, HelpCircle, Check, Award } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CoursePlayerPage({ activeSubView }) {
  const { courses, selectedCourseId, selectedLessonId, setSelectedLessonId, markLessonComplete, addForumPost } = useStore();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === selectedLessonId) || allLessons[0];

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  // Forum state
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    course.quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore({
      score,
      total: course.quiz.questions.length,
      pct: Math.round((score / course.quiz.questions.length) * 100)
    });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postBody.trim()) return;
    addForumPost(course.id, {
      author: 'Candidate Scholar',
      title: postTitle,
      body: postBody
    });
    setPostTitle('');
    setPostBody('');
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-6 py-8">
      {/* Course Header Banner */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-[#102a43] uppercase tracking-wider mb-2">
          <span>{course.department}</span>
          <span>•</span>
          <span className="text-[#d4af37] font-academic-crest">{course.code}</span>
        </div>
        <h1 className="text-3xl font-bold font-serif-title text-[#102a43] leading-tight">
          {course.title}
        </h1>
        <p className="text-xs text-slate-600 font-serif-title italic mt-1">
          Faculty Chair: {course.instructor}
        </p>
      </div>

      {/* VIEW: Curriculum & Lessons */}
      {activeSubView === 'learn' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Media & Lesson Content (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {currentLesson ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#102a43]">
                    {currentLesson.type === 'video' ? (
                      <PlayCircle className="w-4 h-4 text-[#d4af37]" />
                    ) : (
                      <FileText className="w-4 h-4 text-[#d4af37]" />
                    )}
                    <span>{currentLesson.title}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{currentLesson.duration}</span>
                </div>

                {/* Video or Document Display */}
                <div className="mt-4 aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center text-white relative">
                  {currentLesson.type === 'video' ? (
                    <div className="text-center p-6">
                      <PlayCircle className="w-16 h-16 text-[#d4af37] mx-auto mb-3 cursor-pointer hover:scale-110 transition" />
                      <p className="text-sm font-serif-title font-semibold">{currentLesson.title}</p>
                      <span className="text-xs text-slate-400">Embedded Video Player Stream</span>
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-slate-800 w-full h-full flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-[#d4af37] mb-2" />
                      <h4 className="text-sm font-bold font-serif-title text-slate-100">Official Syllabus PDF Monograph</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm">{currentLesson.content}</p>
                    </div>
                  )}
                </div>

                {/* Lesson Description */}
                <div className="mt-6">
                  <h3 className="text-sm font-bold font-serif-title text-[#102a43] mb-2">
                    Lesson Syllabus Summary
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {currentLesson.content}
                  </p>
                </div>

                {/* Mark Completed Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {currentLesson.completed ? '✓ Lesson marked completed' : 'Ready to record completion?'}
                  </span>
                  <button
                    onClick={() => markLessonComplete(course.id, currentLesson.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${
                      currentLesson.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#102a43] hover:bg-[#243b53] text-white'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{currentLesson.completed ? 'Completed' : 'Mark as Complete'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-xs">Select a lesson from the syllabus outline.</p>
            )}
          </div>

          {/* Syllabus Navigation Outline (Right col) */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold font-serif-title text-[#102a43] uppercase tracking-wider">
              Course Outline & Modules
            </h2>

            {course.modules.map((mod) => (
              <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 font-bold text-xs text-[#102a43] font-serif-title">
                  {mod.title}
                </div>
                <div className="divide-y divide-slate-100">
                  {mod.lessons.map((les) => (
                    <div
                      key={les.id}
                      onClick={() => setSelectedLessonId(les.id)}
                      className={`p-3 text-xs flex items-center justify-between cursor-pointer transition ${
                        selectedLessonId === les.id
                          ? 'bg-[#f0f4f8] border-l-4 border-[#d4af37]'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {les.completed ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                        )}
                        <span className={`font-medium ${selectedLessonId === les.id ? 'font-bold text-[#102a43]' : 'text-slate-700'}`}>
                          {les.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{les.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: Interactive Quizzes */}
      {activeSubView === 'quiz' && (
        <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest font-academic-crest">
              Official Assessment
            </span>
            <h2 className="text-2xl font-bold font-serif-title text-[#102a43]">
              {course.quiz.title}
            </h2>
          </div>

          <div className="space-y-6">
            {course.quiz.questions.map((q, qIndex) => (
              <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <p className="text-sm font-bold text-[#102a43] font-serif-title">
                  {qIndex + 1}. {q.text}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => (
                    <label
                      key={optIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer transition ${
                        selectedAnswers[q.id] === optIndex
                          ? 'border-[#102a43] bg-academic-50 font-bold text-[#102a43]'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={selectedAnswers[q.id] === optIndex}
                        onChange={() => handleSelectAnswer(q.id, optIndex)}
                        className="accent-[#102a43]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleGradeQuiz}
              className="px-6 py-3 bg-[#102a43] hover:bg-[#243b53] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition"
            >
              Submit Assessment for Automatic Grading
            </button>

            {quizScore && (
              <div className="p-6 bg-slate-100 border border-slate-300 rounded-xl text-center space-y-2">
                <span className="text-xs uppercase font-bold text-slate-500">Grading Outcome</span>
                <div className="text-3xl font-black font-academic-crest text-[#102a43]">
                  {quizScore.pct}% ({quizScore.score} / {quizScore.total} Correct)
                </div>
                <p className="text-xs text-slate-600 font-serif-title italic">
                  {quizScore.pct >= 70
                    ? 'Congratulations! You have demonstrated satisfactory scholastic mastery.'
                    : 'Passing score requires 70%. Please review the curriculum notes and retry.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW: Course Discussion Forum */}
      {activeSubView === 'forum' && (
        <div className="max-w-3xl space-y-6">
          {/* Post Submission Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold font-serif-title text-[#102a43] mb-3">
              Initiate Academic Discourse Thread
            </h3>
            <form onSubmit={handlePostSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Discourse Topic / Inquiry..."
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#102a43]"
              />
              <textarea
                rows={3}
                required
                placeholder="Elaborate on your hypothesis, reference, or conceptual challenge..."
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-[#102a43]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#102a43] hover:bg-[#243b53] text-white font-bold rounded-lg uppercase tracking-wider transition flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Publish to Forum</span>
              </button>
            </form>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {course.forumPosts.map((post) => (
              <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span className="font-bold text-[#102a43] font-serif-title">{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <h4 className="font-bold text-base text-[#102a43] font-serif-title">{post.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
