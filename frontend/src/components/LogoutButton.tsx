import useLogout from "../hooks/useLogout";

export default function LogoutButton() {
    const { loading, logout } = useLogout();
    async function handleLogout() {
      await logout();
    }
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4"
      onClick={handleLogout}
    >
      {loading ? "Loading..." : "Logout"}
    </button>
  );
}
