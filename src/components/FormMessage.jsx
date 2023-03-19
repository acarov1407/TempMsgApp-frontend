import "../styles/forms.css"
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import { formatDate, formatHour } from "../helpers/date";

function FormMessage() {

    const [messageText, setMessageText] = useState('');
    const { sendMessage, chat } = useChat();

    const { auth } = useAuth();



    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageText.trim() === '') {
            setMessageText('');
            return;
        }

        const nowDate = new Date();

        sendMessage({
            author: auth,
            messageText,
            chat: chat.id,
            date: formatDate(nowDate),
            hour: formatHour(nowDate)
        })

        setMessageText('');
    }

    return (
        <form
            className="form__message"
            onSubmit={handleSubmit}
        >
            <input
                className="form__message-input"
                type="text"
                placeholder="Escribe un mensaje aquí"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}

            />
            <button
                type="submit"
                className="form__message-submit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="form__message-submit-img">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>


            </button>
        </form>
    )
}

export default FormMessage