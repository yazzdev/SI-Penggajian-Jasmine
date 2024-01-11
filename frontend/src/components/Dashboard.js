// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [penggajianData, setPenggajianData] = useState([]);

  useEffect(() => {
    // Fetch penggajian data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/penggajian/show');
        if (response.data.status) {
          setPenggajianData(response.data.data);
        } else {
          console.error('Error fetching penggajian data:', response.data.message);
        }
      } catch (error) {
        console.error('Error during data fetching:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs once after the initial render

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li>Penggajian</li>
          <li>Pegawai</li>
          <li>Jabatan & Divisi</li>
          <li>Tunjangan</li>
          <li>Potongan</li>
          <li>Exit</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Penggajian Table */}
        <h2>Penggajian</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Divisi</th>
              <th>Nama Jabatan</th>
              <th>NIP Pegawai</th>
              <th>Nama Pegawai</th>
              <th>Gaji Pokok</th>
              <th>Biaya Jabatan</th>
              <th>Tunjangan</th>
              <th>Potongan</th>
              <th>Total Gaji</th>
              <th>Total Potongan</th>
              <th>Take Home Pay</th>
              <th>Bank</th>
              <th>No Rekening</th>
            </tr>
          </thead>
          <tbody>
            {penggajianData.map((item, index) => (
              <tr key={index}>
                {/* Render data here based on the provided structure */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
