// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UpdateAdmin from './components/UpdateAdmin';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/admin/update"
          element={loggedIn ? <UpdateAdmin /> : <Login setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
