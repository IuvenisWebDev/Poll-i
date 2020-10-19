class FormInitializer {
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
  btnSignup = document.querySelector("#btn-signup");
  btnLogin = document.querySelector("#btn-login");

  btnCancelSignup = document.querySelector("#btn-cancel-signup");
  btnCancelLogin = document.querySelector("#btn-cancel-login");

  tbEmailSignup = document.querySelector("#email-signup");
  tbNameSignup = document.querySelector("#name-signup");
  pbPasswordSignup = document.querySelector("#password-signup");
  cbAcceptSignup = document.querySelector("#checkbox-terms");

  tbEmailLogin = document.querySelector("#email-login");
  pbPasswordLogin = document.querySelector("#password-login");

  signupClasses = formInit.formSignup.classList;
  loginClasses = formInit.formLogin.classList;
  formSignup = formInit.formSignup;
  formLogin = formInit.formLogin;

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
    this.btnCancelSignup.addEventListener("click", () => {
      this.tbEmailSignup.value = "";
      this.pbPasswordSignup.value = "";
      this.tbNameSignup.value = "";
      this.cbAcceptSignup.checked = false;
    });
    this.btnCancelLogin.addEventListener("click", () => {
      this.tbEmailLogin.value = "";
      this.pbPasswordLogin.value = "";
    });
  }
}

const formInit = new FormInitializer();
const eventManager = new EventManager();
