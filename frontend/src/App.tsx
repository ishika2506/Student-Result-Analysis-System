import React, { useState } from 'react';
import { initialStudentsData } from './data/demoData';
import { StudentResult } from './types';
import { Navbar } from './components/Navbar';
import { ClassOverview } from './components/ClassOverview';
import { UploadSection } from './components/UploadSection';
import { StudentSearch } from './components/StudentSearch';
import { StudentCardModal } from './components/StudentCardModal';

export const App: React.FC = () => {
  const [students, setStudents] = useState<StudentResult[]>(initialStudentsData);
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'search'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);

  const handleDataParsed = (newStudents: StudentResult[]) => {
    setStudents(newStudents);
  };

  const handleResetData = () => {
    setStudents(initialStudentsData);
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetData={handleResetData}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {activeTab === 'overview' && (
          <ClassOverview
            students={students}
            onSelectStudent={(st) => setSelectedStudent(st)}
          />
        )}

        {activeTab === 'upload' && (
          <UploadSection
            onDataParsed={handleDataParsed}
            onSwitchToOverview={() => setActiveTab('overview')}
          />
        )}

        {activeTab === 'search' && (
          <StudentSearch students={students} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Online Student Result Analysis System (OSRAS) • 7th Semester College Project
      </footer>

      {/* Marksheet Popup Modal */}
      <StudentCardModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
};

export default App;
