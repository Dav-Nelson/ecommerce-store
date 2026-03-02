import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

// For now, mock user DB — we'll replace with Prisma later
const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: bcrypt.hashSync("password123", 10), // hashed version
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input with Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Find user (mock for now)
        const user = users.find((u) => u.email === email);

        if (!user) return null;

        // Compare password
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        // Return user object (without password!)
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" }, // Simple JWT for now
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});