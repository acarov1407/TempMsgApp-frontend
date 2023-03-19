import '../styles/forms.css';
import { useState } from "react";
import Alert from "./Alert";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";
import { useNavigate } from "react-router-dom";

function FormUser() {

  const [username, setUsername] = useState('');
  const [alert, setAlert] = useState('');

  const { login } = useAuth();
  const { createChat } = useChat();

  const navigate = useNavigate();

  const existAlert = alert !== '';

  const validateUser = () => {
    return username !== '';
  }

  const handleClickCreate = () => {
    if (!validateUser()) {
      setAlert('Debes introducir un nombre de usuario');
      return;
    }

    setAlert('');
    login(username);
    createChat();

  }

  const handleClickJoin = () => {
    
    if (!validateUser()) {
      setAlert('Debes introducir un nombre de usuario');
      return;
    }
    setAlert('');
    login(username);
    navigate('/chat/join');
  }

  return (
    <form className="user__form">
      {
        existAlert && <Alert msg={alert} />
      }
      <div>
        <label htmlFor="username" className="user__form-label">Nombre de usuario:</label>
        <input
          className="user__form-input"
          type="text"
          id="username"
          name="username"
          placeholder="Tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="user__form-submits">
        <button type="button" className="user__form-submit" onClick={handleClickCreate}>Crear Chat</button>
        <button type="button" className="user__form-submit" onClick={handleClickJoin}>Unirse a un Chat</button>
      </div>

    </form>
  )
}

export default FormUser