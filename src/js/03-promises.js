import Notiflix from 'notiflix';

const inputDelay = document.querySelector("input[name='delay']");
const inputStep = document.querySelector("input[name='step']");
const inputAmount = document.querySelector("input[name='amount']");
const inputBtn = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
inputBtn.addEventListener('click', submitFunction);

function submitFunction(ev) {
  ev.preventDefault();
  let amount = Number(inputAmount.value);
  let delay = Number(inputDelay.value);
  let step = Number(inputStep.value);
  let newDelay = delay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    newDelay = delay + i * step;
  }
}
