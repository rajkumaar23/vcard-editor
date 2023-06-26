import "../scss/style.scss";
import {handleVCardUpload} from "./functions.js";

const vCardFileInput = document.getElementById("vCardInput")
vCardFileInput.onchange = handleVCardUpload;


