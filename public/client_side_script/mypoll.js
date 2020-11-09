document.addEventListener("DOMContentLoaded", () => {
  const myPollMenu = document.querySelector("#mypolls-menu");
  const mainContent = document.querySelector("#content-main");

  const renderPolls = (pollData) => {
    const renderOptions = (options) => {
      for (let option of options) {
        dataToRender.push(`
          <div class="d-flex flex-row justify-content-between">
          <p>${option.label}</p>
          <p>number of votes: ${option.count}</p>
          </div>
          `);
      }
    };

    const dataToRender = [];
    dataToRender.push(`<div class="col-9 poll-container rounded">`);
    for (let data of pollData) {
      dataToRender.push(`
        <div class="container d-flex flex-column justify-content-center option-full">
            <div style="align-self: center;">
                <p class="h3 pt-2">${data.title} - until ${
        data.expiration.split("T")[0]
      }</p>
            </div>
            <div style="align-self: center;">
                <p class="text-justify font-weight-bold">${data.description}</p>
            </div>
        `);
      renderOptions(data.options);
      dataToRender.push("</div>");
    }
    dataToRender.push("</div>");

    return dataToRender.join("");
  };

  myPollMenu.addEventListener("click", () => {
    mainContent.innerHTML = "";

    axios
      .get("/poll/current/polls")
      .then((res) => (mainContent.innerHTML = renderPolls(res.data)))
      .catch((err) => console.log(err));
  });
});
