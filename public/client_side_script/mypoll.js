document.addEventListener("DOMContentLoaded", () => {
  const myPollMenu = document.querySelector("#mypolls-menu");
  const mainContent = document.querySelector("#content-main");

  myPollMenu.addEventListener("click", () => {
    console.log("In the mypolls menu");
    mainContent.innerHTML = "";

    const res = fetch("/poll/current/polls", { method: "GET" })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(res);
  });
});
