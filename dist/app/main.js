//init SpeechSynth API
const synth = window.speechSynthesis;

//DOM Elements

//query selected form because it was the only form on the page. Normally would select by ID
const textForm = document.querySelector('form');
//rest of variables are selected by their respective IDs
const textInput = document.getElementById('#text-input');
const voiceSelect = document.getElementById('#voice-select');
const rate = document.getElementById('#rate');
const rateValue = document.getElementById('#rate-value');
const pitch = document.getElementById('#pitch');
const pitchValue = document.getElementById('#pitch-value');
const body = document.getElementById('body');