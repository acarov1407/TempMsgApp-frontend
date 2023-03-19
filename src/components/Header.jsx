import "../styles/header.css";
import appLogo from "../../src/assets/app_logo.svg"
import useChat from "../hooks/useChat";
import useAuth from "../hooks/useAuth";

function Header() {

  const { resetChat } = useChat();
  const { resetUser } = useAuth();

  const handleClickLogout = () => {
    resetChat();
    resetUser();
  }

  return (
    <header className="header">
      <div className="header__content container">
        <div className="header__logo">
          <img
            height="40"
            width="40"
            className="header__img"
            src={appLogo}
            alt="TempMsgApp Icon"
          />
          <h1 className="header__logo-text">TempMsgApp</h1>
        </div>
        <button
          type="button"
          className="header__logout"
          onClick={handleClickLogout}
        >
          Cerrar Sesión
        </button>
      </div>

    </header>
  )
}

export default Header