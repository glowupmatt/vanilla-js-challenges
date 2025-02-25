function createForm($rootEl, { inputs }, watcher) {
  function init() {
    inputs.forEach((inputObj, index) => {
      const { type, label } = inputObj;
      const inputContainer = document.createElement("div");
      inputContainer.id = type;
      inputContainer.classList.add("input-container");

      const inputLabel = document.createElement("label");
      inputLabel.id = label;
      inputLabel.htmlFor = label;
      inputLabel.textContent = label;

      const input = document.createElement("input");
      input.id = label;
      input.type = type;
      input.name = label;
      input.value = inputObj.value;

      input.required = true;
      if (input.type === "password") {
        input.minLength = 6;
      }

      inputContainer.append(inputLabel, input);
      $rootEl.append(inputContainer);
    });
    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit";
    $rootEl.append(submitButton);
  }
  function update() {
    const existingErrors = document.querySelectorAll(".error");
    existingErrors.forEach((error) => error.remove());

    inputs.forEach(({ label, type }, index) => {
      // Get error by label instead of type since that's what we use in setErrors
      const error = watcher.errors.get(label);
      if (error) {
        // Get container by label since that's what we used as ID
        const inputContainer = document.getElementById(label);
        if (inputContainer) {
          const errorTag = document.createElement("p");
          errorTag.innerText = error.message;
          errorTag.classList.add("error");
          inputContainer.append(errorTag);
        }
      }
    });
  }

  function addEvent() {
    $rootEl.addEventListener("submit", (e) => {
      e.preventDefault();
      watcher.clearErrors();
      const formData = new FormData($rootEl);
      const password = formData.get("password");
      const confirmPassword = formData.get("password_confirm");
      const username = formData.get("username");
      const email = formData.get("email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const errors = {};

      if (username.length < 4) {
        errors.text = { message: "Username needs to be over 4 chars" };
      }
      if (!emailRegex.test(email)) {
        errors.email = { message: "Invalid email" };
      }
      if (password !== confirmPassword) {
        errors.password = { message: "Passwords need to be identical" };
        errors.password_confirm = {
          message: "Passwords need to be identical",
        };
      }

      if (Object.keys(errors).length > 0) {
        watcher.setErrors(errors);
        return;
      }
      watcher.setUsers({
        username,
        email,
        password,
        passwordConfirm: confirmPassword,
      });
    });
  }
  init();
  addEvent();
  watcher.subscribe(update);
}
export default { createForm };
