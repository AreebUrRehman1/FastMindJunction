const rBox = document.querySelector(".r-box");

const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("uec").value.trim();
  const email = document.getElementById("eec").value.trim();
  const password = document.getElementById("pec").value.trim();

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";

  let valid = true;

  if (!usernamePattern.test(username)) {
    usernameError.textContent = "Username must be 3-20 characters, only letters or numbers.";
    valid = false;
  }

  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  }

  if (!passwordPattern.test(password)) {
    passwordError.textContent = "Password must be 6-30 characters with at least 1 number, 1 uppercase, and 1 lowercase letter.";
    valid = false;
  }

  if (valid) {
    localStorage.setItem("username", JSON.stringify(username));
  }
});

function li() {
  rBox.classList.remove("r-box-su");
  rBox.classList.add("r-box-li");
  rBox.innerHTML = `
    <div class="r-text">Don't have an account?</div>
    <button class="r-button" onclick="su()">Sign Up</button>`;
}

function su() {
  rBox.classList.remove("r-box-li");
  rBox.classList.add("r-box-su");
  rBox.innerHTML = `
    <div class="r-text">Already have an account?</div>
    <button class="r-button" onclick="li()">Log In</button>`;
}