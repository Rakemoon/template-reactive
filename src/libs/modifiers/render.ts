import { HTMLString } from "../bindings/html";
import { MetadataKey } from "../constants/metadata";
import { defineMetadata } from "../utils/metadata";
export default function render<T extends object>(target: T, key: PropertyKey, descriptor: TypedPropertyDescriptor<() => HTMLString>) {
  defineMetadata(MetadataKey.Render, key, target);
  return descriptor;
}
