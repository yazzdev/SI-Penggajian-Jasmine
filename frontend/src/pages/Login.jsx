import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Card, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username.length === 0) {
      toast.error("Silahkan masukan Username yang sesuai");
      return;
    }
    try {
      let data = JSON.stringify({
        username,
        password,
      });

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/admin/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
      localStorage.setItem("Authorization", token);

      // Check if the entered username and password are "admin"
      if (username === "admin" && password === "admin") {
        // Redirect to /update
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/update";
        }, 2000);
      } else {
        // Redirect to /dashboard
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <Container className="my-5">
      <Card>
        <Row className="g-0">
          <Col md="6">
            <img
              src="../../../img/bg-login.jpg"
              className="rounded-start w-100 d-none d-md-block px-0"
              alt="?"
            />
          </Col>
          <Col md="6">
            <Card.Body className="d-flex flex-column">
              <h2 className="mt-4 ps-5 pb-3" style={{ fontWeight: "bold" }}>
                Masuk
              </h2>
              <Form className="mb-4 mx-5" onSubmit={onSubmit}>
                <Form.Group className="my-4" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Masukan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4" controlId="formBasicPassword">
                  <Row>
                    <Col sm={8}>
                      <Form.Label>Password</Form.Label>
                    </Col>
                  </Row>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type={passwordType}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      onClick={togglePassword}
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "#304070",
                      }}
                    >
                      {passwordType === "password" ? (
                        <FaEyeSlash color="#304070" />
                      ) : (
                        <FaEye color="#304070" />
                      )}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button type="submit" className="mt-4">
                    Masuk
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

export default Login;
