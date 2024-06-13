import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";


export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()
    const login = async (inputs: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await fetch("api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.error);
            }

            setAuthUser(responseData.data)

            toast.success("Login successful", {
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
  return { login, loading}
}
