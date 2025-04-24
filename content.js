/*------------------ Image Sus ------------------*/
const susImg = document.createElement("img");
susImg.src = `https://github.com/pepperhot/pluggin/blob/main/image/sus.png?raw=true`;
susImg.className = "yt-watcher";
susImg.style.position = "absolute";
susImg.style.pointerEvents = "none";
document.body.appendChild(susImg);

function updateSusImg() {
  const player = document.getElementById("movie_player");
  const video = document.querySelector("video");
  if (video && player && susImg.complete) {
    const rect = player.getBoundingClientRect();
    susImg.style.top = `${window.scrollY + rect.top + rect.height / 2 - susImg.naturalHeight / 2}px`;
    susImg.style.left = `${window.scrollX + rect.left - susImg.naturalWidth + 110}px`;
  }
  requestAnimationFrame(updateSusImg);
}
susImg.onload = updateSusImg;

/*------------------ Image Pause ------------------*/
const pauseImg = document.createElement("img");
pauseImg.className = "yt-watcher";
pauseImg.style.position = "absolute";
pauseImg.style.pointerEvents = "none";
document.body.appendChild(pauseImg);

const pauseImgs = [];
for (let i = 0; i <= 4; i++) {
  const img = new Image();
  img.src = `https://github.com/pepperhot/pluggin/blob/main/image/pause${i}.png?raw=true;`;
  pauseImgs.push(img);
}

function calculDistance(mouseX, mouseY) {
  const btn = document.querySelector(".ytp-play-button");
  if (!btn) return null;
  const rect = btn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  const distance = Math.sqrt(dx**2+ dy**2);
  return { distance, rect };
}

function updatePauseImg(distance, rect) {
  if (!pauseImgs.every(img => img.complete)) return;
  const maxDistance = 300;
  if (distance > maxDistance) return;
  const level = Math.min(4, Math.floor(((maxDistance - distance) / maxDistance) * 5));
  pauseImg.src = pauseImgs[level].src;
  pauseImg.style.top = `${window.scrollY + rect.top - pauseImgs[level].naturalHeight + 470}px`;
  pauseImg.style.left = `${rect.left + rect.width / 2 - pauseImgs[level].naturalWidth / 2 + 180}px`;
}

const video = document.querySelector("video");
if (video) {
  video.addEventListener('pause', () => {
    if (pauseImgs[4].complete) {
      pauseImg.src = pauseImgs[4].src;
    }
  });

  video.addEventListener('play', () => {
    document.addEventListener("mousemove", e => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
      const result = calculDistance(e.clientX, e.clientY);
      if (result) {
        updatePauseImg(result.distance, result.rect);
      }
    });
  });
}
