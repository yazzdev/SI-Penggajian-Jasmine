import '../App.css'
import React from "react";
import Sidebar from '../components/Sidebar';
import DataPenggajian from "../components/DataPenggajian";

const Dashboard = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <DataPenggajian />
      </div>
    </div>

  );
};

export default Dashboard;
