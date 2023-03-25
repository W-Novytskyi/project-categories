import { fetchCategories } from './fetchCategories';
import './css/styles.css';

const refs = {
  categoriesList: document.getElementById('categoriesList'),
};

async function init() {
  const categories = await fetchCategories();
  renderBtn(categories.results);
}

function renderBtn(results) {
  const markup = results
    .map(({ section, display_name }) => {
      return `
      <div class="button-rend">
      <button type="button" class="button">${display_name}</button>
      </div>
      `;
    })
    .join('');

  refs.categoriesList.insertAdjacentHTML('beforeend', markup);
}

init();