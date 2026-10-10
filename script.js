
/* =================================
   1. FORM ASPIRASI SISWA
================================= */

const formAspirasi = document.getElementById("formAspirasi");
const daftarAspirasi = document.getElementById("daftarAspirasi");
const pesanStatus = document.getElementById("pesanStatus");

// Mengambil aspirasi yang tersimpan di browser
let dataAspirasi = [];

try {
    const tersimpan = localStorage.getItem("aspirasiOSIS");
    dataAspirasi = tersimpan ? JSON.parse(tersimpan) : [];

    if (!Array.isArray(dataAspirasi)) {
        dataAspirasi = [];
    }
} catch (error) {
    dataAspirasi = [];
}

// Menampilkan aspirasi di halaman
function tampilkanAspirasi() {
    daftarAspirasi.replaceChildren();

    dataAspirasi.forEach(function (data) {
        const kartu = document.createElement("div");
        kartu.className = "aspirasi-item";

        const judul = document.createElement("h3");
        judul.textContent = data.kategori;

        const kelas = document.createElement("p");
        kelas.textContent = "Kelas: " + data.kelas;

        const isi = document.createElement("p");
        isi.textContent = data.pesan;

        kartu.append(judul, kelas, isi);
        daftarAspirasi.appendChild(kartu);
    });
}

// Menangani pengiriman formulir
formAspirasi.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const kategori = document.getElementById("kategori").value;
    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !kelas || !kategori || !pesan) {
        pesanStatus.textContent = "Lengkapi semua kolom terlebih dahulu.";
        return;
    }

    const aspirasiBaru = {
        nama: nama,
        kelas: kelas,
        kategori: kategori,
        pesan: pesan
    };

    dataAspirasi.push(aspirasiBaru);

    // Simpan data di browser
    try {
        localStorage.setItem(
            "aspirasiOSIS",
            JSON.stringify(dataAspirasi)
        );

        pesanStatus.textContent = "Aspirasi berhasil disimpan di browser.";

    } catch (error) {
        pesanStatus.textContent =
            "Aspirasi ditampilkan sementara, tetapi gagal disimpan.";
    }

    tampilkanAspirasi();
    formAspirasi.reset();
});

// Tampilkan data saat halaman dibuka
tampilkanAspirasi();


/* =================================
   2. LOGIN DEMO PENGURUS OSIS
================================= */

const formLogin = document.getElementById("formLogin");
const loginStatus = document.getElementById("loginStatus");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();

    loginStatus.textContent =
        "Halo, " + username +
        "! Formulir berhasil diisi. Sistem login asli belum terhubung.";

    formLogin.reset();
});


/* SLIDE INFORMASI OSIS */
const infoSlides = document.querySelectorAll(".info-slide");
const infoDots = document.querySelectorAll(".info-dot");

let infoAktif = 0;
let infoTimer;

function tampilInfo(index) {
    if (infoSlides.length === 0) return;

    infoAktif = (index + infoSlides.length) % infoSlides.length;

    infoSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === infoAktif);
    });

    infoDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === infoAktif);
    });
}

function geserInfo(arah) {
    tampilInfo(infoAktif + arah);
    mulaiInfoOtomatis();
}

function pilihInfo(index) {
    tampilInfo(index);
    mulaiInfoOtomatis();
}

function mulaiInfoOtomatis() {
    clearInterval(infoTimer);

    infoTimer = setInterval(() => {
        tampilInfo(infoAktif + 1);
    }, 5000);
}

if (infoSlides.length > 0) {
    tampilInfo(0);
    mulaiInfoOtomatis();
}
