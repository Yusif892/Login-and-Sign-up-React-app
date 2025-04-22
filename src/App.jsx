import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignUP from "./Pages/SignUP";
import SignIN from "./Pages/SignIN";
import { Header } from "./components/Header";
function App() {
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="bg-[#1E1E2E] min-h-screen">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home name={name} />} />
        <Route path="/sign-up" element={<SignUP setName={setName} />} />
        <Route
          path="/sign-in"
          element={<SignIN setName={setName} setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
