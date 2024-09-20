<h1>template-reactive</h1>

> [!CAUTION]
> This project is heavily Work In Progress. if you have some feature request or bugs please let me know.

example

```ts

import { component, bind, render, state } from "../libs/modifiers";
import { html } from "../libs/bindings/html";

@component // mark this class as a component
export default class Counter {

  // @state decorator make this property reactive
  @state private count = 0;

  // @bind to connect method with reactive property
  @bind private increment() {
    this.count++;
  }

  // @render to mark method as main function for exposing DOM
  @render protected exec() {

    return html`
      <div>
        <button onclick=${this.increment}>
          ${this.count}
        </button>
      </div>
    `;
  }
}
```
