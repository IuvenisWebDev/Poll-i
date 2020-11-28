document.querySelector("#mypolls-menu").addEventListener("click", async () => {
  mainContent.innerHTML = `<div class="loader"></div>`;

  await axios
    .get("/poll/current/polls")
    .then(res => (mainContent.innerHTML = renderPolls(res.data)))
    .catch(err => console.log(err));
});

document
  .querySelector("#openpolls-menu")
  .addEventListener("click", async () => {
    mainContent.innerHTML = `<div class="loader"></div>`;

    await axios
      .get("/poll")
      .then(
        res =>
          (mainContent.innerHTML = renderPolls(res.data, { voteOptions: true }))
      )
      .catch(err => console.log(err));
  });

document.querySelector("#myvotes-menu").addEventListener("click", async () => {
  mainContent.innerHTML = `<div class="loader"></div>`;

  await axios
    .get("/poll/current/votes")
    .then(res => (mainContent.innerHTML = renderPolls(res.data)))
    .catch(err => console.log(err));
});
