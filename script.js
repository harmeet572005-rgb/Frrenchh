const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

$$("[data-scroll]").forEach(btn => btn.addEventListener("click", () => {
  $(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
}));

const song = $("#song");
const musicBtn = $("#musicBtn");
let playing = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!song.src || song.src.endsWith("/song.mp3") && song.readyState === 0) {
      alert('To enable the music button, add a legally obtained copy of "Perfect" by Ed Sheeran named song.mp3 next to index.html.');
      return;
    }
    if (playing) { song.pause(); playing = false; }
    else { await song.play(); playing = true; }
    musicBtn.querySelector("span").textContent = playing ? "Pause song" : "Our song";
  } catch {
    alert('Music could not start. Add song.mp3 to the website folder and try again.');
  }
});

const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");

$$(".gift").forEach(g => g.addEventListener("click", () => {
  modalTitle.textContent = g.dataset.title;
  modalText.textContent = g.dataset.text;
  modal.classList.remove("hidden");
  burstHearts(12);
}));
$("#closeModal").onclick = () => modal.classList.add("hidden");
$("#modalDone").onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });

$("#finalGift").addEventListener("click", () => {
  $("#finalGift").classList.add("hidden");
  $("#finalReveal").classList.remove("hidden");
  burstHearts(35);
  window.scrollTo({top: document.querySelector(".final").offsetTop, behavior:"smooth"});
});

function burstHearts(n=10) {
  for (let i=0;i<n;i++) {
    const h=document.createElement("div");
    h.className="heart";
    h.textContent=["♥","♡","❤","✦"][Math.floor(Math.random()*4)];
    h.style.left=(10+Math.random()*80)+"vw";
    h.style.setProperty("--drift",(Math.random()*160-80)+"px");
    h.style.animationDuration=(3+Math.random()*3)+"s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),6500);
  }
}
setInterval(()=>burstHearts(1), 4200);
