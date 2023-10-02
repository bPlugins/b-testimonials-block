
import { star } from './icons';

export const getStar = (value, color) => {
    let rating = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= value) {
            rating.push(
                star(color)
            );
        } else {
            rating.push(
                star('#ccc')
            );
        }
    }
    return rating;
}

const defaultTheme = {
    padding: { top: "10px", right: "15px", bottom: "10px", left: "15px" },
    image: { width: "70", height: "70" },
    imgBorder: { width: "1px", style: "solid", color: "#C6C6C652", radius: '50%' },

}

export const checkTheme = (val, border) => {

    if (val === 'default') {
        return defaultTheme;
    }

    if (val === 'theme_1') {
        return {
            ...defaultTheme,
            image: { width: "70", height: "70" },
            imgBorder: { width: border?.width, style: border?.style, color: border?.color, side: "all", radius: "50%" }
        }
    }

    if (val === 'theme_2') {
        return {
            ...defaultTheme,
            expandedColors: { bg: "#fbfbfb00" }
        }
    }

    if (val === 'theme_3') {
        return defaultTheme;
    }

    if (val === 'theme_4') {
        return {
            ...defaultTheme,
            padding: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
            image: { width: "70", height: "70" },
            quoteIcon: { size: 23 }
        }
    }

    if (val === 'theme_5') {
        return {
            ...defaultTheme,
            imgBorder: { width: "4px", style: "solid", color: "#C6C6C652", radius: '1px' },
            quoteIcon: { size: 15 },

        }
    }
}

export const htmlTagsStrip = (str) => {

    return str.replace(/(<([^>]+)>)/ig, '');
}