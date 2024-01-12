import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const DataTunjangan = () => {
  const [penggajianData, setPenggajianData] = useState([]);

  const token = localStorage.getItem("Authorization");
  const url = `${process.env.REACT_APP_API_KEY}/tunjangan/show`;
  const config = {
    headers: {
      Authorization: token,
    },
    cache: 'no-store',
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(url, config);
      console.log(response.data);
      setPenggajianData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h5>Data Tunjangan</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>Nama</th>
              <th>Transport</th>
              <th>Makan</th>
              <th>Komunikasi</th>
              <th>Keahlian</th>
            </tr>
          </thead>
          <tbody>
            {penggajianData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.nip_pegawai}</td>
                <td>{item?.pegawai?.nama_pegawai}</td>
                <td>{item?.transport}</td>
                <td>{item?.makan}</td>
                <td>{item?.komunikasi}</td>
                <td>{item?.keahlian}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default DataTunjangan;
