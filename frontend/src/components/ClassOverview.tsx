import React, { useState } from 'react';
import { StudentResult } from '../types';
import {
  Users,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  Search,
  Eye,
  FileDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ClassOverviewProps {
  students: StudentResult[];
  onSelectStudent: (student: StudentResult) => void;
}

export const ClassOverview: React.FC<ClassOverviewProps> = ({ students, onSelectStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PASS' | 'FAIL'>('ALL');

  const totalStudents = students.length;
  const passedStudents = students.filter((s) => s.status === 'PASS').length;
  const failedStudents = totalStudents - passedStudents;
  const passPercentage = totalStudents > 0 ? parseFloat(((passedStudents / totalStudents) * 100).toFixed(1)) : 0;
  const averagePercentage = totalStudents > 0
    ? parseFloat((students.reduce((acc, s) => acc + s.percentage, 0) / totalStudents).toFixed(1))
    : 0;

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === 'ALL' ? true : s.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const subjectAveragesMap: { [key: string]: { total: number; count: number } } = {};
  students.forEach((st) => {
    st.subjects.forEach((sub) => {
      if (!subjectAveragesMap[sub.subjectName]) {
        subjectAveragesMap[sub.subjectName] = { total: 0, count: 0 };
      }
      subjectAveragesMap[sub.subjectName].total += sub.marks;
      subjectAveragesMap[sub.subjectName].count += 1;
    });
  });

  const chartData = Object.keys(subjectAveragesMap).map((subName) => ({
    subject: subName.length > 14 ? subName.substring(0, 12) + '..' : subName,
    fullName: subName,
    average: parseFloat(
      (subjectAveragesMap[subName].total / subjectAveragesMap[subName].count).toFixed(1)
    ),
  }));

  const toppers = students.slice(0, 3);

  const exportToCsv = () => {
    const headers = ['Rank', 'Roll No', 'Name', 'Total Marks', 'Percentage', 'SGPA', 'Status'];
    const rows = students.map((s) => [
      s.rank,
      s.rollNumber,
      `"${s.name}"`,
      s.totalMarks,
      s.percentage,
      s.sgpa,
      s.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'student_result_analysis.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* 4 Clean Enterprise KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[rgba(60,60,67,0.60)]">Total Students</p>
            <p className="text-2xl font-semibold text-black tracking-tight tabular-nums mt-0.5">{totalStudents}</p>
            <p className="text-[11px] text-[rgba(60,60,67,0.45)] mt-0.5">Enrolled candidates</p>
          </div>
          <div className="w-9 h-9 rounded-[10px] bg-black/5 flex items-center justify-center text-black">
            <Users className="w-4 h-4 stroke-[1.8]" />
          </div>
        </div>

        <div className="glass p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[rgba(60,60,67,0.60)]">Pass Rate</p>
            <p className="text-2xl font-semibold text-black tracking-tight tabular-nums mt-0.5">{passPercentage}%</p>
            <p className="text-[11px] text-[#248A3D] font-medium mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#248A3D]"></span>
              <span>{passedStudents} cleared</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-[10px] bg-black/5 flex items-center justify-center text-black">
            <CheckCircle2 className="w-4 h-4 stroke-[1.8]" />
          </div>
        </div>

        <div className="glass p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[rgba(60,60,67,0.60)]">Failed / Backlogs</p>
            <p className="text-2xl font-semibold text-black tracking-tight tabular-nums mt-0.5">{failedStudents}</p>
            <p className="text-[11px] text-[#D70015] font-medium mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D70015]"></span>
              <span>{failedStudents} remedial needed</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-[10px] bg-black/5 flex items-center justify-center text-black">
            <AlertOctagon className="w-4 h-4 stroke-[1.8]" />
          </div>
        </div>

        <div className="glass p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[rgba(60,60,67,0.60)]">Class Average</p>
            <p className="text-2xl font-semibold text-black tracking-tight tabular-nums mt-0.5">{averagePercentage}%</p>
            <p className="text-[11px] text-[#007AFF] font-medium mt-0.5">
              Avg SGPA: {(averagePercentage / 9.5).toFixed(2)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-[10px] bg-black/5 flex items-center justify-center text-black">
            <TrendingUp className="w-4 h-4 stroke-[1.8]" />
          </div>
        </div>
      </div>

      {/* Grid: Top 3 & Subject Average Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* Toppers Card */}
        <div className="glass p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-black">Class Toppers</h3>
              <span className="text-[11px] text-[rgba(60,60,67,0.50)]">Top 3 Aggregate</span>
            </div>

            <div className="space-y-2 mt-3">
              {toppers.map((t, idx) => (
                <div
                  key={t.rollNumber}
                  onClick={() => onSelectStudent(t)}
                  className="cursor-pointer flex items-center justify-between p-2.5 rounded-[12px] bg-white/40 hover:bg-white/80 border border-white/60 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-[8px] bg-black/5 flex items-center justify-center text-xs font-semibold text-black tabular-nums">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-black leading-tight">{t.name}</p>
                      <p className="text-[10px] font-mono text-[rgba(60,60,67,0.55)]">Roll {t.rollNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#007AFF] tabular-nums">{t.percentage}%</p>
                    <p className="text-[10px] text-[rgba(60,60,67,0.50)] tabular-nums">SGPA {t.sgpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Chart */}
        <div className="lg:col-span-2 glass p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-black">Subject Performance</h3>
              <p className="text-[11px] text-[rgba(60,60,67,0.50)]">Average score out of 100 per course</p>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(60,60,67,0.08)" vertical={false} />
                <XAxis dataKey="subject" stroke="rgba(60,60,67,0.50)" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="rgba(60,60,67,0.50)" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val} / 100`, 'Average Score']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '10px',
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                />
                <Bar dataKey="average" fill="#007AFF" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dense Table Section */}
      <div className="glass p-4 space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-semibold text-black">Student Results Ledger</h3>
            <p className="text-[11px] text-[rgba(60,60,67,0.50)]">Click any row to open student marksheet</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-52">
              <Search className="w-3.5 h-3.5 text-[rgba(60,60,67,0.40)] absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search roll or name..."
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white/70 border border-[rgba(60,60,67,0.20)] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
              />
            </div>

            {/* Segmented Filter */}
            <div className="flex bg-[rgba(60,60,67,0.08)] p-0.5 rounded-[8px] text-[11px] font-medium">
              {(['ALL', 'PASS', 'FAIL'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-2.5 py-1 rounded-[6px] transition-all ${
                    statusFilter === filter
                      ? 'bg-white text-black font-semibold shadow-2xs'
                      : 'text-[rgba(60,60,67,0.65)] hover:text-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Export */}
            <button
              onClick={exportToCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 hover:bg-white border border-[rgba(60,60,67,0.20)] text-black text-xs font-medium rounded-[10px] shadow-2xs transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 40px Row Dense Table */}
        <div className="border border-[rgba(60,60,67,0.14)] rounded-[12px] overflow-hidden bg-white/40">
          <table className="w-full text-left text-xs">
            <thead className="h-9 border-b border-[rgba(60,60,67,0.12)] text-[rgba(60,60,67,0.60)] font-medium text-[11px]">
              <tr>
                <th className="px-3 w-14">Rank</th>
                <th className="px-3 w-24">Roll No</th>
                <th className="px-3">Student Name</th>
                <th className="px-3 text-right tabular-nums">Total Marks</th>
                <th className="px-3 text-right tabular-nums">Percentage</th>
                <th className="px-3 text-right tabular-nums">SGPA</th>
                <th className="px-3 w-28 text-center">Status</th>
                <th className="px-3 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(60,60,67,0.08)]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[rgba(60,60,67,0.50)]">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr
                    key={st.rollNumber}
                    onClick={() => onSelectStudent(st)}
                    className="h-10 hover:bg-black/[0.03] cursor-pointer transition-colors"
                  >
                    <td className="px-3 font-semibold text-black tabular-nums">{st.rank}</td>
                    <td className="px-3 font-mono text-[rgba(60,60,67,0.85)]">{st.rollNumber}</td>
                    <td className="px-3 font-medium text-black">{st.name}</td>
                    <td className="px-3 text-right tabular-nums text-[rgba(60,60,67,0.85)]">
                      {st.totalMarks} / {st.maxTotalMarks}
                    </td>
                    <td className="px-3 text-right tabular-nums font-semibold text-[#007AFF]">
                      {st.percentage}%
                    </td>
                    <td className="px-3 text-right tabular-nums font-medium text-black">{st.sgpa}</td>
                    <td className="px-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            st.status === 'PASS' ? 'bg-[#248A3D]' : 'bg-[#D70015]'
                          }`}
                        ></span>
                        <span className={st.status === 'PASS' ? 'text-[#248A3D]' : 'text-[#D70015]'}>
                          {st.status === 'PASS' ? 'Pass' : 'Backlog'}
                        </span>
                      </span>
                    </td>
                    <td className="px-3 text-center">
                      <button className="text-[rgba(60,60,67,0.60)] hover:text-black transition-colors">
                        <Eye className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
