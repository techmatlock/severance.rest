import { signOut } from "aws-amplify/auth";

export default function Dashboard() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <button type="button" onClick={handleSignOut} className="p-2 bg-red-500 text-white rounded">
      Sign out
    </button>
  );
}
