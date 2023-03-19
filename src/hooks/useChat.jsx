import { useContext } from "react";
import ChatContext from "../context/ChatProvider";

function useChat() {
  return useContext(ChatContext);
}

export default useChat