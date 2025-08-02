import { isSignal, type Signal } from "@builder.io/qwik";
import { DOMTargetType } from "./types";

export const getTargetElement = <T extends DOMTargetType>(
  target: T | Signal<T>,
) => {
  let targetElement: T;
  if (isSignal(target)) {
    targetElement = target.value;
  } else {
    targetElement = target;
  }

  return targetElement;
};
