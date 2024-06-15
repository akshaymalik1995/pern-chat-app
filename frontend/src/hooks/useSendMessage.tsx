import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import useGetMessages from "./useGetMessages";
import { toast } from "react-toastify";
import axios from "axios";

export default function useSendMessage() {
    const { selectedConversation } = useConversation();
    const { messages, setMessages } = useGetMessages();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Scroll to the bottom of the chat box
        const chatBox = document.getElementById("chat-box");
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messages, selectedConversation]);

    const sendMessage = async (message: string) => {
        try {
            setLoading(true);
            const url = `/api/messages/send/${selectedConversation?.id}`;
            const response = await axios.post(url, { message : message });
            const result = response.data;

            console.log(result.data);
            setMessages([...messages, result.data]);
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error(error.message);
            }
            
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
}
