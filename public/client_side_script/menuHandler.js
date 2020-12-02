const emptyPolls = `<div class="no-polls">No polls</br> to display</div>`;

document.querySelector("#mypolls-menu").addEventListener("click", async () => {
  mainContent.innerHTML = `<div class="loader"></div>`;

  await axios
    .get("/poll/current/polls")
    .then(res => {
      if (res.data.length > 0) {
        mainContent.innerHTML = renderPolls(res.data);
      } else {
        mainContent.innerHTML = emptyPolls;
      }
    })
    .catch(err => console.log(err));
});

document
  .querySelector("#openpolls-menu")
  .addEventListener("click", async () => {
    mainContent.innerHTML = `<div class="loader"></div>`;

    await axios
      .get("/poll")
      .then(res => {
        if (res.data.length > 0) {
          mainContent.innerHTML = renderPolls(res.data, { voteOptions: true });
        } else {
          mainContent.innerHTML = emptyPolls;
        }
      })
      .catch(err => console.log(err));
  });

document.querySelector("#myvotes-menu").addEventListener("click", async () => {
  mainContent.innerHTML = `<div class="loader"></div>`;

  await axios
    .get("/poll/current/votes")
    .then(res => {
      if (res.data.length > 0) {
        mainContent.innerHTML = renderPolls(res.data);
      } else {
        mainContent.innerHTML = emptyPolls;
      }
    })
    .catch(err => console.log(err));
});
