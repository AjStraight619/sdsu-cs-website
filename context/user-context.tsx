"use client";
import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  user: any;
  setUser: (user: any) => void;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ user, setUser, showDialog, setShowDialog }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
