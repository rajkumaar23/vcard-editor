import { PHONE_CODE_MAP, USER_ICON } from './constants.js';
import ICAL from 'ical.js';

function populateTable(vCards) {
  const tableBody = document.getElementById('contactTableBody');
  tableBody.innerHTML = '';
  vCards.forEach(function (contact) {
    if (contact.trim() !== '') {
      appendContact(contact, tableBody);
    }
  });
  showConfigAndTable();
}

function appendContact(contact, tableBody) {
  const defaultTdClasses = 'text-start px-3 fw-light';
  let { fullName, phoneNumbers, image } = parseVCard(contact);
  const phoneNumbersLength = phoneNumbers.length;
  if (phoneNumbersLength < 1) {
    return;
  }
  for (let idx = 0; idx < phoneNumbers.length; idx++) {
    phoneNumbers[idx] = phoneNumbers[idx].replace(/[\s-\(\)]/g, '');
  }
  let row = document.createElement('tr');
  const imgSrc = image || USER_ICON;
  const icon = `<img src="${imgSrc}" class="img-fluid rounded-circle" width="50" alt="Icon">`;
  row.innerHTML = `<td class='${defaultTdClasses}' rowspan=${phoneNumbersLength}>${icon}</td>`;
  row.innerHTML += `<td class='${defaultTdClasses}' rowspan=${phoneNumbersLength}>${fullName}</td>`;
  let classForModified = getClassForModifiedPhoneRow(phoneNumbers[0]);
  let modifiedPh = addCountryCode(phoneNumbers[0]) || 'N/A';
  row.innerHTML += `<td class='${defaultTdClasses} ${classForModified}'>${modifiedPh}</td>`;
  row.innerHTML += `<td class='${defaultTdClasses}'>${phoneNumbers[0] || 'N/A'}</td>`;
  tableBody.appendChild(row);
  phoneNumbers.slice(1).forEach((phoneNumber) => {
    let phoneNumberRow = document.createElement('tr');
    classForModified = getClassForModifiedPhoneRow(phoneNumber);
    modifiedPh = addCountryCode(phoneNumber) || 'N/A';
    phoneNumberRow.innerHTML = `<td class='${defaultTdClasses} ${classForModified}'>${modifiedPh}</td>`;
    phoneNumberRow.innerHTML += `<td class='${defaultTdClasses}'>${phoneNumber}</td>`;
    tableBody.appendChild(phoneNumberRow);
  });
}

function parseVCard(vCardData) {
  let fullName;
  let phoneNumbers = [];
  let image;
  const vCard = ICAL.parse(vCardData);
  const comp = new ICAL.Component(vCard);
  const properties = comp.getAllProperties();

  for (const prop of properties) {
    // Handle prop names with prefixes such as 'item1.tel'
    const propNameGroup = prop.name.split('.');
    const propName = propNameGroup.length === 2 ? propNameGroup[1] : propNameGroup[0];

    if (propName === 'fn') {
      fullName = prop.getFirstValue();
    }

    if (propName === 'tel') {
      phoneNumbers.push(prop.getFirstValue());
    }

    if (propName === 'photo') {
      const photoType = prop.getParameter('type');
      const photoData = prop.getFirstValue();
      image = `data:${photoType};base64,${photoData}`;
    }
  }
  return {
    fullName,
    phoneNumbers,
    image
  };
}

function showError(e) {
  if (e) {
    document.getElementById('errorBody').innerHTML = e.message;
    document.getElementById('showError').click();
    window.currentError = e;
  }
}

function addCountryCode(phoneNumber) {
  if (!phoneNumber || phoneNumber.trim().startsWith('+')) {
    return phoneNumber;
  }

  let processedPhoneNumber = phoneNumber.replace(/\D/g, '');
  if (window.updateConfig.includeLeadingZeroNumbers) {
    processedPhoneNumber = processedPhoneNumber.replace(/^0/, '');
  }
  if (processedPhoneNumber.length !== window.updateConfig.phoneNumberDigits) {
    return phoneNumber;
  }

  return window.updateConfig.countryCode + processedPhoneNumber;
}

function getClassForModifiedPhoneRow(phoneNumber) {
  return phoneNumber !== addCountryCode(phoneNumber) ? 'table-info' : '';
}

function initDigitOptions() {
  const digitsSelect = document.getElementById('phoneNumberDigits');
  digitsSelect.innerHTML = '';
  for (let i = 4; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = `${i}`;
    option.text = `${i} digits`;
    option.selected = i === 10;
    digitsSelect.appendChild(option);
  }
}

function initCountryCodeOptions() {
  const countryCode = document.getElementById('countryCode');
  countryCode.innerHTML = '';
  for (let [name, code] of Object.entries(PHONE_CODE_MAP)) {
    const option = document.createElement('option');
    option.value = `+${code}`;
    option.text = `${name} (+${code})`;
    option.selected = name === 'India';
    countryCode.appendChild(option);
  }
}

function showConfigAndTable() {
  document.getElementById('mainContainer').classList.remove('d-none');
}

export { initCountryCodeOptions, initDigitOptions, populateTable, showError, addCountryCode };
