import { checkError } from "./checkErorr.js";
const generateBtn = document.querySelector(".js-generate-btn");

function btnClick() {
  if (checkError()) {
    const main = document.querySelector("main");
    const inputCont = document.querySelectorAll(".input-cont");
    const header = document.querySelector("header");
    const data = {};
    const randomNum = (Math.random() * 10)
      .toFixed(10)
      .split("")
      .slice(3, 8)
      .join("");
    const now = new Date();

    now.setDate(now.getDate() + 7);

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = now.toLocaleDateString("en-US", options);
    console.log(randomNum);
    const reader = new FileReader();
    inputCont.forEach((cont) => {
      const field = cont.querySelector("input");
      data[cont.dataset.role] =
        cont.dataset.role === "image" ? field.files[0] : field.value;
    });
    if (data.image) {
      reader.readAsDataURL(data.image);
    }
    reader.onload = () => {
      main.classList.add("ticket-page");
      main.classList.remove("log-in-page");
      header.classList.add("ticket-page-h");
      main.innerHTML = `
      <p class="ticket-msg">
        We'ev emailed your ticket to <br />
        <span>${data.email}</span> and will send updates in<br />
        the run up to the event
      </p>
      <div class="ticket">
        <div class="left">
          <div class="top">
            <img src="assets/images/logo-full.svg">
            <span>${formattedDate} / Austin, TX</span>
          </div>
          <div class="bottom">
            <img src="${reader.result}">
            <div>
              <span>${data.name}</span>
              <p>
                <img src="assets/images/icon-github.svg">
                ${data.GithupUsername}
              </p>
            </div>
          </div>
        </div>
        <div class="right"><span>#${randomNum}</span></div>
      </div>
      `;

      header.querySelector("p").innerHTML = `
      Congerates <span>${data.name}!</span> your ticket is Ready
      `;
    };
  }
}

export const btnFunc = () => {
  generateBtn.addEventListener("click", btnClick);
};
