const img = document.createElement("img");
img.src = "https://github.com/pepperhot/pluggin/blob/main/sus.png?raw=true";
img.className = "yt-watcher";
document.body.appendChild(img);

function updateImagePosition() {
  const player = document.getElementById('movie_player');
  if (!player) return;

  const rect = player.getBoundingClientRect();

  // Positionner l’image à gauche du player
  img.style.top = `${window.scrollY + rect.top + rect.height / 2 - img.offsetHeight / 2}px`;
  img.style.left = `${window.scrollX + rect.left - img.offsetWidth - 10}px`;
}

// Appel initial
updateImagePosition();

// Mettre à jour la position à chaque scroll ou resize
window.addEventListener('scroll', updateImagePosition);
window.addEventListener('resize', updateImagePosition);

// Si la vidéo charge en AJAX (ce qui est fréquent sur YouTube), on observe les changements du DOM
const observer = new MutationObserver(updateImagePosition);
observer.observe(document.body, { childList: true, subtree: true });
