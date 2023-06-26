import "../scss/style.scss";
import {
    handleCountryCodeChange, handleLeadingZeroNumbersCheckboxChange,
    handlePhoneNumberDigitsChange, handleRefreshPreview,
    handleVCardUpload,
    init,
    showConfigAndTable
} from "./functions.js";

window.vCardData = [];
window.updateConfig = {
    phoneNumberDigits : 10,
    countryCode: "+91",
    includeLeadingZeroNumbers: true
}

init();

const vCardFileInput = document.getElementById("vCardInput")
vCardFileInput.onchange = handleVCardUpload;

const phoneNumberDigitsInput = document.getElementById("phoneNumberDigits");
phoneNumberDigitsInput.onchange = handlePhoneNumberDigitsChange

const countryCodeInput = document.getElementById("countryCode");
countryCodeInput.onchange = handleCountryCodeChange

const includeLeadingZeroNumbersCheckbox = document.getElementById("includeLeadingZeroNumbers");
includeLeadingZeroNumbersCheckbox.onchange = handleLeadingZeroNumbersCheckboxChange

const refreshPreviewButton = document.getElementById("refreshPreview");
refreshPreviewButton.onclick = handleRefreshPreview

if (window.location.hostname === "localhost") {
    showConfigAndTable();
}


