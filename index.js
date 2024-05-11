const year = document.querySelector('.current_year');
const submit = document.querySelector('.check');
const guess = document.querySelector('#guess');
let score = 20;
const maxValue = 20;
let random = Math.floor(Math.random()*20)+1;
const reset = document.querySelector('.reset');
const secret = document.querySelector('.secret_number');
const scoreValue = document.querySelector('.score-value');
const Status = document.querySelector(".status-container");
const messages = {
  initial: "Start guessing...",
  low: "You're guessing lower. higher the guess.",
  high: "You're guessing higher. lower the guess.",
  correct: "You got it right !"
}
const startConfetti = () => {
  setTimeout(function() {
    confetti.start()
  }, 1000);
};

const stopConfetti = () => {
  setTimeout(function() {
    confetti.stop()
  }, 5000);
};

const checkSubmitValue = (e) => {
  e.preventDefault();
  if(guess.value == random){
    Status.textContent = messages.correct;
    secret.style.transform = 'roteteX(180deg)'
    secret.textContent = random;
    startConfetti();
    stopConfetti();
  }
  else{
    if(guess.value>random){
      Status.textContent = messages.high;
    }else{
      Status.textContent = messages.low;
    }
    score--;
    scoreValue.textContent = score;
  }
}

const checkTypedValue = () => {
  const validator = document.querySelector('.validator');
  if(guess.value > maxValue){
    validator.classList.contains('hidden') && validator.classList.remove('hidden');
  }else{
    !(validator.classList.contains('hidden')) && validator.classList.add('hidden');
  }
}

const resetGame = () => {
  guess.value="";
  secret.textContent = '?';
  score = maxValue;
  scoreValue.textContent = maxValue;
  Status.textContent = messages.initial;
  random = Math.floor(Math.random()*20)+1;
  checkTypedValue();
}
year.textContent = new Date().getFullYear();
guess.addEventListener('input', checkTypedValue)
submit.addEventListener('click', checkSubmitValue);
reset.addEventListener('click', resetGame)


start();
stop();