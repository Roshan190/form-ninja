# Form Ninja

[![npm version](https://img.shields.io/npm/v/form-ninja.svg)](https://www.npmjs.com/package/form-ninja)
[![license](https://img.shields.io/npm/l/form-ninja.svg)](https://www.npmjs.com/package/form-ninja)

Form Ninja is a lightweight, easy-to-use JavaScript library for validating forms quickly and efficiently. It provides customizable validation methods to handle common form validation tasks without any complex configuration.

## Features

- 🔥 **Fast and Efficient**: Validates forms instantly with minimal overhead.
- 🎯 **Easy to Use**: Simple API for validating forms, designed for quick integration.
- 🔌 **Customizable**: Add custom validation rules and error messages as needed.
- 🌐 **Flexible**: Works with any form structure and fields.
- 📦 **Lightweight**: No external dependencies or bloat.

## Installation

To install via npm:

```bash
npm install form-ninja
```

Or using yarn:

```bash
yarn add form-ninja
```

### Browser

#### Script tag

To install latest version

```html
<script src="https://cdn.jsdelivr.net/npm/form-ninja/dist/form-ninja.min.js"></script>
```

To install specific version
example - `https://cdn.jsdelivr.net/npm/form-ninja@1.0.5/dist/form-ninja.min.js`

```html
<script src="https://cdn.jsdelivr.net/npm/form-ninja@ <-version-> /dist/form-ninja.min.js"></script>
```

## Usage

Import the `FormNinja` and use it to validate your form fields.

```js
import { FormNinja } from "form-ninja";

// Initialize the form validator with fields and rules
const form = new FormNinja("#user-form");

const USER_FORM = document.getElementById("user-form");

USER_FORM.addEventListener("submit", (e) => {
  form.trigger();

  if (form.isValid) {
    alert("Form submitted successfully");
  }
});
```

```html
<form id="user-form">
  <div form-group="fullName">
    <label for="fullNameId">Enter your name</label>
    <input
      type="text"
      placeholder="Enter your full name"
      name="fullName"
      id="fullNameId"
      data-required
      data-required-message="Name can not be empty."
      data-control-name="fullName"
      data-pattern="^[a-zA-Z]+(?: [a-zA-Z]+)+$"
    />
    <p style="color: red" error-message="name"></p>
  </div>

  <button type="submit">Submit</button>
</form>
```

### Custom Validation Rules

You can also add your own custom validation rules.

```js
// Validates if the provided value is a valid date.
function isValidDate(value) {
  const date = new Date(value);

  const status = date instanceof Date && !isNaN(date);

  if (status) return;

  // If the date is invalid, return an error message and the invalid value
  return { message: "Please enter a valid date.", value };
}

const userForm = new FormNinja("#user-form", {
  validate: {
    // Add the isValidDate validator to the validation rules
    isValidDate,
  },
});
```

```html
<div class="form-group">
  <label for="disclaimer">Enter Date of Birth</label>
  <input
    type="text"
    name="dateOfBirth"
    id="dateOfBirthId"
    data-control-name="dateOfBirth"
    data-required
    data-is-valid-date
  />
  <p style="color: red" error-message="dateOfBirth"></p>
</div>
```

### Built-in Validation Rules

- **required**: Validates that a value is not empty.
- **pattern**: Validates that a value matches a specified regular expression pattern.
- **min**: Validates that a numeric value is greater than or equal to a specified minimum.
- **max**: Validates that a numeric value is less than or equal to a specified maximum.
- **minLength**: Validates that the length of a string value is at least a specified minimum length.
- **maxLength**: Validates that the length of a string value does not exceed a specified maximum length.
- **custom**: Add your custom validation logic.

## API

### `FormNinja(query, config)`

- **query**: The selector for the form element.
- **config**: Configuration object containing validation rules.

### `.reset()`

- Resets all form fields to their initial values.

### `.resetField(control: string | Element)`

- Resets the value of a single form field.
- **control**: The name of the form field or the field element to reset.

### `setValueConfig`

The `SetValueConfig` type is an object used in the `setValue` method to determine whether to validate the field after setting its value.

```typescript
export type SetValueConfig = {
  shouldValidate: boolean;
};
```

### `.setValue(name: string, value: any, config: SetValueConfig)`

- Sets the value of a specific form field.
- **name**: The name of the form field to update.
- **value**: The new value for the form field.
- **config**: Optional configuration for setting the value. If `shouldValidate` is `true`, the field will be validated after setting the value.

### `.update(values: { [key: string]: any }, config: SetValueConfig)`

- Updates multiple form fields with the provided values.
- **values**: Key-value pairs representing the form field names and their new values.
- **config**: Optional configuration object for updating the form (e.g., validation or UI options).

### `.getValues(controlName: string | null = null)`

- Retrieves the current value(s) of the form.
- If a control name is provided, returns the value of that specific field; otherwise, returns an object containing all form field values.

### `.get isValid()`

- Returns whether the form is valid.

### `.trigger(controlName: string | null = null)`

- Triggers form validation.
- If a control name is provided, it validates only that specific field; otherwise, it validates the entire form.
- Returns a Promise that resolves or rejects based on validation results.

## Example with HTML Form

```html
<form id="user-form">
  <div form-group="fullName">
    <label for="fullNameId">Enter your name</label>
    <input
      type="text"
      placeholder="Enter your full name"
      name="fullName"
      id="fullNameId"
      data-required
      data-required-message="Name can not be empty."
      data-control-name="fullName"
      data-pattern="^[a-zA-Z]+(?: [a-zA-Z]+)+$"
    />
    <p style="color: red" error-message="name"></p>
  </div>

  <div>
    <label for="email">Enter your email</label>
    <input
      type="email"
      placeholder="Enter your email"
      name="email"
      id="email"
      data-required
      data-control-name="email"
      data-pattern="^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$"
    />
    <p style="color: red" error-message="email"></p>
  </div>

  <div>
    <label for="email">Enter your date of birth</label>
    <input
      type="text"
      placeholder="Enter your date of birth"
      name="dateOfBirth"
      id="dateOfBirthId"
      data-control-name="dateOfBirth"
      data-required
      data-is-valid-date
    />
    <p style="color: red" error-message="dateOfBirth"></p>
  </div>

  <div>
    <p>Please select the gender</p>
    <div>
      <label>
        Male
        <input
          type="radio"
          class="form-control"
          name="gender"
          data-control-name="gender"
          data-required
          value="male"
        />
      </label>

      <label>
        Female
        <input type="radio" class="form-control" name="gender" value="female" />
      </label>
    </div>

    <p style="color: red" error-message="gender"></p>
  </div>

  <div>
    <label for="disclaimer">Please select the disclaimer</label>
    <input
      type="checkbox"
      name="disclaimer"
      id="disclaimerId"
      data-control-name="disclaimer"
      data-required-true
    />

    <p style="color: red" error-message="disclaimer"></p>
  </div>

  <button type="submit">Submit</button>
</form>

<script>
  function isValidDate(value) {
    const date = new Date(value);

    const status = d instanceof Date && !isNaN(date);

    if (status) return;

    return { message: "Please enter valid date.", value };
  }

  const form = new FormNinja("#user-form", {
    validate: {
      isValidDate,
    },
  });

  const USER_FORM = document.getElementById("user-form");

  USER_FORM.addEventListener("submit", (e) => {
    form.trigger();

    if (form.isValid) {
      alert("Form submitted successfully!");
    } else {
      alert("Form has errors. Please correct them.");
    }
  });
</script>
```

## Contributing

Contributions are welcome! If you find a bug or want to improve the library, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
