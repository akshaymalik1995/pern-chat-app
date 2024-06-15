import useConversation from "../store/useConversation";
export default function ConversationBox({
  conversation,
}: {
  conversation: ConversationType;
  }) {
  
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = conversation.id === selectedConversation?.id;
  
  return (
    <div onClick={() => setSelectedConversation(conversation)} className={`flex cursor-pointer items-center gap-4 p-2 py-4 hover:bg-slate-300 hover:shadow ${isSelected ? "bg-blue-200" : ""}`}>
      <div className="h-12 w-12">
        <img src={conversation.profilePic} alt="" />
      </div>
      <div className="text-xl">{conversation.username}</div>
    </div>
  );
}
 