const img = document.createElement("img");
img.src = "https://github.com/pepperhot/pluggin/blob/main/sus.png?raw=true";
img.className = "yt-watcher";
img.style.position = "absolute";
img.style.transition = "top 0.2s ease, left 0.2s ease";
img.style.zIndex = "1000";
document.body.appendChild(img);

function updateImagePosition() {
  const player = document.getElementById('movie_player');
  if (!player || !img.complete) return;

  const rect = player.getBoundingClientRect();

  // Centrage vertical parfait
  const top = window.scrollY + rect.top + rect.height - img.naturalHeight;
  const left = window.scrollX + rect.left - img.naturalWidth -50;

  img.style.top = `${top}px`;
  img.style.left = `${left}px`;
}

// Dès que l'image est chargée
img.onload = updateImagePosition;

// Sur scroll, resize, etc.
window.addEventListener('scroll', updateImagePosition);
window.addEventListener('resize', updateImagePosition);

// Observer les changements YouTube AJAX
const observer = new MutationObserver(updateImagePosition);
observer.observe(document.body, { childList: true, subtree: true });
