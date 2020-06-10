/* eslint-disable strict */

let score = [0, 0];

let current = 0;

let activePlayer = 0;

let dice = 0;

document.querySelector('.dice').style.display = 'none';
document.querySelector('.btn-roll').disabled = true;

document.querySelector('.btn-new').addEventListener('click', () => {
  document.querySelector('.btn-roll').disabled = false;
  score = [0, 0];
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('winner');
  document.querySelector('#score-0').textContent = score[0];
  document.querySelector('#score-1').textContent = score[1];
  current = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('.dice').style.display = 'inline';
  dice = 1;
  document.querySelector('.dice').src = 'dice-1.png';
});

document.querySelector('.btn-roll').addEventListener('click', () => {
  document.querySelector('.dice').style.display = 'inline';
  dice = Math.floor(Math.random() * 6) + 1;
  if (dice === 1) {
    document.querySelector('img.dice').src = 'dice-1.png';
  } else if (dice === 2) {
    document.querySelector('img.dice').src = 'dice-2.png';
  } else if (dice === 3) {
    document.querySelector('img.dice').src = 'dice-3.png';
  } else if (dice === 4) {
    document.querySelector('img.dice').src = 'dice-4.png';
  } else if (dice === 5) {
    document.querySelector('img.dice').src = 'dice-5.png';
  } else if (dice === 6) {
    document.querySelector('img.dice').src = 'dice-6.png';
  }
  current = current + dice;
  document.querySelector(`#current-${activePlayer}`).textContent = current;
  if (dice === 1) {
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
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
  score[activePlayer] = score[activePlayer] + current;
  document.querySelector(`#score-${activePlayer}`).textContent =
    score[activePlayer];
  current = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = current;
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('winner');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').disabled = true;
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
