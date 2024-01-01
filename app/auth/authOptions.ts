import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  //the Credentials provider is specified like other providers, except that you need to define a handler for authorize() that accepts credentials submitted via HTTP POST as input and returns either:
  // A user object, which indicates the credentials are valid.
  // If you return an object it will be persisted to the JSON Web Token and the user will be signed in, unless a custom signIn() callback is configured that subsequently rejects it.
  // If you return null then an error will be displayed advising the user to check their details.
  // If you throw an Error, the user will be sent to the error page with the error message as a query parameter.
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // maxAge:6 // per-second
  },
  pages: {
    //Specify URLs to be used if you want to create custom sign in, sign out and error pages. Pages specified will override the corresponding built-in page.
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );
        return passwordMatch ? user : null;
      },
    }),
  ],
};

export default authOptions;
