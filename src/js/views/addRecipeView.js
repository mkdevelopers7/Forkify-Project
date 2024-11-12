import { View } from './View';
import icons from 'url:../../img/icons.svg';
class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _recipeWindow = document.querySelector('.add-recipe-window');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded!';
  constructor() {
    super();
    this._openWindow();
    this._closeWindow();
  }
  _openWindow() {
    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _closeWindow() {
    this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  toggleWindow() {
    this._recipeWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new addRecipeView();
