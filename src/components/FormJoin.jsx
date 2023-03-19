import "../styles/forms.css";
import { useState } from "react"
import Alert from "./Alert";
import useChat from "../hooks/useChat";

function FormJoin() {

    const [chatCode, setChatCode] = useState('');

    const { joinToChat, alert, setAlert } = useChat();

    const existAlert = alert !== '';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (chatCode.trim() === '' || isNaN(chatCode.trim())) {
            setAlert('Debes introducir un código de chat válido');
            return;
        }

        setAlert('');
        joinToChat(chatCode);
    }

    return (
        <form
            className="join__form"
            onSubmit={handleSubmit}
        >
            {
                existAlert && <Alert msg={alert} />
            }
            <div>
                <label htmlFor="chat-code">Ingresa el código del chat</label>
                <input
                    className="join__form-code"
                    type="number"
                    id="chat-code"
                    value={chatCode}
                    onChange={(e) => setChatCode(e.target.value)}
                />
            </div>

            <input
                className="join__form-submit"
                type="submit"
                value="Unirse"
            />
        </form>
    )
}

export default FormJoin