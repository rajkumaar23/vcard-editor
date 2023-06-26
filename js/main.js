import "../scss/style.scss";
import {handleVCardUpload, init, showTable} from "./functions.js";

const vCardFileInput = document.getElementById("vCardInput")
vCardFileInput.onchange = handleVCardUpload;

init();

if (window.location.hostname === "localhost") {
    showTable();
}


