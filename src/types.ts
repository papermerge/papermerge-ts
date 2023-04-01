import React from 'react';


export type UserType = {
  username: string;
  email: string;
  id: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType | null;
  authenticate: (email: string, password: string) => void;
  logout?: (redirect: string) => void;
}

export type SimpleComponentArgs = {
  children: React.ReactNode;
}