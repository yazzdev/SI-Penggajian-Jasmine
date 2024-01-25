import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import '../Tables.css';

const UpdateTunjangan = () => {
  const { id } = useParams();
  const [tunjangan, setTunjangan] = useState({
    transport: "",
    makan: "",
    komunikasi: "",
    keahlian: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/tunjangan/show/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        console.log(response.data);
        const existingData = response.data.data;

        setTunjangan({
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
        `${process.env.REACT_APP_API_KEY}/tunjangan/update/${id}`,
        tunjangan,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);
      navigate("/tunjangan");
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
              <h5 className="mt-3 ps-5 pb-3">
                Update Data Tunjangan "{tunjangan?.pegawai?.nama_pegawai}"
              </h5>
              <Form className="mb-4 mx-5" onSubmit={handleSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Transport</Form.Label>
                  <Form.Control type="number" value={tunjangan?.transport} onChange={(e) => setTunjangan({ ...tunjangan, transport: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Makan</Form.Label>
                  <Form.Control type="number" value={tunjangan?.makan} onChange={(e) => setTunjangan({ ...tunjangan, makan: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Komunikasi</Form.Label>
                  <Form.Control type="number" value={tunjangan?.komunikasi} onChange={(e) => setTunjangan({ ...tunjangan, komunikasi: e.target.value })} />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Keahlian</Form.Label>
                  <Form.Control type="number" value={tunjangan?.keahlian} onChange={(e) => setTunjangan({ ...tunjangan, keahlian: e.target.value })} />
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

export default UpdateTunjangan;
