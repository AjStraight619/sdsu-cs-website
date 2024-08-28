"use client";

import React, { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function TypeofUser() {
  const [userType, setUserType] = useLocalStorage<string | null>("user", null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    console.log("TypeofUser userType:", userType);
    if (!userType) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [userType]);

  const handleTypeOfUser = (type: string) => {
    setUserType(type);
    location.reload();
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select User Type</DialogTitle>
          <DialogDescription>
            Please select your user type to continue.
          </DialogDescription>
        </DialogHeader>
        <Button type="button" onClick={() => handleTypeOfUser("Professor")}>
          Professor
        </Button>
        <Button type="button" onClick={() => handleTypeOfUser("Student")}>
          Student
        </Button>
      </DialogContent>
    </Dialog>
  );
}
