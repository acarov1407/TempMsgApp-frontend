import useAuth from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

function ProtectedRoute() {

    const { auth, isLoadingUser } = useAuth();
    
    if(isLoadingUser) return <p>Cargando</p>
    return (
        <>
            {
                auth.id
                    ?
                    (
                        <>
                            <Header />
                            <main className="chatLayout container">
                                <Outlet />
                            </main>
                        </>
                    )
                    :
                    <Navigate to="/" />
            }
        </>
    )
}

export default ProtectedRoute