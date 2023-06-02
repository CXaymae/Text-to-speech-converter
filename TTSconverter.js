// Get the textarea and button elements
const textarea = document.querySelector("textarea");
const button = document.querySelector("button");

// Initialize the isSpeaking flag
let isSpeaking = true;

// Function to convert text to speech
const textToSpeech = () => {
  const synthesis = window.speechSynthesis;
  const text = textarea.value;

  // Check if the speech synthesis is not already speaking and there is text to convert
  if (!synthesis.speaking && text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
  }

  // Check if the text length is greater than 70 characters
  if (text.length > 70) {
    if (synthesis.speaking && isSpeaking) {
      button.innerText = "Pause";
      synthesis.resume();
      isSpeaking = false;
    } else {
      button.innerText = "Resume";
      synthesis.pause();
      isSpeaking = true;
    }
  } else {
    isSpeaking = false;
    button.innerText = "Speaking";
  }

  // Check if the speech synthesis is not speaking and isSpeaking flag is false
  setInterval(() => {
    if (!synthesis.speaking && !isSpeaking) {
      isSpeaking = true;
      button.innerText = "Convert to Speech";
    }
  });
};

// Add click event listener to the button
button.addEventListener("click", textToSpeech);
