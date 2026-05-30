let activeText = "";

export function stopEnglishSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    activeText = "";
  }
}

export function speakEnglish(text: string) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const synth = window.speechSynthesis;

  if (synth.speaking && activeText === text) {
    stopEnglishSpeech();
    return;
  }

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;

  const voices = synth.getVoices();
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  utterance.voice =
    englishVoices.find((voice) => voice.lang.toLowerCase() === "en-us") ??
    englishVoices.find((voice) => voice.lang.toLowerCase().includes("us")) ??
    englishVoices[0] ??
    null;

  utterance.onend = () => {
    activeText = "";
  };
  utterance.onerror = () => {
    activeText = "";
  };

  activeText = text;
  synth.speak(utterance);
}
