import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdatePotongan from "./UpdatePotongan";
import { Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const DataPotongan = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [potonganData, setPotonganData] = useState([]);

  const token = localStorage.getItem("Authorization");
  const url = `${process.env.REACT_APP_API_KEY}/potongan/show`;
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
      setPotonganData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/potongan/update/${id}`);
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
        <h5>Data Potongan</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>NIP</th>
              <th>Nama</th>
              <th>Makan</th>
              <th>Zakat</th>
              <th>Absensi</th>
              <th>Transport</th>
              <th>Pinjaman Pegawai</th>
              <th>Lain-Lain</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {potonganData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.nip_pegawai}</td>
                <td>{capitalizeEachWord(item?.pegawai?.nama_pegawai)}</td>
                <td>{item?.makan}</td>
                <td>{item?.zakat}</td>
                <td>{item?.absensi}</td>
                <td>{item?.transport}</td>
                <td>{item?.pinjaman_pegawai}</td>
                <td>{item?.lain_lain}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ cursor: "pointer", color: "blue", marginRight: "8px" }}
                    onClick={() => handleEdit(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for UpdatePotongan */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Potongan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdatePotongan nip={selectedId} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DataPotongan;
