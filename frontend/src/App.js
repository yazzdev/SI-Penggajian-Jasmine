import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import UpdateAdmin from "./pages/UpdateAdmin";
import Dashboard from "./pages/Dashboard";
import ShowPegawai from "./pages/ShowPegawai";
import AddPegawai from './pages/AddPegawai';

import Tunjangan from "./pages/Tunjangan";
import Potongan from "./pages/Potongan";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/update" element={<UpdateAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pegawai" element={<ShowPegawai />} />
        <Route path="/pegawai/add" element={<AddPegawai />} />
        <Route path="/tunjangan" element={<Tunjangan />} />
        <Route path="/potongan" element={<Potongan />} />
      </Routes>
      <ToastContainer theme="colored" position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
