import { html, css, LitElement } from "lit";
import { Layout } from "./layout";
import { WordCard } from "../components/word-card";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';


export class CurWeek extends LitElement {
  
  static styles = css`w-word-card{width: 33%}`


  static properties = {data:{type: Array}};

  createRenderRoot() {
    return this;
  }
  constructor() {
    super();
    this.data = []
  }

  async firstUpdated() {
    await fetch(`/dict/blame.json`)
      .then(r => r.json())
      .then(data => {
        this.data = [...this.data, data];
      });
    await fetch(`/dict/accrue.json`)
      .then(r => r.json())
      .then(data => {
        this.data = [...this.data, data];
      });
      await fetch(`/dict/blame.json`)
      .then(r => r.json())
      .then(data => {
        this.data = [...this.data, data];
      });
    await fetch(`/dict/accrue.json`)
      .then(r => r.json())
      .then(data => {
        this.data = [...this.data, data];
      });
      await fetch(`/dict/blame.json`)
      .then(r => r.json())
      .then(data => {
        this.data = [...this.data, data];
      });
    await fetch(`/dict/accrue.json`)
      .then(r => r.json())
      .then(data => {
        this.data = [...this.data, data];
      });
  }


  render() {
    let data = this.data;
    console.log(data)
    console.log()
    return html`<w-layout>
      <div class='flex flex-wrap content-start justify-between'>
        ${data.map(w=>html`<w-word-card word=${JSON.stringify(w)} style="width:33%;" class='content-start  my-2'></w-word-card>`)}
      </div>
    </w-layout>`
  }

}

customElements.define("w-cur-week", CurWeek);
