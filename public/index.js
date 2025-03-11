try {
  const data = await fetch("/api");
  const response = await data.json();
  console.log(response)
  renderCards(response);
} catch (err) {
  // handle error
}

function renderCards(cardsData) {
  const container = document.querySelector(".cards-container")
  cardsData.forEach (card => {
    container.innerHTML += `
    <article class="product-card" aria-labelledby="product-name">
            <h3 id="product-name">${card.location}</h3>
            <p>${card.text}</p>
            <p>${card.timeStamp}</p>
        </article>
    `;
  });
}

// toggle menu

document.getElementById("menu-toggle-btn").addEventListener("click", function() {
  console.log('toggled')
  document.getElementsByTagName("nav")[0].classList.toggle("show");
  document.getElementsByClassName("menu-btn")[0].classList.toggle("show");
})
