import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js'
import 'wired-elements/lib/wired-card.js';
import { getAllLearningWords, getWordDetails } from '../utils/fetchData';
import moment from 'moment';

@customElement('w-index')
export class Index extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
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
    `
  ];

  @state()
  _data = []

  protected async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
    var learningWords =  await getAllLearningWords();
    var allLearningWordsStr = [];
    learningWords.forEach(it=>{ 
      allLearningWordsStr = [...allLearningWordsStr, ...it.list];
    })
    // 把所有单词本单词查一遍意思，存到缓存中
    var explains = await getWordDetails(allLearningWordsStr);
    explains = explains.filter(it => it)
    var explainsMap = {}
    explains.forEach(it=>explainsMap[it.word] = it);

    this._data = learningWords.reverse().map(it => {
      var [monday, sunday] = this._getDays(it.id);
      return {
        monday, sunday,
        list: it.list.map(item=>explainsMap[item]).filter(a=>a)
      }
    })
    console.log(this._data)
  }

  private _getDays(mondayStr): Array<String> {
    return [mondayStr, moment(new Date(mondayStr)).weekday(6).format('YYYY-MM-DD')]
  }
  render() {
    return html`<div>
    ${this._data.map(it=>html`
      <h1>${it.monday}-${it.sunday}</h1>
      <!-- <vaadin-button theme="primary">vad</vaadin-button> -->
      ${it.list.map(item=>html`
        <wired-card elevation="5" style="margin: 10px; width: 400px">
          <div style="padding: 10px 20px;">
            <div style="display: grid; grid: auto/auto auto;align-items: center;">
              <h2>${item.word}</h2>
              <div style="display: flex; align-items: center; justify-self:end">
                <p> ${item.phonetic}</p>
                <svg xmlns="http://www.w3.org/2000/svg" onclick="javascript:new Audio('./mp3/${item.word}.mp3').play()" class="ionicon" style="width:30px;cursor: pointer"  
                  viewBox="0 0 512 512"><title>Mic</title>
                  <path fill="none" stroke="cadetblue" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"></path>
                  <path stroke="cadetblue" d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>
                </svg>
                <!-- <a style="margin-left: 25px" href="#"><h3>例句</h3></a> -->
              </div>
              
            </div>
            ${item.explains.map(explain=>html`
              <p style="color:#888">${explain}</p>
            `)}
            <div style="display:flex; justify-content:center">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" width="30px" style="cursor:pointer" viewBox="0 0 512 512"><title>Caret Down Circle</title><path d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-99.73-44L256 342.09 147.73 212z"/></svg>
              </div>
            <div>
              <div>
                <p style="margin: 0 auto">短语：</p>
                ${item.wordGroup.map(wg=>html`
                  <div class="wg">
                    <p>${wg}</p>
                  </div>
                `)}
              </div>
              <hr></hr>
              <div>
                <p style="margin: 0 auto">例句：</p>
                ${item.sentences.map(ss=>html`
                  <div class="ss">
                    <p>${ss.en}</p>
                    <p>${ss.cn}</p>
                  </div>
                `)}
              </div>
            </div>
          </div>
        </wired-card>
      `)}
    `)} 
  </div>`;
  }
}
