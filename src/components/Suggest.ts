import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("w-suggest-card")
export class SuggestCard extends LitElement {
  static styles = [
    css`
      
      .search {
        width: 80%;
        min-width: 380px;
        margin-top: 2%;
      }

      li:hover {
        color: #ffffff;
        background: #999;
        border-radius: 5px;
      }
      .lidetail {
        display: none;
      }
      li {
        cursor: pointer;
      }
      li:hover .lidetail {
        display: block;
      }
      li:hover .liex {
        display: none;
      }
      li:hover .lidetail p {
        margin: 3px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      li:hover > div {
        display: flex;
        flex-direction: column;
      }

      .suggest {
        width: 100%;
        background-color: rgb(245, 248, 253);
        border-radius: 6px;
        margin-top: 0px;
        border: solid aliceblue;
      }
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        list-style: none;
        padding: 5px 30px;
      }
      li > div {
        display: flex;
        justify-content: space-between;
      }
      li > div > .liex {
        max-width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];

  @property()
  msg = null;


  @property()
  data = []

  @property()
  clickItem=(w)=>{console.log('click ' + w)}


  render() {
    return html`
      <div class="suggest">
        <ul id="ul">
          ${this.msg
            ? html`<p style="padding: 0px 30px;">${this.msg}</p>`
            : this.data.map(
                (data) =>
                  html`<li @click=${()=>this.clickItem(data.word)}>
                    <div>
                      <div class="liword">${data.word}</div>
                      <div class="liex">${data.explains.join(";")}</div>
                      <div class="lidetail">
                        ${data.explains.map((ex) => html`<p>${ex}</p>`)}
                      </div>
                    </div>
                  </li>`
              )}
        </ul>
      </div>
    `;
  }
}
