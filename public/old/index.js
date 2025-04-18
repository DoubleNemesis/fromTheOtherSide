try {
  const data = await fetch("/api");
  const response = await data.json();
  console.log(response);
  renderCards(response);
} catch (err) {
  // handle error
}

function renderCards(cardsData) {
  const container = document.querySelector(".cards-container");
  cardsData.forEach((card) => {
    container.innerHTML += `
<article class="sighting-card" aria-labelledby="sighting-name">
  <p class="card-details">${card.timeStamp}, ${card.location}</p>
  <h3 id="sighting-title">${card.title}</h3>
    <div class="sighting-text-wrapper">
      <p class="sighting-text">${card.text}</p>
    </div>
  <button class="read-more-btn" aria-expanded="false">Read in full</button>
</article>
    `;
  });
}

// toggle menu

document
  .getElementById("menu-toggle-btn")
  .addEventListener("click", function () {
    const menuBtn = document.getElementsByClassName("menu-btn")[0];
    const nav = document.getElementsByTagName("nav")[0];

    menuBtn.classList.toggle("show");
    nav.classList.toggle("show");

    const isExpanded = menuBtn.classList.contains("show");
    menuBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");

    if (isExpanded) {
      nav.removeAttribute("inert");
    } else {
      nav.setAttribute("inert", "");
    }
  });

// handle card expand
document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const sightingCard = button.closest(".sighting-card");
    const isExpanded = sightingCard.classList.toggle("expanded");

    button.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    button.textContent = isExpanded ? "Show less" : "Read in full";
  });
});
