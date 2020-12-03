class Message {
  constructor(text, type, displayTime) {
    this.text = text;
    this.type = type;
    this.displayTime = displayTime;

    this.displayMessage();
  }

  displayMessage = () => {
    let msgContainer = document.createElement("div");
    msgContainer.setAttribute("id", "msg-alert");
    msgContainer.innerHTML = `<p>${this.text}</p>`;
    msgContainer.classList.add(this.type);
    document.querySelector("#messages").appendChild(msgContainer);

    setTimeout(() => {
      msgContainer.classList.add("message-fadeout");
    }, this.displayTime - 3000);
    setTimeout(() => {
      msgContainer.remove();
    }, this.displayTime);
  };
}
