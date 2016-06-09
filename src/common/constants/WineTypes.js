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
        label: 'normal'
    },
    SPARKLING: {
        label: 'effervescent'
    },
    LIQUOROUS: {
        label: 'liquoreux'
    },
    SOFT: {
        label: 'moelleux'
    },
    DRY: {
        label: 'sec'
    },
    PINK: {
        label: 'rosé'
    },
    BRUT: {
        label: 'brut'
    },
    BLANC_DE_BLANCS: {
        label: 'blanc de blancs'
    },
    BLANC_DE_NOIRS: {
        label: 'blanc de noirs'
    }
};

export const DEFAULT_TYPE = 0;
export const DEFAULT_CATEGORY = 0;
