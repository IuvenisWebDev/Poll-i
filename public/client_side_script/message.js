class Message {
  constructor(text, type, displayTime, isFixed) {
    this.text = text;
    this.type = type;
    this.displayTime = displayTime;
    this.isFixed = isFixed;

    this.displayMessage();
  }

  displayMessage = () => {
    let msgContainer = document.createElement("div");
    msgContainer.setAttribute("id", "msg-alert");
    msgContainer.innerHTML = `<p>${this.text}</p>`;
    document.querySelector("#messages").appendChild(msgContainer);

    if (!this.isFixed) {
    } else {
      msgContainer.classList.add("message-visible");
      setTimeout(() => {
        msgContainer.classList.add("message-fadeout");
      }, this.displayTime - 3000);
      setTimeout(() => {
        msgContainer.remove();
      }, this.displayTime);
    }
  };
}
