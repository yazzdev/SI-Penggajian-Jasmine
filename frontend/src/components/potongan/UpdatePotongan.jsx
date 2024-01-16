import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePotongan = () => {
  const { id } = useParams();
  const [potongan, setPotongan] = useState({
    makan: "",
    zakat: "",
    absensi: "",
    transport: "",
    pinjaman_pegawai: "",
    lain_lain: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/potongan/show/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        console.log(response.data);
        const existingData = response.data.data;

        setPotongan({
          ...existingData,
          nip_pegawai: existingData.nip_pegawai || "",
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
        `${process.env.REACT_APP_API_KEY}/potongan/update/${id}`,
        potongan,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);
      navigate("/potongan");
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
              <h4 className="mt-3 ps-5 pb-3" style={{ fontWeight: "bold" }}>
                Update Data Potongan "{potongan?.pegawai?.nama_pegawai}"
              </h4>
              <Form className="mb-4 mx-5" onSubmit={handleSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Makan</Form.Label>
                  <Form.Control type="number" value={potongan?.makan} onChange={(e) => setPotongan({ ...potongan, makan: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Zakat</Form.Label>
                  <Form.Control type="number" value={potongan?.zakat} onChange={(e) => setPotongan({ ...potongan, zakat: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Absensi</Form.Label>
                  <Form.Control type="number" value={potongan?.absensi} onChange={(e) => setPotongan({ ...potongan, absensi: e.target.value })} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Col>
          <Col md="6">
            <Card.Body className="d-flex flex-column">
              <h4 className="mt-3 ps-5 pb-3 text-white" style={{ fontWeight: "bold" }}>
                Update Data Potongan
              </h4>
              <Form className="mb-4 mx-5" onSubmit={handleSubmit}>
              <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Label>Transport</Form.Label>
                <Form.Control type="number" value={potongan?.transport} onChange={(e) => setPotongan({ ...potongan, transport: e.target.value })} />
              </Form.Group>

              <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Label>Pinjaman</Form.Label>
                <Form.Control type="number" value={potongan?.pinjaman_pegawai} onChange={(e) => setPotongan({ ...potongan, pinjaman_pegawai: e.target.value })} />
              </Form.Group>

              <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Label>Lain-Lain</Form.Label>
                <Form.Control type="number" value={potongan?.lain_lain} onChange={(e) => setPotongan({ ...potongan, lain_lain: e.target.value })} />
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
    </Container >
  );
}

export default UpdatePotongan;
