const app = document.querySelector("#app");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const apiKey = "ce7ee6fdd520c20edcba137ee2b6af6a"; // Replace with your OpenWeatherMap API key

app.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    await delay(150);
    getInputValue();

    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function (event) {
  const input = document.querySelector("input");
  input.focus();
});

async function open_terminal() {
  createText("Welcome");
  await delay(700);
  createText("Starting the server...");
  await delay(1500);
  await delay(500);
  new_line();
}

function new_line() {
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path");
  p.textContent = "# port";
  span1.textContent = " 2903";
  span2.textContent = " ~/xenotron-initialize$";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

function removeInput() {
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue() {
  const inputElement = document.querySelector("input");
  const value = inputElement.value.trim();
  const parts = value.split(" ");
  const command = parts[0].toLowerCase();
  const location = parts.slice(1).join(" ");

  if (value === "all") {
    trueValue(value);

    createCode("downloader -v", "access downloader sites.");
    createCode("social -a", "access social sites.");
    createCode("cls", "initialize clean slate protocol.");
    createCode("weather city", "get to know about your surroundings.");
    createCode("geolocate", "get your cordinates.");
  } else if (value === "downloader -v") {
    trueValue(value);
    createText("<a href='https://yt-shorts.download/' >$yt/vid-downloader</a>");
    createText("<a href='https://instavideosave.net/' >$ig/vid-downloader</a>");
  } else if (value === "social -a") {
    trueValue(value);
    createText("<a href='https://github.com/' >~github.com/</a>");
    createText(
      "<a href='https://www.facebook.com/nitnarula' >~facebook.com/</a>"
    );
    createText("<a href='https://www.instagram.com/' >~instagram.com/</a>");
    createText("<a href='https://in.pinterest.com/' >~pinterest.com/</a>");
  } else if (value === "geolocate") {
    if ("geolocation" in navigator) {
      trueValue(value);
      getLocation();
    } else {
      falseValue("Geolocation is not available in your browser.");
    }
  } else if (value === "cls") {
    clearTerminal();
  } else if (command === "weather") {
    if (!location) {
      falseValue("Please specify a city for the weather command.");
      return;
    }
    trueValue(value);

    // Fetch weather data
    try {
      const weatherData = await fetchWeatherData(location);
      createText(`Weather in ${location}: ${weatherData.description}`);
      createText(`Temperature: ${weatherData.temperature}°C`);
      createText(`Humidity: ${weatherData.humidity}%`);
    } catch (error) {
      falseValue(`Error fetching weather data: ${error.message}`);
    }
  } else {
    falseValue(value);
    createText(`command not found: ${value}`);
  }
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const locationText = `Latitude: ${latitude}, Longitude: ${longitude}`;
      createText(locationText);
    },
    (error) => {
      falseValue(`Error getting location: ${error.message}`);
    }
  );
}

function clearTerminal() {
  // Remove all p and section elements (including weather data)
  const elementsToRemove = document.querySelectorAll("p, section");
  elementsToRemove.forEach((element) => {
    app.removeChild(element);
  });
}

function trueValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname) {
  const p = document.createElement("p");

  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text) {
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

async function fetchWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return {
      description: data.weather[0].description,
      temperature: data.main.temp,
      humidity: data.main.humidity
    };
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

open_terminal();
