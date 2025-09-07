const inputCont = document.querySelectorAll(".input-cont");
export function checkError() {
  let pass = true;
  inputCont.forEach((cont) => {
    const role = cont.dataset.role;
    const inputField = cont.querySelector("input");
    if (role === "image") {
      const file = inputField.files[0];
      if (!file) {
        changToErrState(cont, role);
        pass = false;
      } else {
        const ext = file.type.split("/").pop();
        if (file.size > 500 * 1024 || !["jpg", "png", "jpeg"].includes(ext)) {
          changToErrState(cont, role);
          pass = false;
        } else {
          removeError(cont);
        }
      }
    } else if (role === "name") {
      if (!inputField.value) {
        changToErrState(cont, role);
        pass = false;
      } else {
        removeError(cont);
      }
    } else if (role === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(inputField.value)) {
        changToErrState(cont, role);
        pass = false;
      } else {
        removeError(cont);
      }
    } else if (role === "Githup Username") {
      const githubRegex = /^@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!githubRegex.test(inputField.value)) {
        changToErrState(cont, role);
        pass = false;
      } else {
        removeError(cont);
      }
    }
  });
  return pass
}

function changToErrState(cont, role) {
  cont.classList.add("error-state");
  const errorMsg = cont.querySelector(".js-error-msg");
  errorMsg.classList.add("error-msg");
  errorMsg.innerText = `please enter a valid ${role}`;
}
function removeError(cont) {
  cont.classList.remove("error-state");
  const errorMsg = cont.querySelector(".js-error-msg");
  errorMsg.classList.remove("error-msg");
  errorMsg.innerText = ``;
  if (cont.querySelector("input").type === "file") {
    errorMsg.innerHTML = `<img src="assets/images/icon-info.svg"/>Uploade Your photo (JPG or PNG max size 500kb)`;
  }
}