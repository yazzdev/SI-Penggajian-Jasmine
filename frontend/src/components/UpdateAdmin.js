// UpdateAdmin.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateAdmin = ({ token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'http://localhost:8000/admin/update',
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setUpdateMessage(response.data.message || 'Update admin success!');
      } else {
        setUpdateMessage(response.data.message || 'Update admin failed.');
      }
    } catch (error) {
      console.error('Error during admin update:', error.message);
      setUpdateMessage('An error occurred during admin update.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Admin</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formBasicNewUsername">
          <Form.Label>New Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicNewPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Admin
        </Button>
      </Form>

      <p>{updateMessage}</p>
    </div>
  );
};

export default UpdateAdmin;
