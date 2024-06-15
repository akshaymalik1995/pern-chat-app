
import { create } from "zustand";

export interface ConversationState {
    selectedConversation: ConversationType | null;
    setSelectedConversation: (conversation: ConversationType | null) => void;
    messages: MessageType[];
    setMessages: (messages: MessageType[]) => void;
};

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages : (messages) => set({ messages }),
}));
    


export default useConversation;