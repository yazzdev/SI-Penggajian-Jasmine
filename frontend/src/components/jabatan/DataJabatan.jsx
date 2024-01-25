import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateJabatan from "./UpdateJabatan";
import { Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const DataPegawai = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [jabatanData, setJabatanData] = useState([]);

  const token = localStorage.getItem("Authorization");
  const url = `${process.env.REACT_APP_API_KEY}/jabatan/show`;
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
      setJabatanData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/jabatan/update/${id}`);
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedId(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_KEY}/jabatan/delete/${selectedId}`, config);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
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
        <h5>Data Jabatan</h5>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/jabatan/add");
          }}
        >
          Tambah Data Jabatan
        </Button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Divisi</th>
              <th>Jabatan</th>
              <th>Gaji Jabatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jabatanData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{capitalizeEachWord(item?.nama_divisi)}</td>
                <td>{capitalizeEachWord(item?.nama_jabatan)}</td>
                <td>{item?.biaya_jabatan}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ cursor: "pointer", color: "blue", marginRight: "8px" }}
                    onClick={() => handleEdit(item.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus data : "{selectedId}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for UpdateJabatan */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Jabatan {selectedId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateJabatan id={selectedId} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DataPegawai;
