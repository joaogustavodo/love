const envelope = document.getElementById("envelope");
const sealButton = document.getElementById("sealButton");
const letter = document.getElementById("letter");
const questionButton = document.getElementById("questionButton");
const questionCard = document.getElementById("questionCard");
const buttonsArea = document.getElementById("buttonsArea");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const littleHint = document.getElementById("littleHint");
const celebration = document.getElementById("celebration");
const replayButton = document.getElementById("replayButton");
const screenHeart = document.getElementById("screenHeart");
const particles = document.getElementById("particles");
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");

let letterOpened = false,
  questionShown = false,
  noClicks = 0,
  celebrationStarted = false,
  musicPlaying = false;
const particleSymbols = ["✧", "♡", "✦", "♥", "·"];
const messages = [
  "Tem certeza da sua resposta? 💗",
  "Pensa mais um pouquinho! 🥺",
  "O botão Sim está ficando maior! ✨",
  "Será que não é melhor dizer Sim? 💕",
  "Eu ainda acredito no Sim! 💖",
  "O Sim está crescendo de amor! 🌷",
  "Não desiste do amor! 💘",
  "Olha o tamanho desse Sim! 😳",
  "Cada clique deixa o Sim maior! 💗",
  "O destino está tentando te dizer algo! ✨",
  "Será que esse Não é definitivo? 🥹",
  "O Sim está ficando gigante! 💝",
  "Você tem certeza mesmo? 🌹",
  "O amor está vencendo essa batalha! 💞",
  "Ainda dá tempo de escolher Sim! 💓",
  "Esse botão Sim não para de crescer! 😍",
  "O universo está conspirando pelo Sim! 🌌",
  "Mais um clique e o Sim fica maior! 💖",
  "O coração está esperando sua resposta! ❤️",
  "Acho que você já sabe qual escolher! 💗",
];

function createParticle() {
  if (!particles) return;
  const p = document.createElement("span");
  p.className = "particle";
  p.textContent =
    particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
  p.style.left = `${Math.random() * 100}%`;
  p.style.fontSize = `${10 + Math.random() * 13}px`;
  p.style.animationDuration = `${8 + Math.random() * 9}s`;
  particles.appendChild(p);
  p.addEventListener("animationend", () => p.remove());
}
for (let i = 0; i < 20; i++) setTimeout(createParticle, i * 250);
setInterval(createParticle, 650);

async function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicLabel.textContent = "Ligar música";
    musicButton.setAttribute("aria-label", "Ligar música");
    return;
  }
  try {
    await bgMusic.play();
    musicPlaying = true;
    musicLabel.textContent = "Desligar música";
    musicButton.setAttribute("aria-label", "Desligar música");
  } catch {
    musicLabel.textContent = "Ligar música";
    littleHint.textContent =
      "Confira se o arquivo musica.mp3 está na pasta do site.";
  }
}
musicButton.addEventListener("click", toggleMusic);
bgMusic.addEventListener("pause", () => {
  musicPlaying = false;
  musicLabel.textContent = "Ligar música";
  musicButton.setAttribute("aria-label", "Ligar música");
});
bgMusic.addEventListener("play", () => {
  musicPlaying = true;
  musicLabel.textContent = "Desligar música";
  musicButton.setAttribute("aria-label", "Desligar música");
});
async function startMusicIfAvailable() {
  try {
    await bgMusic.play();
  } catch {
    /* O navegador pode exigir um clique para iniciar o áudio. */
  }
}

sealButton.addEventListener("click", openLetter);
function openLetter() {
  if (letterOpened) return;
  letterOpened = true;
  envelope.classList.add("opening");
  setTimeout(() => {
    envelope.style.display = "none";
    letter.style.display = "block";
    letter.classList.add("visible");
    letter.setAttribute("aria-hidden", "false");
    startMusicIfAvailable();
  }, 450);
}
questionButton.addEventListener("click", showQuestion);
function showQuestion() {
  if (questionShown) return;
  questionShown = true;
  letter.classList.remove("visible");
  letter.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    letter.style.display = "none";
    questionCard.classList.add("visible");
    questionCard.setAttribute("aria-hidden", "false");
    resetButtonsPosition();
  }, 350);
}
function updateYesButton() {
  const scale = Math.pow(1.05, noClicks);
  yesButton.style.transform = `scale(${scale})`;
  yesButton.style.transformOrigin = "center";
  const glow = Math.min(20 + noClicks * 2, 100);
  yesButton.style.boxShadow = `0 0 ${glow}px rgba(255,121,189,.75)`;
}
noButton.addEventListener("click", () => {
  if (celebrationStarted || !questionShown) return;
  noClicks++;
  updateYesButton();
  littleHint.textContent = messages[(noClicks - 1) % messages.length];
  moveNoButton();
});
function moveNoButton() {
  if (!buttonsArea || !noButton) return;
  buttonsArea.style.position = "relative";
  buttonsArea.style.minHeight = "100px";
  noButton.style.position = "absolute";
  noButton.style.margin = "0";
  const w = buttonsArea.clientWidth,
    h = buttonsArea.clientHeight,
    bw = noButton.offsetWidth,
    bh = noButton.offsetHeight;
  noButton.style.left = `${Math.random() * Math.max(0, w - bw)}px`;
  noButton.style.top = `${Math.random() * Math.max(0, h - bh)}px`;
}
function resetButtonsPosition() {
  buttonsArea.style.position = "relative";
  buttonsArea.style.minHeight = "";
  noButton.style.position = "";
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.margin = "";
}
yesButton.addEventListener("click", showCelebration);
function showCelebration() {
  if (celebrationStarted) return;
  celebrationStarted = true;
  celebration.classList.add("visible");
  celebration.setAttribute("aria-hidden", "false");
  noButton.disabled = true;
  yesButton.disabled = true;
  launchConfetti(100);
  for (let i = 0; i < 18; i++) setTimeout(createParticle, i * 100);
}
function launchConfetti(amount) {
  const symbols = ["♥", "✦", "✧", "♡", "✿", "❀"],
    colors = ["#ff91cb", "#cba6ff", "#f3d69c", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    const p = document.createElement("span");
    p.className = "confetti";
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.color = colors[Math.floor(Math.random() * colors.length)];
    p.style.fontSize = `${12 + Math.random() * 18}px`;
    p.style.setProperty("--duration", `${3 + Math.random() * 4}s`);
    p.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}
replayButton.addEventListener("click", () => {
  celebration.classList.remove("visible");
  celebration.setAttribute("aria-hidden", "true");
  letterOpened = false;
  questionShown = false;
  noClicks = 0;
  celebrationStarted = false;
  yesButton.disabled = false;
  noButton.disabled = false;
  yesButton.style.transform = "";
  yesButton.style.boxShadow = "";
  yesButton.style.transformOrigin = "";
  resetButtonsPosition();
  littleHint.textContent = "Tem certeza da sua resposta? ✨";
  questionCard.classList.remove("visible");
  questionCard.setAttribute("aria-hidden", "true");
  letter.style.display = "";
  letter.classList.remove("visible");
  letter.setAttribute("aria-hidden", "true");
  envelope.style.display = "";
  envelope.classList.remove("opening");
  screenHeart.classList.remove("active");
  screenHeart.setAttribute("aria-hidden", "true");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
