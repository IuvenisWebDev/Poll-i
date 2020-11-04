document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#add-btn");
  const options = document.querySelector("#form-create");
  const optionText = document.querySelector("#poll-answer");
  const createBtn = document.querySelector("#btn-create");

  addBtn.addEventListener("click", () => {
    const newOption = document.createElement("div");
    newOption.innerHTML = `
        <label for="poll-answer" class="col-sm-2 col-form-label">Answer</label>
          <div class="col-sm-9">
              <input type="text" name="option" class="form-control text-muted option" value="${optionText.value}">
          </div>
        <div class="btn-group col-sm-1">
          <button class="btn btn-sm btn-danger">remove</button>
        </div>
    `;
    newOption.className = "form-group row";
    options.appendChild(newOption);
    optionText.value = "";
  });

  createBtn.addEventListener("click", () => {
    let poll = {};

    let title = document.querySelector("#poll-title").value;
    let description = document.querySelector("#poll-desc").value;
    let isMultipleChoice = document.querySelector("#cb-multiple").checked;
    let expiration = document.querySelector("#input-datetime").value;

    poll.title = title;
    poll.description = description;
    poll.isMultipleChoice = isMultipleChoice;
    poll.expiration = expiration;

    let optionsRaw = document.querySelectorAll(".option");
    let options = [];

    for (let option of optionsRaw) {
      options.push({ label: `${option.value}`, count: 0 });
    }

    poll.options = options;

    const readypoll = {
      title: poll.title,
      description: poll.description,
      isMultipleChoice: poll.isMultipleChoice,
      options: poll.options,
      expiration: poll.expiration,
    };

    fetch("/poll/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(readypoll),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
