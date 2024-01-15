import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DataPegawai = () => {
  const [penggajianData, setPenggajianData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNIP, setSelectedNIP] = useState(null);

  const token = localStorage.getItem("Authorization");
  const url = `${process.env.REACT_APP_API_KEY}/pegawai/show`;
  const config = {
    headers: {
      Authorization: token,
    },
    cache: 'no-store',
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
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

  const navigate = useNavigate();

  const handleDelete = (nip) => {
    setShowModal(true);
    setSelectedNIP(nip);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_KEY}/pegawai/delete/${selectedNIP}`, config);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNIP(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h5>Data Pegawai</h5>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/pegawai/add");
          }}
        >
          Tambah Data Pegawai
        </Button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Divisi</th>
              <th>Jabatan</th>
              <th>NIP</th>
              <th>Nama</th>
              <th>Tanggal Masuk</th>
              <th>Gaji Pokok</th>
              <th>Bank</th>
              <th>No Rekening</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penggajianData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.jabatan?.nama_jabatan}</td>
                <td>{item?.jabatan?.divisi?.nama_divisi}</td>
                <td>{item?.nip}</td>
                <td>{item?.nama_pegawai}</td>
                <td>{formatDate(item?.tgl_masuk)}</td>
                <td>{item?.gaji_pokok}</td>
                <td>{item?.bank}</td>
                <td>{item?.no_rekening}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(item.nip)}
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
          <p>Apakah Anda yakin ingin menghapus data dengan NIP : "{selectedNIP}"?</p>
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
    </Container>
  );
};

export default DataPegawai;
