# Program Sistem Informasi Penggajian

Selamat datang di Aplikasi Sistem Informasi Penggajian PT Jasmine MQ Medika! Aplikasi ini dikembangkan untuk membantu petugas HR dalam rekapitulasi data penggajian karyawan dengan teknologi Postgresql, Express.js, React.js, dan Bootstrap 5.

## Fitur Aplikasi
- Login
- Dashboard untuk CRUD data (Create, Read, Update, dan Delete)

## Persiapan
1. Install [Node.js](https://nodejs.org/)
2. Install [Postgresql](https://www.postgresql.org/)
3. Install Code Editor, [Saran Visual Studio Code](https://code.visualstudio.com/download)

## Cara Menggunakan
1. Buka terminal
2. Masuk ke direktori backend 
   ```
   cd backend/
   ```
3. Konfigurasi dotenv
   - Buat file baru di root backend/ dengan nama `.env`
   - Konfigurasikan database dengan mengisikan nilai berdasarkan `.env.example` untuk backend
4. Install dependencies 
   ```
   npm install
   ```
5. Konfigurasi database dengan mengeksekusi satu-persatu perintah berikut di terminal
   ```
   sequelize db:create
   sequelize db:migrate
   sequelize db:seed:all
   ```
6. Nyalakan server backend
   ```
   npm run dev
   ```
7. Buka terminal baru
8. Masuk ke direktori frontend
   ```
   cd frontend/
   ```
9. Install dependencies
   ```
   npm install
   ```
10. Konfigurasi dotenv
   - Buat file baru di root frontend/ dengan nama `.env`
   - Konfigurasikan database dengan mengisikan nilai berdasarkan `.env.example` untuk frontend
11. Jalankan Aplikasi
   ```
   npm run start
   ```
12. Aplikasi akan bisa dilihat langsung di browser pada [http://localhost:3000/](http://localhost:3000/)

Jika ada pertanyaan, silahkan hubungi developer melalui social media:
- [Linkedin](https://www.linkedin.com/in/dyaz-amrullah/)
- [Instagram](https://www.instagram.com/yazzdev)