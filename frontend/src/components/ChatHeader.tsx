import useConversation from "../store/useConversation";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

export default function ChatHeader() {
  const { selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(selectedConversation?.id || "") ;
  return (
    <div className="p-2">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12">
          <img src={authUser?.profilePic} alt="" />
        </div>
        <div>
          <div>{selectedConversation?.fullname}</div>
                  <div className="text-sm" >
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
}
