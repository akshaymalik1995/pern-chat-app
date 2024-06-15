import TextInput from "./UI/TextInput";
import useSendMessage from "../hooks/useSendMessage";
import React from "react";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import Spinner from "./UI/Spinner";
import { toast } from "react-toastify";

export default function ChatInput() {
  const { sendMessage , loading} = useSendMessage();
  const [message, setMessage] = useState("");

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) {
      return toast.error("Message cannot be empty");
    }
    await sendMessage(message);
    setMessage("");
  }

  return (
    <div className="py-2">
      <form className="flex px-4" onSubmit={handleFormSubmit} action="">
        <TextInput
          autoFocus
          placeholder="Type a message..."
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <button
          type="submit"
          className="rounded bg-blue-100 p-2 text-2xl text-blue-500"
        >
         {loading ? <div className="w-6 h-6" ><Spinner /></div> : <BiSend />} 
        </button>
      </form>
    </div>
  );
}
