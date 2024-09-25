import { BUILT_IN_VALIDATORS } from "../constants/index.js";
import Validators from "../modules/validators.js";

/**
 * Generates an error object based on the provided dataset and validations.
 * @param {object} dataset - Contains data attributes provided from HTML.
 * @param {object} validations - Contains custom validation functions that have been registered.
 * @param {any} value - Represents any input value provided by the user.
 * @returns {object | null} - Returns an object with an error message, or null if there are no errors.
 */
export function generateError({ dataset, validations, value }) {
  for (const validator in dataset) {
    const attributeValue = dataset[validator];

    // Check if the validator is a built-in validator
    if (BUILT_IN_VALIDATORS.includes(validator)) {
      const error = Validators[validator](value, attributeValue);

      if (error) {
        // Use a custom error message if provided
        const customErrorMessage = dataset[validator + "Message"];
        if (customErrorMessage) {
          error.message = customErrorMessage;
        }
        return error; // Return the generated error
      }
    }
    // Check if the validator is a custom validation
    else if (validator in validations) {
      const error = validations[validator](value, attributeValue);

      if (error) {
        // Use a custom error message if provided
        const customErrorMessage = dataset[validator + "Message"];
        if (customErrorMessage) {
          error.message = customErrorMessage;
        }
        return error; // Return the generated error
      }
    }
  }

  return null; // No errors found
}

/**
 * Displays an error message for a specific form field.
 * Finds the error message element associated with the given control name
 * and updates its content with the provided error message.
 * @param {string} message - The error message to display.
 * @param {string} controlName - The name of the form field to display the error for.
 * @param {HTMLElement} form - The form element that contains the field.
 */
export function showError({ message, controlName, form }) {
  // Select the error message element associated with the control name

  try {
    addInvalidClass({ controlName, form });
    const errorMessagePara = form.querySelector(
      `[error-message='${controlName}']`
    );

    // If no error message element is found, exit early
    if (!errorMessagePara) return;

    // Update the error message content
    errorMessagePara.innerHTML = message;
  } catch (error) {
    console.error("error", error);
  }
}

/**
 * Hides the error message for a specific form field.
 * Clears the content of the error message element associated with the given control name.
 * @param {string} controlName - The name of the form field to hide the error message for.
 * @param {HTMLElement} form - The form element that contains the field.
 */
export function hideError({ controlName, form }) {
  try {
    removeInvalidClass({ controlName, form });

    // Select the error message element associated with the control name
    const errorMessagePara = form.querySelector(
      `[error-message='${controlName}']`
    );

    // If no error message element is found, exit early
    if (!errorMessagePara) return;

    // Clear the error message content
    errorMessagePara.innerHTML = "";
  } catch (error) {
    console.error("error", error);
  }
}

export function addInvalidClass({ controlName, form }) {
  const formGroupDOM = form.querySelector(`[form-group='${controlName}']`);
  const fieldControlEL = form.querySelector(
    `[data-control-name='${controlName}']`
  );

  if (formGroupDOM) {
    formGroupDOM.classList.add("rf-invalid");
  }

  if (fieldControlEL) {
    fieldControlEL.classList.add("rf-invalid");
  }
}

export function removeInvalidClass({ controlName, form }) {
  const formGroupDOM = form.querySelector(`[form-group='${controlName}']`);
  const fieldControlEL = form.querySelector(
    `[data-control-name='${controlName}']`
  );

  if (formGroupDOM) {
    formGroupDOM.classList.remove("rf-invalid");
  }

  if (fieldControlEL) {
    fieldControlEL.classList.remove("rf-invalid");
  }
}
