export interface RemToPxOptions {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number;
}

/**
 * @see https://unocss.dev/presets/rem-to-px
 */
export const remToPx = (
  remVal: string | number,
  options: RemToPxOptions = {},
) => {
  const remRegex = /(-?[.\d]+)rem/g;
  const { baseFontSize = 16 } = options;
  const val = typeof remVal === "string" ? remVal : `${remVal}rem`;
  if (remRegex.test(val)) {
    return `${Number(val.replace(remRegex, "")) * baseFontSize}px`;
  } else {
    throw new Error("Could not convert " + val + " to px");
  }
};
