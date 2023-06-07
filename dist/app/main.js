//init SpeechSynth API
const synth = window.speechSynthesis;

//DOM Elements

//query selected form because it was the only form on the page. Normally would select by ID
const textForm = document.querySelector('form');
//rest of variables are selected by their respective IDs
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const body = document.getElementById('body');

//Init voices array
let voices = [];

const getVoices = ()  => {
    voices = synth.getVoices();
    //console.log(voices)

    //Loop through voices and create an option for each one
    voices.forEach(voice => {
        //create option element
        const option = document.createElement('option');
        //fill the option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        //set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option)
    })
}

getVoices();
//the voice list is loaded async to page. In order to console.log the list of voices, the onvoiceschange event must be called. The code below sets a callback for that event listener
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;

}

//speak 
const speak = () => {
    //check if speaking
    if (synth.speaking) {
        console.error('Already speaking')
        return;
    } 

    if (textInput.value !== '') {
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //end speak
        speakText.onend = e => {
            console.log('Done speaking');
            
        }
    }
}