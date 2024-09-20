<img src="https://media.discordapp.net/attachments/1245762013075083431/1286748741335781399/BPJS.png?ex=66ef09a6&is=66edb826&hm=0b3749134464819cdc9af31c4dac7865bd26ce9d76c577f01d88e8cab8704d6b&=&format=webp&quality=lossless&width=306&height=280" alt="logo"/>

<h1>template-reactive</h1>

> [!CAUTION]
> This project is heavily Work In Progress. if you have some feature request or bugs please let me know.

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
