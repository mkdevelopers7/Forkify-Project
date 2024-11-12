import { View } from './View';
import icons from 'url:../../img/icons.svg';
class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try another one.';
  _message = 'Success';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(rec => {
        return `
        <li class="preview">
          <a class="preview__link ${
            id === rec.id ? 'preview__link--active' : ''
          }" href="#${rec.id}">
            <figure class="preview__fig">
              <img src="${rec.image}" alt="${rec.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${rec.title}</h4>
              <p class="preview__publisher">${rec.publisher}</p>
              <div class="preview__user-generated ${rec.key ? '' : 'hidden'}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
    `;
      })
      .join('');
    // return `
    //     <li class="preview">
    //       <a class="preview__link preview__link--active" href="#23456">
    //         <figure class="preview__fig">
    //           <img src="src/img/test-1.jpg" alt="Test" />
    //         </figure>
    //         <div class="preview__data">
    //           <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
    //           <p class="preview__publisher">The Pioneer Woman</p>
    //           <div class="preview__user-generated">
    //             <svg>
    //               <use href="src/img/icons.svg#icon-user"></use>
    //             </svg>
    //           </div>
    //         </div>
    //       </a>
    //     </li>

    // `;
  }
}
export default new resultsView();
