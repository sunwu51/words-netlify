import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "wired-elements/lib/wired-card.js";

@customElement("w-word-card")
export class WordCard extends LitElement {
  static styles = css`
  @media (max-width: 500px){
    wired-card{
      margin: 0px;
      width: 300px;
    } 
  }
  @media (min-width: 500px){
    wired-card{
      margin: 10px;
      width: 380px;
    }
  }
  .wg{
    margin: 5px auto;
  }
  .wg p{
    margin: 0 auto;
  }
  .wg:nth-of-type(2n+1){
    color:darksalmon;
  }
  .wg:nth-of-type(2n){
    color: cornflowerblue;
  }
  .ss{
    margin: 5px auto;
  }
  .ss p{
    margin: 0 auto;
  }
  .ss p:nth-of-type(1){
    color: brown;
  }
  .ss p:nth-of-type(2){
    font-size:12px;
    color: gray;
  }
  .down{
    transform-box: fill-box;
    transform-origin: center;
    animation: ro 1s forwards;  /*animation 指定动画名和持续时间，结束后保持*/ 
  }
  .up{
    transform-box: fill-box;
    transform-origin: center;
    animation: ro2 1s forwards;  /*animation 指定动画名和持续时间，结束后保持*/ 
  }
  @keyframes ro{
    100%{
      transform: rotate(0.5turn);
    }
  }
  @keyframes ro2{
    0%{
      transform: rotate(0.5turn);
    }
    100%{
      transform: rotate(0turn);
    }
  }
  .origin-hide{
    display:none;
  }
  .origin-show{
    display:block;
  }
  .show{
    display: block;
    animation: fade-in 1s;
  }
  .hide{
    display: block;
    animation: fade-out 1s;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }`;

  @property()
  item = {word:'', phonetic:'',explains:[], sentences:[], wordGroup: []}

  private _showDetails(e: any){
    var svgDown = e.currentTarget;
    var detailsDiv = svgDown.parentElement.parentElement.querySelector('div[ref=details]')
    if(svgDown.getAttribute('class') != 'down'){
        svgDown.setAttribute('class', 'down')
        detailsDiv.classList.add('show')
        setTimeout(()=>detailsDiv.classList= ['origin-show'], 800)
    }
    else{
      svgDown.setAttribute('class', 'up')
      detailsDiv.classList.add('hide')
      setTimeout(()=>detailsDiv.classList=['origin-hide'], 700)

    }
  }

  render() {
    return html`
        <wired-card elevation="5">
          <div style="padding: 10px 20px;">
            <div style="display: grid; grid: auto/auto auto;align-items: center;">
              <h2>${this.item.word}</h2>
              <div style="display: flex; align-items: center; justify-self:end">
                <p> ${this.item.phonetic}</p>
                <svg xmlns="http://www.w3.org/2000/svg" onclick="javascript:new Audio('./mp3/${
                  this.item.word
                }.mp3').play()" class="ionicon" style="width:30px;cursor: pointer"  
                  viewBox="0 0 512 512"><title>Mic</title>
                  <path fill="none" stroke="cadetblue" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"></path>
                  <path stroke="cadetblue" d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>
                </svg>
                <!-- <a style="margin-left: 25px" href="#"><h3>例句</h3></a> -->
              </div>
              
            </div>
            ${this.item.explains.map(
              (explain) => html` <p style="color:#888">${explain}</p> `
            )}
            <div style="display:flex; justify-content:center">
                <svg @click=${
                  this._showDetails
                } xmlns="http://www.w3.org/2000/svg" class="ionicon" width="30px" style="cursor:pointer" viewBox="0 0 512 512"><title>Caret Down Circle</title><path d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-99.73-44L256 342.09 147.73 212z"/></svg>
              </div>
            <div ref="details" class="origin-hide">
              <div>
                <p style="margin: 0 auto">短语：</p>
                ${this.item.wordGroup.map(
                  (wg) => html`
                    <div class="wg">
                      <p>${wg}</p>
                    </div>
                  `
                )}
              </div>
              <hr></hr>
              <div>
                <p style="margin: 0 auto">例句：</p>
                ${this.item.sentences.map(
                  (ss) => html`
                    <div class="ss">
                      <p>${ss.en}</p>
                      <p>${ss.cn}</p>
                    </div>
                  `
                )}
              </div>
            </div>
          </div>
        </wired-card>
    `;
  }
}
