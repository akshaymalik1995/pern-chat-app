import { useEffect, useState } from "react";

export default function useGetConversations() {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations();
  }, []);

  async function getConversations() {
    setLoading(true);
    try {
      const response = await fetch("/api/messages/conversations");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setConversations(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return { conversations, loading, getConversations };
}
