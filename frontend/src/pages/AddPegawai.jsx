import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import AddDataPegawai from "../components/pegawai/AddPegawai";

const AddPegawai = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <AddDataPegawai />
      </div>
    </div>

  );
};

export default AddPegawai;
