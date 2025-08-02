import { isServer } from "@qwik.dev/core";
import { getTargetElement } from "./dom";
import { DOMTargetType } from "./types";

export const checkIfAllInShadowDocument = (
  targets: DOMTargetType[],
): boolean => {
  return targets.every((item) => {
    const targetElement = getTargetElement(item);
    if (!targetElement) return false;
    if (targetElement.getRootNode() instanceof ShadowRoot) return true;
    return false;
  });
};

export const getShadowDocument = (node?: Node) => {
  if (isServer) return undefined;
  if (!node) {
    return document;
  }
  return node.getRootNode();
};

export const getDocumentOrShadow = (
  target: DOMTargetType | DOMTargetType[],
) => {
  if (isServer) return undefined;
  if (!target || !document.getRootNode) {
    return document;
  }
  const targets = Array.isArray(target) ? target : [target];
  if (checkIfAllInShadowDocument(targets)) {
    return getShadowDocument(getTargetElement(targets[0]));
  }
  return document;
};
