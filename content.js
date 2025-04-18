const pauseImg = document.createElement("img");
pauseImg.className = "pause-watcher";
pauseImg.style.position = "absolute";
pauseImg.style.transition = "top 0.2s ease, left 0.2s ease";
pauseImg.style.zIndex = "1000";
pauseImg.style.pointerEvents = "none";
pauseImg.style.width = "100px";
pauseImg.style.height = "auto";
document.body.appendChild(pauseImg);

let pauseImgs = [];
for (let i = 0; i <= 4; i++) {
  const img = new Image();
  img.src = `https://github.com/pepperhot/pluggin/blob/main/image/pause${i}.png?raw=true`;
  pauseImgs.push(img);
}

function getPauseButtonRect() {
  const btn = document.querySelector(".ytp-play-button");
  return btn ? btn.getBoundingClientRect() : null;
}

function updatePauseWatcher(mouseX, mouseY) {
  const btnRect = getPauseButtonRect();
  if (!btnRect || !pauseImgs.every(img => img.complete)) return;

  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const maxDistance = 300;
  const level = Math.min(4, Math.floor(((maxDistance - distance) / maxDistance) * 5));
  const clampedLevel = Math.max(0, level);
  pauseImg.src = pauseImgs[clampedLevel].src;

  const scrollY = window.scrollY;
  pauseImg.style.top = `${scrollY + btnRect.top - pauseImgs[clampedLevel].naturalHeight + 470}px`;
  pauseImg.style.left = `${btnRect.left + btnRect.width / 2 - pauseImgs[clampedLevel].naturalWidth / 2 + 180}px`;
}

const videoElement = document.querySelector("video");
let isPaused = false;

if (videoElement) {
  videoElement.addEventListener('pause', () => {
    isPaused = true;
    pauseImg.src = pauseImgs[4].src;
  });

  videoElement.addEventListener('play', () => {
    isPaused = false;
    const mouseX = window.mouseX || 0;
    const mouseY = window.mouseY || 0;
    updatePauseWatcher(mouseX, mouseY);

    document.addEventListener("mousemove", mouseMoveHandler);
  });

  function mouseMoveHandler(e) {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;

    if (!isPaused) {
      updatePauseWatcher(e.clientX, e.clientY);
    }
  }
  document.addEventListener("mousemove", mouseMoveHandler);
}
/*const img = document.createElement("img");
img.src = "https://github.com/pepperhot/pluggin/blob/main/image/sus.png?raw=true";
img.className = "yt-watcher";
img.style.position = "absolute";
img.style.transition = "top 0.2s ease, left 0.2s ease";
img.style.zIndex = "1000";
document.body.appendChild(img);

let offsetX = 110; // Plus cette valeur est grande, plus l’image est à droite

function updatePosition() {
  const player = document.getElementById("movie_player");
  if (player && img.complete) {
    const rect = player.getBoundingClientRect();

    const top = window.scrollY + rect.top + rect.height / 2 - img.naturalHeight / 2;
    const left = window.scrollX + rect.left - img.naturalWidth + offsetX;

    img.style.top = ${top}px;
    img.style.left = ${left}px;
  }

  requestAnimationFrame(updatePosition); // Boucle infinie fluide
}

// Quand l'image est prête, on lance la boucle
img.onload = () => {
  updatePosition();
};
*/
