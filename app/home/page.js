import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logoutButton";

export default async function Home() {
  const session = await auth();
  console.log("SESSION: ", session);
  if (!session?.user) {
    redirect("/");
  }
  return (
    <main className="mx-auto max-w-7xl">
      <h1 className="my-4 text-xl font-bold">Home</h1>
      <p className="mt-2 font-bold">Session:</p>
      <p> className={JSON.stringify(session)}</p>
      <LogoutButton />
    </main>
  );
}
