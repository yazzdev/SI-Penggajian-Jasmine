import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import AddDataJabatan from "../components/jabatan/AddJabatan";

const AddJabatan = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <AddDataJabatan />
      </div>
    </div>

  );
};

export default AddJabatan;
