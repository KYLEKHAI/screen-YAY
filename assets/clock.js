// Create and get the time for the clock
function displayTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var amOrPm = "AM";

  // Calculate AM or PM in 12 hour format

  if (hours >= 12) {
    amOrPm = "PM";
  }
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours - 12;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Concatenate and display in clock format
  document.getElementById("clock").innerHTML =
    hours + ":" + minutes + ":" + seconds + "|" + amOrPm;
}

// Initial call
displayTime();
// Every second update the time
setInterval(displayTime, 1000);

// Fullscreen button (using Fullscreen API)
const fullscreenBtn = document.getElementById("fullscreen-btn");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error on entering full screen:${err.message}`);
    });
  } else {
    document.exitFullscreen().catch((err) => {
      console.error(`Error on exiting full-screen mode: ${err.message}`);
    });
  }
});

// Fullscreen tooltip change
const fullscreenButton = document.getElementById("fullscreen-btn");

// Initial tooltip
fullscreenButton.setAttribute("data-tooltip", "View in Full Screen");

fullscreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenButton.setAttribute("data-tooltip", "Exit Full Screen");
  } else {
    document.exitFullscreen();
    fullscreenButton.setAttribute("data-tooltip", "View in Full Screen");
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullscreenButton.setAttribute("data-tooltip", "Exit Full Screen");
  } else {
    fullscreenButton.setAttribute("data-tooltip", "View in Full Screen");
  }
});

// Show full screen button when first loading page
window.addEventListener("DOMContentLoaded", () => {
  const fullscreenBtn = document.getElementById("fullscreen-btn");

  fullscreenBtn.dataset.visible = "true";

  setTimeout(() => {
    fullscreenBtn.dataset.visible = "false";
  }, 1000);
});

// Remove the header (logo and navbar) when in full screen mode
document.addEventListener("fullscreenchange", () => {
  const header = document.querySelector(".header");
  const settingsBtn = document.getElementById("settings-btn");
  if (document.fullscreenElement) {
    fullscreenButton.setAttribute("data-tooltip", "Exit Full Screen");
    header.classList.add("hidden");
    settingsBtn.classList.add("hidden");
  } else {
    fullscreenButton.setAttribute("data-tooltip", "View in Full Screen");
    header.classList.remove("hidden");
    settingsBtn.classList.remove("hidden");
  }
});

// Wallpaper change
