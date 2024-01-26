import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateTunjangan from "./UpdateTunjangan";
import { Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const DataTunjangan = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tunjanganData, setTunjanganData] = useState([]);

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
      setTunjanganData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/tunjangan/update/${id}`);
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
        <h5>Data Tunjangan</h5>
      </div>

      <div className="table-responsive" style={{ maxHeight: "610px", overflowY: "auto" }}>
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
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tunjanganData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.nip_pegawai}</td>
                <td>{capitalizeEachWord(item?.pegawai?.nama_pegawai)}</td>
                <td>{item?.transport}</td>
                <td>{item?.makan}</td>
                <td>{item?.komunikasi}</td>
                <td>{item?.keahlian}</td>
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
      {/* Modal for UpdateTunjangan */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Potongan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateTunjangan nip={selectedId} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DataTunjangan;
