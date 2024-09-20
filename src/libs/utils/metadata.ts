import { MetadataKey, MetadataValue } from "../constants/metadata";

export function defineMetadata<K extends MetadataKey, T extends object>(key: K, value: MetadataValue<K>, target: T) {
  return Reflect.defineMetadata(key, value, target);
}

export function getMetadata<K extends MetadataKey, T extends object>(key: K, target: T) {
  return Reflect.getMetadata(key, target) as MetadataValue<K> | undefined;
}

export function useMetadata<K extends MetadataKey, T extends object, V extends undefined | MetadataValue<K>>(key: K, target: T, defaultValue?: V) {
  let metadata = getMetadata(key, target);
  if (defaultValue && !metadata) {
    metadata = defaultValue;
    defineMetadata(key, metadata, target);
  }
  return metadata as V extends MetadataValue<K> ? MetadataValue<K> : MetadataValue<K> | undefined;
}
