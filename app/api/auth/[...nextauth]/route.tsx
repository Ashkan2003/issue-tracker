import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
