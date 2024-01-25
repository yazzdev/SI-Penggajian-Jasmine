import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import DataPotongan from "../components/potongan/DataPotongan";

const Potongan = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <DataPotongan />
      </div>
    </div>

  );
};

export default Potongan;
