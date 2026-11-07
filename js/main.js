// Halaman konten: ubah tombol Login/Register menjadi nama user + Logout jika sudah login
var sesi = null;
try { sesi = JSON.parse(localStorage.getItem('sesi')); } catch (e) {}

if (sesi) {
  document.getElementById('authArea').innerHTML =
    '<span class="navbar-text me-2">Halo, <b></b></span>' +
    '<button class="btn btn-outline-danger" id="btnLogout">Logout</button>';
  document.querySelector('#authArea b').textContent = sesi.nama;

  var w = document.getElementById('welcome');
  w.textContent = 'Anda login sebagai ' + sesi.email + '.';
  w.classList.remove('d-none');

  document.getElementById('btnLogout').addEventListener('click', function () {
    localStorage.removeItem('sesi');
    location.reload();
  });
}