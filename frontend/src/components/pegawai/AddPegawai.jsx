import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card, } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Tables.css';

function AddPegawai() {

  const [nip, setNip] = useState("");
  const [nama_pegawai, setNama] = useState("");
  const [tgl_masuk, setTanggalMasuk] = useState("");
  const [gaji_pokok, setGajiPokok] = useState("");
  const [bank, setBank] = useState("");
  const [no_rekening, setNoRekening] = useState("");
  const [id_jabatan, setIdJabatan] = useState("");
  const [jabatanList, setJabatanList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const token = localStorage.getItem("Authorization");

        if (!token) {
          console.error("Token not found.");
          return;
        }

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
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (nip.length === 0) {
      toast.error("NIP tidak boleh kosong");
      return;
    }

    if (nama_pegawai.length === 0) {
      toast.error("Nama tidak boleh kosong");
      return;
    }

    if (gaji_pokok.length === 0) {
      toast.error("Gaji pokok tidak boleh kosong");
      return;
    }

    if (bank.length === 0) {
      toast.error("Nama Bank tidak boleh kosong");
      return;
    }

    if (no_rekening.length === 0) {
      toast.error("Nomor Rekening tidak boleh kosong");
      return;
    }

    if (id_jabatan.length === 0) {
      toast.error("Jabatan tidak boleh kosong");
      return;
    }

    try {
      let data = JSON.stringify({
        nip,
        nama_pegawai,
        tgl_masuk,
        gaji_pokok,
        bank,
        no_rekening,
        id_jabatan,
      });

      const token = localStorage.getItem("Authorization");

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/pegawai/add`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      const response = await axios.request(config);
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
              <h5 className="mb-3 ps-5 pb-3">
                Tambah Data Pegawai
              </h5>
              <Form className="mb-4 mx-5" onSubmit={onSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>NIP</Form.Label>
                  <Form.Control
                    type="nip"
                    placeholder="Nomor Induk Pegawai"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="nama"
                    placeholder="Nama Pegawai"
                    value={nama_pegawai}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Tanggal Masuk</Form.Label>
                  <Form.Control
                    type="date"
                    value={tgl_masuk}
                    onChange={(e) => setTanggalMasuk(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Gaji Pokok</Form.Label>
                  <Form.Control
                    type="number"
                    value={gaji_pokok}
                    onChange={(e) => setGajiPokok(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Col>
          <Col md="6">
            <Card.Body className="d-flex flex-column">
              <h5 className="mb-3 ps-5 pb-3 text-hide" style={{ fontWeight: "bold" }}>
                Test
              </h5>
              <Form className="mb-4 mx-5" onSubmit={onSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Bank</Form.Label>
                  <Form.Control
                    type="bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>No Rekening</Form.Label>
                  <Form.Control
                    type="no_rek"
                    value={no_rekening}
                    onChange={(e) => setNoRekening(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Control
                    as="select"
                    value={id_jabatan}
                    onChange={(e) => setIdJabatan(e.target.value)}
                    className="custom-select"
                  >
                    <option value="">Pilih Jabatan</option>
                    {jabatanList.map((jabatan) => (
                      <option key={jabatan.id} value={jabatan.id}> {jabatan.nama_divisi} - {jabatan.nama_jabatan}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" className="mt-4 btn-ungu">
                    Daftar
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

export default AddPegawai;
