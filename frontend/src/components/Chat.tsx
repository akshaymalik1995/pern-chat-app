import { useAuthContext } from "../context/AuthContext";
import useConversation from "../store/useConversation";
import ChatInput from "./ChatInput";
import ChatBox from "./ChatBox";
export default function Chat() {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  return (
    <div className="flex h-full flex-col">
      <div className="p-2">
        <div className="flex items-center gap-2" >
          <div className="w-12 h-12" ><img src={authUser?.profilePic} alt="" /></div>
          <div>{selectedConversation?.fullname}</div>
        </div>
      </div>
      <ChatBox />
    <ChatInput />
    </div>
  );
}

