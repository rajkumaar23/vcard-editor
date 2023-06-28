import "../scss/style.scss";
import * as _ from "bootstrap";
import {
  downloadUpdatedVCF,
  handleCountryCodeChange,
  handleLeadingZeroNumbersCheckboxChange,
  handlePhoneNumberDigitsChange,
  handleVCardUpload,
  init,
} from "./functions.js";

window.vCardData = [];
window.updateConfig = {
  phoneNumberDigits: 10,
  countryCode: "+91",
  includeLeadingZeroNumbers: true,
};

init();

const vCardFileInput = document.getElementById("vCardInput");
vCardFileInput.onchange = handleVCardUpload;
vCardFileInput.value = null;

const phoneNumberDigitsInput = document.getElementById("phoneNumberDigits");
phoneNumberDigitsInput.onchange = handlePhoneNumberDigitsChange;

const countryCodeInput = document.getElementById("countryCode");
countryCodeInput.onchange = handleCountryCodeChange;

const includeLeadingZeroNumbersCheckbox = document.getElementById(
  "includeLeadingZeroNumbers"
);
includeLeadingZeroNumbersCheckbox.onchange =
  handleLeadingZeroNumbersCheckboxChange;

const downloadUpdatedVCFButton = document.getElementById("downloadVCF");
downloadUpdatedVCFButton.onclick = downloadUpdatedVCF;
