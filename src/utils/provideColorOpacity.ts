/** 
 * Make a color have the given opacity
* If you provide hex color or rgb(), returns rgba, else hsla() */
export function convertToColorWithOpacity(color: string, opacity: number) {
    const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return { r, g, b };
    };

    const rgbToRgba = (rgb: string, opacity: number): string => {
        const result = rgb.match(/\d+/g);
        if (result) {
            const [r, g, b] = result.map(Number);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return rgb;
    };

    const hslToHsla = (hsl: string, opacity: number): string => {
        return hsl.replace('hsl', 'hsla').replace(')', `, ${opacity})`);
    };

let colorWithOpacity:string;
    if (color.startsWith('#')) {
        const { r, g, b } = hexToRgb(color);
        colorWithOpacity =  `rgba(${r}, ${g}, ${b}, ${opacity})`;
    } else if (color.startsWith('rgb')) {
         colorWithOpacity =  rgbToRgba(color, opacity);
    } else if (color.startsWith('hsl')) {
        colorWithOpacity =  hslToHsla(color, opacity);
    } else {
        colorWithOpacity = color;
    }
    return colorWithOpacity
}

