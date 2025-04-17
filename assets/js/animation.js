const toptext = document.querySelector("#top-text");
const value = toptext.innerHTML;


let currentText = '';
let isDeleting = false;
let typingSpeed = 150;  // Speed of typing
let deletingSpeed = 100;  // Speed of deleting

function typeText() {
  if (!isDeleting) {
    currentText = value.substring(0, currentText.length + 1); // Add one more letter
    toptext.textContent = currentText; // Update the displayed text

    if (currentText.length === value.length) {
      isDeleting = true;  // Start deleting once the text is fully typed
      setTimeout(typeText, 2000); // Wait for 2 seconds before deleting
    }
  } else {
    if (currentText.length >1) {
      currentText = value.substring(0, currentText.length - 1); 
      toptext.textContent = currentText;

      if (currentText.length === 0) {
        isDeleting = false;  // After deleting, start typing again
      }
    } else {
      // If we reach the first word, just reset to the full text
      isDeleting = false; // Start typing again
    }
  }
}

setInterval(typeText, isDeleting ? deletingSpeed : typingSpeed);