# Currency Conversion (`currency-conversion`)

Un paquete ligero para Node.js que permite realizar conversiones entre distintas divisas de forma rápida y sencilla, utilizando el dólar estadounidense (`USD`) como moneda base.

## Instalación

Instala el paquete mediante **npm**:

```bash
npm install currency-conversion
```

---

## Uso Rápido

### CommonJS (`require`)

```javascript
const {
  convertCurrency,
  formatConversion,
  getSupportedCurrencies,
  EXCHANGE_RATES,
} = require('currency-conversion');

// 1. Convertir un monto numérico (redondeado a 2 decimales)
const totalCop = convertCurrency(100, 'USD', 'COP');
console.log(totalCop); // 420000

// 2. Obtener la conversión formateada como texto
const resultado = formatConversion(50, 'EUR', 'USD');
console.log(resultado); // "50.00 EUR = 54.35 USD"

// 3. Listar todas las monedas soportadas
console.log(getSupportedCurrencies());
// ['USD', 'EUR', 'COP', 'MXN', 'GBP', 'BRL', 'ARS', 'JPY']

// 4. Consultar la tasa base de una moneda específica
console.log(EXCHANGE_RATES.COP); // 4200
```

### ES Modules (`import`)

```javascript
import { convertCurrency, formatConversion } from 'currency-conversion';

console.log(convertCurrency(200, 'USD', 'MXN')); // 3960
console.log(formatConversion(1000, 'MXN', 'EUR')); // "1,000.00 MXN = 46.46 EUR"
```

---

## Monedas Soportadas

| Código | Moneda | Tasa (1 USD) |
| :--- | :--- | :--- |
| `USD` | Dólar Estadounidense | `1.00` |
| `EUR` | Euro | `0.92` |
| `COP` | Peso Colombiano | `4200.00` |
| `MXN` | Peso Mexicano | `19.80` |
| `GBP` | Libra Esterlina | `0.77` |
| `BRL` | Real Brasileño | `5.65` |
| `ARS` | Peso Argentino | `980.00` |
| `JPY` | Yen Japonés | `150.00` |

---

## API

### `convertCurrency(amount, fromCurrency, toCurrency)`
Convierte un monto numérico de una divisa a otra.
- **`amount`** (`number`): Cantidad de dinero a convertir (mayor o igual a `0`).
- **`fromCurrency`** (`string`): Código de la moneda de origen (ej. `'USD'`, `'eur'`).
- **`toCurrency`** (`string`): Código de la moneda de destino (ej. `'COP'`, `'mxn'`).
- **Retorna** (`number`): Monto convertido redondeado a 2 decimales.

### `formatConversion(amount, fromCurrency, toCurrency)`
Realiza la conversión y devuelve una cadena de texto formateada con separadores de miles y dos decimales.
- **Retorna** (`string`): Ejemplo `"100.00 USD = 420,000.00 COP"`.

### `getSupportedCurrencies()`
Devuelve un arreglo con los códigos de todas las divisas disponibles.
- **Retorna** (`string[]`): `['USD', 'EUR', 'COP', 'MXN', 'GBP', 'BRL', 'ARS', 'JPY']`.

### `EXCHANGE_RATES`
Objeto constante que contiene las tasas de cambio relativas a `1 USD`.

---

## Manejo de Errores

El paquete valida los parámetros de entrada y lanza un `Error` descriptivo cuando:
- El monto (`amount`) es negativo o no es un número válido.
- La moneda de origen o destino no está soportada.

```javascript
const { convertCurrency } = require('currency-conversion');

try {
  convertCurrency(100, 'USD', 'CLP');
} catch (error) {
  console.error(error.message);
  // Unsupported target currency: CLP. Supported: USD, EUR, COP, MXN, GBP, BRL, ARS, JPY
}
```

---

## Licencia

MIT
