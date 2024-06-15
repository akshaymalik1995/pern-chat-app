import useGetMessages from "../hooks/useGetMessages"
import Spinner from "./UI/Spinner";
import { useAuthContext } from "../context/AuthContext";


export default function ChatBox() {
  const { messages, loading } = useGetMessages();
  const { authUser } = useAuthContext();
  function showTime(time: Date) {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }
  return (
      <div id="chat-box" className="grow p-5 h-[60vh] overflow-y-auto bg-slate-200">
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
