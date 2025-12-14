import { Material, User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul@abes.edu.in',
    role: 'STUDENT',
    branch: 'CSE',
    year: '3rd Year',
    avatar: 'https://picsum.photos/200'
  },
  {
    id: 'admin1',
    name: 'Dr. Admin',
    email: 'admin@abes.edu.in',
    role: 'ADMIN',
    avatar: 'https://picsum.photos/201'
  }
];

// Using a standard W3C sample PDF which is more reliable for embedding testing
const SAMPLE_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'm1',
    title: 'Data Structures Complete Notes',
    description: 'Handwritten notes covering Arrays, Linked Lists, Trees and Graphs.',
    subject: 'Data Structures',
    branch: 'CSE',
    year: '2nd Year',
    semester: 'Sem 3',
    type: 'Notes',
    fileUrl: SAMPLE_PDF,
    uploadedBy: 'u1',
    uploaderName: 'Rahul Sharma',
    isApproved: true,
    downloads: 124,
    likes: 45,
    createdAt: '2023-10-15T10:00:00Z',
    size: '2.4 MB'
  },
  {
    id: 'm2',
    title: 'Operating System PYQ 2023',
    description: 'Previous year question paper with solution keys.',
    subject: 'Operating Systems',
    branch: 'IT',
    year: '2nd Year',
    semester: 'Sem 4',
    type: 'PYQ',
    fileUrl: SAMPLE_PDF,
    uploadedBy: 'u1',
    uploaderName: 'Rahul Sharma',
    isApproved: true,
    downloads: 89,
    likes: 12,
    createdAt: '2023-11-20T14:30:00Z',
    size: '1.1 MB'
  },
  {
    id: 'm3',
    title: 'React.js Workshop Manual',
    description: 'Lab manual for the advanced web development workshop.',
    subject: 'Web Technology',
    branch: 'CSE',
    year: '3rd Year',
    semester: 'Sem 5',
    type: 'Lab Manual',
    fileUrl: SAMPLE_PDF,
    uploadedBy: 'u1',
    uploaderName: 'Rahul Sharma',
    isApproved: false, // Pending approval
    downloads: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    size: '5.6 MB'
  },
  {
    id: 'm4',
    title: 'Engineering Mathematics I Cheat Sheet',
    description: 'Quick formula reference for calculus and algebra.',
    subject: 'Mathematics I',
    branch: 'ECE',
    year: '1st Year',
    semester: 'Sem 1',
    type: 'Notes',
    fileUrl: SAMPLE_PDF,
    uploadedBy: 'u1',
    uploaderName: 'Rahul Sharma',
    isApproved: true,
    downloads: 432,
    likes: 150,
    createdAt: '2023-09-01T09:00:00Z',
    size: '0.5 MB'
  }
];