import React from 'react';


export type User = {
  username: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  authenticate: (email: string, password: string) => void;
  logout?: (redirect: string) => void;
}

export type SimpleComponentArgs = {
  children: React.ReactNode;
}