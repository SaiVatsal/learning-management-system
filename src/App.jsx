import React, { useState } from 'react';
import SidebarPortal from './components/SidebarPortal';
import CoursePlayerPage from './pages/CoursePlayerPage';
import CertificateModal from './pages/CertificateModal';
import InstructorStudioPage from './pages/InstructorStudioPage';
import { useStore } from './store/useStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [isCertOpen, setIsCertOpen] = useState(false);
  const { userRole } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 selection:bg-academic-900 selection:text-white">
      {/* Collegiate Sidebar Portal */}
      <SidebarPortal
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCertificate={() => setIsCertOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        {activeTab === 'instructor' && userRole === 'instructor' ? (
          <InstructorStudioPage />
        ) : (
          <CoursePlayerPage activeSubView={activeTab} />
        )}
      </main>

      {/* Certificate Modal */}
      <CertificateModal isOpen={isCertOpen} onClose={() => setIsCertOpen(false)} />
    </div>
  );
}
