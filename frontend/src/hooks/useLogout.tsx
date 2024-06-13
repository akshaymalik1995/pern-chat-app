import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function useLogout() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()
    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch("api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error);
            }


            setAuthUser(null)

            toast.success("Logout successful", {
                position: "top-center",
                autoClose: 5000,
            });

        } catch (error: any) {
            console.log(error);
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
            });
        }
        setLoading(false);
    }
  return { logout, loading}
}