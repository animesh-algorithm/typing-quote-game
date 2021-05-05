/*          Fetch Functionality          */
const randomQuote = document.getElementById('random-quote')
const changeQuoteBtn = document.getElementById('change-quote')
const randomQuote_API_URL = 'http://api.quotable.io/random'

// Event-listeners for Fetch Functionality
changeQuoteBtn.addEventListener('click', changeQuote)
changeQuoteBtn.addEventListener('click', startTimer)

function fetchQuote() {
    return fetch(randomQuote_API_URL)    
    .then(response => response.json())
    .then(quoteJSON => quoteJSON.content)
}

async function changeQuote() {
    const quote = await fetchQuote()
    randomQuote.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        randomQuote.appendChild(characterSpan)
    })
    textArea.value = null
}

/*          Typing Header Functionality          */
const typingText = document.getElementById('typing')
const textToType = "Typing"
const textToTypeLength = textToType.length
let i = 0

function typeWriter() {
    if (i < textToTypeLength) {
        typingText.innerHTML += textToType.charAt(i)
        i++
        setTimeout(typeWriter, 100)
    }
}

setTimeout(typeWriter, 300)

/*           Timer Functionality             */
const textArea = document.querySelector('textarea')

textArea.addEventListener('input', function() {
    const Quote = randomQuote.querySelectorAll('span')
    const textAreaValue = textArea.value.split('')
    let correct = true
    Quote.forEach((charSpan, index) => {
        const character = textAreaValue[index]
        console.log(character)
        if (character == null) {
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct = false
        } else if (character === charSpan.innerText) {
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        } else {
            charSpan.classList.remove('correct')
            charSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) {
        changeQuote()
        startTimer()
    }
})

window.addEventListener('load', startTimer)

const timer = document.getElementById('timer')
let time
let timerInterval
function startTimer() {
    time = new Date()
    timerInterval = setInterval(function() {
        timer.innerHTML = Math.floor((new Date() - time) / 1000)
    }, 1000)
}

let quitGameBtn = document.getElementById('quit-game')

quitGameBtn.addEventListener('click', function() {
    clearInterval(timerInterval)
    timer.innerText = 0
    quitGameBtn.innerHTML = 'Reload'
    let reloadBtn = quitGameBtn
    reloadBtn.onclick = function() {
        location.reload()       
    }
})

changeQuote()