import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import DataJabatan from "../components/jabatan/DataJabatan";

const Jabatan = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <DataJabatan />
      </div>
    </div>

  );
};

export default Jabatan;
