import {USER_ICON} from "./constants.js";
import ICAL from "ical.js";

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

        const tableBody = document.getElementById("contactTableBody");
        tableBody.innerHTML = "";

        vCards.forEach(function (contact) {
            if (contact.trim() !== "") {
                let {fullName, phoneNumbers, image} = parseVCard(contact);
                let row = document.createElement("tr");
                const icon = `<img src="${image || USER_ICON}" class="img-fluid rounded-circle" width="75" alt="Icon">`;
                const phoneNumbersLength = phoneNumbers.length;
                row.innerHTML = `<td class='text-center' rowspan=${phoneNumbersLength}>${icon}</td>`;
                row.innerHTML += `<td class='text-center' rowspan=${phoneNumbersLength}>${fullName}</td>`;
                row.innerHTML += `<td class='text-center'>${phoneNumbers[0] || "N/A"}</td>`;
                tableBody.appendChild(row);
                phoneNumbers.slice(1).forEach((phoneNumber) => {
                    let phoneNumberRow = document.createElement("tr");
                    phoneNumberRow.innerHTML = `<td class='text-center'>${phoneNumber}</td>`;
                    tableBody.appendChild(phoneNumberRow);
                });
            }
            document.getElementById("contactsContainer").classList.remove("d-none");
        });
    };

    reader.readAsText(file);
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

export {
    handleVCardUpload,
    parseVCard
}
