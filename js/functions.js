import {PHONE_CODE_MAP, USER_ICON} from "./constants.js";
import ICAL from "ical.js";

function showConfigAndTable() {
    document.getElementById("mainContainer").classList.remove("d-none");
}

function downloadUpdatedVCF() {
    let modifiedVCardData = [];
    window.vCardData.forEach((contact) => {
        if (contact.trim() !== "") {
            const vCard = ICAL.parse(contact);
            const comp = new ICAL.Component(vCard);
            const properties = comp.getAllProperties();
            for (const prop of properties) {
                // Handle prop names with prefixes such as 'item1.tel'
                const propNameGroup = prop.name.split(".");
                const propName = propNameGroup.length === 2 ? propNameGroup[1] : propNameGroup[0];

                if (propName === "tel") {
                    prop.setValue(addCountryCode(prop.getFirstValue()));
                }
            }

            const lines = [];
            lines.push('BEGIN:VCARD');
            for (const prop of properties) {
                lines.push(prop.toICALString());
            }
            lines.push('END:VCARD');
            modifiedVCardData.push(lines.join("\r\n"));
        }
    });
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(modifiedVCardData.join("\r\n"));
    downloadLink.download = 'updated_contacts.vcf';
    downloadLink.click();
}

function handlePhoneNumberDigitsChange(e) {
    window.updateConfig['phoneNumberDigits'] = parseInt(e.target.value);
    handleRefreshPreview();
}

function handleCountryCodeChange(e) {
    window.updateConfig['countryCode'] = e.target.value;
    handleRefreshPreview();
}

function handleLeadingZeroNumbersCheckboxChange(e) {
    window.updateConfig['includeLeadingZeroNumbers'] = e.target.checked;
    handleRefreshPreview();
}

function handleRefreshPreview() {
    setTimeout(() => {
        populateTable(window.vCardData);
    }, 100);
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
    });
    showConfigAndTable();
}

function appendContact(contact, tableBody) {
    const defaultTdClasses = "text-start px-3 fw-light";
    let {fullName, phoneNumbers, image} = parseVCard(contact);
    const phoneNumbersLength = phoneNumbers.length;
    if (phoneNumbersLength < 1) {
        return;
    }
    let row = document.createElement("tr");
    const icon = `<img src="${image || USER_ICON}" class="img-fluid rounded-circle" width="50" alt="Icon">`;
    row.innerHTML = `<td class='${defaultTdClasses}' rowspan=${phoneNumbersLength}>${icon}</td>`;
    row.innerHTML += `<td class='${defaultTdClasses}' rowspan=${phoneNumbersLength}>${fullName}</td>`;
    row.innerHTML += `<td class='${defaultTdClasses} ${getClassForModifiedPhoneRow(phoneNumbers[0])}'>${addCountryCode(phoneNumbers[0]) || "N/A"}</td>`;
    row.innerHTML += `<td class='${defaultTdClasses}'>${phoneNumbers[0] || "N/A"}</td>`;
    tableBody.appendChild(row);
    phoneNumbers.slice(1).forEach((phoneNumber) => {
        let phoneNumberRow = document.createElement("tr");
        phoneNumberRow.innerHTML = `<td class='${defaultTdClasses} ${getClassForModifiedPhoneRow(phoneNumber)}'>${addCountryCode(phoneNumber) || "N/A"}</td>`;
        phoneNumberRow.innerHTML += `<td class='${defaultTdClasses}'>${phoneNumber}</td>`;
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

    let processedPhoneNumber = phoneNumber.replace(/\D/g, "");
    if (window.updateConfig.includeLeadingZeroNumbers) {
        processedPhoneNumber = processedPhoneNumber.replace(/^0/, '');
    }
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

function initCountryCodeOptions() {
    const countryCode = document.getElementById('countryCode');
    countryCode.innerHTML = "";
    for (let [name, code] of Object.entries(PHONE_CODE_MAP)) {
        const option = document.createElement('option')
        option.value = `+${code}`;
        option.text = `${name} (+${code})`;
        option.selected = name === "India";
        countryCode.appendChild(option);
    }
}

function init() {
    initDigitOptions();
    initCountryCodeOptions();
}

export {
    handlePhoneNumberDigitsChange,
    handleCountryCodeChange,
    handleLeadingZeroNumbersCheckboxChange,
    handleRefreshPreview,
    handleVCardUpload,
    parseVCard,
    showConfigAndTable,
    downloadUpdatedVCF,
    init
}
