import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingUp from "./pages/SingUp/SingUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
