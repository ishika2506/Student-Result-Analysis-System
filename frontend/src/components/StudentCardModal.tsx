import React from 'react';
import { StudentResult } from '../types';
import { X, Printer } from 'lucide-react';

interface StudentCardModalProps {
  student: StudentResult | null;
  onClose: () => void;
}

export const StudentCardModal: React.FC<StudentCardModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/25 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="glass-elevated rounded-[20px] max-w-lg w-full border border-white/80 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-[rgba(60,60,67,0.12)] flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-black">{student.name}</h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-black/5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    student.status === 'PASS' ? 'bg-[#248A3D]' : 'bg-[#D70015]'
                  }`}
                ></span>
                <span className={student.status === 'PASS' ? 'text-[#248A3D]' : 'text-[#D70015]'}>
                  {student.status === 'PASS' ? 'Passed' : `${student.failedSubjectsCount} Backlog(s)`}
                </span>
              </span>
            </div>
            <p className="text-xs text-[rgba(60,60,67,0.60)] font-mono mt-0.5">
              Roll No: {student.rollNumber} • Rank #{student.rank}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[8px] text-[rgba(60,60,67,0.60)] hover:text-black hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2.5 p-4 bg-black/[0.02] border-b border-[rgba(60,60,67,0.08)] text-center">
          <div className="p-2.5 rounded-[12px] bg-white/70 border border-white">
            <p className="text-[11px] text-[rgba(60,60,67,0.60)] font-medium">Total Marks</p>
            <p className="text-base font-semibold text-black tabular-nums mt-0.5">
              {student.totalMarks} <span className="text-xs text-[rgba(60,60,67,0.40)] font-normal">/ {student.maxTotalMarks}</span>
            </p>
          </div>
          <div className="p-2.5 rounded-[12px] bg-white/70 border border-white">
            <p className="text-[11px] text-[rgba(60,60,67,0.60)] font-medium">Percentage</p>
            <p className="text-base font-semibold text-[#007AFF] tabular-nums mt-0.5">{student.percentage}%</p>
          </div>
          <div className="p-2.5 rounded-[12px] bg-white/70 border border-white">
            <p className="text-[11px] text-[rgba(60,60,67,0.60)] font-medium">SGPA</p>
            <p className="text-base font-semibold text-black tabular-nums mt-0.5">{student.sgpa}</p>
          </div>
        </div>

        {/* Course Marks Table */}
        <div className="p-5 space-y-3">
          <h4 className="text-xs font-semibold text-[rgba(60,60,67,0.70)]">Course Performance</h4>

          <div className="border border-[rgba(60,60,67,0.12)] rounded-[12px] overflow-hidden bg-white/60 text-xs">
            <table className="w-full text-left">
              <thead className="h-8 bg-black/[0.03] text-[rgba(60,60,67,0.60)] text-[11px] font-medium border-b border-[rgba(60,60,67,0.08)]">
                <tr>
                  <th className="px-3">Subject Name</th>
                  <th className="px-3 text-right">Marks (100)</th>
                  <th className="px-3 text-center">Grade</th>
                  <th className="px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(60,60,67,0.06)]">
                {student.subjects.map((sub, i) => (
                  <tr key={i} className="h-9 hover:bg-black/[0.02]">
                    <td className="px-3 font-medium text-black">{sub.subjectName}</td>
                    <td className="px-3 text-right font-semibold text-black tabular-nums">{sub.marks}</td>
                    <td className="px-3 text-center font-semibold text-[#007AFF]">{sub.grade}</td>
                    <td className="px-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px]">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sub.passed ? 'bg-[#248A3D]' : 'bg-[#D70015]'
                          }`}
                        ></span>
                        <span className={sub.passed ? 'text-[#248A3D]' : 'text-[#D70015]'}>
                          {sub.passed ? 'Pass' : 'Fail'}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2.5 pt-2">
            <button
              onClick={onClose}
              className="h-8 px-3.5 rounded-[10px] bg-white/70 hover:bg-white border border-[rgba(60,60,67,0.20)] text-black text-xs font-medium transition-all shadow-2xs"
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              className="h-8 px-3.5 rounded-[10px] bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Marksheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
