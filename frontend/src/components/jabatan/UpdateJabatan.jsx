import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import '../Tables.css';

const UpdateJabatan = () => {
  const { id } = useParams();
  const [jabatan, setJabatan] = useState({
    id: "",
    nama_divisi: "",
    nama_jabatan: "",
    biaya_jabatan: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/jabatan/show/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        const existingData = response.data.data;
        setJabatan({
          ...existingData,
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.put(
        `${process.env.REACT_APP_API_KEY}/jabatan/update/${id}`,
        jabatan,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

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
                Update Data Jabatan "{jabatan?.id}"
              </h5>
              <Form className="mb-4 mx-5" onSubmit={handleSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Nama Divisi</Form.Label>
                  <Form.Control type="text" value={jabatan?.nama_divisi} onChange={(e) => setJabatan({ ...jabatan, nama_divisi: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Nama Jabatan</Form.Label>
                  <Form.Control type="text" value={jabatan?.nama_jabatan} onChange={(e) => setJabatan({ ...jabatan, nama_jabatan: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Gaji jabatan</Form.Label>
                  <Form.Control type="number" value={jabatan?.biaya_jabatan} onChange={(e) => setJabatan({ ...jabatan, biaya_jabatan: e.target.value })} />
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

export default UpdateJabatan;
