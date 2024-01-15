import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DataPegawai from "../components/pegawai/DataPegawai";

const ShowPegawai = () => {
  const menuItems = [
    { id: 1, label: "Penggajian", link: "/dashboard" },
    { id: 2, label: "Pegawai", link: "/pegawai" },
    { id: 3, label: "Jabatan & Divisi", link: "/jabatan" },
    { id: 4, label: "Tunjangan", link: "/tunjangan" },
    { id: 5, label: "Potongan", link: "/potongan" }
  ];

  const location = useLocation();
  const headerHeight = 60;
  const remainingHeight = window.innerHeight - headerHeight - 1;

  return (
    <>
      <header className="text-white p-3" style={{ background: "#880d1e", height: `${headerHeight}px`, textAlign: "center" }}>
        <h4>Sistem Informasi Penggajian Jasmine</h4>
      </header>

      <Container fluid style={{ height: `${remainingHeight}px` }}>
        <Row style={{ height: "100%" }}>
          <Col className="col-md-3 col-lg-2 d-md-block sidebar" style={{ background: "#d62839" }}>
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                {menuItems.map((menuItem) => (
                  <li
                    key={menuItem.id}
                    className={`nav-item ${location.pathname === menuItem.link ? "active" : ""}`}
                    style={{
                      margin: "10px 0",
                    }}
                  >
                    <Link
                      to={menuItem.link}
                      className={`nav-link ${location.pathname === menuItem.link ? "text-danger" : "text-white"}`}
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: location.pathname === menuItem.link ? "#FFF" : "",
                        border: "1px solid transparent",
                        transition: "background-color 0.3s, border-color 0.3s, color 0.3s",
                      }}
                      onMouseOver={(e) => {
                        if (location.pathname !== menuItem.link) {
                          e.target.style.borderColor = "#FFF";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (location.pathname !== menuItem.link) {
                          e.target.style.backgroundColor = "#d62839";
                          e.target.style.borderColor = "#d62839";
                        }
                      }}
                    >
                      {menuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "255px" }}>
                <Link to="/keluar"
                  className="nav-link text-white"
                  style={{
                    textAlign: "center",
                    padding: "18px",
                    borderTop: "1px solid white"
                  }}
                >
                  Keluar
                </Link>
              </div>
            </div>
          </Col>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <DataPegawai />
          </main>
        </Row>
      </Container>
    </>
  );
};

export default ShowPegawai;
