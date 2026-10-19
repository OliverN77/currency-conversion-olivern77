/**
 * Fixed exchange rates relative to 1 USD (Base Currency)
 */
const EXCHANGE_RATES = {
    USD: 1.0,     // US Dollar
    EUR: 0.92,    // Euro
    COP: 4200.0,  // Colombian Peso
    MXN: 19.8,    // Mexican Peso
    GBP: 0.77,    // British Pound
    BRL: 5.65,    // Brazilian Real
    ARS: 980.0,   // Argentine Peso
    JPY: 150.0,   // Japanese Yen
};

/**
 * Returns an array of supported currency codes.
 * @returns {string[]} Supported currency codes
 */
function getSupportedCurrencies() {
    return Object.keys(EXCHANGE_RATES);
}

/**
 * Converts an amount from one currency to another.
 * @param {number} amount - The amount of money to convert
 * @param {string} fromCurrency - Source currency code (e.g., 'USD')
 * @param {string} toCurrency - Target currency code (e.g., 'COP')
 * @returns {number} Converted amount rounded to 2 decimal places
 */
function convertCurrency(amount, fromCurrency, toCurrency) {
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
        throw new Error('Amount must be a valid non-negative number.');
    }

    const from = String(fromCurrency).toUpperCase().trim();
    const to = String(toCurrency).toUpperCase().trim();

    if (!EXCHANGE_RATES[from]) {
        throw new Error(`Unsupported source currency: ${from}. Supported: ${getSupportedCurrencies().join(', ')}`);
    }

    if (!EXCHANGE_RATES[to]) {
        throw new Error(`Unsupported target currency: ${to}. Supported: ${getSupportedCurrencies().join(', ')}`);
    }

    // Convert to base currency (USD) first, then to target currency
    const amountInUSD = amount / EXCHANGE_RATES[from];
    const convertedAmount = amountInUSD * EXCHANGE_RATES[to];

    return Number(convertedAmount.toFixed(2));
}

/**
 * Converts and formats a currency conversion into a readable string.
 * @param {number} amount - The amount of money to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {string} Formatted result string
 */
function formatConversion(amount, fromCurrency, toCurrency) {
    const from = String(fromCurrency).toUpperCase().trim();
    const to = String(toCurrency).toUpperCase().trim();
    const result = convertCurrency(amount, from, to);

    return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${from} = ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}`;
}

// Export functions and rates for package usage
module.exports = {
    EXCHANGE_RATES,
    getSupportedCurrencies,
    convertCurrency,
    formatConversion,
};