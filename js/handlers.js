import ICAL from 'ical.js';
import {
  addCountryCode,
  initCountryCodeOptions,
  initDigitOptions,
  populateTable,
  showError
} from './helpers';

function handleReportError() {
  document.getElementById('closeErrorModal').click();
  if (window.currentError) {
    Rollbar.error(window.currentError);
  }
  window.currentError = undefined;
}

function handleDownloadVCFButton() {
  try {
    let modifiedVCardData = [];
    window.vCardData.forEach((contact) => {
      if (contact.trim() !== '') {
        const vCard = ICAL.parse(contact);
        const comp = new ICAL.Component(vCard);
        const properties = comp.getAllProperties();
        for (const prop of properties) {
          // Handle prop names with prefixes such as 'item1.tel'
          const propNameGroup = prop.name.split('.');
          const propName = propNameGroup.length === 2 ? propNameGroup[1] : propNameGroup[0];

          if (propName === 'tel') {
            prop.setValue(addCountryCode(prop.getFirstValue()));
          }
        }

        const lines = [];
        lines.push('BEGIN:VCARD');
        for (const prop of properties) {
          lines.push(prop.toICALString());
        }
        lines.push('END:VCARD');
        modifiedVCardData.push(lines.join('\r\n'));
      }
    });
    const downloadLink = document.createElement('a');
    downloadLink.href =
      'data:text/vcard;charset=utf-8,' + encodeURIComponent(modifiedVCardData.join('\r\n'));
    downloadLink.download = 'updated_contacts.vcf';
    downloadLink.click();
  } catch (e) {
    showError(e);
  }
}

function handlePhoneNumberDigitsChange(e) {
  try {
    window.updateConfig['phoneNumberDigits'] = parseInt(e.target.value);
    handleRefreshPreview();
  } catch (e) {
    showError(e);
  }
}

function handleCountryCodeChange(e) {
  try {
    window.updateConfig['countryCode'] = e.target.value;
    handleRefreshPreview();
  } catch (e) {
    showError(e);
  }
}

function handleLeadingZeroNumbersCheckboxChange(e) {
  try {
    window.updateConfig['includeLeadingZeroNumbers'] = e.target.checked;
    handleRefreshPreview();
  } catch (e) {
    showError(e);
  }
}

function handleRefreshPreview() {
  setTimeout(() => {
    try {
      populateTable(window.vCardData);
    } catch (e) {
      showError(e);
    }
  }, 100);
}

function handleVCardUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (_) {
    try {
      const data = reader.result;
      const regExp = /BEGIN:VCARD[\s\S]*?END:VCARD/gim;
      const vCards = data.match(regExp);
      if (!vCards) {
        console.error('Error parsing vcf file', data);
        return;
      }

      window.vCardData = vCards;
      populateTable(vCards);
    } catch (e) {
      event.target.value = null;
      showError(e);
    }
  };

  reader.readAsText(file);
}

function handleInit() {
  try {
    initDigitOptions();
    initCountryCodeOptions();
  } catch (e) {
    showError(e);
  }
}

function handleGlobalError(message, source, lineno, colno, error) {
  const errorMessage = `An unexpected error occurred: \n
    Message: ${message} \n
    Source: ${source} \n
    Line Number: ${lineno} \n
    Column Number: ${colno} \n
    ${error ? `Error: ${error.message}` : ''}`;

  Rollbar.error(Error(errorMessage));

  return true; // Prevent default error handling
}

export {
  handlePhoneNumberDigitsChange,
  handleCountryCodeChange,
  handleLeadingZeroNumbersCheckboxChange,
  handleRefreshPreview,
  handleVCardUpload,
  handleDownloadVCFButton,
  handleInit,
  handleReportError,
  handleGlobalError
};
