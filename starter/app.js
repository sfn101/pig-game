/* eslint-disable strict */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score, roundScore, activePlayer, dicePast, dicePast2, winScore;
document.querySelector('#btn-ok').addEventListener('click', () => {
  winScore = document.getElementById('scoreValue').value;
  document.getElementById('btn-ok').disabled = true;
  document.getElementById('scoreValue').disabled = true;
});
activePlayer = 0;

function newG() {
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('winner');
  score = [0, 0];
  roundScore = 0;
  winScore = 100;
  dicePast = 0;
  dicePast2 = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('active');
  activePlayer = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add('active');
  document.querySelector('#score-0').textContent = score[0];
  document.querySelector('#score-1').textContent = score[1];
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
  document.querySelector('#current-0').textContent = roundScore;
  document.querySelector('#current-1').textContent = roundScore;
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
  document.getElementById('btn-ok').disabled = false;
  document.getElementById('scoreValue').disabled = false;
  document.getElementById('2-dices').checked = false;
  document.getElementById('2-six').checked = false;
  document.getElementById('2-dices').disabled = false;
  document.getElementById('2-six').disabled = false;
}
newG();
function rScoreUP() {
  document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
}

function scoreUP() {
  document.querySelector(`#score-${activePlayer}`).textContent =
    score[activePlayer];
}

const diceDOM = document.querySelector('.dice');
const diceDOM2 = document.querySelector('#dice-2');
function nextP() {
  roundScore = 0;
  rScoreUP();
  dicePast = 0;
  dicePast2 = 0;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove('active');
  activePlayer = activePlayer > 0 ? 0 : 1;
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', newG);

document.querySelector('.btn-roll').addEventListener('click', () => {
  diceDOM.style.display = 'inline';
  const towDice = document.getElementById('2-dices').checked;
  const towSix = document.getElementById('2-six').checked;
  document.getElementById('btn-ok').disabled = true;
  document.getElementById('scoreValue').disabled = true;
  document.getElementById('2-dices').disabled = true;
  document.getElementById('2-six').disabled = true;
  const dice = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  diceDOM.src = `dice-${dice}.png`;
  if (dice > 1 || (towDice === true && dice > 1 && dice2 > 1)) {
    if (towDice === true) {
      roundScore += dice2;
      diceDOM2.src = `dice-${dice2}.png`;
      diceDOM2.style.display = 'inline';
      diceDOM.setAttribute('id', 'dice-1');
    } else {
      diceDOM.removeAttribute('id');
    }
    roundScore += dice;
    rScoreUP();
    if (
      (towSix === true && dice === 6 && dicePast === 6) ||
      (towDice === true && towSix === true && dice2 === 6 && dicePast2 === 6)
    ) {
      score[activePlayer] = 0;
      scoreUP();
      nextP();
    } else {
      dicePast = dice;
      dicePast2 = dice2;
    }
  } else {
    nextP();
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  score[activePlayer] += roundScore;
  roundScore = 0;
  scoreUP();
  if (score[activePlayer] >= winScore) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('winner');
    document.querySelector('.btn-roll').disabled = true;
    document.querySelector('.btn-hold').disabled = true;
  } else {
    nextP();
  }
});
