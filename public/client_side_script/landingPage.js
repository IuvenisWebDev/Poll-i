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
  areTermsAccepted = document.querySelector("#checkbox-temrs");
  btnSignup = document.querySelector("#btn-signup");
  btnLogin = document.querySelector("#btn-login");

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
  }
}

class User {
  email;
  password;
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class SignupManager {
  signupBtn = document.querySelector("#btn-signup");
  email = document.querySelector("#email-signup");
  password = document.querySelector("#password-signup");
  areTermsAgreed = document.querySelector("#checkbox-terms");
  mainContent = document.querySelector("#content-main");
  response;

  //TODO: client side form data validation, specify url
  constructor() {
    this.signupBtn.addEventListener("click", async () => {
      const user = new User(email.value, password.value);
      this.response = await axios.put("*********/signin", user);
      this.mainContent.appendChild(JSON.parse(this.response.data));
    });
  }
}

class LoginManager {
  mainContent = document.querySelector("#content-main");
  loginBtn = document.querySelector("#btn-login");
  email = document.querySelector("#email-login");
  password = document.querySelector("#password-login");

  constructor() {
    this.loginBtn.addEventListener("click", async () => {
      const user = new User(email.value, password.value);
      this.response = await axios.put("*********/login", user);
      this.mainContent.appendChild(JSON.parse(this.response.data));
    });
  }
}

const formInit = new FormInitializer();
const eventManager = new EventManager();
const signupManager = new SignupManager();
const loginManager = new LoginManager();
