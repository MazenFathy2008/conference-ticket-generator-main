export function changeImage() {
  const imageInputCont = document.querySelector("#avatar-input-cont");
  const imageInput = imageInputCont.querySelector("input");
  const imageInputLabel = imageInputCont.querySelector(".js-image-input-label");
  const htmlStart = ` `;
  imageInput.addEventListener("change", () =>
    handleChange(imageInput, imageInputLabel)
  );
}

function handleChange(inputField, labelInput) {
  const file = inputField.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      labelInput.classList.add("full");
      labelInput.innerHTML = `
            <img src="${reader.result}" />
            <div>
              <button>Remove image</button>
              <label for="avatar-input">change image</label>
            </div>`;
      const removeBtn = labelInput.querySelector("button");
      removeBtn.addEventListener("click", () => {
        inputField.value = "";
        setTimeout(() => {
          inputField.dispatchEvent(new Event("change"));
        }, 250);
      });
      sessionStorage.setItem("imgURL", reader.result);
    };
  } else {
    labelInput.classList.remove("full");
    labelInput.innerHTML = `
    <img src="assets/images/icon-upload.svg" />
            <p>Drag and drop or click to Upload</p>
    `;
  }
}
