import { LitElement, html, css, PropertyDeclarations } from "lit";
import { customElement, property, state } from "lit/decorators.js";
// import { applyTheme } from 'Frontend/generated/theme';
import "../utils/vaadin.js";
import avatar from '../assets/biliavatar.jpg';

@customElement("w-layout")
export class Layout extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    // applyTheme(root);
    return root;
  }

  @property()
  pathes = [];

  @state()
  navs = []
 
  static get styles() {
    return css`
      h1 {
        font-size: 20px;
        margin: 5px 0;
      }

      vaadin-icon {
        box-sizing: border-box;
        margin-inline-end: var(--lumo-space-m);
        margin-inline-start: var(--lumo-space-xs);
        padding: var(--lumo-space-xs);
      }

      a {
        height: 20px;
        font-size: 15px;
        margin: 5px 0;
      }

      .d {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      #main{
        padding: 10px;
      }
      .flex{
        height: 100%;
        display: flex;
        flex-direction: column;
        
      }
      .bottom{
        display: flex;
        flex-direction: column;
        justify-content: end;
        height: calc(100vh - 200px);
      }
    `;
  }

  render() {
    return html`
      <vaadin-app-layout style="height: 100%">
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar">单词本</h1>

        <!--左侧tab栏，分别与path绑定-->
        <vaadin-tabs slot="drawer" orientation="vertical" class="flex">
          <vaadin-tab>
            <a href='${this.pathes[0]}' aria-selected=${location.pathname == '/'} tabindex="-1">
              <vaadin-icon icon="vaadin:records"></vaadin-icon>
              <span>我的生词本</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a  href="${this.pathes[1]}"  aria-selected=${location.pathname == '/search'} tabindex="-1">
              <vaadin-icon icon="vaadin:search"></vaadin-icon>
              <span>查询与录入</span>
            </a>
          </vaadin-tab>
          <!--下方放一个头像和作者署名-->
          <div class='bottom'>
            <div style="display: flex; margin-left: 18px">
              <vaadin-avatar
                .img="${avatar}"
              >
              </vaadin-avatar>
              <div style="display: flex; flex-direction: column; justify-content: center; padding: 0 10px">作者: frank</div>
            </div>
          </div>
        </vaadin-tabs>
        <!--右侧的主要面板区域用来放置页面内容-->
        <slot></slot>
      </vaadin-app-layout>
    `;
  }
}
