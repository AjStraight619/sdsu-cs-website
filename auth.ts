import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs";
import { getUserByEmail } from "./server-only/users";
import { LoginSchema } from "./lib/schemas";
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  providers: [

    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          console.log("Successfully parsed credentials");
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          console.log(user);
          if (!user || user.password === null) return null;
          const passwordsMatch = await compare(password, user.password);
          console.log("Password match?: ", passwordsMatch);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.emailVerified = user.emailVerified ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      if (typeof token.emailVerified !== 'undefined') {
        session.user.emailVerified = token.emailVerified ?? null;
      }
      return session;
    },
  },
});
