class FormComponent {
  constructor($rootEl, { inputs }, watcher) {
    this.$rootEl = $rootEl;
    this.inputs = inputs;
    this.watcher = watcher;
    this.init();
    this.addEvent();
    this.watcher.subscribe(this.update.bind(this));
  }

  init() {
    this.inputs.forEach((inputObj) => {
      const { type, label } = inputObj;
      const inputContainer = document.createElement("div");
      inputContainer.id = label;
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
      this.$rootEl.append(inputContainer);
    });

    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit";
    this.$rootEl.append(submitButton);
  }

  update() {
    const existingErrors = document.querySelectorAll(".error");
    existingErrors.forEach((error) => error.remove());

    this.inputs.forEach(({ label }) => {
      const error = this.watcher.errors.get(label);
      if (error) {
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

  addEvent() {
    this.$rootEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.watcher.clearErrors();
      const formData = new FormData(this.$rootEl);
      const password = formData.get("password");
      const confirmPassword = formData.get("password_confirm");
      const username = formData.get("username");
      const email = formData.get("email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const errors = {};

      if (username.length < 4) {
        errors.username = { message: "Username needs to be over 4 chars" };
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
        this.watcher.setErrors(errors);
        return;
      }
      this.watcher.setUsers({
        username,
        email,
        password,
        passwordConfirm: confirmPassword,
      });
    });
  }
}

export default FormComponent;
