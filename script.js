const inputElement = document.getElementById('input');
const infoTextElement = document.getElementById('info-text');
const meaningContainerElement = document.getElementById('meaning-container');
const titleElement = document.getElementById('title');
const meaningElement = document.getElementById('meaning');
const audioElement = document.getElementById('audio');

async function fetchAPI(word) {
    try {
        infoTextElement.style.display = 'block';
        infoTextElement.innerHTML = `
        <img src="loader.gif" alt="Loading...">
        `;
        // while data is loading meaning container is hidden
        meaningContainerElement.style.display = 'none';


        // console.log(word);
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        //notes: https://dictionaryapi.dev/ -> get api from here
        // it is free to use api i.e. api key is non needed

        // console.log(url);
        const result = await fetch(url).then((res) => res.json());
        // console.log(result);

        if (result.title) {
            meaningContainerElement.style.display = 'block';
            infoTextElement.style.display = 'none';
            titleElement.innerHTML = word;
            meaningElement.innerHTML = "N/A";
            audioElement.style.display = 'none';
        }
        else {
            // removing loading effect when data is loaded
            infoTextElement.style.display = 'none';

            // displaying the meaning
            meaningContainerElement.style.display = 'block';
            titleElement.innerHTML = result[0].word;
            meaningElement.innerHTML = result[0].meanings[0].definitions[0].definition;

            // setting audio
            audioElement.style.display = 'inline-flex';
            audioElement.src = result[0].phonetics[0].audio;
        }
    } catch (error) {
        console.log(error);
        infoTextElement.innerHTML = `An error occured.<br> Please try again later!!!`
    }
}

inputElement.addEventListener('keyup', (e) => {
    // console.log(e.target.value, e.key);

    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
})
