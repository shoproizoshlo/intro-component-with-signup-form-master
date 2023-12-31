// creating function that get form selector
const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  // items in array have object and 3 properties
  const validationOptions = [
    // check if value pass minlength
    {
      attribute: "minlength",
      isValid: (input) =>
        input.value && input.value.length >= parseInt(input.minLength),
      errorMessage: (input, label) =>
        `${label.textContent} needs to be at least ${input.minLength} characters`,
    },
    // check if value pass email
    {
      attribute: "pattern",
      isValid: (input) => {
        const patternRegex = new RegExp(input.pattern);
        return patternRegex.test(input.value);
      },
      errorMessage: (input, label) => `Looks like this is not an email`,
    },

    // check if value pass required
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input, label) => `${label.textContent} cannot be empty`,
    },
  ];

  const validateSingleFormGroup = (formGroup) => {
    // select input, label, error img and error class
    const input = formGroup.querySelector("input, textarea");
    const label = formGroup.querySelector("label");
    const errorContainer = formGroup.querySelector(".error");
    const errorIcon = formGroup.querySelector(".error-icon");

    //   set no error to the input
    let formGroupError = false;
    // validation rules that loop through then check the input egainst each of rules and trigger right error message
    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);
        errorContainer.style.display = "block";
        //   add red border around input
        input.classList.add("border-danger-subtle");
        input.style.margin = "0";
        //   add error icon into input
        errorIcon.classList.remove("hidden");
        //   add error to the input
        formGroupError = true;
      }
    }
    //   remove error border and icon from input if here is no error
    if (!formGroupError) {
      input.classList.remove("border-danger-subtle");
      errorIcon.classList.add("hidden");
      errorContainer.textContent = "";
    }
  };

  // disabling HTML standart validation
  formElement.setAttribute("novalidate", "");

  //adding our validation
  formElement.addEventListener("submit", (event) => {
    // prevent page reload after submit
    event.preventDefault();
    // go to validation all inputs
    validateAllFormGroups(formElement);
  });

  // validate all inputs
  const validateAllFormGroups = (formToValidate) => {
    //   create array from all inputs
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".formGroup")
    );

    //   loop through array
    formGroups.forEach((formGroup) => {
      validateSingleFormGroup(formGroup);
    });
  };
};

// select form id
validateForm("#registrationForm");
