import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import todoStore, { ITodoStore } from './store/todo';

import 'kemet-ui/dist/components/kemet-button/kemet-button';
import './components/todo-input/todo-input';
import './components/todo-list/todo-list';

@customElement('todo-app')
export class TodoApp extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      padding: 1rem;
    }

    h1 {
      margin: 1rem 0;
      line-height: 1.5;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    kemet-card {
      --kemet-card-background-color: rgb(var(--kemet-color-gray-900));
      --kemet-card-border: 0;
      --kemet-card-max-width: 960px;
      --kemet-card-footer-border-top: 1px solid rgb(var(--kemet-color-gray-800));
      --kemet-card-color: rgb(var(--kemet-color-gray-300));
      --kemet-card-border-radius: 1rem;
    
      display: flex;
      gap: 1rem;
      width: 100%;
    }

    @media screen and (min-width: 720px) {
      kemet-card {
        width: 66vw;
      }
    }

    kemet-button {
      --kemet-button-padding: 0.6rem 0.75rem;
    }

    todo-list {
      min-height: 240px;
    }
  `;

  @property()
  todoState: ITodoStore = todoStore.getInitialState();

  @property()
  numberOfItems: number = this.todoState.todoList.length;

  constructor() {
    super();
    todoStore.subscribe((state) => {
      this.numberOfItems = state.todoList.length;
    });
  }

  render() {
    return html`
      <h1>Todo App with Lit + Zustand</h1>
      <kemet-card>
        <todo-input label="Add"></todo-input>
        <todo-list></todo-list>
        <footer slot="footer">
          <span>Number of Items: ${this.numberOfItems}</span>
          <kemet-button variant="rounded" @click=${() => this.handleClearAll()}>Clear All</kemet-button>
        </footer>
      </kemet-card>
    `
  }

  handleClearAll() {
    this.todoState.removeTodoAll();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp
  }
}
