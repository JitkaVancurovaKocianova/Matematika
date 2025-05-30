
const snail = document.getElementById('snail');
const problemEl = document.getElementById('problem');
const optionsEl = document.getElementById('options');
const messageEl = document.getElementById('message');

let correctCount = 0;
let position = 0;
let currentProblem = {};

function generateProblem() {
  const first = Math.floor(Math.random() * 10);
  const second = Math.random() < 0.5 ? 0 : 1;
  const result = first + second;

  currentProblem = { first, second, result };

  problemEl.innerHTML = `<div class="formula">${first} + ${second} =</div>`;
  problemEl.className = 'problem';

  generateOptions();
}

function generateOptions() {
  optionsEl.innerHTML = '';
  for (let i = 0; i <= 10; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.onclick = () => checkAnswer(i);
    optionsEl.appendChild(button);
  }
}

function checkAnswer(selected) {
  const correct = currentProblem.result;

  if (selected === correct) {
    problemEl.className = 'problem correct';
    problemEl.innerHTML = `<div class="formula">${currentProblem.first} + ${currentProblem.second} = ${correct}</div>`;
    correctCount++;
    moveSnail();
    playSound('correct');

    setTimeout(() => {
      if (correctCount >= 10) {
        messageEl.textContent = 'Vyhrál jsi! 🎉';
        showVictory();
      } else {
        generateProblem();
      }
    }, 1000);

  } else {
    problemEl.className = 'problem wrong';
    problemEl.innerHTML = `<div class="formula">${currentProblem.first} + ${currentProblem.second} = ${correct}</div>`;
    playSound('wrong');

    setTimeout(() => {
      generateProblem();
    }, 2000);
  }
}

function moveSnail() {
  const trackWidth = document.querySelector('.track').clientWidth;
  const snailWidth = snail.clientWidth;
  const moveStep = (trackWidth * 0.7 - snailWidth) / 9;

  position += moveStep;
  snail.style.left = `${position}px`;
}

function showVictory() {
  document.querySelector('.track').style.display = 'none';
  document.getElementById('problem').style.display = 'none';
  document.getElementById('options').style.display = 'none';
  document.getElementById('message').style.display = 'none';
  document.getElementById('victory-screen').style.display = 'block';
}

function resetGame() {
  document.querySelector('.track').style.display = 'block';
  document.getElementById('problem').style.display = 'block';
  document.getElementById('options').style.display = 'flex';
  document.getElementById('message').style.display = 'block';
  document.getElementById('victory-screen').style.display = 'none';

  correctCount = 0;
  position = 0;
  snail.style.left = '0px';
  messageEl.textContent = '';
  generateProblem();
}

function playSound(type) {
  if (type === 'correct') {
    document.getElementById('sound-correct').play();
  } else if (type === 'wrong') {
    document.getElementById('sound-wrong').play();
  }
}

generateProblem();
