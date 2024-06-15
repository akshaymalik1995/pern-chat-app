import LogoutButton from "../components/LogoutButton";
import useConversation from "../store/useConversation";
import NoChatSelected from "../components/NoChatSelected";
import ConversationList from "../components/ConversationList";
import Chat from "../components/Chat";

export default function Home() {
  const { selectedConversation } = useConversation();

  

  return (
    <div className="h-full w-full">
      <div className="grid h-full w-full grid-cols-3 shadow">
        <div className="col-span-1 shadow flex flex-col border-r ">
          <div className="grow space-y-2">
           <ConversationList />
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
        <div className="col-span-2">
          {selectedConversation ? <Chat /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
}
