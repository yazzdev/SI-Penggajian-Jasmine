import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import DataPegawai from "../components/pegawai/DataPegawai";

const Pegawai = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <DataPegawai />
      </div>
    </div>

  );
};

export default Pegawai;
