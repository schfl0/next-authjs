import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Forms from "@/components/forms";
import SocialSignIn from "@/components/socialSignIn";

export default async function Home() {
  const session = await auth();
  console.log("SESSION:", session);
  if (session?.user) {
    redirect("/home");
  }
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-md">
        <Forms />
        <SocialSignIn />
      </div>
    </main>
  );
}
