import "../styles/join.css";
import { useEffect } from "react";
import FormJoin from "../components/FormJoin"
import useChat from "../hooks/useChat";

function Join() {

  const { setIsLoadingChat} = useChat();

  useEffect(() => {
    setIsLoadingChat(true);
  
  }, []);


  return (
    <div className="join">
      <FormJoin />
    </div>
  )
}

export default Join