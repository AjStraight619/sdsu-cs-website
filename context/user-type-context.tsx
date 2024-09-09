"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "lucide-react";
import React, { createContext, ReactNode, useContext } from "react";

type UserContextType<T> = {
  userType: T | null;
  setUserType: React.Dispatch<React.SetStateAction<T | null>>;
};

const defaultUserContext: UserContextType<any> = {
  userType: null,
  setUserType: () => {}, // default to a no-op function
};

const UserContext = createContext<UserContextType<any>>(defaultUserContext);

const UserTypeProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useLocalStorage("user", null);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserTypeProvider;

export const useUserType = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserType must be used within the UserTypeProvider");
  }
  return context;
};
