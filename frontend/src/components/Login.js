// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/admin/login', {
        username,
        password,
      });

      if (response.data.status) {
        setToken(response.data.data.token); // Set the token here
        redirectToUpdate();
      } else {
        // Log the response for debugging
        console.log('Login failed. Response:', response);

        setError(response.data.message || 'Login failed.');
        setShowErrorModal(true);
      }
    } catch (error) {
      // Log the error for debugging
      console.error('Error during login:', error);

      setError('An error occurred during login.');
      setShowErrorModal(true);
    }
  };

  const redirectToUpdate = () => {
    navigate('/update');
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;

