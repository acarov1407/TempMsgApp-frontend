import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import { ChatProvider } from "./context/ChatProvider";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Chat from "./pages/Chat";
import Join from "./pages/Join";

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/chat" element={<ProtectedRoute />}>
              <Route path=":id" element={<Chat />} />
              <Route path="join" element={<Join />} />             
            </Route>
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
