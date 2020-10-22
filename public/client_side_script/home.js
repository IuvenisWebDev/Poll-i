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
      options.push(option.value);
    }

    poll.options = options;

    let data = {
      title: poll.title,
      description: poll.description,
      isMultipleChoice: poll.isMultipleChoice,
      options,
      expiration: poll.expiration,
    };

    console.log(poll);

    axios
      .post({
        method: "POST",
        url: "/poll/create",
        data: {
          data,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
});
