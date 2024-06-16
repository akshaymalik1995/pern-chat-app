import { useState } from "react";
import useConversation from "../store/useConversation";
import useGetMessages from "./useGetMessages";
import { toast } from "react-toastify";
import axios from "axios";

export default function useSendMessage() {
    const { selectedConversation } = useConversation(); // Access the selectedConversation from the Conversation store
    const { messages, setMessages } = useGetMessages(); // Access the messages state and setMessages function from the useGetMessages hook

    const [loading, setLoading] = useState(false); // Local state to manage loading state

    // Function to send a message to the server
    const sendMessage = async (message: string) => { 
        
        try { // Try to send the message
            setLoading(true); // Set loading to true
            const url = `/api/messages/send/${selectedConversation?.id}`; // URL to send the message
            const response = await axios.post(url, { message : message }); // Send the message to the server
            const result = response.data; // Extract the data from the response

            console.log(result.data); // Log the result data
            setMessages([...messages, result.data]); // Update the messages state with the new message
        } catch (error: any) { // Catch any errors that occur
            if (error.response) { // If the error has a response
                toast.error(error.response.data.error); // Display the error message from the response
            } else { // If the error does not have a response
                toast.error(error.message); // Display the error message
            } 
            
        } finally { // Finally block to execute after the try or catch block
            setLoading(false); // Set loading to false
        }
    };

    return { sendMessage, loading }; // Return the sendMessage function and the loading state
}
