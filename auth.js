// Modified from https://github.com/ugurkellecioglu/another-next-template
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/mongoclient";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const adapter = MongoDBAdapter(client);

const authConfig = {
  adapter,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          await client.connect();
          const db = client.db("myapp");
          const collection = db.collection("users");
          const userExists = await collection.findOne({ email: email });
          if (!userExists) {
            return null;
          }
          const match = await bcrypt.compare(password, userExists.passwordHash);
          if (!match) {
            return null;
          }
          return userExists;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
        token.user = user._id.toString();
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuidv4();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }
        const createdSession = await adapter?.createSession({
          sessionToken: sessionToken,
          userId: params.token.user,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        if (!createdSession) {
          throw new Error("Failed to create session");
        }
        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
