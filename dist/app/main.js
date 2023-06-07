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
const body = document.querySelector('body');

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
        //add wave animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        //get speak text
        //will capture the textInput into a variable, which we will use to set up the speak method
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        
        //speak end
        speakText.onend = e => {
            console.log('Done speaking');
            //stops the wave.gif from playing in the background
            body.style.background = '#141414'
        }

        //speak error
        speakText.onerror = e => {
            console.log('Something went wrong')
        } 

        //selected voice
        //The read-only HTMLSelectElement property "selectedOptions" contains a list of the <option> elements contained within the <select> element that are currently selected.
        //The getAttribute() method of the Element interface returns the value of a specified attribute on the element.
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop through voices
        voices.forEach( voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.pitch = pitch.value;
        speakText.rate = rate.value;

        //speak
        synth.speak(speakText);
    }
};

//event listeners

//click "speak" button
textForm.addEventListener('submit', e => {
    //since we are using a form, we don't want submit to default to its submit method, so we use .preventDefault method
    e.preventDefault();
    speak();
    //The HTMLElement.blur() method removes keyboard focus from the current element
    textInput.blur();
});

//rate value 
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

//pitch value 
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

//speak when language changes
voiceSelect.addEventListener('change', e => speak());