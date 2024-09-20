import { component, bind, render, state } from "../libs/modifiers";
import { html } from "../libs/bindings/html";

@component
export default class Counter {

  // defining props
  public constructor(
    private title: string = "Counter"
  ) { }

  @state private count = 0;

  @bind private increment() {
    this.count++;
  }

  @render protected exec() {

    return html`
      <div>
        <h2>${this.title}</h2>
        <button onclick=${this.increment}>
          ${this.count}
        </button>
      </div>
    `;
  }
}