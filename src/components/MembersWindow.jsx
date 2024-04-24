import "../styles/chat.css";
import useChat from "../hooks/useChat"
import Member from "./Member";


function MembersWindow() {

    const { chat } = useChat();
    const { members } = chat;
    return (
        <div className="chat__members">
            <div className="chat__members-top">
                <p>Active members</p>
            </div>
            <div className="member__container">
                {
                    members.map(_user => <Member key={_user.id} member={_user} />)
                }
            </div>
        </div>
    )
}

export default MembersWindow
