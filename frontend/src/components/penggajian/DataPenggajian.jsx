import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailPenggajian from "./DetailPenggajian";
import { Container, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const DataPenggajian = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [penggajianData, setPenggajianData] = useState([]);

  const token = localStorage.getItem("Authorization");
  const url = `${process.env.REACT_APP_API_KEY}/penggajian/show`;
  const config = {
    headers: {
      Authorization: token,
    },
    cache: 'no-store',
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(url, config);
      console.log(response.data);
      setPenggajianData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = (id) => {
    setSelectedId(id);
    setShowDetailModal(true);
  };

  function capitalizeEachWord(str) {
    if (typeof str !== 'string') {
      return str;
    }
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  useEffect(() => {
    fetchData();
  }, []);

  const exportToExcel = () => {
    const fileName = "Data_Penggajian.xlsx";
    const dataToExport = penggajianData.map((item) => ({
      NIP: item?.nip_pegawai,
      Nama: capitalizeEachWord(item?.pegawai?.nama_pegawai),
      Divisi: capitalizeEachWord(item?.pegawai?.jabatan?.nama_divisi),
      Jabatan: capitalizeEachWord(item?.pegawai?.jabatan?.nama_jabatan),
      "Gaji Jabatan": capitalizeEachWord(item?.pegawai?.jabatan?.biaya_jabatan),
      "Tanggal Masuk": (item?.pegawai?.tgl_masuk),
      "Gaji Pokok": (item?.pegawai?.gaji_pokok),
      "Tunjangan Transport": (item?.pegawai?.tunjangan?.transport),
      "Tunajangan Makan": (item?.pegawai?.tunjangan?.makan),
      "Tunjangan Komunikasi": (item?.pegawai?.tunjangan?.komunikasi),
      "Tunjangan Keahlian": (item?.pegawai?.tunjangan?.keahlian),
      "Total Gaji": item?.total_gaji,
      "Potongan Makan": (item?.pegawai?.potongan?.makan),
      "Potongan Zakat": (item?.pegawai?.potongan?.zakat),
      "Potongan Absensi": (item?.pegawai?.potongan?.absensi),
      "Potongan Transport": (item?.pegawai?.potongan?.transport),
      "Potongan Pinjaman": (item?.pegawai?.potongan?.pinjaman_pegawai),
      "Potongan Lain-Lain": (item?.pegawai?.potongan?.lain_lain),
      "Total Potongan": item?.total_potongan,
      Bank: item?.pegawai?.bank,
      NoRekening: item?.pegawai?.no_rekening,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Penggajian");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h5>Data Penggajian</h5>
        <Button variant="success" onClick={exportToExcel}>Export to Excel</Button>
      </div>

      <div className="table-responsive" style={{ maxHeight: "610px", overflowY: "auto" }}>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Divisi</th>
              <th rowSpan={2}>Jabatan</th>
              <th rowSpan={2}>NIP</th>
              <th rowSpan={2}>Nama</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Total Gaji</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Total Potongan</th>
              <th rowSpan={2}>Take Home Pay</th>
              <th rowSpan={2}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penggajianData.map((item, index) => (
              <tr key={item.id}>
                {/* Populate with appropriate data from the API response */}
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.jabatan?.nama_divisi)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.jabatan?.nama_jabatan)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.nip_pegawai}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.nama_pegawai)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.total_gaji}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.total_potongan}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.take_home_pay}</td>
                <td>
                  <center>
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ cursor: "pointer", color: "blue", marginRight: "8px" }}
                      onClick={() => handleDetail(item.id)}
                    />
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Data Penggajian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DetailPenggajian id={selectedId} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DataPenggajian;
