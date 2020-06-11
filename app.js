/* eslint-disable strict */

let score = [0, 0];

let current = 0;

let activePlayer = 0;

const diceDom = document.querySelector('.dice');

document.querySelector('.dice').style.display = 'none';
document.querySelector('.btn-roll').disabled = true;
document.querySelector('.btn-hold').disabled = true;

document.querySelector('.btn-new').addEventListener('click', () => {
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
  score = [0, 0];
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('winner');
  document.getElementById('score-0').textContent = score[0];
  document.getElementById('score-1').textContent = score[1];
  current = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  diceDom.style.display = 'inline';
  diceDom.src = 'dice-1.png';
});

document.querySelector('.btn-roll').addEventListener('click', () => {
  diceDom.style.display = 'inline';
  const dice = Math.floor(Math.random() * 6) + 1;
  diceDom.src = `dice-${dice}.png`;
  current += dice;
  const currentScore = document.querySelector(`#current-${activePlayer}`);
  currentScore.textContent = current;
  if (dice === 1) {
    currentScore.textContent = 0;
    switch (activePlayer) {
      case 0:
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.remove('active');
        activePlayer = 1;

        break;
      default:
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.remove('active');
        activePlayer = 0;
        break;
    }
    current = 0;
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('active');
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  score[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent =
    score[activePlayer];
  current = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = current;
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('winner');
    diceDom.style.display = 'none';
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;
  } else {
    switch (activePlayer) {
      case 0:
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.remove('active');
        activePlayer = 1;
        break;
      default:
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.remove('active');
        activePlayer = 0;
        break;
    }
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('active');
  }
});
