const year = document.querySelector('.current_year');
const submit = document.querySelector('.check');
const guess = document.querySelector('#guess');
let score = 20;
let highScore = 0;
const maxValue = 20;
let random = Math.floor(Math.random()*20)+1;
const reset = document.querySelector('.reset');
const secret = document.querySelector('.secret_number');
const scoreValue = document.querySelector('.score-value');
const Status = document.querySelector(".status-container");
const modal = document.querySelector(".escape-modal")
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
  const playerStatus = document.querySelector('.player-status');
  const modalScore = document.querySelector('.modal-score');
  if(guess.value == random && score > 1){
    Status.textContent = messages.correct;
    if(score > highScore) {
      highScore = score
      document.querySelector('.highscore-value').textContent = score;
    }
    secret.textContent = random;
    document.querySelector('.gif').setAttribute('src', './assets/winner.gif');
    playerStatus.textContent = 'Won !!!';
    if(playerStatus.classList.contains('lost')){
      playerStatus.classList.remove('lost');
    }
    playerStatus.classList.add('won');
    modalScore.textContent = score;
    showModal()
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
    if(score=== 0){
      playerStatus.textContent = 'Lost !!!';
      if(playerStatus.classList.contains('won')){
        playerStatus.classList.remove('won');
      }
      playerStatus.classList.add('lost');
      modalScore.textContent = score;
      document.querySelector('.gif').setAttribute('src', './assets/crying.gif');
      showModal();
    }
}
}

const checkTypedValue = () => {
  const validator = document.querySelector('.validator');
  if(guess.value > maxValue){
    submit.setAttribute('disabled', true);
    submit.classList.add('disabled');
    validator.classList.contains('hidden') && validator.classList.remove('hidden');
  }else{
    submit.classList.remove('disabled');
    submit.removeAttribute('disabled');
    !(validator.classList.contains('hidden')) && validator.classList.add('hidden');
  }
}

const showModal = () => {
  modal.classList.contains('hidden') && modal.classList.remove('hidden');
  document.querySelector('.modal-start-over').addEventListener('click', resetGame);
}

const hideModal = () => {
  !(modal.classList.contains('hidden')) && modal.classList.add('hidden');
}

const resetGame = () => {
  hideModal();
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

document.querySelector(".close").addEventListener('click', hideModal)
document.addEventListener('keyup', function(e){
  e.key === 'Escape' && hideModal()
})