const tempat = [
  {gambar: "pyramids.jpg", jawaban: "Piramida Giza"},
  {gambar: "greatwall.jpg", jawaban: "Tembok Besar Cina"},
  {gambar: "colosseum.jpg", jawaban: "Colosseum"},
  {gambar: "machupicchu.jpg", jawaban: "Machu Picchu"},
  {gambar: "tajmahal.jpg", jawaban: "Taj Mahal"},
  {gambar: "eiffel.jpg", jawaban: "Menara Eiffel"},
  {gambar: "statueofliberty.jpg", jawaban: "Patung Liberty"},
  {gambar: "stonehenge.jpg", jawaban: "Stonehenge"},
  {gambar: "petra.jpg", jawaban: "Petra"},
  {gambar: "angkorwat.jpg", jawaban: "Angkor Wat"},
  {gambar: "borobudur.jpg", jawaban: "Candi Borobudur"},
  {gambar: "chichenitza.jpg", jawaban: "Chichen Itza"},
  {gambar: "sphinx.jpg", jawaban: "Sphinx"},
  {gambar: "leaningpisa.jpg", jawaban: "Menara Pisa"},
  {gambar: "kremlin.jpg", jawaban: "Kremlin Moskow"}
];

let poin = 0;
let nyawa = 3;
let waktu = 120;
let indexSoal = 0;
let timer;

const username = localStorage.getItem("username");
const level = localStorage.getItem("level");

document.getElementById("usernameDisplay").innerText = `Halo, ${username}!`;
document.getElementById("levelDisplay").innerText = level;

const gambarTempat = document.getElementById("gambarTempat");
const hasil = document.getElementById("hasil");
const cover = document.getElementById("cover");

function mulaiSoal() {
  if (indexSoal >= tempat.length || nyawa <= 0) {
    alert(`Permainan selesai!\nPoin akhir: ${poin}`);
    localStorage.removeItem("username");
    window.location.href = "index.html";
    return;
  }

  hasil.textContent = "";
  document.getElementById("jawaban").value = "";

  const data = tempat[indexSoal];
  gambarTempat.src = `images/${data.gambar}`;

  // Tutupi gambar sesuai level
  if (level === "mudah") cover.style.height = "0%";
  else if (level === "sedang") cover.style.height = "50%";
  else cover.style.height = "75%";

  waktu = 120;
  document.getElementById("timer").textContent = waktu;
  clearInterval(timer);
  timer = setInterval(updateWaktu, 1000);
}

function updateWaktu() {
  waktu--;
  document.getElementById("timer").textContent = waktu;
  if (waktu <= 0) {
    nyawa--;
    document.getElementById("nyawa").textContent = nyawa;
    nextSoal();
  }
}

document.getElementById("submitBtn").addEventListener("click", () => {
  const jawaban = document.getElementById("jawaban").value.trim().toLowerCase();
  const benar = tempat[indexSoal].jawaban.toLowerCase();

  if (jawaban === benar) {
    poin += 10;
    hasil.textContent = "✅ Benar!";
  } else {
    nyawa--;
    hasil.textContent = "❌ Salah!";
  }

  document.getElementById("poin").textContent = poin;
  document.getElementById("nyawa").textContent = nyawa;

  setTimeout(nextSoal, 1000);
});

function nextSoal() {
  indexSoal++;
  mulaiSoal();
}

mulaiSoal();
