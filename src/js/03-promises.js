import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refsInput = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
};
const refBtnCreate = document.querySelector('button[type=submit]');
const refForm = document.querySelector('.form');
let inputStepIntervalId = null;
let userInputData = {};
refBtnCreate.setAttribute('disabled', '');

const clearInput = () => {
  refsInput.delay.value = null;
  refsInput.step.value = null;
  refsInput.amount.value = null;
};

clearInput();

const setInputValues = () => ({
  delayValue: Number(refsInput.delay.value),
  stepValue: Number(refsInput.step.value),
  amountValue: Number(refsInput.amount.value),
});

function createPromise(position, delay, msCounter) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${msCounter}ms`);
    }
    reject(`❌ Rejected promise ${position} in ${msCounter}ms`);
  });
}

const onBtnCreateClick = e => {
  e.preventDefault();
  refBtnCreate.setAttribute('disabled', '');
  let { delayValue, stepValue, amountValue } = userInputData;
  let counter = 1;
  let msCounter = delayValue;
  setTimeout(() => {
    createPromise(counter, delayValue, msCounter)
      .then(result => {
        Notify.success(result);
      })
      .catch(result => {
        Notify.failure(result);
      })
      .finally(() => {
        counter += 1;
      });
  }, delayValue);

  inputStepIntervalId = setInterval(() => {
    msCounter += stepValue;
    createPromise(counter, stepValue, msCounter)
      .then(result => {
        Notify.success(result);
      })
      .catch(result => {
        Notify.failure(result);
      })
      .finally(() => {
        if (counter === amountValue) {
          clearInterval(inputStepIntervalId);
          refBtnCreate.removeAttribute('disabled', '');
        }
        counter += 1;
      });
  }, stepValue);
};
const onFormInput = e => {
  userInputData = setInputValues();
  const { delayValue, stepValue, amountValue } = userInputData;
  const isBackspace = e.inputType === 'deleteContentBackward';
  const isDelete = e.inputType === 'deleteContentForward';

  const patternNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  if (!(patternNumbers.includes(e.data) || isBackspace || isDelete)) {
    Report.failure('Enter the numbers', '', 'Try again');
    clearInput();
    return;
  }
  if (delayValue && (stepValue || stepValue === 0) && amountValue) {
    refBtnCreate.removeAttribute('disabled', '');
  }
};
refBtnCreate.addEventListener('click', onBtnCreateClick);
refForm.addEventListener('input', onFormInput);
