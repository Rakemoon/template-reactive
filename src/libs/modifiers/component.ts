/* eslint-disable @typescript-eslint/no-explicit-any */
import { callSignal } from "../bindings/signal";
import { MetadataKey } from "../constants/metadata";
import { defineMetadata, useMetadata } from "../utils/metadata";

const constructed = new Map<new (...args: unknown[]) => object, object>();

export default function component<T extends object>(target: new (...args: any[]) => T) {
  const states = useMetadata(MetadataKey.State, target.prototype, []);
  const exposed = useMetadata(MetadataKey.Expose, target.prototype, []);
  const newTarget = new Proxy(target, {
    construct(target, argArray) {
      if (constructed.has(target)) return constructed.get(target)!;
      const instance = new target(...argArray);
      const proxyInstance = new Proxy(instance, {
        set(target, p, newValue) {
          const result = Reflect.set(target, p, newValue);
          if (typeof p === "string" && states.includes(p)) {
            callSignal();
          };
          return result;
        },
      });
      defineMetadata(MetadataKey.Component, true, proxyInstance);
      constructed.set(target, proxyInstance);
      for (const ex of exposed) (instance[ex as never] as unknown) = (instance[ex as never] as () => 0).bind(proxyInstance);
      return proxyInstance;
    },
  }) as typeof target;

  defineMetadata(MetadataKey.Component, true, newTarget);
  return newTarget;
}
