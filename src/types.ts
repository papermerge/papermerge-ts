import React from 'react';


export type User = {
  username: string;
  email: string;
  home_folder_id: string;
  inbox_folder_id: string;
}

export type UserContextType = {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}

export type SimpleComponentArgs = {
  children: React.ReactNode;
}