import React, { useState } from 'react';
import { StudentResult } from '../types';
import { UploadCloud, FileText, CheckCircle2, AlertOctagon, ArrowRight } from 'lucide-react';

interface UploadSectionProps {
  onDataParsed: (students: StudentResult[]) => void;
  onSwitchToOverview: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onDataParsed, onSwitchToOverview }) => {
  const [csvText, setCsvText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const sampleTemplate = `RollNo,Name,CloudComputing,MachineLearning,CyberSecurity,SoftwareEngg,WebTechLab
101,Aarav Sharma,92,88,95,84,96
102,Bhavna Patel,78,82,70,75,88
103,Chirag Verma,32,28,55,45,60
104,Divya Nair,94,91,89,95,98
105,Eshan Khan,65,72,68,70,75
106,Farhan Ali,42,50,48,55,62
107,Gauri Deshmukh,85,88,90,82,91
108,Harsh Mehta,35,62,58,48,70
109,Isha Singhania,74,80,78,82,85
110,Jayesh Rathore,88,85,91,89,94`;

  const parseCsvContent = (content: string) => {
    try {
      const lines = content.trim().split('\n');
      if (lines.length < 2) {
        setErrorMsg('The CSV must contain at least a header row and 1 student row.');
        return;
      }

      const headers = lines[0].split(',').map((h) => h.trim());
      const subjectNames = headers.slice(2);

      const parsedStudents: StudentResult[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.split(',').map((p) => p.trim());
        if (parts.length < 3) continue;

        const rollNumber = parts[0];
        const name = parts[1];
        const marks = parts.slice(2).map((m) => {
          const num = parseFloat(m);
          return isNaN(num) ? 0 : num;
        });

        const subjects = marks.map((m, idx) => {
          const passed = m >= 40;
          let grade = 'F';
          if (m >= 90) grade = 'O';
          else if (m >= 80) grade = 'A+';
          else if (m >= 70) grade = 'A';
          else if (m >= 60) grade = 'B+';
          else if (m >= 50) grade = 'B';
          else if (m >= 40) grade = 'P';

          return {
            subjectName: subjectNames[idx] || `Subject ${idx + 1}`,
            marks: m,
            maxMarks: 100,
            grade,
            passed,
          };
        });

        const totalMarks = marks.reduce((acc, curr) => acc + curr, 0);
        const maxTotalMarks = subjects.length * 100;
        const percentage = parseFloat(((totalMarks / maxTotalMarks) * 100).toFixed(2));
        const failedSubjectsCount = subjects.filter((s) => !s.passed).length;
        const status = failedSubjectsCount === 0 ? 'PASS' : 'FAIL';
        const sgpa = parseFloat((percentage / 9.5).toFixed(2));

        parsedStudents.push({
          rollNumber,
          name,
          subjects,
          totalMarks,
          maxTotalMarks,
          percentage,
          sgpa,
          status,
          failedSubjectsCount,
        });
      }

      parsedStudents.sort((a, b) => b.totalMarks - a.totalMarks);
      parsedStudents.forEach((st, idx) => {
        st.rank = idx + 1;
      });

      if (parsedStudents.length === 0) {
        setErrorMsg('Could not parse any valid student rows.');
        return;
      }

      setErrorMsg('');
      setSuccessMsg(`Successfully parsed ${parsedStudents.length} students!`);
      onDataParsed(parsedStudents);
    } catch (err: any) {
      setErrorMsg('Error parsing CSV format: ' + err.message);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvText(text);
      parseCsvContent(text);
    };
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    setCsvText(sampleTemplate);
    parseCsvContent(sampleTemplate);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div>
        <h2 className="text-base font-semibold text-black">Upload Marksheet Roster</h2>
        <p className="text-xs text-[rgba(60,60,67,0.60)] mt-0.5">
          Ingest raw marks in CSV format. Ranks, Totals, SGPA, and Pass/Fail are calculated automatically.
        </p>
      </div>

      {/* File Dropzone */}
      <div className="glass p-8 text-center space-y-3">
        <div className="w-11 h-11 bg-black/5 text-black rounded-[12px] flex items-center justify-center mx-auto">
          <UploadCloud className="w-5 h-5 stroke-[1.8]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-black">Upload or Drag CSV File</h3>
          <p className="text-xs text-[rgba(60,60,67,0.50)] mt-0.5">Format: RollNo, Name, Subject1, Subject2, ...</p>
        </div>

        <div className="flex justify-center gap-2.5 pt-2">
          <label className="cursor-pointer h-8 px-3.5 bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-medium rounded-[10px] flex items-center shadow-xs transition-all">
            <span>Browse CSV File</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
          </label>
          <button
            onClick={handleLoadSample}
            className="h-8 px-3.5 bg-white/70 hover:bg-white border border-[rgba(60,60,67,0.20)] text-black text-xs font-medium rounded-[10px] shadow-2xs transition-all"
          >
            Load Sample CSV
          </button>
        </div>
      </div>

      {/* Direct CSV Paste */}
      <div className="glass p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[rgba(60,60,67,0.70)] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Or Paste CSV Text Directly</span>
          </label>
          <span className="text-[11px] text-[rgba(60,60,67,0.40)]">Comma-separated</span>
        </div>

        <textarea
          rows={6}
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
          placeholder={`RollNo,Name,Subject1,Subject2,Subject3\n101,John Doe,85,90,78\n102,Jane Smith,92,88,95`}
          className="w-full p-3 font-mono text-xs bg-white/70 border border-[rgba(60,60,67,0.20)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
        />

        <div className="flex justify-between items-center pt-1">
          <button
            onClick={() => parseCsvContent(csvText)}
            disabled={!csvText.trim()}
            className="h-8 px-4 bg-black hover:bg-slate-800 disabled:bg-black/20 text-white text-xs font-medium rounded-[10px] shadow-xs transition-all"
          >
            Process & Analyze Marks
          </button>

          {successMsg && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#248A3D] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{successMsg}</span>
              </span>
              <button
                onClick={onSwitchToOverview}
                className="h-7 px-3 bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-medium rounded-[8px] flex items-center gap-1 shadow-xs transition-all"
              >
                <span>View Results</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {errorMsg && (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#D70015] font-medium">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
