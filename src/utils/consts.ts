import { isServer } from "@qwik.dev/core";
import { OpenCloseCharacter } from "./types";

/**
* get string "function"
* @example
import {FUNCTION} from "@qwikpen/utils";

console.log(FUNCTION); // "function"
*/
export const FUNCTION = "function";
/**
* get string "property"
* @example
import {PROPERTY} from "@qwikpen/utils";

console.log(PROPERTY); // "property"
*/
export const PROPERTY = "property";
/**
* get string "array"
* @example
import {ARRAY} from "@qwikpen/utils";

console.log(ARRAY); // "array"
*/
export const ARRAY = "array";
/**
* get string "object"
* @example
import {OBJECT} from "@qwikpen/utils";

console.log(OBJECT); // "object"
*/
export const OBJECT = "object";
/**
* get string "string"
* @example
import {STRING} from "@qwikpen/utils";

console.log(STRING); // "string"
*/
export const STRING = "string";
/**
* get string "number"
* @example
import {NUMBER} from "@qwikpen/utils";

console.log(NUMBER); // "number"
*/
export const NUMBER = "number";
/**
* get string "undefined"
* @example
import {UNDEFINED} from "@qwikpen/utils";

console.log(UNDEFINED); // "undefined"
*/
export const UNDEFINED = "undefined";

const CROSS_BROWSER_PREFIXES = ["webkit", "ms", "moz", "o"] as const;

/**
* Get a CSS property with a vendor prefix that supports cross browser.
* @function
* @param property - A CSS property
* @return CSS property with cross-browser vendor prefix
* @example
import {getCrossBrowserProperty} from "@qwikpen/utils";

console.log(getCrossBrowserProperty("transform")); // "transform", "-ms-transform", "-webkit-transform"
console.log(getCrossBrowserProperty("filter")); // "filter", "-webkit-filter"
*/
export const getCrossBrowserProperty = (
  property: keyof CSSStyleDeclaration,
): string => {
  if (isServer) {
    return "";
  }
  const styles = (document.body || document.documentElement).style;
  const length = CROSS_BROWSER_PREFIXES.length;

  if (typeof styles[property] !== UNDEFINED) {
    return property.toString();
  }
  for (let i = 0; i < length; ++i) {
    const name =
      `-${CROSS_BROWSER_PREFIXES[i]}-${property}` as keyof CSSStyleDeclaration;

    if (typeof styles[name] !== UNDEFINED) {
      return name.toString();
    }
  }
  return "";
};

/**
* get string "transfrom" with the vendor prefix.
* @memberof CrossBrowser
* @example
import {TRANSFORM} from "@qwikpen/utils";

console.log(TRANSFORM); // "transform", "-ms-transform", "-webkit-transform"
*/
export const TRANSFORM = getCrossBrowserProperty("transform");
/**
* get string "filter" with the vendor prefix.
* @memberof CrossBrowser
* @example
import {FILTER} from "@qwikpen/utils";

console.log(FILTER); // "filter", "-ms-filter", "-webkit-filter"
*/
export const FILTER = getCrossBrowserProperty("filter");
/**
* get string "animation" with the vendor prefix.
* @memberof CrossBrowser
* @example
import {ANIMATION} from "@qwikpen/utils";

console.log(ANIMATION); // "animation", "-ms-animation", "-webkit-animation"
*/
export const ANIMATION = getCrossBrowserProperty("animation");
/**
* get string "keyframes" with the vendor prefix.
* @memberof CrossBrowser
* @example
import {KEYFRAMES} from "@qwikpen/utils";

console.log(KEYFRAMES); // "keyframes", "-ms-keyframes", "-webkit-keyframes"
*/
export const KEYFRAMES = ANIMATION.replace("animation", "keyframes");

export const OPEN_CLOSED_CHARACTERS: OpenCloseCharacter[] = [
  { open: "(", close: ")" },
  { open: "[", close: "]" },
  { open: "{", close: "}" },
  { open: "<", close: ">" },
  { open: `"`, close: `"` },
  { open: `'`, close: `'` },
  { open: `\\"`, close: `\\"` },
  { open: `\\'`, close: `\\'` },
];
export const TINY_NUM = 0.0000001;
export const REVERSE_TINY_NUM = 1 / TINY_NUM;
