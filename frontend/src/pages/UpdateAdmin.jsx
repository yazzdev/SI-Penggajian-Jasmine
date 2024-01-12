import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const User = () => {
  const [user, setUser] = useState([]);

  const token = localStorage.getItem("Authorization");

  const url = `${process.env.REACT_APP_API_KEY}/admin/whoami`;
  const urledit = `${process.env.REACT_APP_API_KEY}/admin/update`;
  let config = {
    headers: {
      Authorization: token,
    },
  };

  const [username, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(url, config);

      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");

    const data = {
      username: username,
      password: password,
    };
    axios
      .put(urledit, data, config)
      .then((response) => {
        toast.success("Berhasil Mengganti Kredensial");
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <div className="border mb-5 p-5 rounded-3">
            <h3 className="fw-semibold">Reset Password</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  defaultValue={user?.username}
                  onChange={handleChangeUsername}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={user?.password}
                  onChange={handleChangePassword}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary text-white py-1 px-5 rounded-3"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default User;
