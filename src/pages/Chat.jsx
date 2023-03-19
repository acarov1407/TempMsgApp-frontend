import "../styles/chat.css"
import useChat from "../hooks/useChat"
import useAuth from "../hooks/useAuth";
import FormMessage from "../components/FormMessage";
import { useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import MembersWindow from "../components/MembersWindow";
import { copyTextToClipboard } from "../helpers/clipboard.js";



function Chat() {

  const [isActiveMembersWindow, setIsActiveMembersWindow] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [chatName, setChatName] = useState('');

  const { chat, isLoadingChat, reJoinChat, sendChatName } = useChat();

  const { id, name } = chat;

  const { auth } = useAuth();

  const scroll = useRef(null);

  const isChatOwner = auth.id === chat.owner.id;

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    reJoinChat();
  }, []);

  const handleEditChatName = (e) => {
    e.preventDefault();

    if(!isEditing) {
      setIsEditing(true);
      setChatName(name);
      return;
    }

    if(chatName === ''){
      alert('El nombre del chat no puede estar vacio!');
      return;
    }

    sendChatName({id, name: chatName});
    setIsEditing(false);

  }


  if (isLoadingChat) return <p>Cargando</p>

  return (
    <>
      <div className="chat__container">
        <div className="chat">
          <div className="chat__top">
            <div className="chat__top-left">
              
              {
                isEditing 
                ?
                <form>
                  <input 
                  className="chat__input-edit"
                  type="text"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  autoFocus={true}
                  placeholder="Nuevo nombre de chat"
                  />
                </form>
                :
                <p>{name}</p>
              }

              {
                isChatOwner &&
                <button
                  className="chat__button"
                  type="button"
                  onClick={handleEditChatName}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              }
              <button
                className="chat__button"
                type="button"
                onClick={() => copyTextToClipboard(id)}

              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
              </button>
            </div>
            <button
              className="chat__members-icon"
              type="button"
              onClick={() => setIsActiveMembersWindow(!isActiveMembersWindow)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </button>
          </div>

          <div className="chat__body">
            {
              chat.messages.map((_message, index) => (
                <Message
                  key={index}
                  message={_message}
                />
              ))
            }
            <div ref={scroll}></div>
          </div>

          <div className="chat__bottom">
            <FormMessage />
          </div>
        </div>
        {
          isActiveMembersWindow && <MembersWindow />
        }

      </div>

    </>
  )
}

export default Chat