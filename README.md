🐈 Cat Mood Tracker (Pencatat Suasana Hati Kucing)

Mini Project 1 - Back End (Express.js)

Brian Antonia - BE 1

💡 Tema dan Deskripsi Proyek

Proyek ini adalah *prototype* aplikasi web *back-end* sederhana yang dikembangkan menggunakan **Express.js**. Aplikasi ini berfungsi sebagai **"Cat Mood Tracker"** (Pencatat Suasana Hati Kucing), yang memungkinkan pengguna untuk mencatat suasana hati (mood), nama kucing, dan deskripsi singkat dari kejadian yang memengaruhi mood tersebut.

Data yang diinput akan disimpan dalam format JSON (`data.json`) dan diproses untuk menghitung rata-rata suasana hati kucing secara keseluruhan.

**Keunikan Tema:**
Tema "Cat Mood Tracker" dipilih untuk memenuhi syarat keunikan proyek, dengan fokus pada pengolahan data sederhana bertema peliharaan.

🛠️ Persyaratan Proyek yang Terpenuhi

Proyek ini telah memenuhi semua persyaratan yang ditentukan, termasuk:

1. Routing dan Struktur
-Routing Modular:** Menggunakan `express.Router()` untuk memisahkan logika *routing* di `src/routes/index.js`.
-Minimal 3 Route Berbeda:**
  `/`: Halaman Beranda (Home).
  `/log-mood`: Halaman **Form Input** (GET) dan Endpoint Pemrosesan (POST).
  `/mood-history`: Halaman **Menampilkan Data** dan Riwayat.

2. Fungsionalitas Data
Form Input:** Terdapat satu *form* input di `/log-mood` yang menerima input **text** (Nama Kucing), **number** (Level Mood 1-5), dan **textarea** (Deskripsi).
Fungsi JavaScript:** Terdapat fungsi `calculateMoodAverage` di `src/controllers/apiController.js`. Fungsi ini menggunakan **Array Method (`Array.reduce()`)** dan **Arrow Function** untuk menghitung rata-rata level mood dari semua data yang tersimpan.
Penyimpanan Data:** Data di-*post* dari *form* dan disimpan ke file **`data/data.json`**, kemudian data yang tersimpan ditampilkan di *route* `/mood-history`.

---

#🚀 Cara Menjalankan Aplikasi (Lokal)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda:

 1. Kloning Repository

```bash
git clone [GANTI_DENGAN_URL_REPOSITORY_ANDA]
cd SinarDigital_BE_MiniProject1_[NAMA]_[KELAS]
