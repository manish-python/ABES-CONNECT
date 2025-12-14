export type UserRole = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: string; // Only for students
  year?: string;   // Only for students
  avatar?: string;
}

export type ResourceType = 'Notes' | 'PYQ' | 'Assignment' | 'Lab Manual' | 'Syllabus' | 'Video';

export interface Material {
  id: string;
  title: string;
  description: string;
  subject: string;
  branch: string;
  year: string;
  semester: string;
  type: ResourceType;
  fileUrl: string; // In a real app, this is a cloud URL
  uploadedBy: string; // User ID
  uploaderName: string;
  isApproved: boolean;
  downloads: number;
  likes: number;
  createdAt: string;
  size: string;
}

export interface BranchOption {
  value: string;
  label: string;
}

export interface FilterState {
  branch: string;
  year: string;
  semester: string;
  type: string;
  search: string;
}

export const BRANCHES: BranchOption[] = [
  { value: 'CSE', label: 'Computer Science (CSE)' },
  { value: 'AIML', label: 'CSE (AI/ML)' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'ECE', label: 'Electronics & Comm.' },
  { value: 'EE', label: 'Electrical Engineering' },
  { value: 'ME', label: 'Mechanical Engineering' },
  { value: 'CE', label: 'Civil Engineering' },
];

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
export const SEMESTERS = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];
export const RESOURCE_TYPES: ResourceType[] = ['Notes', 'PYQ', 'Assignment', 'Lab Manual', 'Syllabus', 'Video'];
