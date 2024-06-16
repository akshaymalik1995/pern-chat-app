import useConversation from "../store/useConversation";
import { useSocketContext } from "../context/SocketContext";
export default function ConversationBox({
  conversation,
}: {
  conversation: ConversationType;
  }) {
  
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = conversation.id === selectedConversation?.id;
  const { onlineUsers } = useSocketContext();
  console.log(onlineUsers);
  const isOnline = onlineUsers.includes(conversation.id) ;
  
  
  return (
    <div onClick={() => setSelectedConversation(conversation)} className={`flex cursor-pointer items-center gap-4 p-2 py-4 hover:bg-slate-300 hover:shadow ${isSelected ? "bg-blue-200" : ""}`}>
      <div className="relative  h-12 w-12">
        <img src={conversation.profilePic} alt="" />
        {isOnline && <div className="bg-green-500 h-2 w-2 rounded-full absolute top-0 right-2"></div>}
      </div>
      <div className="text-xl">{conversation.username}</div>
    </div>
  );
}
 