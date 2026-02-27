import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // I'll add real providers next
  ],
  pages: {
    signIn: "/auth/signin",  // Custom sign-in page I'll create
  },
  secret: process.env.AUTH_SECRET,  // Required for production/security
});