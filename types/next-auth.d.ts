import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the default User type
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    emailVerified?: Date | null;
  }
}

