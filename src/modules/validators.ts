export default class Validators {
  constructor() {}

  /**
   * Converts a value to a number.
   * @param {any} value - The value to convert.
   * @returns {number} - The converted number or 0 if conversion fails.
   * @private
   */
  static #toNumber(value: string | number) {
    switch (typeof value) {
      case "string":
        return parseInt(value.replace(/[^\d.-]+/g, ""));

      case "number":
        return value;

      default:
        return 0;
    }
  }

  /**
   * Validates that a value is not empty.
   * @param {string} value - The value to validate.
   * @returns {object | undefined} - An error object if the value is empty; otherwise, undefined.
   */
  static required(value: string) {
    const status = value.trim() !== "";

    if (status) return;

    return { message: "This field is required and cannot be left blank." };
  }

  /**
   * Validates that a boolean value is true.
   * @param {boolean} value - The value to validate.
   * @returns {object | undefined} - An error object if the value is false; otherwise, undefined.
   */
  static requiredTrue(value: boolean) {
    if (value) return;

    return { message: "You must check this box to proceed." };
  }

  /**
   * Validates that a value matches a specified regular expression pattern.
   * @param {string} value - The value to validate.
   * @param {string} regex - The regex pattern to match against.
   * @returns {object | undefined} - An error object if the value does not match; otherwise, undefined.
   */
  static pattern(value: string, regex: string) {
    const regexPattern = new RegExp(regex);
    const status = regexPattern.test(value);

    if (status) return;

    return {
      message: "The input does not match the required format.",
      pattern: regex,
      value,
    };
  }

  /**
   * Validates that a numeric value is greater than or equal to a specified minimum.
   * @param {number|string} value - The value to validate.
   * @param {number} min - The minimum acceptable value.
   * @returns {object | undefined} - An error object if the value is less than min; otherwise, undefined.
   */
  static min(value: string | number, min: number) {
    const NUMBER = this.#toNumber(value);
    const status = NUMBER >= min;

    if (status) return;

    return {
      message: `The value must be greater than or equal to ${min}.`,
      min,
      value,
    };
  }

  /**
   * Validates that a numeric value is less than or equal to a specified maximum.
   * @param {number|string} value - The value to validate.
   * @param {number} max - The maximum acceptable value.
   * @returns {object | undefined} - An error object if the value is greater than max; otherwise, undefined.
   */
  static max(value: string | number, max: number) {
    const NUMBER = this.#toNumber(value);
    const status = NUMBER <= max;

    if (status) return;

    return {
      message: `The value must be less than or equal to ${max}.`,
      max,
      value,
    };
  }

  /**
   * Validates that the length of a string value is at least a specified minimum length.
   * @param {string} value - The value to validate.
   * @param {number} minLength - The minimum acceptable length.
   * @returns {object | undefined} - An error object if the length is less than minLength; otherwise, undefined.
   */
  static minLength(value: string, minLength: number) {
    const status = value.length >= minLength;

    if (status) return;

    return {
      message: `The input must be at least ${minLength} characters long.`,
      minLength,
      value,
    };
  }

  /**
   * Validates that the length of a string value does not exceed a specified maximum length.
   * @param {string} value - The value to validate.
   * @param {number} maxLength - The maximum acceptable length.
   * @returns {object | undefined} - An error object if the length exceeds maxLength; otherwise, undefined.
   */
  static maxLength(value: string, maxLength: number) {
    const status = value.length <= maxLength;

    if (status) return;

    return {
      message: `The input must not exceed ${maxLength} characters.`,
      maxLength,
      value,
    };
  }
}
