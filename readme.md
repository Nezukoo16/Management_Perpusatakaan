# 📌 SISTEM MANAGEMENT PERPUSTAKAAN

## Deskripsi Singkat

Sistem Perpustakaan adalah aplikasi yang digunakan untuk mengelola seluruh aktivitas operasional perpustakaan secara terintegrasi, mulai dari pengelolaan data buku, anggota, peminjaman, pengembalian, hingga pencatatan denda. Sistem ini bertujuan untuk meningkatkan efisiensi, akurasi, dan kemudahan dalam pengelolaan perpustakaan serta memberikan layanan yang lebih cepat dan tertata..

---

## Fitur Utama

### 1. Manajemen Buku

- Tambah, edit, hapus buku.
- Informasi buku.
- Pencarian Buku.

### 2. Manajemen Anggota

- Tambah, edit, hapus data anggota.
- Informasi anggota.
- Status keanggotaan aktif/non-aktif.

### 3. Transaksi Peminjaman dan Pengembalian

- Peminjaman buku.
- Pengembalian buku.
- Riwayat peminjaman per anggota.

### 4. Laporan

- Laporan buku tersedia / sedang dipinjam.
- Laporan anggota aktif dan riwayat pinjaman.

### 5. Autentikasi & Hak Akses

- Login untuk admin/petugas dan anggota.

---

## Cara Menjalankan Sistem

### Clone Repository

```bash
git clone https://github.com/username/nama-repository.git
cd nama-repository
```

### Install Package Backend Laravel di Folder be-perpus

```bash
composer install
```

### Install Package Frontend React di Folder fe-perpus

```bash
npm install
```

### Konfigurasi File .env Backend Laravel

```bash
cp .env.example .env
php artisan key:generate
```

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=perpustakaan
DB_USERNAME=root
DB_PASSWORD=
```

### Migrasi Database dan Menjalankan Seeder di Backend Laravel

```bash
php artisan migrate:fresh --seed
```

### Menjalankan Server Backend Laravel

```bash
php artisan serve
```

### Menjalankan Server FrontEnd React

```bash
php artisan serve
```

## Informasi Akun Uji Coba

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

## Dokumentasi API

Link Akses : https://documenter.getpostman.com/view/49032609/2sBXVfiX1u
