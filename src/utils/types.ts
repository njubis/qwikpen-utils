export type DOMTargetType = HTMLElement | Element | Document;

export interface IArrayFormat<T> {
  length: number;
  [index: number]: T;
}

export type IObject<T> = Record<string, T>;

export interface IEventMap
  extends ElementEventMap,
    HTMLElementEventMap,
    SVGElementEventMap,
    HTMLMediaElementEventMap,
    HTMLBodyElementEventMap {
  [name: string]: Event;
}

export interface OpenCloseCharacter {
  open: string;
  close: string;
  ignore?: RegExp;
}

export interface SplitOptions {
  separator?: string;
  isSeparateFirst?: boolean;
  isSeparateOnlyOpenClose?: boolean;
  isSeparateOpenClose?: boolean;
  openCloseCharacters?: OpenCloseCharacter[];
}

export type FlattedElement<T> = T extends any[] ? never : T;
