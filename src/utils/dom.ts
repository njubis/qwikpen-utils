import { Signal, isServer, isSignal } from "@qwik.dev/core";
import { DOMTargetType, IEventMap } from "./types";

/**
* Checks if the specified class value exists in the element's class attribute.
* @param element - target
* @param className - the class name to search
* @return return false if the class is not found.
* @example
import {hasClass} from "@qwikpen/utils";

console.log(hasClass(element, "start")); // true or false
*/
export function hasClass(
  element: Element | Signal<Element>,
  className: string,
): boolean {
  const target = isSignal(element) ? element.value : element;
  if (isServer) return false;
  if (target.classList) {
    return target.classList.contains(className);
  }
  return !!target.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

/**
* Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
* @param element - target
* @param className - the class name to add
* @example
import {addClass} from "@qwikpen/utils";

addClass(element, "start");
*/
export function addClass(
  element: Element | Signal<Element>,
  className: string,
) {
  const target = isSignal(element) ? element.value : element;
  if (isServer) return false;
  if (target.classList) {
    target.classList.add(className);
  } else {
    target.className += ` ${className}`;
  }
}

/**
* Removes the specified class value.
* @param element - target
* @param className - the class name to remove
* @example
import {removeClass} from "@qwikpen/utils";

removeClass(element, "start");
*/
export function removeClass(
  element: Element | Signal<Element>,
  className: string,
) {
  const target = isSignal(element) ? element.value : element;
  if (isServer) return false;
  if (target.classList) {
    target.classList.remove(className);
  } else {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);

    target.className = target.className.replace(reg, " ");
  }
}

/**
* Gets the CSS properties from the element.
* @param elements - elements
* @param properites - the CSS properties
* @return returns CSS properties and values.
* @example
import {fromCSS} from "@qwikpen/utils";

console.log(fromCSS(element, ["left", "opacity", "top"])); // {"left": "10px", "opacity": 1, "top": "10px"}
*/
export function fromCSS(
  elements: Element | Signal<Element> | Element[] | NodeListOf<Element>,
  properties: (keyof CSSStyleDeclaration)[],
) {
  if (isServer) return {};
  const target = isSignal(elements) ? elements.value : elements;
  if (!target || !properties || !properties.length) {
    return {};
  }
  let element;

  if (target instanceof Element) {
    element = target;
  } else if (target.length) {
    element = target[0];
  } else {
    return {};
  }
  const cssObject: CSSStyleDeclaration = {} as CSSStyleDeclaration;
  const styles = getWindow(element)?.getComputedStyle(element);
  const length = properties.length;

  for (let i = 0; i < length; ++i) {
    const prop = properties[i];
    if (prop !== "length" && prop !== "parentRule") {
      // @ts-expect-error - undefined issues
      cssObject[prop] = styles?.[prop];
    }
  }
  return cssObject;
}

export function addEvent<K extends keyof IEventMap>(
  el: EventTarget,
  type: K,
  listener: (e: IEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;
/**
* Sets up a function that will be called whenever the specified event is delivered to the target
* @param - event target
* @param - A case-sensitive string representing the event type to listen for.
* @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
* @param - An options object that specifies characteristics about the event listener.
* @example
import {addEvent} from "@qwikpen/utils";

addEvent(el, "click", e => {
  console.log(e);
});
*/
export function addEvent(
  el: EventTarget,
  type: string,
  listener: (e: Event) => void,
  options?: boolean | AddEventListenerOptions,
) {
  el.addEventListener(type, listener, options);
}

export function removeEvent<K extends keyof IEventMap>(
  el: EventTarget,
  type: K,
  listener: (e: IEventMap[K]) => void,
  options?: boolean | EventListenerOptions,
): void;
/**
* removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
* @param - event target
* @param - A case-sensitive string representing the event type to listen for.
* @param - The EventListener function of the event handler to remove from the event target.
* @param - An options object that specifies characteristics about the event listener.
* @example
import {addEvent, removeEvent} from "@qwikpen/utils";
const listener = e => {
  console.log(e);
};
addEvent(el, "click", listener);
removeEvent(el, "click", listener);
*/
export function removeEvent(
  el: EventTarget,
  type: string,
  listener: (e: Event) => void,
  options?: boolean | EventListenerOptions,
) {
  el.removeEventListener(type, listener, options);
}

export function getDocument(el?: Node) {
  return isServer ? undefined : el?.ownerDocument || document;
}

export function getDocumentElement(el?: Node) {
  return isServer ? undefined : getDocument(el)?.documentElement;
}

export function getDocumentBody(el?: Node) {
  return isServer ? undefined : getDocument(el)?.body;
}

export function getWindow(el?: Node) {
  return isServer ? undefined : el?.ownerDocument?.defaultView || window;
}

export function getTargetElement<T extends DOMTargetType = Element>(
  target: T | Signal<T>,
) {
  let targetElement: T;
  if (isSignal(target)) {
    targetElement = target.value;
  } else {
    targetElement = target;
  }

  return targetElement;
}
