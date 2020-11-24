const mainContent = document.querySelector("#content-main");

let optionsCollected = {};

const vote = async pollId => {
  console.log(optionsCollected[pollId]);

  await axios.put(`/poll/${pollId}`, {
    id: pollId,
    votes: optionsCollected[pollId]
  });
};

const renderPolls = (pollData, voteOptions) => {
  const renderOptions = (options, pollId) => {
    for (let option of options) {
      dataToRender.push(`
            <div class="d-flex flex-row justify-content-between mb-2">
            <p>${option.label}</p>
            <p>number of votes: ${option.count}</p>
            `);

      if (voteOptions) {
        dataToRender.push(
          `<button onClick="vote('${pollId}')" class="btn btn-success">select</button>`
        );
      }
      dataToRender.push("</div>");
      optionsCollected[pollId].push(option._id);
    }
  };

  const dataToRender = [];
  dataToRender.push(`<div class="col-9 poll-container rounded">`);
  for (let data of pollData) {
    let pollExpiration = data.expiration.split("T")[0];
    let hasExpired = new Date(data.expiration).getTime() < Date.now();

    dataToRender.push(`
          <div class="container d-flex flex-column justify-content-center option-full">
              <div style="align-self: center;">
                  <p class="h3 pt-2">${data.title} - expiration: ${
      hasExpired ? `<span style="color: red">EXPIRED</span>` : pollExpiration
    }</p>
              </div>
              <div style="align-self: center;">
                  <p class="text-justify font-weight-bold">${
                    data.description
                  }</p>
              </div>
          `);

    optionsCollected[data._id] = [];
    renderOptions(data.options, data._id);

    dataToRender.push("</div>");
  }
  dataToRender.push("</div>");

  return dataToRender.join("");
};
