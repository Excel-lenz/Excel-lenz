const BASE_URL = 'http://127.0.0.1' // localhost
const PORT = '8000' // backend default port

// ENDPOINTS

// Auth
const AUTH = BASE_URL + ':' + PORT + '/api/auth/'
export const REGISTER = AUTH + 'register/'
export const LOGIN = AUTH + 'login/'
export const ME = AUTH + 'me/' // most likely for test purposes

