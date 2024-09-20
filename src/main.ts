import "reflect-metadata";

import './style.css'
import { html } from "./libs/bindings/html";
import { addSignal, callSignal } from "./libs/bindings/signal";

import TodoList from "./components/TodoList";
import Counter from "./components/Counter";

const app = document.querySelector<HTMLDivElement>('#app')!;

addSignal(() => {
  app.innerHTML = html`
    ${TodoList}
    ${Counter}
  `;
});

callSignal();
