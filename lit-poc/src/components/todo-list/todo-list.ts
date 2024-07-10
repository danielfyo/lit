import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import todoStore, { ITodoItem, ITodoStore } from '../../store/todo';

@customElement('todo-list')
export class TodoList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
    }

    button {
      cursor: pointer;
      font-size: 1.25rem;
      color: rgb(var(--kemet-color-gray-300));
      display: inline-flex;
      border: 0;
      background: none;
    }
    
    p {
      text-align: center;
      width: 100%;
    }

    ul {
      display: flex;
      flex-direction: column;
      width: 96%;
      margin: 0 auto;
      padding: 0;
    }

    li {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1rem;
    }

    .close {
      font-size: 2rem;
    }

    .checked {
      opacity: 0.5;
      text-decoration: line-through;
    }
  `;

  @property()
  todoState: ITodoStore = todoStore.getInitialState();

  @property()
  todos: ITodoItem[] = this.todoState.todoList;

  constructor() {
    super();
    todoStore.subscribe(state => {
      this.todos = state.todoList;
    });
  }

  render() {
    return this.makeTodos();
  }

  makeTodos() {
    if (this.todos && this.todos.length > 0) {
      const todoList = this.todos.map((todo: ITodoItem, index) => html`
        <li>
          <button class="todo ${todo.checked ? 'checked' : ''}" @click=${() => this.handleChecked(index)}>${todo.value}</button>
          <button class="close" @click=${() => this.handleRemoveTodo(index)}>&times;</button>
        </li>
      `);
      return html`<ul>${todoList}</ul>`;
    }
    return html`<p>You haven't added any items yet.</p>`;
  }

  handleRemoveTodo(index: number) {
    this.todoState.removeTodo(index);
    this.requestUpdate(); // state has been modified by lodash, so re-render
  }

  handleChecked(index: number) {
    this.todoState.todoToggle(index);
    this.requestUpdate(); // state has been modified by lodash, so re-render
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-list': TodoList
  }
}
