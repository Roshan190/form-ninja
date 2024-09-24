import { generateError, hideError, showError } from "./services/error.js";
import { isVisible } from "./services/helper.js";
import { generateValue } from "./services/value.js";

export default class FormNinja {
  form = document.createElement("form");
  errors = {}; // Holds validation errors for each field.
  validations = {}; // Stores custom validation rules.

  constructor(query, config) {
    this.initialize(query, config);
  }

  /**
   * Initializes the form by selecting the form element and setting up validations.
   * @param {string} query - The selector for the form element.
   * @param {object} config - Configuration object containing validation rules.
   */
  initialize(query, config) {
    const FORM_ELEMENT = document.querySelector(query);

    // Ensure the selected element is a valid HTML element.
    if (!(FORM_ELEMENT instanceof HTMLElement)) {
      throw new TypeError(
        "Expected a valid DOM element but got undefined or invalid."
      );
    }

    this.form = FORM_ELEMENT; // Assign the selected form element.

    // If config is provided, set the validations.
    if (config) {
      this.validations = config.validate || {};
    }
  }

  /**
   * Resets all form fields to their initial values.
   */
  reset() {
    this.fields.forEach((field) => {
      this.resetField(field);
    });
  }

  /**
   * Resets the value of a single form field.
   * @param {string|HTMLElement} control - The name of the form field or the field element to reset.
   */
  resetField(control) {
    let field;

    // Check if control is a string (field name) and get the corresponding field element
    if (typeof control === "string") {
      field = this.getField(control);
    }
    // If control is an HTMLElement, use it directly
    else if (control instanceof HTMLElement) {
      field = control;
    }

    // Exit early if the field is not found
    if (!field) return;

    // Reset field value and dataset value if available
    field.value = "";

    const dataset = field.dataset;

    if (dataset) {
      dataset.value = "";
    }

    // Hide error for the specified field
    hideError({
      controlName: dataset.controlName,
      form: this.form,
    });
  }

  /**
   * Sets the value of a specific form field.
   * @param {string} name - The name of the form field to update.
   * @param {*} value - The new value for the form field.
   * @param {Object} [config] - Optional configuration for setting the value.
   * @param {boolean} [config.shouldValidate=false] - If true, the form should be validated after setting the value.
   */
  setValue(name, value, config = {}) {
    const field = this.getField(name);

    // Exit early if the field is not found
    if (!field) return;

    // Set the field value
    field.value = value;

    const dataset = field.dataset;

    if (dataset) {
      dataset.value = value;
    }

    // Validate the field if shouldValidate is true
    if (config.shouldValidate) {
      this.validateField(field);
    }
  }

  /**
   * Updates multiple form fields with the provided values.
   * @param {Object} values - Key-value pairs representing the form field names and their new values.
   * @param {Object} [config] - Optional configuration object for updating the form (e.g., validation or UI options).
   */
  update(values, config) {
    for (const controlName in values) {
      this.setValue(controlName, values[controlName], config);
    }
  }

  /**
   * Retrieves all fields in the form that have a data-control-name attribute.
   * @returns {NodeList} - A NodeList of field elements.
   */
  get fields() {
    return this.form.querySelectorAll("[data-control-name]");
  }

  /**
   * Gets a specific form field by its control name.
   * @param {string} controlName - The name of the control to retrieve.
   * @returns {HTMLElement | undefined} - The field DOM element or undefined if not found.
   */
  getField(controlName) {
    const fieldDOM = this.form.querySelector(
      `[data-control-name="${controlName}"]`
    );

    // Return undefined if the field is not found.
    if (!fieldDOM) return;

    return fieldDOM;
  }

  /**
   * Retrieves the current value(s) of the form.
   * If a control name is provided, returns the value of that specific field;
   * otherwise, returns an object containing all form field values.
   * @param {string} [controlName] - The name of the specific field to retrieve (optional).
   * @returns {object} - An object representing the form values, or the value of a specific field.
   */
  getValues(controlName = null) {
    if (controlName) {
      const field = this.getField(controlName);

      // Exit early if the field is not found
      if (!field) return;

      return generateValue({ field, form: this.form });
    }

    const values = {};
    this.fields.forEach((field) => {
      const dataset = field.dataset;

      values[dataset.controlName] = generateValue({ field, form: this.form });
    });

    return values;
  }

  /**
   * Returns whether the form is valid.
   */
  get isValid() {
    for (const field of this.fields) {
      if (field.classList.contains("rf-invalid")) {
        return false; // Return early if an invalid field is found
      }
    }
    return true; // All fields are valid
  }

  /**
   * Validates all fields in the form.
   * Iterates over each field and calls validateField on it.
   */
  validate() {
    this.fields.forEach((field) => {
      this.validateField(field); // Validate each field.
    });
  }

  /**
   * Validates a specific form field element.
   * This function performs validation on the given field and returns a Promise.
   * @param {HTMLElement} field - The form field element to validate.
   * @returns {Promise} - A Promise that resolves if the field is valid or rejects with validation errors.
   */
  validateField(field) {
    // Get dataset attributes and field value
    const { dataset = {} } = field;
    let value = generateValue({ field, form: this.form });

    // Check if the field is disabled or hidden
    const isFieldDisabledOrHidden =
      field.disabled || dataset.disabled === "true" || !isVisible(field);

    // If the field is disabled or hidden, clear any existing errors and skip validation
    if (isFieldDisabledOrHidden) {
      hideError({ controlName: dataset.controlName, form: this.form });
      return;
    }

    // Generate any validation errors
    const error = generateError({
      dataset,
      validations: this.validations,
      value,
    });

    // Show or hide the error based on validation result
    if (error) {
      showError({
        message: error.message,
        controlName: dataset.controlName,
        form: this.form,
      });
    } else {
      hideError({ controlName: dataset.controlName, form: this.form });
    }
  }

  /**
   * Triggers form validation.
   * If a control name is provided, it validates only that specific field;
   * otherwise, it validates the entire form.
   * @param {string} controlName - The name of the control to validate (optional).
   * @returns {Promise} - A Promise that resolves or rejects based on validation results.
   */
  trigger(controlName = null) {
    if (controlName) {
      const field = this.getField(controlName);

      // If the field is not found, exit early.
      if (!field) return;

      return this.validateField(field); // Validate the specific field.
    } else {
      return this.validate(); // Validate the entire form.
    }
  }
}
