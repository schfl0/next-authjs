"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import client from "@/lib/mongoclient";
import bcrypt from "bcrypt";

export async function googleSignIn() {
  await signIn("google", { redirectTo: "/home" });
}

export async function credsSignIn(formData) {
  try {
    return await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { ok: false, error: { message: "Invalid credentials" } };
        default:
          return { ok: false, error: { message: "Something went wrong" } };
      }
    }
  }
}

export async function logOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function registerAction(formData) {
  const { email, password } = formData;
  await client.connect();
  const db = client.db("myapp");
  const collection = db.collection("users");
  const userExists = await collection.findOne({ email });
  if (userExists) {
    return { ok: false, error: { message: "Failed to create account" } };
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const registeredUser = await collection.insertOne({
    email,
    passwordHash,
  });
  console.log(registeredUser);
  return { ok: true };
}
