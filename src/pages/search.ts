import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, state } from 'lit/decorators.js'
import { TrieNode, TrieTree } from '../utils/trie.js';
import axios from 'axios';
import {merge} from '../utils/promise'
import 'wired-elements/lib/wired-card.js';
import "../utils/vaadin.js";
import { TextField } from '../utils/vaadin.js';
import { addWord, clearWordNote, getAllWords, getWordDetails } from '../utils/fetchData.js';
import '../components/Suggest';
import '../components/WordCard';

@customElement('w-search')
export class Search extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .container{
        display: flex;
        justify-content: center;
      }
      .search{
        width: 80%;
        min-width: 380px;
        max-width: 600px;
        margin-top: 2%;
      }
      .btn_container{
        display: flex;
        justify-content: center;
        padding: 0 10px;
      }
      vaddin-button{
        width: 100%;
      }
    `
  ];

  @state()
  _trie = new TrieTree()

  @state()
  _inputValue = ""

  @state()
  _data = []

  @state()
  _show = false;

  empty = {word:'', phonetic:'',explains:[], sentences:[], wordGroup: []}

  @state()
  _showData = this.empty;

  protected async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    var list = await getAllWords();
    var tmp = new TrieTree()
    list.forEach(it=>tmp.insert(it, it))
    this._trie = tmp;
  }

  private async _onchange(e: Event) {
    var {value} = this.shadowRoot.getElementById("input") as TextField;

    let v = value;
    setTimeout(async ()=>{
      let {value} = this.shadowRoot.getElementById("input") as TextField;
      if(v==value) {
        this._inputValue = value;
        if(!value || value.length<2){
          this._data = [];
          return;
        }
        var res = this._trie.startsWith(value);
        res = res.splice(0, 5);
        var tmp  = res.map(it=>({word:it, explains:[]}));
        this._data = tmp;
        var data = await getWordDetails(res);
        if (this._data == tmp){
          this._data = data;
        }
      }
    }, 1000)

    
  }

  private async _onClickDetails(word){
    console.log(word)
    var data = await getWordDetails([word]);
    this._showData = data[0];
    this._show = true;
    console.log(JSON.stringify(this._showData))
  }

  private async _addWord(word){
    if (!localStorage.getItem('xyz')){
      alert("暂不支持")
      return
    }
    this.shadowRoot.querySelector("#btn").disabled = true;
    try{
      await addWord(word);
      this._show = false;
      this._showData = this.empty;
      clearWordNote();
      alert("插入成功");
    }catch(e){
      alert("插入失败请查看日志");
    }
    this.shadowRoot.querySelector("#btn").disabled = false;
  }

  render() {
    var msg = null
    if (this._inputValue.length == 0) {
      msg = `请输入要查询的单词`
    } else if  (this._inputValue.length < 2 ){
      msg = `请输入至少两个字母`
    } else if (this._data.length == 0){
      msg = "词库中没有该单词..."
    }
    return html`
    <div>
      <div class="container" style="min-height: 300px">
        <div class="search">
          <vaadin-text-field id='input' style="width: 100%" @input=${this._onchange} aria-label="search"  placeholder="Search" clear-button-visible>
            <vaadin-icon icon="vaadin:search" slot="prefix"></vaadin-icon>
          </vaadin-text-field>
          <w-suggest-card .msg=${msg} .data=${this._data} .clickItem=${this._onClickDetails.bind(this)}></w-suggest-card>
        </div>
      </div>
      <div class="container">
        <div  style="display: ${this._show? 'block': 'none'}">
          <w-word-card .item=${this._showData} ></w-word-card>
          <div class="btn_container">
            <vaadin-button  id="btn" style="width: 100%;" @click=${(e)=>this._addWord(this._showData.word)}>ADD</vaadin-button>
          </div>
        </div>
      </div>
    </div>`;
  }
}
