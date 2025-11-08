import React, { createContext, useState, useEffect, ReactNode } from 'react';
// FIX: Update Firebase imports to use v8 namespaced API and types.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../firebase/config';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

// In a real application, this would be fetched from a database like Firestore.
// For simulation, we'll hardcode a super admin email.
const SUPER_ADMIN_EMAIL = 'admin@amaderdhan.com';

// FIX: Update FirebaseUser type to firebase.User for v8 compatibility.
const getUserRole = (firebaseUser: firebase.User | null): UserRole => {
    if (!firebaseUser || !firebaseUser.email) return UserRole.CLIENT;
    if (firebaseUser.email === SUPER_ADMIN_EMAIL) {
        return UserRole.SUPER_ADMIN;
    }
    // In a real app, you'd check a 'users' collection for the role.
    // For now, other logged-in users are regular admins for demonstration.
    return UserRole.ADMIN; 
}


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Use auth.onAuthStateChanged from the v8 API.
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const role = getUserRole(firebaseUser);
        setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: role
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
        // FIX: Use auth.signOut() from the v8 API.
        await auth.signOut();
    } catch (error) {
        console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    loading,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};