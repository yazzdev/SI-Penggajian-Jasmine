import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import UpdateAdmin from "./pages/UpdateAdmin";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/update" element={<UpdateAdmin />} />
      </Routes>
      <ToastContainer theme="colored" position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
