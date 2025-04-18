const img = document.createElement("img");
img.src = "https://github.com/pepperhot/pluggin/blob/main/sus.png?raw=true";
img.className = "yt-watcher";
img.style.position = "absolute";
img.style.transition = "top 0.2s ease, left 0.2s ease";
img.style.zIndex = "1000";
document.body.appendChild(img);

let offsetX = - 20; // Plus cette valeur est grande, plus l’image est à droite

function updatePosition() {
  const player = document.getElementById("movie_player");
  if (player && img.complete) {
    const rect = player.getBoundingClientRect();

    const top = window.scrollY + rect.top + rect.height / 2 - img.naturalHeight / 2;
    const left = window.scrollX + rect.left - img.naturalWidth + offsetX;

    img.style.top = `${top}px`;
    img.style.left = `${left}px`;
  }

  requestAnimationFrame(updatePosition); // Boucle infinie fluide
}

// Quand l'image est prête, on lance la boucle
img.onload = () => {
  updatePosition();
};
