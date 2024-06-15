import useConversation from "../store/useConversation";
import { useEffect, useState } from "react";

export default function useGetMessages() {
    const { selectedConversation, setMessages, messages } = useConversation();
    const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        if (!selectedConversation) {
            return;
        }

        const fetchMessages = async () => {
        
            try {
                setLoading(true);
                const response = await fetch(`/api/messages/${selectedConversation?.id}`);
                console.log(response)
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error);
                }
    
                console.log(result.data)
                setMessages(result.data);
    
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            };

        fetchMessages();
    }, [selectedConversation]);
    
    return { messages, loading, setMessages };
    }