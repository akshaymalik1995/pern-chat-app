import { createContext, ReactNode, useEffect, useRef, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuthContext } from './AuthContext';

// Define the shape of the SocketContext
interface ISocketContext {
    socket: Socket | null; // The socket instance or null if not connected
    onlineUsers: string[]; // Array of online user names
}

// Create the SocketContext with initial values
const SocketContext = createContext<ISocketContext>({
    socket: null,
    onlineUsers: []
});

// Custom hook to access the SocketContext
export const useSocketContext = () : ISocketContext => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within a SocketContextProvider');
    }
    return context;
}

// Define the URL for the socket connection
const socketURL = 'http://localhost:5000';

// SocketContextProvider component
export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // State to store online users
    const socketRef = useRef<Socket | null>(null); // Ref to store the socket instance
    const { authUser, isLoading } = useAuthContext(); // Access the authentication context

    useEffect(() => {
        if (!isLoading && authUser) {
            // Create a new socket instance with the specified URL and user ID as query parameter
            const socket = io(socketURL, {
                query: {
                    userId: authUser.id
                }
            });

            socketRef.current = socket; // Store the socket instance in the ref

            console.log(socket);

            // Listen for 'getOnlineUsers' event and update the onlineUsers state
            socket.on('getOnlineUsers', (users: string[]) => {
                setOnlineUsers(users);
            });

            // Clean up function to close the socket connection and reset the socket ref
            return () => {
                socket.close();
                socketRef.current = null;
            };

        } else if (!isLoading && !authUser) {
            // If the user is not authenticated, close the socket connection (if it exists) and reset the socket ref
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    }, [authUser, isLoading]);

    // Provide the socket instance and onlineUsers state to the children components
    return (
        <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};