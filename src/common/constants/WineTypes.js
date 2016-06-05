export const WINE_TYPES = {
    RED: {
        label: 'Rouge',
        categories: ['REGULAR', 'SPARKLING', 'DRY'],
        color: '#9C27B0'
    },
    WHITE: {
        label: 'Blanc',
        categories: ['REGULAR', 'SPARKLING', 'LIQUOROUS', 'DRY'],
        color: '#CDDC39'
    },
    CHAMPAGNE: {
        label: 'Champagne',
        categories: ['BRUT', 'BLANC_DE_BLANCS', 'BLANC_DE_NOIRS', 'PINK'],
        color: '#9E9E9E'
    }
};

export const WINE_CATEGORIES = {
    REGULAR: {
        label: 'normal',
        image: '/textures/regular.jpg'
    },
    SPARKLING: {
        label: 'effervescent',
        image: '/textures/sparkling.jpg'
    },
    LIQUOROUS: {
        label: 'liquoreux',
        image: '/textures/liquorous.jpg'
    },
    SOFT: {
        label: 'moelleux',
        image: '/textures/soft.jpg'
    },
    DRY: {
        label: 'sec',
        image: '/textures/dry.jpg'
    },
    PINK: {
        label: 'rosé',
        image: '/textures/pink.jpg'
    },
    BRUT: {
        label: 'brut',
        image: '/textures/brut.jpg'
    },
    BLANC_DE_BLANCS: {
        label: 'blanc de blancs',
        image: '/textures/blanc_de_blancs.jpg'
    },
    BLANC_DE_NOIRS: {
        label: 'blanc de noirs',
        image: '/textures/blanc_de_noirs.jpg'
    }
};

export const DEFAULT_TYPE = 0;
export const DEFAULT_CATEGORY = 0;
