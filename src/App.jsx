import './App.css'
import Nav from "./components/Nav.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./routes/Home.jsx";
import NotFound from "./routes/NotFound.jsx";
import Katas from "./routes/Katas.jsx";
import About from "./routes/About.jsx";
import {useState} from "react";
import TryKata from "./routes/TryKata.jsx";
import CreateKata from "./routes/CreateKata.jsx";

function App() {
  const [userAddress, setUserAddress] = useState('');
  return (
    <>
      <div className="bg-gray-600 h-screen w-screen">
        <Nav userAddress={userAddress} setUserAddress={setUserAddress} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katas" element={<Katas userAddress={userAddress} setUserAddress={setUserAddress} />} />
          <Route path="/about" element={<About />} />
          <Route path="/try-kata" element={<TryKata />} />
          <Route path="/create-kata" element={<CreateKata userAddress={userAddress}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
