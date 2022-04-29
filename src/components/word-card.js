import { html, css, LitElement } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class WordCard extends LitElement {
  
  createRenderRoot() {
    return this;
  }

  static properties = {
    word: {type: Object}
  }

  constructor(){
    super();
    this.word={}
  }
  render() {
    console.log(this.word)
    return html`
        <div class="relative  flex-1 m-2 px-8 py-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 h-full">
            <h2 class="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl">
              ${this.word.word}
            </h2>
            ${this.word.explains.map(ex=>unsafeHTML(`<p class="mt-2 text-gray-600 dark:text-gray-200">${ex}</p>`))}
            
            <div class="justify-end mt-4 absolute bottom-4 right-4">
                <a href="#" onclick="javascript:new Audio('./mp3/${this.word.word}.mp3').play()" class="text-xl font-medium text-blue-500 dark:text-blue-300" click>
                  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" style="width:40px" viewBox="0 0 512 512"><title>Mic</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"/><path d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                </a>
            </div>
        </div>
    `;
  }

}

customElements.define('w-word-card', WordCard)