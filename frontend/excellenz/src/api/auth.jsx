export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

const joinUrl = (path) => `${API_BASE_URL}${path}`

// ENDPOINTS

// Auth
export const AUTH = joinUrl('/api/auth/')
export const REGISTER = joinUrl('/api/auth/register/')
export const LOGIN = joinUrl('/api/auth/login/')
export const ME = joinUrl('/api/auth/me/')
export const SETTINGS = joinUrl('/api/auth/settings/')
export const CHANGE_PASSWORD = joinUrl('/api/auth/change-password/')


// Company

export const COMPANY = joinUrl('/api/companies/')
export const CAPITAL = joinUrl('/api/companies/capital/')
export const GOAL = joinUrl('/api/companies/goal/')


// Finance
export const FINANCE = joinUrl('/api/finance/')
export const TRANSACTION = joinUrl('/api/finance/transactions/')
export const INVESTMENT = joinUrl('/api/finance/investments/')
export const COST_ITEMS = joinUrl('/api/finance/cost-items/')
export const TAX_RESERVE = joinUrl('/api/finance/tax-reserve/')
export const LIQUIDITY_SUMMARY = joinUrl('/api/finance/liquidity-summary/')
export const FORECAST = joinUrl("/api/finance/forecast/");

// Products
export const PRODUCTS = joinUrl('/api/finance/products/')
export const SALES = joinUrl('/api/finance/transactions/')