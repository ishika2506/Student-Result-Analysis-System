import { StudentResult } from '../types';

function calculateGrade(marks: number): { grade: string; passed: boolean } {
  if (marks >= 90) return { grade: 'O', passed: true };
  if (marks >= 80) return { grade: 'A+', passed: true };
  if (marks >= 70) return { grade: 'A', passed: true };
  if (marks >= 60) return { grade: 'B+', passed: true };
  if (marks >= 50) return { grade: 'B', passed: true };
  if (marks >= 40) return { grade: 'P', passed: true };
  return { grade: 'F', passed: false };
}

function createStudent(
  rollNumber: string,
  name: string,
  marksArray: number[]
): StudentResult {
  const subjectNames = [
    'Cloud Computing',
    'Machine Learning',
    'Cyber Security',
    'Software Engg',
    'Web Tech Lab',
  ];

  const subjects = marksArray.map((m, idx) => {
    const { grade, passed } = calculateGrade(m);
    return {
      subjectName: subjectNames[idx],
      marks: m,
      maxMarks: 100,
      grade,
      passed,
    };
  });

  const totalMarks = marksArray.reduce((acc, curr) => acc + curr, 0);
  const maxTotalMarks = subjectNames.length * 100;
  const percentage = parseFloat(((totalMarks / maxTotalMarks) * 100).toFixed(2));
  const failedSubjects = subjects.filter((s) => !s.passed).length;
  const status = failedSubjects === 0 ? 'PASS' : 'FAIL';
  const sgpa = parseFloat((percentage / 9.5).toFixed(2));

  return {
    rollNumber,
    name,
    subjects,
    totalMarks,
    maxTotalMarks,
    percentage,
    sgpa,
    status,
    failedSubjectsCount: failedSubjects,
  };
}

export const initialStudentsData: StudentResult[] = [
  createStudent('101', 'Aarav Sharma', [92, 88, 95, 84, 96]),
  createStudent('102', 'Bhavna Patel', [78, 82, 70, 75, 88]),
  createStudent('103', 'Chirag Verma', [32, 28, 55, 45, 60]), // Fail in 2
  createStudent('104', 'Divya Nair', [94, 91, 89, 95, 98]),
  createStudent('105', 'Eshan Khan', [65, 72, 68, 70, 75]),
  createStudent('106', 'Farhan Ali', [42, 50, 48, 55, 62]),
  createStudent('107', 'Gauri Deshmukh', [85, 88, 90, 82, 91]),
  createStudent('108', 'Harsh Mehta', [35, 62, 58, 48, 70]), // Fail in 1
  createStudent('109', 'Isha Singhania', [74, 80, 78, 82, 85]),
  createStudent('110', 'Jayesh Rathore', [88, 85, 91, 89, 94]),
].sort((a, b) => b.totalMarks - a.totalMarks).map((student, index) => ({
  ...student,
  rank: index + 1,
}));
