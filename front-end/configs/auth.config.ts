import { AuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { UserRoles } from "@/lib/roles.enum";

interface IToken {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string | undefined;
  role: UserRoles;
  iat: 1706175194;
  exp: 1706176994;
}

interface Tokens {refreshToken: string, accessToken: string}

const refreshToken = async (token: string) => {

  const res = await axios(
    `${process.env.NEXT_PUBLIC_baseURL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        refreshToken: token,
      }, 
    }
  ).then((res) => res.data).catch((err) => {
    return null
  });

  const tokens = res as Tokens

  return tokens;
}

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if(!credentials?.password && !credentials?.username) {
          throw new Error("Please enter your email and password");
        }
        const res = await axios(
          `${process.env.NEXT_PUBLIC_baseURL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              email: credentials.username,
              password: credentials.password,
            },
          }
        ).then((res) => res.data).catch((err) => {
          return null
        });

        const user = res
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt");
      if (token && token.accessToken && typeof token.accessToken === "string") {
        const decodedToken = jwtDecode<IToken>(token.accessToken);
        

        token.id = decodedToken.id;
        token.role = decodedToken.role;
        token.email = decodedToken.email;

        if (Date.now() / 1000 < decodedToken.exp) {
          return token;
        } else {
            // console.log("refresh token");
            if(token && token.refreshToken && typeof token.refreshToken === "string"){
              try{
                const tokens = await refreshToken(token.refreshToken);
                token.accessToken = tokens.accessToken;
                token.refreshToken = tokens.refreshToken;
              } catch(e) {
                signOut()
              }
            }
        }
      }
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user = token;

      return session;
    },
  },
  //   pages: {
  //     signIn: '/signin',
  //   },
};
