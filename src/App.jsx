import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import MegaMenuChildren from "./pages/MegaMenuChildren";

function App() {
  const user = useSelector((state) => state.user.isUser);
  // console.log(admin);
  let isUser = user;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:megaMenu" element={<MegaMenuChildren />} />
       
          <Route
            path="/login"
            element={isUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
