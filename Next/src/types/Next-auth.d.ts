import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string; 
      email: string;
      role?: string;
    };
  }

  interface User {
    username: string;
    email: string;
    role?: string;
  }
}
