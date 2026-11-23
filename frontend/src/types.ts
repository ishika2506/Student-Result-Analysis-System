export interface SubjectMark {
  subjectName: string;
  marks: number;
  maxMarks: number;
  grade: string;
  passed: boolean;
}

export interface StudentResult {
  rollNumber: string;
  name: string;
  subjects: SubjectMark[];
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  sgpa: number;
  status: 'PASS' | 'FAIL';
  failedSubjectsCount: number;
  rank?: number;
}

export interface ClassSummary {
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  passPercentage: number;
  classAveragePercentage: number;
  highestPercentage: number;
  lowestPercentage: number;
}
