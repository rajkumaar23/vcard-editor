import {USER_ICON} from "./constants.js";
import ICAL from "ical.js";

function showConfigAndTable() {
    document.getElementById("contactsContainer").classList.remove("d-none");
    document.getElementById("configContainer").classList.remove("d-none");
}

function handlePhoneNumberDigitsChange(e) {
    window.updateConfig['phoneNumberDigits'] = parseInt(e.target.value);
}

function handleCountryCodeChange(e) {
    window.updateConfig['countryCode'] = e.target.value;
}

function handleLeadingZeroNumbersCheckboxChange(e) {
    window.updateConfig['includeLeadingZeroNumbers'] = e.target.checked;
}

function handleRefreshPreview(_) {
    populateTable(window.vCardData);
}

function handleVCardUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (_) {
        const data = reader.result;
        const regExp = /BEGIN:VCARD[\s\S]*?END:VCARD/gim;
        const vCards = data.match(regExp);
        if (!vCards) {
            console.error("Error parsing vcf file", data);
            return;
        }

        window.vCardData = vCards;
        populateTable(vCards);
    };

    reader.readAsText(file);
}

function populateTable(vCards) {
    const tableBody = document.getElementById("contactTableBody");
    tableBody.innerHTML = "";
    vCards.forEach(function (contact) {
        if (contact.trim() !== "") {
            appendContact(contact, tableBody);
        }
        showConfigAndTable();
    });
}

function appendContact(contact, tableBody) {
    const defaultTdClasses = "text-center fw-semibold";
    let {fullName, phoneNumbers, image} = parseVCard(contact);
    let row = document.createElement("tr");
    const icon = `<img src="${image || USER_ICON}" class="img-fluid rounded-circle" width="75" alt="Icon">`;
    const phoneNumbersLength = phoneNumbers.length;
    row.innerHTML = `<td class='${defaultTdClasses}' rowspan=${phoneNumbersLength}>${icon}</td>`;
    row.innerHTML += `<td class='${defaultTdClasses}' rowspan=${phoneNumbersLength}>${fullName}</td>`;
    row.innerHTML += `<td class='${defaultTdClasses}'>${phoneNumbers[0] || "N/A"}</td>`;
    row.innerHTML += `<td class='${defaultTdClasses} ${getClassForModifiedPhoneRow(phoneNumbers[0])}'>${addCountryCode(phoneNumbers[0]) || "N/A"}</td>`;
    tableBody.appendChild(row);
    phoneNumbers.slice(1).forEach((phoneNumber) => {
        let phoneNumberRow = document.createElement("tr");
        phoneNumberRow.innerHTML = `<td class='${defaultTdClasses}'>${phoneNumber}</td>`;
        phoneNumberRow.innerHTML += `<td class='${defaultTdClasses} ${getClassForModifiedPhoneRow(phoneNumber)}'>${addCountryCode(phoneNumber) || "N/A"}</td>`;
        tableBody.appendChild(phoneNumberRow);
    });
}

function parseVCard(vCardData) {
    const vCard = ICAL.parse(vCardData);
    const comp = new ICAL.Component(vCard);
    const properties = comp.getAllProperties();
    let fullName, phoneNumbers = [], image;

    for (const prop of properties) {
        // Handle prop names with prefixes such as 'item1.tel'
        const propNameGroup = prop.name.split(".")
        const propName = propNameGroup.length === 2 ? propNameGroup[1] : propNameGroup[0]

        if (propName === "fn") {
            fullName = prop.getFirstValue();
        }

        if (propName === "tel") {
            phoneNumbers.push(prop.getFirstValue());
        }

        if (propName === "photo") {
            const photoType = prop.getParameter('type');
            const photoData = prop.getFirstValue();
            image = `data:${photoType};base64,${photoData}`;
        }
    }

    return {
        fullName, phoneNumbers, image,
    };
}

function addCountryCode(phoneNumber) {
    if (!phoneNumber || phoneNumber.trim().startsWith("+")) {
        return phoneNumber;
    }

    const processedPhoneNumber = phoneNumber.replace(/\D/g, "").replace(/^0/, '');
    if (processedPhoneNumber.length !== window.updateConfig.phoneNumberDigits) {
        return phoneNumber;
    }

    return window.updateConfig.countryCode + processedPhoneNumber;
}

function getClassForModifiedPhoneRow(phoneNumber) {
    return phoneNumber !== addCountryCode(phoneNumber) ? "table-info" : "";
}

function initDigitOptions() {
    const digitsSelect = document.getElementById('phoneNumberDigits');
    digitsSelect.innerHTML = "";
    for (let i = 4; i <= 12; i++) {
        const option = document.createElement('option')
        option.value = `${i}`;
        option.text = `${i} digits`;
        option.selected = i === 10;
        digitsSelect.appendChild(option);
    }
}

function init() {
    initDigitOptions();
}

export {
    handlePhoneNumberDigitsChange,
    handleCountryCodeChange,
    handleLeadingZeroNumbersCheckboxChange,
    handleRefreshPreview,
    handleVCardUpload,
    parseVCard,
    showConfigAndTable,
    init
}
