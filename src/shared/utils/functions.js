
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

export const getVideoEmbed = ( url ) => {
	if ( ! url ) return '';
	
	const ytMatch = url.match( /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/ );
	if ( ytMatch && ytMatch[ 1 ] ) {
		return `<iframe src="https://www.youtube.com/embed/${ ytMatch[ 1 ] }?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
	}

	const vimeoMatch = url.match( /vimeo\.com\/(?:video\/)?(\d+)/ );
	if ( vimeoMatch && vimeoMatch[ 1 ] ) {
		return `<iframe src="https://player.vimeo.com/video/${ vimeoMatch[ 1 ] }?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
	}

	return `<video src="${ url }" controls autoplay></video>`;
};