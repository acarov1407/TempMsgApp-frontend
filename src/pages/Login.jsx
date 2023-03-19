import "../styles/login.css"
import FormUser from "../components/FormUser"

function Login() {

    return (
        <main className="userLogin">
            <div className="container userLogin__content">
                <h1 className="userLogin__title">TempMsgApp</h1>
                <h3 className="userLogin__subtitle">Mensajería instantánea y sin rastros</h3>
                <FormUser />
            </div>

        </main>
    )
}

export default Login