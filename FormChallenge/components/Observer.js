class Observer {
  constructor() {
    this.users = new Set();
    this.observers = new Set();
    this.errors = new Map();
  }

  clearErrors() {
    this.errors.clear();
    this.notify();
  }

  subscribe(func) {
    this.observers.add(func);
  }

  setUsers(newUser) {
    this.users.add(newUser);
    this.notify();
  }

  setErrors(errors) {
    Object.entries(errors).forEach(([field, error]) => {
      this.errors.set(field, error);
    });
    this.notify();
    console.log(errors);
  }

  notify() {
    this.observers.forEach((func) => func());
    console.log(this.users);
  }
}

export default Observer;
