import { SetStateAction, createContext, Dispatch, useState, useEffect, useContext } from "react"

// Define the type for the authenticated user
interface AuthUserType {
    id: string,
    fullname: string,
    username: string,
    profilePic: string,
    gender: string
}

// Define the type for the authentication context
interface AuthContextType {
    authUser: AuthUserType | null, // The authenticated user or null if not authenticated
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>, // Function to update the authenticated user
    isLoading: boolean // Flag to indicate if the authentication data is loading
}

// Create the authentication context with initial values
const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => { },
    isLoading: true
})


export const useAuthContext = () => {
    return useContext(AuthContext)
}


/**
 * Provides authentication context for the application.
 *
 * @param children - The child components to render within the context.
 * @returns The authentication context provider component.
 */
/**
 * Provides authentication context for the application.
 *
 * @param children - The child components to render within the context.
 * @returns The authentication context provider component.
 */
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                // Fetch the authenticated user data from the server
                const response = await fetch('/api/auth/myself')
                const data = await response.json()

                if (!response.ok) {
                    // If the response is not successful, throw an error
                    throw new Error(data.error)
                }

                // Set the authenticated user data
                setAuthUser(data)
            } catch (error) {
                console.error('Failed to fetch the authenticated user data:', error)
            } finally {
                // Update the loading state
                setIsLoading(false)
            }
        }
        fetchAuthUser()
    }, []) // Empty dependency array to run the effect only once

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}