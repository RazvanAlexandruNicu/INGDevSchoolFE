export function read() {
    const data = window.localStorage.getItem('ds-contacts');
    return data === null ? [] : JSON.parse(data);
}

function write(contacts) {
    const data = JSON.stringify(contacts);
    window.localStorage.setItem('ds-contacts', data);
}

export function append(contact) {
    const contacts = read();
    contacts.push(contact);
    write(contacts);
}

// Get the array of strings which contain
// information to be deleted from the localStorage
export function deleteEntry(l) {
    for(var i = 0; i < l.length; i++) {
        let contacts = read();
        let values = l[i].split(" ");
        let valueToCompare = ""
        for(var j = 0; j < values.length; j++) {
            if(values[j][0] == '&')
                break;
            if(valueToCompare == "")
                valueToCompare += values[j]
            else
                valueToCompare += " "+values[j]
        }
        console.log(valueToCompare);
        let new_contacts = contacts.filter(function (el) {
            return el.name != valueToCompare;
        });
        write(new_contacts);
    }
}

