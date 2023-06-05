import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/HomePage";

import MegaMenuChildren from "./pages/MegaMenuChildren";
import Profile from "./pages/Profile";
import SubMenuChildren from "./pages/SubMenuChildren";

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
            path="/:megaMenu/:subMenuChildren"
            element={<SubMenuChildren />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
