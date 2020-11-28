class Message {
  constructor(text, type, target, displayTime) {
    this.text = text;
    this.type = type;
    this.target = target;
    this.displayTime = displayTime;

    this.displayMessage();
  }

  displayMessage = () => {
    let msgContainer = document.createElement("div");
    msgContainer.innerHTML = `
    <div id="msg-alert" class="alert ${this.type} text-center col-10 ml-3 mt-4" role="alert">
    ${this.text}
    </div>
    `;

    this.target.appendChild(msgContainer);

    setTimeout(() => {
      let messageToRemove = document.querySelector("#msg-alert");
      messageToRemove.remove();
    }, this.displayTime);
  };
}
