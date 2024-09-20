/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataKey } from "../constants/metadata";
import { useMetadata } from "../utils/metadata";

export default function bind<T extends object>(target: T, key: PropertyKey, descriptor: TypedPropertyDescriptor<(...args: any[]) => unknown>) {
  const exposed = useMetadata(MetadataKey.Expose, target, []);
  exposed.push(key);
  return descriptor;
}
