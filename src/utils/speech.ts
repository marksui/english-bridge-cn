let activeSpeechKey = "";

export function stopEnglishSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    activeSpeechKey = "";
  }
}

export function speakEnglish(text: string, options: { rate?: number } = {}) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const synth = window.speechSynthesis;
  const rate = options.rate ?? 0.85;
  const speechKey = `${rate}:${text}`;

  if (synth.speaking && activeSpeechKey === speechKey) {
    stopEnglishSpeech();
    return;
  }

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;

  const voices = synth.getVoices();
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  utterance.voice =
    englishVoices.find((voice) => voice.lang.toLowerCase() === "en-us") ??
    englishVoices.find((voice) => voice.lang.toLowerCase().includes("us")) ??
    englishVoices[0] ??
    null;

  utterance.onend = () => {
    activeSpeechKey = "";
  };
  utterance.onerror = () => {
    activeSpeechKey = "";
  };

  activeSpeechKey = speechKey;
  synth.speak(utterance);
}
