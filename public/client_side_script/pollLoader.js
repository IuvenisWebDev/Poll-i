const mainContent = document.querySelector("#content-main");

const renderPolls = (pollData, voteOptions) => {
  const renderOptions = (options) => {
    for (let option of options) {
      dataToRender.push(`
            <div class="d-flex flex-row justify-content-between mb-2">
            <p>${option.label}</p>
            <p>number of votes: ${option.count}</p>
            `);

      if (voteOptions) {
        dataToRender.push(`<button class="btn btn-success">select</button>`);
      }
      dataToRender.push("</div>");
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
                  <p class="text-justify font-weight-bold">${
                    data.description
                  }</p>
              </div>
          `);
    renderOptions(data.options);
    dataToRender.push("</div>");
  }
  dataToRender.push("</div>");

  return dataToRender.join("");
};
