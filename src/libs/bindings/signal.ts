const signals: ((...args: unknown[]) => unknown)[] = [];
const beforeUpdates: ((...args: unknown[]) => unknown)[] = [];
const afterUpdates: ((...args: unknown[]) => unknown)[] = [];

export function addSignal(value: typeof signals[number]) {
  signals.push(value);
}

export function addBeforeUpdate(value: typeof beforeUpdates[number]) {
  beforeUpdates.push(value);
}

export function addAfterUpdate(value: typeof afterUpdates[number]) {
  afterUpdates.push(value);
}

export function callSignal(...args: unknown[]) {
  for (const bef of beforeUpdates) bef(...args);
  for (const sig of signals) sig(...args);
  for (const af of afterUpdates) af(...args);
}
