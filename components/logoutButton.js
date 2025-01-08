import { logOutAction } from "@/actions";
export default function LogoutButton() {
  return (
    <button
      className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
      onClick={logOutAction}
    >
      Log out
    </button>
  );
}
