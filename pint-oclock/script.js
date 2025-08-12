const pintContainer = document.getElementById('pint-container');
const beerRect = document.getElementById('beer-rect');
const foam = document.getElementById('foam');
const pourBtn = document.getElementById('pour-btn');
const cityNameEl = document.getElementById('city-name');
const barsContainer = document.getElementById('bars');

const cities = [
  {
    name: "London",
    timezone: "Europe/London",
    bars: [
      { name: "The Churchill Arms", address: "119 Kensington Church St" },
      { name: "The Mayflower", address: "117 Rotherhithe St" },
      { name: "The Lamb & Flag", address: "33 Rose St" }
    ]
  },
  {
    name: "New York",
    timezone: "America/New_York",
    bars: [
      { name: "McSorley's Old Ale House", address: "15 E 7th St" },
      { name: "The Dead Rabbit", address: "30 Water St" },
      { name: "Employees Only", address: "510 Hudson St" }
    ]
  },
  {
    name: "Sydney",
    timezone: "Australia/Sydney",
    bars: [
      { name: "The Glenmore", address: "96 Cumberland St" },
      { name: "Opera Bar", address: "1 Macquarie St" },
      { name: "The Argyle", address: "18 Argyle St" }
    ]
  }
];

// Function to find which city is currently 5 PM
function findFivePMCity() {
  const now = new Date();
  for (let city of cities) {
    const cityTime = new Date(now.toLocaleString("en-US", { timeZone: city.timezone }));
    if (cityTime.getHours() === 17) {
      return city;
    }
  }
  return null;
}

function displayCityInfo(city) {
  if (!city) {
    cityNameEl.textContent = "No city is currently at 5 PM";
    barsContainer.innerHTML = "";
    return;
  }
  cityNameEl.textContent = `It's 5 PM in ${city.name}!`;
  barsContainer.innerHTML = "";
  city.bars.forEach(bar => {
    const barCard = document.createElement('div');
    barCard.classList.add('bar-card');
    barCard.innerHTML = `
      <div class="bar-name">${bar.name}</div>
      <div class="bar-address">${bar.address}</div>
    `;
    barsContainer.appendChild(barCard);
  });
}

// Pint pour animation
function pourPint() {
  let height = 0;
  foam.style.opacity = 0;
  beerRect.setAttribute('y', 380);
  beerRect.setAttribute('height', 0);
  
  const interval = setInterval(() => {
    if (height >= 360) {
      foam.style.opacity = 1;
      clearInterval(interval);
      displayCityInfo(findFivePMCity());
    } else {
      height += 4; // speed of fill
      beerRect.setAttribute('height', height);
      beerRect.setAttribute('y', 380 - height);
    }
  }, 20);
}

pourBtn.addEventListener('click', pourPint);
pintContainer.addEventListener('click', pourPint);
pintContainer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    pourPint();
  }
});

// Show info on load if any city is 5 PM
displayCityInfo(findFivePMCity());
