import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import DataTunjangan from "../components/tunjangan/DataTunjangan";

const Tunjangan = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <DataTunjangan />
      </div>
    </div>

  );
};

export default Tunjangan;
