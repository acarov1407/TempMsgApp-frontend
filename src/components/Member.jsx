import "../styles/chat.css";
import memberIcon from "../../src/assets/user_icon.svg"
import ownerIcon from "../../src/assets/crown_icon.svg";
import useChat from "../hooks/useChat";

function Member({ member }) {

    const { id, username } = member;
    const { chat } = useChat();

    const isOwner = chat.owner.id === id;

    return (
        <div className="member">
            <img
                height={24}
                width={24}
                src={isOwner ? ownerIcon : memberIcon}
                alt="User Icon"
            />
            <p className="member__username">{username}</p>
        </div>
    )
}

export default Member