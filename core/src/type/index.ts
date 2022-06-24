export interface Options {
  /**
   * Include plus sign for positive numbers.
   * If the difference is exactly zero a space character will be prepended instead for better alignment.
   * @default false
   */
  readonly signed?: boolean

  /**
   * - If `false`: Output won't be localized.
   * - If `true`: Localize the output using the system/browser locale.
   * - If `string`: Expects a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)
   * - If `string[]`: Expects a list of [BCP 47 language tags](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)
   * @default false
   */
  readonly locale?: boolean | string | readonly string[]

  /**
   * Format the number as [bits](https://en.wikipedia.org/wiki/Bit) instead of [bytes](https://en.wikipedia.org/wiki/Byte).
   * This can be useful when, for example, referring to [bit rate](https://en.wikipedia.org/wiki/Bit_rate).
   * @default false
   */
  readonly bits?: boolean

  /**
   * Format the number using the [Binary Prefix](https://en.wikipedia.org/wiki/Binary_prefix) instead of the [SI Prefix](https://en.wikipedia.org/wiki/SI_prefix).
   * This can be useful for presenting memory amounts. However, this should not be used for presenting file sizes.
   * @default false
   */
  readonly binary?: boolean

  /**
   * The minimum number of fraction digits to display.
   * If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.
   * @default undefined
   */
  readonly minimumFractionDigits?: number

  /**
   * The maximum number of fraction digits to display.
   * If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.
   * @default undefined
   */
  readonly maximumFractionDigits?: number
}

export const BYTE_UNITS = ['B','kB','MB','GB','TB','PB','EB','ZB','YB']

export const BIBYTE_UNITS = ['B','kiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB']

export const BIT_UNITS = ['b','kbit','Mbit','Gbit','Tbit','Pbit','Ebit','Zbit','Ybit']

export const BIBIT_UNITS = ['b','kibit','Mibit','Gibit','Tibit','Pibit','Eibit','Zibit','Yibit']
