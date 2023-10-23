let currWord, corrLetters, wrongCount;
const maxGuesses = 6;

const resetGame = () => {
    corrLetters = [];
    wrongCount = 0;

    document.querySelector(".hangman-box img").src = "images/hangman-0.svg";
    document.querySelector(".guesses-text b").innerText = `${wrongCount} / ${maxGuesses}`;
    document.querySelector(".word-display").innerHTML = currWord.split("").map(() => `<li class="letter"></li>`).join("");
    document.querySelector(".keyboard").querySelectorAll("button").forEach(btn => btn.disabled = false);
    document.querySelector(".game-modal").classList.remove("show");
}

const gameOver = (boolvict) => {

    const modalText = boolvict ? `You found the word:` : 'The correct word was:';
    
    document.querySelector(".game-modal").querySelector("img").src = `images/${boolvict ? 'victory' : 'lost'}.gif`;
    document.querySelector(".game-modal").querySelector("h4").innerText = boolvict ? 'Congrats!' : 'Game Over!';
    document.querySelector(".game-modal").querySelector("p").innerHTML = `${modalText} <b>${currWord}</b>`;
    document.querySelector(".game-modal").classList.add("show");
}
const initGame = (button, clickedLetter) => {
    if(currWord.includes(clickedLetter)) {
        [...currWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                corrLetters.push(letter);
                
                document.querySelector(".word-display").querySelectorAll("li")[index].innerText = letter;
                document.querySelector(".word-display").querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongCount++;
        
        document.querySelector(".hangman-box img").src = `images/hangman-${wrongCount}.svg`;
    }
    button.disabled = true;
    
    document.querySelector(".guesses-text b").innerText = `${wrongCount} / ${maxGuesses}`;
    
    if(wrongCount === maxGuesses) return gameOver(false);
    if(corrLetters.length === currWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    document.querySelector(".keyboard").appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currWord = word; 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}





getRandomWord();
document.querySelector(".game-modal").querySelector("button").addEventListener("click", getRandomWord);