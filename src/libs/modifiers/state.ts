import { MetadataKey } from "../constants/metadata";
import { useMetadata } from "../utils/metadata";

export default function state<K extends string>(target: object, key: K) {
  const states = useMetadata(MetadataKey.State, target, []);
  states.push(key);
}
