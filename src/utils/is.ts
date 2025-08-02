/* eslint-disable @typescript-eslint/no-explicit-any */
import { UNDEFINED, OBJECT, STRING, NUMBER, FUNCTION } from "./consts";

/**
* Check the type that the value is undefined.
* @param  value - Value to check the type
* @return true if the type is correct, false otherwise
* @example
import {isUndefined} from "@qwikpen/utils";

console.log(isUndefined(undefined)); // true
console.log(isUndefined("")); // false
console.log(isUndefined(1)); // false
console.log(isUndefined(null)); // false
*/
export function isUndefined(value: unknown): value is undefined {
  return typeof value === UNDEFINED;
}
/**
* Check the type that the value is object.
* @param  value - Value to check the type
* @return true if the type is correct, false otherwise
* @example
import {isObject} from "@qwikpen/utils";

console.log(isObject({})); // true
console.log(isObject(undefined)); // false
console.log(isObject("")); // false
console.log(isObject(null)); // false
*/
export function isObject(value: any): value is object {
  return value && typeof value === OBJECT;
}
/**
* Check the type that the value is isArray.
* @param value - Value to check the type
* @return true if the type is correct, false otherwise
* @example
import {isArray} from "@qwikpen/utils";

console.log(isArray([])); // true
console.log(isArray({})); // false
console.log(isArray(undefined)); // false
console.log(isArray(null)); // false
*/
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}
/**
* Check the type that the value is string.
* @param value - Value to check the type
* @return true if the type is correct, false otherwise
* @example
import {isString} from "@qwikpen/utils";

console.log(isString("1234")); // true
console.log(isString(undefined)); // false
console.log(isString(1)); // false
console.log(isString(null)); // false
*/
export function isString(value: any): value is string {
  return typeof value === STRING;
}

export function isNumber(value: any): value is number {
  return typeof value === NUMBER;
}

/**
* Check the type that the value is function.
* @param value - Value to check the type
* @return true if the type is correct, false otherwise
* @example
import {isFunction} from "@qwikpen/utils";

console.log(isFunction(function a() {})); // true
console.log(isFunction(() => {})); // true
console.log(isFunction("1234")); // false
console.log(isFunction(1)); // false
console.log(isFunction(null)); // false
*/
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === FUNCTION;
}

export function isEqualSeparator(character: string, separator: string) {
  const isCharacterSpace = character === "" || character == " ";
  const isSeparatorSpace = separator === "" || separator == " ";

  return (isSeparatorSpace && isCharacterSpace) || character === separator;
}

export function isWindow(val: any): val is Window {
  return val && "postMessage" in val && "blur" in val && "self" in val;
}

export function isNode(el?: any): el is Node {
  return (
    isObject(el) &&
    // @ts-expect-error - Property 'nodeName' does not exist on type 'object'
    el.nodeName &&
    // @ts-expect-error - Property 'nodeName' does not exist on type 'object'
    el.nodeType &&
    "parentNode" in el &&
    "ownerDocument" in el
  );
}
