import "../styles/message.css"
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";

function Message({ message }) {


  const { auth } = useAuth();
  const { chat } = useChat();

  const { author, isPrimary, type, messageText, hour } = message;

  const isMessageOwner = auth.id === author.id;
  const showAutor = !isMessageOwner && isPrimary;
  //const showMargin = chat.messages.length !== 0 && !isMessageOwner || isPrimary;



  return (

    type === 'log'
      ?
      (
        <p className="log">{messageText}</p>
      )
      :
      (
        <div className={`message__container ${isMessageOwner ? 'owner' : ''}`}>
          <div className={`message ${isPrimary ? 'mt-2' : 'mt-0-3'} ${isMessageOwner ? 'bg-owner' : 'bg-external'}`}>
            <div>
              {
                showAutor && <p className="author">{author.username}</p>
              }
              <p className="text">{messageText}</p>
            </div>
            <p className="time">{hour}</p>
          </div>
        </div>
      )


  )
}

export default Message