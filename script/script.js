const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");
const buttons = document.querySelectorAll(".time-btn");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // Initial population of cards with the default timeframe (daily)
    populateCards(data, "daily");

    // Add event listeners to the buttons to change the timeframe
    dailyBtn.addEventListener("click", () => populateCards(data, "daily"));
    weeklyBtn.addEventListener("click", () => populateCards(data, "weekly"));
    monthlyBtn.addEventListener("click", () => populateCards(data, "monthly"));
  })
  .catch((error) => console.error("Error loading JSON data:", error));

// Function to create and append cards
const populateCards = (data, timeframe) => {
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; // Clear existing cards, if any

  data.forEach((item) => {
    const card = document.createElement("section");
    card.classList.add("card", "time-card");
    card.setAttribute("aria-labelledby", item.title.toLowerCase());

    card.innerHTML = `
      <div class="color-banner" style="background-color: ${
        item.color
      };" aria-hidden="true">
        <img src="${item.banner}" alt="Icon representing the category ${
      item.title
    }}" />
      </div>
      <div class="card-content">
        <div id="${item.title.toLowerCase()}" class="category-title" role="heading" aria-level="2">
          <h3>${item.title}</h3>
          <picture><img src="./images/icon-ellipsis.svg" alt="Options"></picture>
        </div>
        <div class="time-info">
          <p class="current-duration">${
            item.timeframes[timeframe].current
          }hrs</p>
          <p class="previous-time">Last ${
            item.timeframes[timeframe].category
          } - ${item.timeframes[timeframe].previous}hrs</p>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
