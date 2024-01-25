import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import UpdateDataJabatan from "../components/jabatan/UpdateJabatan";

const UpdateJabatan = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <UpdateDataJabatan />
      </div>
    </div>

  );
};

export default UpdateJabatan;
