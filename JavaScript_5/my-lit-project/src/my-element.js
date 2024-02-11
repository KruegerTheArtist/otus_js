import { LitElement, html, css } from 'lit';
import { myTree } from './data/my-tree';

class MyLeaf extends LitElement {
  static styles = css`
    .leaf {
      border: 1px rgb(8 119 1) solid;
      background: rgb(8 119 1);
      border-radius: 100vh;
      display: flex;
      align-items: center;
      width: 30px;
      height:30px;
      place-content: center;
    }
  `;

  static properties = {
    data: { type: Object },
  };

  render() {
    return html`
      <div class="leaf">${this.data.id}</div>
    `;
  }
}

customElements.define('my-leaf', MyLeaf);

class MyTree extends LitElement {
  static styles = css`
    .tree {
      padding: 10px; /* Example padding */
      display:flex;
    }
  `;

  static properties = {
    data: { type: Object },
  };

  renderTreeItems(items) {
    return html`
      <div class="tree">
        ${items?.map(item => html`
          <my-leaf .data=${item}></my-leaf>
          ${item?.items ? this.renderTreeItems(item?.items) : ''}
        `)}
      </div>
    `;
  }

  render() {
    return this.renderTreeItems(this.data?.items);
  }
}

customElements.define('my-tree', MyTree);

const myTreeElement = document.createElement('my-tree');
myTreeElement.data = myTree;
document.body.appendChild(myTreeElement);