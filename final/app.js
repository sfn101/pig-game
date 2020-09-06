/* eslint-disable strict */

let score, current, activePlayer, dicePast, dicePast2, scoreValue;

const diceDom = document.querySelector('#dice-1');
const diceDom2 = document.querySelector('#dice-2');
init();
document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', () => {
  diceDom.style.display = 'inline';
  const dice = Math.floor(Math.random() * 6) + 1;
  diceDom.src = `dice-${dice}.png`;
  if (dice === 1) {
    nextPlayer();
  }
  current += dice;
  const twoDices = document.getElementById('2-dices').checked;
  const six2 = document.getElementById('2-six').checked;
  function twoSix(x, y) {
    if (six2) {
      if (x === 6 && y === 6) {
        score[activePlayer] = 0;
        document.querySelector(`#score-${activePlayer}`).textContent =
          score[activePlayer];
        nextPlayer();
      } else {
        dicePast = dice;
      }
    }
  }
  twoSix(dice, dicePast);
  if (twoDices) {
    const dice2 = Math.floor(Math.random() * 6) + 1;
    current += dice2;
    diceDom.id = 'dice-1';
    diceDom2.id = 'dice-2';
    diceDom2.style.display = 'inline';
    diceDom2.src = `dice-${dice2}.png`;
    twoSix(dice2, dicePast2);
    if (six2) {
      dicePast2 = dice2;
    }
    if (dice2 === 1 && dice !== 1) {
      nextPlayer();
    }
  }
  const currentScore = document.querySelector(`#current-${activePlayer}`);
  currentScore.textContent = current;
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  score[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent =
    score[activePlayer];

  if (score[activePlayer] >= scoreValue) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('winner');
    diceDom.style.display = 'none';
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove('active');
    document.getElementById(`name-${activePlayer}`).textContent = 'winner';
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
  current = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = current;
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
  //diceDom.style.display = 'none';
  dicePast = 0;
  dicePast2 = 0;
}

function init() {
  document.getElementById('2-dices').checked = false;
  document.getElementById('2-six').checked = false;
  diceDom.removeAttribute('id');
  diceDom2.removeAttribute('id');
  scoreValue = 100;
  document.getElementById('scoreValue').disabled = false;
  document.getElementById('btn-ok').disabled = false;
  diceDom.style.display = 'none';
  diceDom2.style.display = 'none';
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
  score = [0, 0];
  current = 0;
  activePlayer = 0;

  document.getElementById('score-0').textContent = score[0];
  document.getElementById('score-1').textContent = score[1];
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
}
document.querySelector('#btn-ok').addEventListener('click', () => {
  scoreValue = document.getElementById('scoreValue').value;
  document.getElementById('scoreValue').disabled = true;
  document.getElementById('btn-ok').disabled = true;
});
