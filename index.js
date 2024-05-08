const cards = document.querySelectorAll('.card');
const timeTag = document.querySelector('.time b');
const flipsTag = document.querySelector('.flips b');
const refreshBtn = document.querySelector('.detailWrapper button');
const difficultyRadio = document.querySelectorAll('input[name="difficulty"]')
const scoreTag = document.querySelector('.score b');

let maxTime = 60;
let timeLeft = maxTime;
let flips = 0 ;
let matchedCards = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let score = 0; 

let initTimer=()=>{
if(timeLeft <= 0){
    return clearInterval(timer);
}
timeLeft--;
timeTag.innerText = timeLeft;
}

let flipCard=({target: clickedCard})=>{
if(!isPlaying){
    isPlaying= true;
    timer = setInterval(initTimer, 1000);
}
if(clickedCard !== cardOne && !disableDeck && timeLeft > 0){ 
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add('flip');
    if(!cardOne){
        return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneIcon = cardOne.querySelector('.back-view i').classList.value;
    let cardTwoIcon = cardTwo.querySelector('.back-view i').classList.value;
    matchCards(cardOneIcon, cardTwoIcon);
}
}
 let matchCards = (icon1, icon2) =>{
    if(icon1 === icon2){
        matchedCards ++;
        score += 100; 
        scoreTag.innerText = score; 
        if(matchedCards == 6 && timeLeft > 0){
            return clearInterval(timer);
        }
        cardOne.removeEventListener('click', flipCard)
        cardTwo.removeEventListener('click', flipCard)
cardOne = cardTwo = '';
return disableDeck = false;
      }  setTimeout(()=>{
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake')
},400);
setTimeout(() =>{
cardOne.classList.remove('shake','flip');
cardTwo.classList.remove('shake','flip');
cardOne = cardTwo = '';
    disableDeck = false;
},1200);

} 

let shuffleCards = () =>{
    timeLeft = maxTime;
    flips = matchedCards = 0;
    score = 0;
    scoreTag.innerText = score; 
    cardOne = cardTwo =''
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;
    let arr = ['bxl-youtube','bxl-messenger','bxl-facebook-square','bxl-whatsapp','bxl-instagram','bxl-twitter']
    arr = arr.concat(arr);
    arr.sort(() => Math.random() > 0.5 ? 1: -1);
    cards.forEach((card, index)=>{
        card.classList.remove('flip');
        let iconTag = card.querySelector('.back-view i');
        setTimeout(()=>{
iconTag.classList.value = `bx ${arr[index]}`;
        },500)
    card.addEventListener('click', flipCard)
    }) 
}
 shuffleCards();
 refreshBtn.addEventListener('click', shuffleCards)
 cards.forEach(card =>{
    card.addEventListener('click', flipCard)
 })
 // Add event listener for difficulty radio buttons
difficultyRadio.forEach(radio => {
    radio.addEventListener('change', function() {
        const selectedDifficulty = this.value;
        if (selectedDifficulty === 'Easy') {
            maxTime = 60; // Adjust the max time for Easy difficulty
        } else if (selectedDifficulty === 'Medium') {
            maxTime = 45; // Adjust the max time for Medium difficulty
        } else if (selectedDifficulty === 'Hard') {
            maxTime = 30; // Adjust the max time for Hard difficulty
        }
        timeLeft = maxTime; // Reset the timer
        timeTag.innerText = timeLeft;
    });
});