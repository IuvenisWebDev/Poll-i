class FormHandler {
  formsDiv = document.querySelector("#forms-place");
  formSignup = document.querySelector("#form-signup");
  formLogin = document.querySelector("#form-login");
  constructor() {
    this.formSignup.classList.add("visible");
    this.formLogin.classList.add("invisible");
  }
}

class EventManager {
  signupNav = document.querySelector("#signup-btn");
  loginNav = document.querySelector("#login-btn");
  areTermsAccepted = document.querySelector("#checkbox-temrs");
  btnSignup = document.querySelector("#btn-signup");
  btnLogin = document.querySelector("#btn-login");

  signupClasses = formHandler.formSignup.classList;
  loginClasses = formHandler.formLogin.classList;
  formSignup = formHandler.formSignup;
  formLogin = formHandler.formLogin;

  constructor() {
    this.signupNav.addEventListener("click", () => {
      let signupVisible = this.signupClasses.contains("visible");
      if (!signupVisible) {
        this.signupClasses.remove("invisible");
        this.signupClasses.add("visible");
        this.loginClasses.remove("visible");
        this.loginClasses.add("invisible");
      }
    });
    this.loginNav.addEventListener("click", () => {
      let loginVisible = this.loginClasses.contains("visible");
      if (!loginVisible) {
        this.loginClasses.add("visible");
        this.loginClasses.remove("invisible");
        this.signupClasses.remove("visible");
        this.signupClasses.add("invisible");
      }
    });
  }
}

class User {
  email;
  password;
}

const formHandler = new FormHandler();
const eventManager = new EventManager();
