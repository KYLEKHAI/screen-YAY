// Global variables (store folder and index)
let uploadedFiles = [];
let currentIndex = 0;

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

// Remove the header and settings button when in full screen mode
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

// Open settings modal
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeBtn = document.querySelector(".close-btn");

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
  settingsModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  settingsModal.classList.add("hidden");
  settingsModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === settingsModal) {
    settingsModal.classList.add("hidden");
    settingsModal.style.display = "none";
  }
});

// Toggle Show Clock visibility
const toggleClock = document.querySelector(".toggle");
const clock = document.getElementById("clock");

toggleClock.addEventListener("change", () => {
  if (toggleClock.checked) {
    clock.style.display = "none";
  } else {
    clock.style.display = "block";
  }
});

// Wallpaper change (choose file)
const modal = document.getElementById("settings-modal");
const saveBtn = document.querySelector(".close-modal");
const fileInput = document.getElementById("file-input");
const fileChooseBtn = document.getElementById("file-choose");
const fileNameDisplay = document.getElementById("file-name");

fileChooseBtn.addEventListener("click", () => fileInput.click());

// Handle file selection
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileUrl = URL.createObjectURL(file);
    document.getElementById(
      "display-page"

      // Change background image of the display page
    ).style.backgroundImage = `url(${fileUrl})`;

    // Show file name
    fileNameDisplay.textContent = `Selected file: ${file.name}`;
  } else {
    fileNameDisplay.textContent = "No file selected";
  }
});

// Close modal on click for the close button
const closeModal = () => {
  modal.classList.add("hidden");
};
closeBtn.addEventListener("click", closeModal);
saveBtn.addEventListener("click", closeModal);

// Wallpaper change (choose folder)
const folderChooseBtn = document.getElementById("folder-choose");

folderChooseBtn.addEventListener("click", () => {
  const folderInput = document.createElement("input");
  folderInput.type = "file";
  folderInput.webkitdirectory = true;
  folderInput.multiple = true;

  folderInput.click();

  // Display file based on current index
  folderInput.addEventListener("change", (event) => {
    const files = event.target.files;
    uploadedFiles = Array.from(files);
    currentIndex = 0;
    displaySelectedFile();
  });
});

// Display file as background image
function displaySelectedFile() {
  if (uploadedFiles.length > 0) {
    const selectedFile = uploadedFiles[currentIndex];
    const fileUrl = URL.createObjectURL(selectedFile);
    document.getElementById(
      "display-page"
    ).style.backgroundImage = `url(${fileUrl})`;
    fileNameDisplay.textContent = `Selected file: ${selectedFile.name}`;
  } else {
    fileNameDisplay.textContent = "No file selected";
  }
}

// Handle arrow key input
function navigateFiles(event) {
  if (uploadedFiles.length === 0) return;

  if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex + 1) % uploadedFiles.length;
    displaySelectedFile();
  }

  if (event.key === "ArrowRight") {
    currentIndex =
      (currentIndex - 1 + uploadedFiles.length) % uploadedFiles.length;
    displaySelectedFile();
  }
}

document.addEventListener("keydown", navigateFiles);
