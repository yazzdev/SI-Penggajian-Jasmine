import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const DataPenggajian = () => {
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

  function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  } 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h5>Data Penggajian</h5>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Divisi</th>
              <th rowSpan={2}>Jabatan</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Gaji Jabatan</th>
              <th rowSpan={2}>NIP</th>
              <th rowSpan={2}>Nama</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Gaji Pokok</th>
              <th colSpan={4} style={{ textAlign: "center" }}>
                Tunjangan
              </th>
              <th colSpan={6} style={{ textAlign: "center" }}>
                Potongan
              </th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Total Gaji</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>Total Potongan</th>
              <th rowSpan={2}>Take Home Pay</th>
              <th rowSpan={2}>Bank</th>
              <th rowSpan={2} style={{ whiteSpace: "nowrap" }}>No Rekening</th>
            </tr>
            <tr>
              <th>Transport</th>
              <th>Makan</th>
              <th>Komunikasi</th>
              <th>Keahlian</th>
              <th>Makan</th>
              <th>Zakat</th>
              <th>Absensi</th>
              <th>Transport</th>
              <th>Pinjaman</th>
              <th style={{ whiteSpace: "nowrap" }}>Lain-Lain</th>
            </tr>
          </thead>
          <tbody>
            {penggajianData.map((item, index) => (
              <tr key={item.id}>
                {/* Populate with appropriate data from the API response */}
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.jabatan?.nama_divisi)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.jabatan?.nama_jabatan)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.pegawai?.jabatan?.biaya_jabatan}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.nip_pegawai}</td>
                <td style={{ whiteSpace: "nowrap" }}>{capitalizeEachWord(item?.pegawai?.nama_pegawai)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.pegawai?.gaji_pokok}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.tunjangan?.transport ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.tunjangan?.makan ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.tunjangan?.komunikasi ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.tunjangan?.keahlian ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.potongan?.makan ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.potongan?.zakat ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.potongan?.absensi ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.potongan?.transport ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.potongan?.pinjaman_pegawai ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.potongan?.lain_lain ?? 0}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.total_gaji}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.total_potongan}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.take_home_pay}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.pegawai?.bank.toUpperCase()}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item?.pegawai?.no_rekening}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default DataPenggajian;
