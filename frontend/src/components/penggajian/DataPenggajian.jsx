import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailPenggajian from "./DetailPenggajian";
import { Container, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DataPenggajian = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [penggajianData, setPenggajianData] = useState([]);

  const token = localStorage.getItem("Authorization");
  const url = `${process.env.REACT_APP_API_KEY}/penggajian/show`;
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

  const handleDetail = (id) => {
    setSelectedId(id);
    setShowDetailModal(true);
  };

  function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h5>Data Penggajian</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Divisi</th>
              <th rowSpan={2}>Jabatan</th>
              <th rowSpan={2}>NIP</th>
              <th rowSpan={2}>Nama</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Total Gaji</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Total Potongan</th>
              <th rowSpan={2}>Take Home Pay</th>
              <th rowSpan={2}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penggajianData.map((item, index) => (
              <tr key={item.id}>
                {/* Populate with appropriate data from the API response */}
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.jabatan?.nama_divisi)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.jabatan?.nama_jabatan)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.nip_pegawai}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.nama_pegawai)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.total_gaji}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.total_potongan}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.take_home_pay}</td>
                <td>
                  <center>
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ cursor: "pointer", color: "blue", marginRight: "8px" }}
                      onClick={() => handleDetail(item.id)}
                    />
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Data Penggajian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DetailPenggajian id={selectedId} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DataPenggajian;
