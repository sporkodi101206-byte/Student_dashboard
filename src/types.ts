export interface Course {
  id: string;
  courseName: string;
  internal: string;
  external: string;
  final: string;
  gradePoint: number;
  grade: 'O' | 'A' | 'B' | 'C' | 'RA';
  credit: number;
  result: 'Pass' | 'Fail';
  type: 'Theory' | 'Practical' | 'Language' | 'Extension';
}

export interface SemesterRecord {
  semesterNumber: number;
  semesterLabel: string;
  examSession: string;
  credits: number;
  sgpa: number;
  courses: Course[];
}

export interface StudentProfile {
  name: string;
  regNo: string;
  college: string;
  program: string;
  department: string;
  gender: 'Female' | 'Male' | 'Other';
  batch: string;
  currentYear: string;
  email: string;
  enrollmentStatus: string;
  advisor: string;
}

export interface TransportDetails {
  route: string;
  from: string;
  to: string;
  vehicle: string;
  oneWayTimeMinutes: number;
  oneWayFareInr: number;
  returnTimeMinutes: number;
  returnFareInr: number;
  totalDailyCostInr: number;
  stops: string[];
}
