import '../scss/style.scss';
import * as _ from 'bootstrap';
import * as __ from './rollbar';

import {
  handleDownloadVCFButton,
  handleCountryCodeChange,
  handleLeadingZeroNumbersCheckboxChange,
  handlePhoneNumberDigitsChange,
  handleVCardUpload,
  handleInit,
  handleReportError
} from './handlers';

window.vCardData = [];
window.updateConfig = {
  phoneNumberDigits: 10,
  countryCode: '+91',
  includeLeadingZeroNumbers: true
};

handleInit();

const vCardFileInput = document.getElementById('vCardInput');
vCardFileInput.onchange = handleVCardUpload;
vCardFileInput.value = null;

const phoneNumberDigitsInput = document.getElementById('phoneNumberDigits');
phoneNumberDigitsInput.onchange = handlePhoneNumberDigitsChange;

const countryCodeInput = document.getElementById('countryCode');
countryCodeInput.onchange = handleCountryCodeChange;

const includeLeadingZeroNumbersCheckbox = document.getElementById('includeLeadingZeroNumbers');
includeLeadingZeroNumbersCheckbox.onchange = handleLeadingZeroNumbersCheckboxChange;

const downloadUpdatedVCFButton = document.getElementById('downloadVCF');
downloadUpdatedVCFButton.onclick = handleDownloadVCFButton;

const reportErrorButton = document.getElementById('reportError');
reportErrorButton.onclick = handleReportError;

export {
  vCardFileInput,
  phoneNumberDigitsInput,
  countryCodeInput,
  includeLeadingZeroNumbersCheckbox,
  downloadUpdatedVCFButton
};
