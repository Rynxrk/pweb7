// Login & Register dengan validasi Bootstrap + localStorage (khusus latihan)
function ambilUser() {
  try { return JSON.parse(localStorage.getItem('users')) || []; } catch (e) { return []; }
}
function tampilPesan(teks, jenis) {
  var a = document.getElementById('alertBox');
  a.textContent = teks;
  a.className = 'alert alert-' + jenis;
}
function setMode(mode) {
  document.getElementById('formLogin').classList.toggle('d-none', mode !== 'login');
  document.getElementById('formRegister').classList.toggle('d-none', mode !== 'register');
  document.querySelectorAll('#tabs .nav-link').forEach(function (b) {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
  document.getElementById('alertBox').className = 'alert d-none';
  history.replaceState(null, '', '#' + mode);
}

document.querySelectorAll('#tabs .nav-link').forEach(function (b) {
  b.addEventListener('click', function () { setMode(b.dataset.mode); });
});
setMode(location.hash === '#register' ? 'register' : 'login');

// ----- Register -----
document.getElementById('formRegister').addEventListener('submit', function (e) {
  e.preventDefault();
  var p1 = document.getElementById('rPass'), p2 = document.getElementById('rPass2');
  // cocokkan password lewat validasi bawaan Bootstrap
  p2.setCustomValidity(p1.value === p2.value ? '' : 'beda');
  this.classList.add('was-validated');
  if (!this.checkValidity()) return;

  var email = document.getElementById('rEmail').value.trim().toLowerCase();
  var users = ambilUser();
  if (users.some(function (u) { return u.email === email; })) {
    return tampilPesan('Email sudah terdaftar. Silakan login.', 'warning');
  }
  users.push({ nama: document.getElementById('rNama').value.trim(), email: email, pass: p1.value });
  localStorage.setItem('users', JSON.stringify(users));
  this.reset(); this.classList.remove('was-validated');
  setMode('login');
  tampilPesan('Registrasi berhasil! Silakan login.', 'success');
});
document.getElementById('rPass').addEventListener('input', function () {
  document.getElementById('rPass2').setCustomValidity('');
});

// ----- Login -----
document.getElementById('formLogin').addEventListener('submit', function (e) {
  e.preventDefault();
  this.classList.add('was-validated');
  if (!this.checkValidity()) return;

  var email = document.getElementById('lEmail').value.trim().toLowerCase();
  var pass = document.getElementById('lPass').value;
  var user = ambilUser().filter(function (u) { return u.email === email && u.pass === pass; })[0];
  if (!user) return tampilPesan('Email atau password salah.', 'danger');

  localStorage.setItem('sesi', JSON.stringify({ nama: user.nama, email: user.email }));
  location.href = 'index.html';
});