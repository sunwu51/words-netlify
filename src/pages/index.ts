import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js'
import 'wired-elements/lib/wired-card.js';
import { getAllLearningWords, getWordDetails } from '../utils/fetchData';
import moment from 'moment';
import '../components/WordCard';

@customElement('w-index')
export class Index extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
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
        <w-word-card .item=${item}></w-word-card>
      `)}
    `)} 
  </div>`;
  }
}
