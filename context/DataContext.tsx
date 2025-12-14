import React, { createContext, useContext, useState, useEffect } from 'react';
import { Material, User } from '../types';
import { INITIAL_MATERIALS, MOCK_USERS } from '../services/mockData';

interface DataContextType {
  user: User | null;
  usersList: User[]; // Exposed for Admin to view all data
  materials: Material[];
  likedMaterialIds: Set<string>;
  login: (email: string, password: string, role: 'STUDENT' | 'ADMIN') => boolean;
  signup: (name: string, email: string, password: string, role: 'STUDENT' | 'ADMIN', branch?: string, year?: string) => boolean;
  logout: () => void;
  addMaterial: (material: Omit<Material, 'id' | 'createdAt' | 'downloads' | 'likes' | 'isApproved'>) => void;
  approveMaterial: (id: string) => void;
  deleteMaterial: (id: string) => void;
  toggleLike: (id: string) => void;
  downloadMaterial: (material: Material) => void;
  isMaterialLiked: (id: string) => boolean;
  // Admin User Management
  deleteUser: (userId: string) => void;
  promoteToAdmin: (userId: string) => void;
  adminAddUser: (userData: { name: string; email: string; role: 'STUDENT' | 'ADMIN'; branch?: string; year?: string }) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage if available, otherwise use defaults
  const [usersList, setUsersList] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('abes_users');
      return saved ? JSON.parse(saved) : MOCK_USERS;
    } catch (e) {
      console.error("Failed to load users from local storage", e);
      return MOCK_USERS;
    }
  });

  const [materials, setMaterials] = useState<Material[]>(() => {
    try {
      const saved = localStorage.getItem('abes_materials');
      return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    } catch (e) {
      console.error("Failed to load materials from local storage", e);
      return INITIAL_MATERIALS;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('abes_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [likedMaterialIds, setLikedMaterialIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('abes_liked_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  // Persist Users List
  useEffect(() => {
    localStorage.setItem('abes_users', JSON.stringify(usersList));
  }, [usersList]);

  // Persist Materials
  useEffect(() => {
    localStorage.setItem('abes_materials', JSON.stringify(materials));
  }, [materials]);

  // Persist Current Session
  useEffect(() => {
    if (user) {
      localStorage.setItem('abes_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('abes_current_user');
    }
  }, [user]);

  // Persist Liked Items
  useEffect(() => {
    localStorage.setItem('abes_liked_ids', JSON.stringify(Array.from(likedMaterialIds)));
  }, [likedMaterialIds]);

  const login = (email: string, password: string, role: 'STUDENT' | 'ADMIN'): boolean => {
    // Find user by email first
    const foundUser = usersList.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (foundUser && password.trim().length >= 3) {
      // Permission Logic:
      // 1. If the user is an ADMIN in the database, they can login via Admin OR Student tabs.
      // 2. If the user is a STUDENT in the database, they can ONLY login via Student tab.
      
      if (foundUser.role === 'STUDENT' && role === 'ADMIN') {
        // Student trying to access Admin - Deny
        return false;
      }
      
      // Admin logging in as Student -> Allowed
      // Admin logging in as Admin -> Allowed
      // Student logging in as Student -> Allowed

      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: 'STUDENT' | 'ADMIN', branch?: string, year?: string): boolean => {
    // Check if email already exists
    const exists = usersList.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) return false;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      role: role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      // Add branch/year if student, defaulting if not provided (though Auth page should provide them)
      branch: role === 'STUDENT' ? (branch || 'CSE') : undefined,
      year: role === 'STUDENT' ? (year || '1st Year') : undefined,
    };

    setUsersList([...usersList, newUser]);
    setUser(newUser); // Auto login after signup
    return true;
  };

  const logout = () => {
    setUser(null);
    setLikedMaterialIds(new Set());
    localStorage.removeItem('abes_current_user');
    // We choose to clear likes on explicit logout
    localStorage.removeItem('abes_liked_ids'); 
  };

  // --- Material Functions ---

  const addMaterial = (newMat: Omit<Material, 'id' | 'createdAt' | 'downloads' | 'likes' | 'isApproved'>) => {
    const material: Material = {
      ...newMat,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      downloads: 0,
      likes: 0,
      isApproved: false,
    };
    setMaterials([material, ...materials]);
  };

  const approveMaterial = (id: string) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, isApproved: true } : m));
  };

  const deleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const toggleLike = (id: string) => {
    const isLiked = likedMaterialIds.has(id);
    const newLikedSet = new Set(likedMaterialIds);
    if (isLiked) {
      newLikedSet.delete(id);
    } else {
      newLikedSet.add(id);
    }
    setLikedMaterialIds(newLikedSet);
    setMaterials(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, likes: isLiked ? Math.max(0, m.likes - 1) : m.likes + 1 };
      }
      return m;
    }));
  };

  const isMaterialLiked = (id: string) => {
    return likedMaterialIds.has(id);
  };

  const downloadMaterial = (material: Material) => {
    setMaterials(prev => prev.map(m => m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m));
    if (material.fileUrl && material.fileUrl !== '#') {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.target = '_blank';
      link.download = material.title.replace(/\s+/g, '_') + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const element = document.createElement("a");
      const file = new Blob([`Content for ${material.title}\n\nDescription: ${material.description}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${material.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  // --- Admin User Management Functions ---

  const deleteUser = (userId: string) => {
    // Prevent deleting yourself
    if (user && user.id === userId) return; 
    setUsersList(prev => prev.filter(u => u.id !== userId));
  };

  const promoteToAdmin = (userId: string) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: 'ADMIN' } : u));
  };

  // New function for Admin to manually add user without logging out
  const adminAddUser = (userData: { name: string; email: string; role: 'STUDENT' | 'ADMIN'; branch?: string; year?: string }): boolean => {
     // Check if email already exists
     const exists = usersList.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());
     if (exists) return false;
 
     const newUser: User = {
       id: Math.random().toString(36).substr(2, 9),
       name: userData.name,
       email: userData.email,
       role: userData.role,
       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
       branch: userData.role === 'STUDENT' ? (userData.branch || 'CSE') : undefined,
       year: userData.role === 'STUDENT' ? (userData.year || '1st Year') : undefined,
     };
 
     setUsersList([...usersList, newUser]);
     return true;
  };

  return (
    <DataContext.Provider value={{ 
      user, 
      usersList,
      materials, 
      likedMaterialIds,
      login, 
      signup,
      logout, 
      addMaterial, 
      approveMaterial, 
      deleteMaterial, 
      toggleLike, 
      downloadMaterial, 
      isMaterialLiked, 
      deleteUser, 
      promoteToAdmin, 
      adminAddUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};