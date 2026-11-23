import React, { useState } from 'react';
import { StudentResult } from '../types';
import { Search, Printer } from 'lucide-react';

interface StudentSearchProps {
  students: StudentResult[];
}

export const StudentSearch: React.FC<StudentSearchProps> = ({ students }) => {
  const [query, setQuery] = useState('');
  const [foundStudent, setFoundStudent] = useState<StudentResult | null>(students[0] || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const match = students.find(
      (s) =>
        s.rollNumber.toLowerCase() === query.trim().toLowerCase() ||
        s.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    setFoundStudent(match || null);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h2 className="text-base font-semibold text-black">Student Result Lookup</h2>
        <p className="text-xs text-[rgba(60,60,67,0.60)] mt-0.5">
          Enter roll number or student name to retrieve the verified marksheet
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="glass p-3 flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[rgba(60,60,67,0.40)] absolute left-3 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Roll Number (e.g. 101, 102, 104) or Student Name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white/70 border border-[rgba(60,60,67,0.20)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
          />
        </div>
        <button
          type="submit"
          className="h-8 px-4 bg-[#007AFF] hover:bg-[#0062CC] text-white font-medium text-xs rounded-[10px] shadow-xs transition-all"
        >
          Search
        </button>
      </form>

      {/* Result Display */}
      {foundStudent ? (
        <div className="glass overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-[rgba(60,60,67,0.12)] flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-black">{foundStudent.name}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-black/5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      foundStudent.status === 'PASS' ? 'bg-[#248A3D]' : 'bg-[#D70015]'
                    }`}
                  ></span>
                  <span className={foundStudent.status === 'PASS' ? 'text-[#248A3D]' : 'text-[#D70015]'}>
                    {foundStudent.status === 'PASS' ? 'Passed' : `${foundStudent.failedSubjectsCount} Backlog(s)`}
                  </span>
                </span>
              </div>
              <p className="text-xs text-[rgba(60,60,67,0.60)] font-mono mt-0.5">
                Roll No: {foundStudent.rollNumber} • Rank #{foundStudent.rank}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="h-8 px-3 rounded-[10px] bg-white/70 hover:bg-white border border-[rgba(60,60,67,0.20)] text-black text-xs font-medium flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 p-4 bg-black/[0.02] border-b border-[rgba(60,60,67,0.08)] text-center">
            <div className="p-2.5 rounded-[12px] bg-white/70 border border-white">
              <p className="text-[11px] text-[rgba(60,60,67,0.60)] font-medium">Total Marks</p>
              <p className="text-base font-semibold text-black tabular-nums mt-0.5">
                {foundStudent.totalMarks} <span className="text-xs text-[rgba(60,60,67,0.40)] font-normal">/ {foundStudent.maxTotalMarks}</span>
              </p>
            </div>
            <div className="p-2.5 rounded-[12px] bg-white/70 border border-white">
              <p className="text-[11px] text-[rgba(60,60,67,0.60)] font-medium">Percentage</p>
              <p className="text-base font-semibold text-[#007AFF] tabular-nums mt-0.5">{foundStudent.percentage}%</p>
            </div>
            <div className="p-2.5 rounded-[12px] bg-white/70 border border-white">
              <p className="text-[11px] text-[rgba(60,60,67,0.60)] font-medium">SGPA</p>
              <p className="text-base font-semibold text-black tabular-nums mt-0.5">{foundStudent.sgpa}</p>
            </div>
          </div>

          {/* Subject Marks Table */}
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
                  {foundStudent.subjects.map((sub, i) => (
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
          </div>
        </div>
      ) : (
        <div className="glass p-8 text-center">
          <p className="text-xs text-[rgba(60,60,67,0.60)]">No student found matching query "{query}".</p>
          <p className="text-[11px] text-[rgba(60,60,67,0.40)] mt-0.5">Try searching for roll numbers like 101, 102, 104, etc.</p>
        </div>
      )}
    </div>
  );
};
