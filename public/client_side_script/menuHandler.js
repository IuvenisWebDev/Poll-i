document.querySelector("#mypolls-menu").addEventListener("click", async () => {
  mainContent.innerHTML = "";

  await axios
    .get("/poll/current/polls")
    .then(res => (mainContent.innerHTML = renderPolls(res.data)))
    .catch(err => console.log(err));
});

document
  .querySelector("#openpolls-menu")
  .addEventListener("click", async () => {
    mainContent.innerHTML = "";

    await axios
      .get("/poll")
      .then(
        res =>
          (mainContent.innerHTML = renderPolls(res.data, { voteOptions: true }))
          
      )
      .catch(err => console.log(err));
  });
