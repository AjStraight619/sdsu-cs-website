"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import React from "react";
import { Button } from "../ui/button";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

const UserType = () => {
  const [userType, setUserType] = useLocalStorage<string | null>("user", null);

  return (
    <div className="flex flex-row items-center gap-x-2">
      <p>{userType}</p>
      <Button onClick={() => setUserType("Student")}> Student</Button>
      <Button onClick={() => setUserType("Professor")}>Professor</Button>
    </div>
  );
};

export default UserType;
