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
              <th rowSpan={2}>Gaji Jabatan</th>
              <th rowSpan={2}>NIP</th>
              <th rowSpan={2}>Nama</th>
              <th rowSpan={2}>Gaji_Pokok</th>
              <th colSpan={4} style={{ textAlign: "center" }}>
                Tunjangan
              </th>
              <th colSpan={6} style={{ textAlign: "center" }}>
                Potongan
              </th>
              <th rowSpan={2}>Total Gaji</th>
              <th rowSpan={2}>Total Potongan</th>
              <th rowSpan={2}>Take Home Pay</th>
              <th rowSpan={2}>Bank</th>
              <th rowSpan={2}>No Rekening</th>
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
              <th>Pinjaman_Pegawai</th>
              <th>Lain-Lain</th>
            </tr>
          </thead>
          <tbody>
            {penggajianData.map((item, index) => (
              <tr key={item.id}>
                {/* Populate with appropriate data from the API response */}
                <td>{index + 1}</td>
                <td>{item?.pegawai?.jabatan?.divisi?.nama_divisi}</td>
                <td>{item?.pegawai?.jabatan?.nama_jabatan}</td>
                <td>{item?.pegawai?.jabatan?.biaya_jabatan}</td>
                <td>{item?.nip_pegawai}</td>
                <td>{item?.pegawai?.nama_pegawai}</td>
                <td>{item?.pegawai?.gaji_pokok}</td>
                <td>{item?.tunjangan?.transport ?? 0}</td>
                <td>{item?.tunjangan?.makan ?? 0}</td>
                <td>{item?.tunjangan?.komunikasi ?? 0}</td>
                <td>{item?.tunjangan?.keahlian ?? 0}</td>
                <td>{item?.potongan?.makan ?? 0}</td>
                <td>{item?.potongan?.zakat ?? 0}</td>
                <td>{item?.potongan?.absensi ?? 0}</td>
                <td>{item?.potongan?.transport ?? 0}</td>
                <td>{item?.potongan?.pinjaman_pegawai ?? 0}</td>
                <td>{item?.potongan?.lain_lain ?? 0}</td>
                <td>{item?.total_gaji}</td>
                <td>{item?.total_potongan}</td>
                <td>{item?.take_home_pay}</td>
                <td>{item?.pegawai?.bank}</td>
                <td>{item?.pegawai?.no_rekening}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default DataPenggajian;
