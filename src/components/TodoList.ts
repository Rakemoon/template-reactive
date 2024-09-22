import { html } from "#bpjs/bindings/html";
import { bind, component, render, state } from "#bpjs/modifiers";

type TodoListItem = {
  title: string;
  timestamp: number;
}

@component
export default class TodoList {
  @state private list: TodoListItem[] = [];

  @bind private add(title: string) {
    this.list = [...this.list, {
      timestamp: Date.now(),
      title
    }];
  }

  @bind private delete(timestamp: number) {
    this.list = this.list.filter(x => x.timestamp !== timestamp);
  }

  @bind private onKeyDown(el: HTMLInputElement, ev: KeyboardEvent) {
    switch (ev.key) {
      case "Enter": return this.add(el.value);
      default: return;
    }
  }

  @render protected exec() {
    const lists = this.list.map(x =>
      html`
        <li>
          <span>${x.title}</span>
          <button onclick=${() => this.delete(x.timestamp)}>delete</button>
        </li>
      `).join("");

    return html`
      <div>Todo List</div>
      <input type="text"
        onkeydown=${this.onKeyDown} />
      <ul>
        ${lists}
      </ul>
    `;
  }
}
