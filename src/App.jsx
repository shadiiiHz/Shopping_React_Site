import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import MegaMenuChildren from "./pages/MegaMenuChildren";
import SubMenuChildren from "./pages/SubMenuChildren";
import Test from "./pages/Test";

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
          <Route path="/:megaMenu/:subMenuChildren" element={<SubMenuChildren />} />
          <Route
            path="/login"
            element={isUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
