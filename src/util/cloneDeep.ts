/* For simplicity sake, just use json technique for now.
 * `lodash.clonedeep` is a good candidate, if needed. */
export default function cloneDeep<T>(element: T): T {
  const asString = JSON.stringify(element);
  return JSON.parse(asString) as T;
}
