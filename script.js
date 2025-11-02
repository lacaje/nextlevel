// ==================== COUNTDOWN ====================
const targetDate = new Date("December 6, 2025 22:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) return;

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2,'0');

  document.getElementById("hours").innerText =
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString().padStart(2,'0');

  document.getElementById("minutes").innerText =
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      .toString().padStart(2,'0');

  document.getElementById("seconds").innerText =
    Math.floor((distance % (1000 * 60)) / 1000)
      .toString().padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ==================== IMBATTIBILE ANTI-DUPLICATO ====================
if (localStorage.getItem("registered") === "yes") {
  document.getElementById("form").innerHTML = `
    <p style="color:#00ff88; font-size:1.1em;">
      ✅ Sei già iscritto alla lista!
    </p>
  `;
}


// ==================== FORM ====================
const scriptURL = "https://script.google.com/macros/s/AKfycbwaUJhjdE7gecLGRAHRbwnhXRv-aj5U0eLcEZaCtbx3eovqj5bs0AzcElDCN7IOl_JqzA/exec";
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();

  const year = form.Anno.value;
  if (year < 1900 || year > 2025) {
    form.Anno.style.boxShadow = "0 0 10px red, 0 0 20px red";
    return;
  }

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
  .then(res => res.text())
  .then(text => {
    
    // === RISPOSTA SERVER: DUPLICATO ===
    if (text === "duplicate") {
      msg.innerText = "⚠️ Sei già iscritto alla lista!";
      msg.style.color = "#ffaa00";
      localStorage.setItem("registered", "yes");
      form.reset();
      return;
    }

    // === RISPOSTA SERVER: OK ===
    msg.innerText = "✅ Grazie! Se verrai selezionato ti contatteremo.";
    msg.style.color = "#00ff88";
    showFireworks();
    form.reset();
    localStorage.setItem("registered", "yes");

    // rimuovi il form
    document.getElementById("form").innerHTML = `
      <p style="color:#00ff88; font-size:1.1em;">
        ✅ Iscrizione completata!
      </p>
    `;
  })
  .catch(err => {
    msg.innerText = "❌ Errore. Riprova più tardi.";
    msg.style.color = "#ff4444";
  });
});


// ==================== FIREWORKS ====================
function showFireworks() {
  const container = document.querySelector('.content');
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = star.style.height = Math.random() * 8 + 4 + "px";
    star.style.background = ["#00ffff", "#ff00cc", "#00ff88"][Math.floor(Math.random() * 3)];
    container.appendChild(star);

    setTimeout(() => star.remove(), 900 + Math.random() * 500);
  }
}
