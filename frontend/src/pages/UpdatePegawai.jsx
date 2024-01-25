import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import UpdateDataPegawai from "../components/pegawai/UpdatePegawai";

const UpdatePegawai = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <UpdateDataPegawai />
      </div>
    </div>

  );
};

export default UpdatePegawai;
