const mainContent = document.querySelector("#content-main");

const pollsOptionsTotal = {};
let selectedPollId = "";
const selectedOptionIds = [];

const selectOption = (pollId, ordinal) => {
  selectedPollId = pollId;
  selectedOptionIds.push(pollsOptionsTotal[pollId][ordinal]);
};

const sendVoteOptions = async () => {
  await axios.put(`/poll/${selectedPollId}`, {
    id: selectedPollId,
    votes: selectedOptionIds
  });

  await axios
    .get("/poll")
    .then(
      res =>
        (mainContent.innerHTML = renderPolls(res.data, { voteOptions: true }))
    )
    .catch(err => console.log(err));
};

const renderPolls = (pollData, voteOptions) => {
  const renderOptions = (options, pollId) => {
    let ordinal = 0;
    for (let option of options) {
      dataToRender.push(`
            <div class="d-flex flex-row justify-content-between mb-2">
            <p>${option.label}</p>
            <p>number of votes: ${option.count}</p>
            `);

      if (voteOptions) {
        dataToRender.push(
          `<button onClick="selectOption('${pollId}', '${ordinal}')" class="btn btn-info">select</button>`
        );
      }
      dataToRender.push("</div>");
      pollsOptionsTotal[pollId].push(option._id);
      ordinal++;
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
      hasExpired ? `<span style="color: red">Closed</span>` : pollExpiration
    }</p>
              </div>
              <div style="align-self: center;">
                  <p class="text-justify font-weight-bold">${
                    data.description
                  }</p>
              </div>
          `);

    pollsOptionsTotal[data._id] = [];
    renderOptions(data.options, data._id);

    if (voteOptions) {
      dataToRender.push(
        `<div class="container d-flex justify-content-center"><button onClick="sendVoteOptions()" class="btn btn-success">Send vote</button></div>`
      );
    }
    dataToRender.push("</div>");
  }
  dataToRender.push("</div>");

  return dataToRender.join("");
};
