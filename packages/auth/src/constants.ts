export const isProduction = process.env.NODE_ENV === 'production'

export const APP_URL = isProduction ? 'https://dalim.in' : 'http://localhost:3000'

export const UI_URL = isProduction ? 'https://ui.dalim.in' : 'http://localhost:3001'

export const AGENCY_URL = isProduction ? 'https://agency.dalim.in' : 'http://localhost:3002'

export const TRUSTED_ORIGINS = [APP_URL, AGENCY_URL, UI_URL]

export const BETTER_AUTH_URL = APP_URL
