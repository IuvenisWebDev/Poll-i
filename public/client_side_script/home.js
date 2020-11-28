document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#add-btn");
  const options = document.querySelector("#form-create");
  const optionText = document.querySelector("#poll-answer");
  const createBtn = document.querySelector("#btn-create");
  const pollOptionsNew = document.querySelector("#poll-options-new");
  const mainContent = document.querySelector("#content-main");

  let title = document.querySelector("#poll-title");
  let description = document.querySelector("#poll-desc");
  let termsChecked = document.querySelector("#cb-multiple");
  let expiration = document.querySelector("#input-datetime");

  const emptyFormValues = () => {
    title.value = "";
    description.value = "";
    termsChecked.checked = false;
    expiration.value = "";

    while (pollOptionsNew.firstChild) {
      pollOptionsNew.removeChild(pollOptionsNew.firstChild);
    }
  };

  addBtn.addEventListener("click", () => {
    const newOption = document.createElement("div");
    newOption.innerHTML = `
        <label for="poll-answer" class="col-sm-2 col-form-label">Answer</label>
          <div class="col-sm-9">
              <input type="text" name="option" class="form-control text-muted option" value="${optionText.value}">
          </div>
        <div class="btn-group col-sm-1">
          <button class="btn btn-sm btn-danger" >remove</button>
        </div>
    `;
    newOption.className = "form-group row";
    pollOptionsNew.appendChild(newOption);

    let removeBtns = document.querySelectorAll(".btn-danger");
    removeBtns[removeBtns.length - 1].addEventListener("click", () => {
      pollOptionsNew.removeChild(newOption);
    });

    optionText.value = "";
  });

  createBtn.addEventListener("click", () => {
    let optionsRaw = document.querySelectorAll(".option");
    let options = [];

    for (let option of optionsRaw) {
      options.push({ label: `${option.value}`, count: 0 });
    }

    const readypoll = {
      title: title.value,
      description: description.value,
      isMultipleChoice: termsChecked.checked,
      options: options,
      expiration: expiration.value
    };

    let message;

    fetch("/poll/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(readypoll)
    })
      .then(response => response.json())
      .then(emptyFormValues())
      .then(
        (message = new Message(
          "New poll created successfully!",
          "alert-success",
          mainContent,
          3000
        ))
      )
      .catch(error => {
        console.error("Error:", error);
      });
  });
});
