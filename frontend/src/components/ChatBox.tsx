import useGetMessages from "../hooks/useGetMessages"
import Spinner from "./UI/Spinner";
import { useAuthContext } from "../context/AuthContext";
import  showTime  from "../utils/showTime";
import useScrollToBottom from "../hooks/useScrollToBottom";

export default function ChatBox() {
  const { messages, loading } = useGetMessages(); // Use the useGetMessages hook to get the messages
  const { authUser } = useAuthContext(); // Access the authUser from the AuthContext
  const ref = useScrollToBottom([messages]) as React.MutableRefObject<HTMLDivElement>; // Use the useScrollToBottom hook to scroll to the bottom of the chat box
  
  return (
      <div ref={ref} className="grow p-5 h-[60vh] overflow-y-auto bg-slate-200">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : messages.length ? (
            messages.map((message) => (
              <div key={message.id} className={`p-2 flex ${message.senderId !== authUser?.id ? "justify-end" : ""}`}>
                <div className="shadow bg-white p-2.5 max-w-96 flex items-end gap-3 rounded-lg">
                  <div className="">{message.body}</div>
                  <div className="text-xs text-gray-500 " >{ showTime(message.createdAt) }</div>
                </div>
              </div>
            ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  No messages
                </div>
          )}
        </div>
  )
}
