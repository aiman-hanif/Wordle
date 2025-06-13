import { BrowserRouter, Routes, Route } from "react-router-dom";
import Namedle from "./Namedle";
import Login from "./Login";
import Navbar from "./Navbar";
import { NamedleProvider } from "./NamedleContext";
// next todo: figure out input one guess at a time
function App() {
  return (
    <NamedleProvider>
      <BrowserRouter>
        <Navbar />
        <div className="h-[calc(100vh-35px)]">
          <Routes>
            <Route path="/" element={<Namedle />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NamedleProvider>
  );
}

export default App;
