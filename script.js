// ==================== COUNTDOWN ====================
const targetDate = new Date("December 6, 2025 22:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if(distance < 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2,'0');
  document.getElementById("hours").innerText = hours.toString().padStart(2,'0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2,'0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==================== FORM SUBMISSION ====================
const scriptURL = "https://script.google.com/macros/s/AKfycbwaUJhjdE7gecLGRAHRbwnhXRv-aj5U0eLcEZaCtbx3eovqj5bs0AzcElDCN7IOl_JqzA/exec";
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault();

  // VALIDAZIONE ANNO
  const year = form.Anno.value;
  if(year < 1900 || year > 2025) {
    form.Anno.style.boxShadow = "0 0 10px red, 0 0 20px red";
    return;
  }

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerText = "Iscrizione avvenuta con successo!";
      msg.style.color = "#00ff88";
      showFireworks();
      form.reset();
    })
    .catch(error => {
      msg.innerText = "Errore, riprova!";
      msg.style.color = "#ff4444";
      console.error('Error!', error.message);
    });
});

// ==================== FIREWORKS EFFECT ====================
function showFireworks() {
  const container = document.querySelector('.content');
  for(let i=0; i<30; i++){
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random()*100 + "%";
    star.style.top = Math.random()*100 + "%";
    star.style.width = star.style.height = Math.random()*8+4 + "px";
    container.appendChild(star);

    setTimeout(()=>{
      star.remove();
    }, 800 + Math.random()*500);
  }
}
