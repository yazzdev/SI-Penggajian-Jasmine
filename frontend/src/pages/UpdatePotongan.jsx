import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import UpdateDataPotongan from "../components/potongan/UpdatePotongan";

const UpdatePotongan = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <UpdateDataPotongan />
      </div>
    </div>

  );
};

export default UpdatePotongan;
