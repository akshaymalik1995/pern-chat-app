import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext"
import { useState } from "react"

type SignupInputs = {
    fullname: string
    username: string
    password: string
    confirmPassword: string
    gender : string
}

export default function useSignup() {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async (inputs: SignupInputs) => {
        setLoading(true)
        try {
            const response = await fetch('api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.error)
            }
            setAuthUser(responseData.data);

            toast.success("Signup successful", {
                position: "top-center",
                autoClose: 5000,
            })
            
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
            })
        }
        setLoading(false)
    }

    return { loading, signup }
  
}
