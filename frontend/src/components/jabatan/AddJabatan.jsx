import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card, } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Tables.css";

function AddJabatan() {

  const [nama_divisi, setNamaDivisi] = useState("");
  const [nama_jabatan, setNamaJabatan] = useState("");
  const [biaya_jabatan, setBiayaJabatan] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (nama_divisi.length === 0) {
      toast.error("Nama Divisi tidak boleh kosong");
      return;
    }

    if (nama_jabatan.length === 0) {
      toast.error("Nama Jabatan tidak boleh kosong");
      return;
    }

    if (biaya_jabatan.length === 0) {
      toast.error("Gaji pokok tidak boleh kosong");
      return;
    }

    try {
      let data = JSON.stringify({
        nama_divisi,
        nama_jabatan,
        biaya_jabatan,
      });

      const token = localStorage.getItem("Authorization");

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/jabatan/add`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      navigate("/jabatan");
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
                Tambah Data Jabatan
              </h5>
              <Form className="mb-4 mx-5" onSubmit={onSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Nama Divisi</Form.Label>
                  <Form.Control
                    type="nama_divisi"
                    value={nama_divisi}
                    onChange={(e) => setNamaDivisi(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Nama Jabatan</Form.Label>
                  <Form.Control
                    type="nama_jabatan"
                    value={nama_jabatan}
                    onChange={(e) => setNamaJabatan(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Gaji Jabatan</Form.Label>
                  <Form.Control
                    type="number"
                    value={biaya_jabatan}
                    onChange={(e) => setBiayaJabatan(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" className="mt-4 btn-ungu">
                    Tambahkan
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

export default AddJabatan;
