import { checkError } from "./checkErorr.js"
const generateBtn = document.querySelector(".js-generate-btn")

function btnClick(){
  checkError()
}

export const btnFunc=()=>{generateBtn.addEventListener("click",btnClick)}