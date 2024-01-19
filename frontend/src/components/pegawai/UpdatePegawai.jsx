import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePegawai = () => {
  const { nip } = useParams();
  const [jabatanList, setJabatanList] = useState([]);
  const [pegawai, setPegawai] = useState({
    nip: "",
    nama_pegawai: "",
    tgl_masuk: "",
    gaji_pokok: "",
    bank: "",
    no_rekening: "",
    id_jabatan: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/pegawai/show/${nip}`, {
          headers: {
            Authorization: token,
          },
        });

        const existingData = response.data.data;
        setPegawai({
          ...existingData,
          tgl_masuk: new Date(existingData.tgl_masuk).toLocaleDateString('en-CA'),
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const fetchJabatan = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/jabatan/show`, {
          headers: {
            Authorization: token,
          },
        });

        setJabatanList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJabatan();
  }, [nip]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.put(
        `${process.env.REACT_APP_API_KEY}/pegawai/update/${nip}`,
        pegawai,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);
      navigate("/pegawai");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <Container className="my-4">
      <Card>
        <Row className="g-0">
          <Col md="6">
            <Card.Body className="d-flex flex-column">
              <h2 className="mb-3 ps-5 pb-3" style={{ fontWeight: "bold" }}>
                Update Data Pegawai
              </h2>
              <Form className="mb-4 mx-5" onSubmit={handleSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>NIP</Form.Label>
                  <Form.Control type="text" placeholder="Nomor Induk Pegawai" value={pegawai?.nip} readOnly />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control type="text" placeholder="Nama Pegawai" value={pegawai?.nama_pegawai} onChange={(e) => setPegawai({ ...pegawai, nama_pegawai: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Tanggal Masuk</Form.Label>
                  <Form.Control type="date" value={pegawai?.tgl_masuk} onChange={(e) => setPegawai({ ...pegawai, tgl_masuk: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Gaji Pokok</Form.Label>
                  <Form.Control type="number" value={pegawai?.gaji_pokok} onChange={(e) => setPegawai({ ...pegawai, gaji_pokok: e.target.value })} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Col>
          <Col md="6">
            <Card.Body className="d-flex flex-column">
              <h2 className="mb-3 ps-5 pb-3 text-white" style={{ fontWeight: "bold" }}>
                Test
              </h2>
              <Form className="mb-4 mx-5" onSubmit={handleSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Bank</Form.Label>
                  <Form.Control type="text" value={pegawai?.bank} onChange={(e) => setPegawai({ ...pegawai, bank: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>No Rekening</Form.Label>
                  <Form.Control type="text" value={pegawai?.no_rekening} onChange={(e) => setPegawai({ ...pegawai, no_rekening: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Control
                    as="select"
                    value={pegawai?.id_jabatan}
                    onChange={(e) => setPegawai({ ...pegawai, id_jabatan: e.target.value })}
                    className="custom-select"
                  >
                    <option value="">Pilih Jabatan</option>
                    {jabatanList.map((jabatan) => (
                      <option key={jabatan.id} value={jabatan.id}>
                        {jabatan.nama_divisi} - {jabatan.nama_jabatan}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" className="mt-4 btn-ungu">
                    Update
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default UpdatePegawai;
