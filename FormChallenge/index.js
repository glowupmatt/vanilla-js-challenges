import FormComponent from "./components/FormComponent.js";
import Observer from "./components/Observer.js";

{
  /* <div class="container">
<!-- Form Section -->
<section class="form-section">
    <form id="form"></form>
</section>

<!-- Users List Section -->
<section class="users-section">
    <div id="display">
        <h2>Registered Users</h2>
        <div class="users-list">
            <!-- User Item Template -->
            <div class="user-item">
                <div class="user-info">
                    <p><strong>Username:</strong> <span class="username">JohnDoe</span></p>
                    <p><strong>Email:</strong> <span class="email">john@example.com</span></p>
                </div>
            </div>
            <!-- Empty State Message -->
            <p class="empty-message">No users registered yet</p>
        </div>
    </div>
</section>
</div> */
}
(() => {
  const watcher = new Observer();

  function displayInputs($rootEl) {
    function update() {}
    function init() {}

    init();
    update();
  }

  new FormComponent(
    document.getElementById("form"),
    {
      inputs: [
        { label: "username", type: "text", value: "" },
        { label: "email", type: "email", value: "" },
        { label: "password", type: "password", value: "" },
        { label: "password_confirm", type: "password", value: "" },
      ],
    },
    watcher
  );

  displayInputs(document.getElementById("display"));
})();
