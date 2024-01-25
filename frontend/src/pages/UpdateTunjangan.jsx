import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import UpdateDataTunjangan from "../components/tunjangan/UpdateTunjangan";

const UpdateTunjangan = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <UpdateDataTunjangan />
      </div>
    </div>

  );
};

export default UpdateTunjangan;
