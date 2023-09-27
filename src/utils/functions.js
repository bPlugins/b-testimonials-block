
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

const defaultGrid = {
    padding: { top: "10px", right: "15px", bottom: "10px", left: "15px" },
    image: { width: "70", height: "70" },
    imgBorder: { width: "1px", style: "solid", color: "#C6C6C652", radius: '50%' },

}

export const checkGrid = (val, border) => {

    if (val === 'default') {
        return defaultGrid;
    }

    if (val === 'grid_1') {
        return {
            ...defaultGrid,
            image: { width: "70", height: "70" },
            imgBorder: { width: border?.width, style: border?.style, color: border?.color, side: "all", radius: "50%" }
        }
    }

    if (val === 'grid_2') {
        return {
            ...defaultGrid,
            expandedColors: { bg: "#fbfbfb00" }
        }
    }

    if (val === 'grid_3') {
        return defaultGrid;
    }

    if (val === 'grid_4') {
        return {
            ...defaultGrid,
            padding: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
            image: { width: "70", height: "70" },
            quoteIcon: { size: 23 }
        }
    }

    if (val === 'grid_5') {
        return {
            ...defaultGrid,
            imgBorder: { width: "4px", style: "solid", color: "#C6C6C652", radius: '1px' },
            quoteIcon: { size: 15 },

        }
    }
}
