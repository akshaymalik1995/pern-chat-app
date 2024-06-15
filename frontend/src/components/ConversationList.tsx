import Spinner from "./UI/Spinner";
import useGetConversations from "../hooks/useGetConversations";
import ConversationBox from "./ConversationBox";

export default function ConversationList() {
  const { conversations, loading } = useGetConversations();

  return (
    <>
      <div className="">
        {loading ? (
          <div className="my-4 flex items-start justify-center">
            <Spinner />
          </div>
        ) : conversations.length ? (
          conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              conversation={conversation}
            />
          ))
        ) : (
          <div className="my-4 text-center italic">No chats available.</div>
        )}
      </div>
    </>
  );
}
