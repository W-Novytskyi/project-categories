import fetchCategories from './fetchCategories.js';
import './css/styles.css';

const refs = {
  buttonContainer: document.getElementById('buttonContainer'),
  moreButton: document.getElementById('moreButton'),
  modal: document.getElementById('modal'),
  modalContent: document.getElementById('modalContent')
};

let visibleButtons;

async function init() {
  const categories = await fetchCategories();
  const allCategories = categories.results;

  if (window.innerWidth >= 1280) {
    visibleButtons = 6;
  } else if (window.innerWidth >= 768) {
    visibleButtons = 4;
  } else {
    visibleButtons = 0;
  }

  renderBtn(allCategories.slice(0, visibleButtons));

  hideOverflowButtons();

  window.addEventListener('resize', handleResize);

  refs.moreButton.addEventListener('click', onOpenMore);
  refs.modal.addEventListener('click', onBackdropClick);
  
  function onOpenMore() {
    const remainingCategories = allCategories.slice(visibleButtons);
    handleMoreButtonClick(remainingCategories);
  };

  function onCloseMore() {
    refs.modal.style.display = "none";
  }

  function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onCloseMore();
    }
  }
}

function renderBtn(results) {
  const markup = results
    .map(({ display_name }) => {
      return `
      <div class="button-rend">
      <button type="button" class="button-ctg">${display_name}</button>
      </div>
      `;
    })
    .join('');

  refs.buttonContainer.insertAdjacentHTML('afterbegin', markup);
}

function hideOverflowButtons() {
  const container = refs.buttonContainer;
  const containerWidth = container.clientWidth;
  const buttons = container.querySelectorAll('.button-ctg');
  let totalWidth = 0;

  buttons.forEach((button) => {
    button.classList.remove('hidden');
    totalWidth += button.offsetWidth;

    if (totalWidth > containerWidth) {
      button-ctg.classList.add('hidden');
    }
  });

  visibleButtons = buttons.length - document.querySelectorAll('.button-ctg.hidden').length;

  if (visibleButtons === buttons.length) {
    refs.moreButton.classList.add('hidden');
  } else {
    refs.moreButton.classList.remove('hidden');
  }
}

function handleMoreButtonClick(results) {
  const markup = results
    .map(({ display_name }) => {
      return `
      <div class="more-categories">
      <button type="button" class="more-item-categories">${display_name}</button>
      </div>
      `;
    })
    .join('');

  refs.modalContent.innerHTML = markup;
  refs.modal.style.display = "block";
}

function handleResize() {
  const buttons = refs.buttonContainer.querySelectorAll('.button-ctg');
  buttons.forEach((button) => button.classList.remove('hidden'));

  if (window.innerWidth >= 1280) {
    visibleButtons = 6;
  } else if (window.innerWidth >= 768) {
    visibleButtons = 4;
  } else {
    visibleButtons = 0;
  }

  hideOverflowButtons();
}

init();