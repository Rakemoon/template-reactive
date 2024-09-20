import { MetadataKey } from "../constants/metadata";
import { getMetadata } from "../utils/metadata";
import { addBeforeUpdate } from "./signal";

export type HTMLString = "[Redacted] THIS IS HTML STRING [Redacted]";

Reflect.set(globalThis, "FunctionCollection", []);
let funCollection = Reflect.get(globalThis, "FunctionCollection") as ((el: unknown) => unknown)[];

function componentBindings(item: unknown) {
  const instance: object = typeof item === "function" ? new (item as unknown as new () => object)() : item as never;
  const trackProp = getMetadata(MetadataKey.Render, instance);
  if (!trackProp) throw new ReferenceError(`@track function is missing for ${(item as { name: string }).name}`);
  const fn = Reflect.get(instance, trackProp) as () => HTMLString;
  const result = fn.call(instance);
  return result;
}

function funCollectionBindings(item: typeof funCollection[number]) {
  if (!funCollection.includes(item)) funCollection.push(item);
  const index = funCollection.indexOf(item);
  return `"FunctionCollection[${index}](this, arguments[0])"`;
}

function check(item: unknown) {
  if (typeof item !== "object" && typeof item !== "function") return item;
  const isComponent = getMetadata(MetadataKey.Component, item as never);
  switch (true) {
    case isComponent: return componentBindings(item as never);
    case typeof item === "function": return funCollectionBindings(item as never);
    default: return item;
  }
}

export function html(str: TemplateStringsArray, ...subs: unknown[]) {
  return str.map((x, i) => x.trim() + (check(subs[i]) ?? "")).join("") as HTMLString;
}

addBeforeUpdate(() => {
  Reflect.set(globalThis, "FunctionCollection", []);
  funCollection = Reflect.get(globalThis, "FunctionCollection") as ((el: unknown) => unknown)[];
});
