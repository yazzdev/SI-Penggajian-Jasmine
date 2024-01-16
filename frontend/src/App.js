import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import UpdateAdmin from "./pages/UpdateAdmin";
import Dashboard from "./pages/Dashboard";
import Jabatan from "./pages/Jabatan"
import Pegawai from "./pages/Pegawai";
import AddPegawai from './pages/AddPegawai';
import UpdatePegawai from './pages/UpdatePegawai';
import Tunjangan from "./pages/Tunjangan";
import UpdateTunjangan from "./pages/UpdateTunjangan";
import Potongan from "./pages/Potongan";
import UpdatePotongan from "./pages/UpdatePotongan";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/update" element={<UpdateAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pegawai" element={<Pegawai />} />
        <Route path="/pegawai/add" element={<AddPegawai />} />
        <Route path="/pegawai/update/:nip" element={<UpdatePegawai />} />
        <Route path="/jabatan" element={<Jabatan />} />
        <Route path="/tunjangan" element={<Tunjangan />} />
        <Route path="/tunjangan/update/:id" element={<UpdateTunjangan />} />
        <Route path="/potongan" element={<Potongan />} />
        <Route path="/potongan/update/:id" element={<UpdatePotongan />} />
      </Routes>
      <ToastContainer theme="colored" position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
