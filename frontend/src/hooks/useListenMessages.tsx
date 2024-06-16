
import { useEffect } from "react"; // Importing the "useEffect" hook from React
import { useSocketContext } from "../context/SocketContext"; // Importing the useSocketContext hook from the SocketContext
import useConversation from "../store/useConversation"; // Importing the useConversation hook from the Conversation store




export default function useListenMessages() {
  const { socket } = useSocketContext(); // Access the socket instance from the SocketContext
  const { messages, setMessages } = useConversation(); // Access the messages state and setMessages function from the Conversation store
    
  // useEffect hook to listen for 'newMessage' event from the server
  useEffect(() => {
    if (socket) {
      // Listen for 'newMessage' event from the server
      socket.on("newMessage", (message : MessageType) => {
        // Update the messages state with the new message
        setMessages([...messages, message]);
        // Play a notification sound
        new Audio("/ringtone.mp3").play();
      });
    }
    // Clean up function to remove the event listener
    return () => {
      if (socket) {
        socket.off("newMessage"); // Remove the event listener for 'newMessage'
      }
    };
  }, [socket, messages, setMessages]); // Dependency array with socket, messages, and setMessages
  return (
    <div>
      
    </div>
  )
}


