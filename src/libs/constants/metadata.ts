export const enum MetadataKey {
  Component = "component:metadata",
  Render = "render:metadata",
  State = "state:metadata",
  Expose = "expose:metadata",
}

export type MetadataValue<T extends MetadataKey> = {
  [MetadataKey.Component]: boolean;
  [MetadataKey.Render]: PropertyKey;
  [MetadataKey.State]: string[];
  [MetadataKey.Expose]: PropertyKey[];
}[T];
