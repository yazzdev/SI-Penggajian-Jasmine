import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const DetailPenggajian = ({ id }) => {
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("Authorization");

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: token,
      },
      cache: 'no-store',
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_KEY}/penggajian/show/${id}`, config);
      console.log(response.data);
      setDetailData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  return (
    <Container fluid>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table>
            <tr>
              <td><b>Divisi</b></td>
              <td>:</td>
              <td>{detailData?.pegawai?.jabatan?.nama_divisi}</td>
            </tr>
            <tr>
              <td><b>Jabatan</b></td>
              <td>:</td>
              <td>{detailData?.pegawai?.jabatan?.nama_jabatan}</td>
            </tr>
            <tr>
              <td><b>Gaji Jabatan</b></td>
              <td>:</td>
              <td>{detailData?.pegawai?.jabatan?.biaya_jabatan}</td>
            </tr>
            <tr>
              <td><b>NIP</b></td>
              <td>:</td>
              <td>{detailData?.nip_pegawai}</td>
            </tr>
            <tr>
              <td><b>Nama Pegawai</b></td>
              <td>:</td>
              <td>{detailData?.pegawai?.nama_pegawai}</td>
            </tr>
            <tr>
              <td><b>Gaji Pokok</b></td>
              <td>:</td>
              <td>{detailData?.pegawai?.gaji_pokok}</td>
            </tr>
            <tr>
              <td><b>Tunjangan</b></td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>:</td>
              <td>{detailData?.pegawai?.tunjangan?.transport}</td>
            </tr>
            <tr>
              <td>Makan</td>
              <td>:</td>
              <td>{detailData?.pegawai?.tunjangan?.makan}</td>
            </tr>
            <tr>
              <td>Komunikasi</td>
              <td>:</td>
              <td>{detailData?.pegawai?.tunjangan?.komunikasi}</td>
            </tr>
            <tr>
              <td>Keahlian</td>
              <td>:</td>
              <td>{detailData?.pegawai?.tunjangan?.keahlian}</td>
            </tr>
            <tr>
              <td><b>Potongan</b></td>
            </tr>
            <tr>
              <td>Makan</td>
              <td>:</td>
              <td>{detailData?.pegawai?.potongan?.makan}</td>
            </tr>
            <tr>
              <td>Zakat</td>
              <td>:</td>
              <td>{detailData?.pegawai?.potongan?.zakat}</td>
            </tr>
            <tr>
              <td>Absensi</td>
              <td>:</td>
              <td>{detailData?.pegawai?.potongan?.absensi}</td>
            </tr>
            <tr>
              <td>Tranport</td>
              <td>:</td>
              <td>{detailData?.pegawai?.potongan?.transport}</td>
            </tr>
            <tr>
              <td>Pinjaman Pegawai</td>
              <td>:</td>
              <td>{detailData?.pegawai?.potongan?.pinjaman_pegawai}</td>
            </tr>
            <tr>
              <td>Lain-Lain</td>
              <td>:</td>
              <td>{detailData?.pegawai?.potongan?.lain_lain}</td>
            </tr>
            <tr>
              <td><b>Total Gaji</b></td>
              <td>:</td>
              <td>{detailData?.total_gaji}</td>
            </tr>
            <tr>
              <td><b>Total Potongan</b></td>
              <td>:</td>
              <td>{detailData?.total_potongan}</td>
            </tr>
            <tr>
              <td><b>Take Home Pay</b></td>
              <td>:</td>
              <td>{detailData?.take_home_pay}</td>
            </tr>
            <tr>
              <td><b>Bank</b></td>
              <td>:</td>
              <td>{detailData?.pegawai?.bank}</td>
            </tr>
            <tr>
              <td><b>No Rekening</b></td>
              <td>:</td>
              <td>{detailData?.pegawai?.no_rekening}</td>
            </tr>
          </table>
        </div>
      )}
    </Container>
  );
};

export default DetailPenggajian;
