import getRandomHexColor from './get-random-hex';
const refsBtn = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
const { start, stop } = refsBtn;
let changeBgcIntervalId = null;
let countOfChanging = 0;

const btnAddAttribute = (attribute, ref) => ref.setAttribute(attribute, '');
const btnRemoveAttribute = (attribute, ref) =>
  ref.removeAttribute(attribute, '');

const btnToggleClass = (toggleClass, refF, refS) => {
  refF.classList.toggle(toggleClass);
  refS.classList.toggle(toggleClass);
};

const changeBgc = () => {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
  countOfChanging += 1;
  console.log(
    `successful color change, hex: ${randomColor}, number of changes: ${countOfChanging}`
  );
};

const onBtnStartClick = e => {
  btnToggleClass('disabled', start, stop);
  btnAddAttribute('disabled', start);
  btnRemoveAttribute('disabled', stop);
  changeBgc(); //? first color after click
  changeBgcIntervalId = setInterval(changeBgc, 1000);
};
const onBtnStopClick = () => {
  btnToggleClass('disabled', start, stop);
  btnRemoveAttribute('disabled', start);
  btnAddAttribute('disabled', stop);
  clearInterval(changeBgcIntervalId);
};

btnAddAttribute('disabled', stop);
stop.classList.add('disabled');

start.addEventListener('click', onBtnStartClick);
stop.addEventListener('click', onBtnStopClick);
