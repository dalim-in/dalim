export const isProduction = process.env.NODE_ENV === 'production'

export const APP_URL = isProduction ? 'https://dalim.in' : 'http://localhost:3000'

export const UI_URL = isProduction ? 'https://ui.dalim.in' : 'http://localhost:3001'

export const AGENCY_URL = isProduction ? 'https://agency.dalim.in' : 'http://localhost:3002'

export const WORKS_URL = isProduction ? 'https://works.dalim.in' : 'http://localhost:3003'

export const LEARN_URL = isProduction ? 'https://works.dalim.in' : 'http://localhost:3004'

export const FONTS_URL = isProduction ? 'https://fonts.dalim.in' : 'http://localhost:3005'

export const GRAPHIC_URL = isProduction ? 'https://graphic.dalim.in' : 'http://localhost:3006'

export const TRUSTED_ORIGINS = [APP_URL, AGENCY_URL, UI_URL, WORKS_URL, LEARN_URL, FONTS_URL, GRAPHIC_URL]

export const DALIM_URL = APP_URL
