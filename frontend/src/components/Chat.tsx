import ChatInput from "./ChatInput";
import ChatBox from "./ChatBox";
import ChatHeader from "./ChatHeader";
export default function Chat() {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <ChatBox />
      <ChatInput />
    </div>
  );
}
