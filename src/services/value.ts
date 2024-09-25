/**
 * Retrieves the value of the selected radio button from a group.
 * @param {object} params - Object containing the form element and the control name.
 * @param {HTMLFormElement} params.form - The form element that contains the radio button group.
 * @param {string} params.controlName - The name attribute of the radio button group.
 * @returns {string} - The value of the selected radio button, or an empty string if none is selected.
 */
function getRadioValue({
  form,
  controlName,
}: {
  form: HTMLFormElement;
  controlName: string;
}) {
  const selectedRadioInput = form.querySelector(
    `[name=${controlName}]:checked`
  ) as HTMLFormElement;

  return selectedRadioInput?.value || ""; // Return selected radio value or an empty string if not selected
}

/**
 * Retrieves the value(s) of selected checkboxes from a group.
 * @param {object} params - Object containing the form element and the control name.
 * @param {HTMLFormElement} params.form - The form element that contains the checkboxes.
 * @param {string} params.controlName - The name attribute of the checkbox group.
 * @returns {Array|string|boolean} - An array of selected checkbox values, true if at least one checkbox is selected without values, or false if none are selected.
 */
function getCheckboxValue({
  form,
  controlName,
}: {
  form: HTMLFormElement;
  controlName: string;
}) {
  const selectedCheckboxInputs = form.querySelectorAll(
    `[name=${controlName}]:checked`
  ) as NodeListOf<HTMLFormElement>;

  if (!selectedCheckboxInputs.length) return false; // Return false if no checkboxes are selected

  const values = Array.from(selectedCheckboxInputs).map((i) =>
    i.getAttribute("value") ? i.value : true
  ); // Collect selected values

  return values.length ? values : true; // Return array of values, or true if there are no specific values
}

/**
 * Retrieves the files selected in a file input field.
 * @param {object} params - Object containing the form element and the control name.
 * @param {HTMLFormElement} params.form - The form element that contains the file input.
 * @param {string} params.controlName - The data-control-name attribute of the file input field.
 * @returns {FileList} - A list of selected files.
 */
function getFiles({
  form,
  controlName,
}: {
  form: HTMLFormElement;
  controlName: string;
}) {
  const fileInput = form.querySelector(
    `[data-control-name=${controlName}]`
  ) as HTMLFormElement;

  return fileInput.files; // Return the list of selected files
}

/**
 * Generates the appropriate value for a given form field based on its type.
 * @param {object} params - Object containing the form field element and the form element.
 * @param {HTMLElement} params.field - The specific form field element.
 * @param {HTMLFormElement} params.form - The form element that contains the field.
 * @returns {string|Array|FileList|boolean} - The value of the form field, depending on its type (radio, checkbox, file, or other types).
 */
export function generateValue({
  field,
  form,
}: {
  field: HTMLFormElement;
  form: HTMLFormElement;
}) {
  const { controlName } = field.dataset; // Extract control name from the dataset

  if (!controlName) return;

  switch (field.type) {
    case "radio":
      return getRadioValue({ form, controlName: controlName }); // Return selected radio value

    case "checkbox":
      return getCheckboxValue({ form, controlName: controlName }); // Return selected checkbox value(s)

    case "file":
      return getFiles({ form, controlName }); // Return selected files

    default:
      return field.value || field.dataset.value || ""; // Return field value or dataset value, or an empty string if neither exists
  }
}
