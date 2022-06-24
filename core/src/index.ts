import { Options,BYTE_UNITS,BIBYTE_UNITS,BIT_UNITS,BIBIT_UNITS } from "./type"

/**
 * Formats the given number using `Number#toLocaleString`.
 * - If locale is a string, the value is expected to be a locale-key (for example: `de`).
 * - If locale is true, the system default locale is used for translation.
 * - If no value for locale is specified, the number is returned unmodified.
 */
const toLocaleString = (number:number, locale:any, options?:Options):string => {
	let result:string = number.toString()
	if (typeof locale === 'string' || Array.isArray(locale)) {
		result = number.toLocaleString(locale, options)
	} else if (locale === true || options !== undefined) {
		result = number.toLocaleString(undefined, options)
	}
	return result
}

/**
 * Convert bytes to a human readable string: `1337` → `1.34 kB`.
 * @param number The number to format.
 * @param options The options to use.
 * @returns The formatted number.
 */
export default function conciseByte(number:number,options?:Options):string{
  if (!Number.isFinite(number)) {
		throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`)
	}
  options = {
		bits: false,
		binary: false,
		...options,
	}

  const UNITS = options.bits ? (options.binary ? BIBIT_UNITS : BIT_UNITS) : (options.binary ? BIBYTE_UNITS : BYTE_UNITS)

  if (options.signed && number === 0) {
		return ` 0 ${UNITS[0]}`
	}

  const isNegative = number < 0
	const prefix = isNegative ? '-' : (options.signed ? '+' : '')

  if (isNegative) { number = -number }

  let localeOptions

  if (options.minimumFractionDigits !== undefined) {
		localeOptions = {minimumFractionDigits: options.minimumFractionDigits}
	}

  if (options.maximumFractionDigits !== undefined) {
		localeOptions = {maximumFractionDigits: options.maximumFractionDigits, ...localeOptions}
	}

  if (number < 1) {
		const numberString = toLocaleString(number, options.locale, localeOptions)
		return prefix + numberString + ' ' + UNITS[0]
	}

  const exponent = Math.min(Math.floor(options.binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3), UNITS.length - 1)
	number /= (options.binary ? 1024 : 1000) ** exponent

  if (!localeOptions) {
		number = Number(number.toPrecision(3))
	}

  const numberString = toLocaleString(number, options.locale, localeOptions)

	const unit = UNITS[exponent]

	return prefix + numberString + ' ' + unit
}
