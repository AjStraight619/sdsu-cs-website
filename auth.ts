import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"

import { compare } from "bcryptjs";
import { getUserByEmail } from "./actions/user";
import { LoginSchema } from "./lib/schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
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
});
