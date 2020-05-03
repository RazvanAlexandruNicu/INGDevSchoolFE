export function read() {
    const data = window.localStorage.getItem('todo-items');
    return data === null ? [] : JSON.parse(data);
}

function write(contacts) {
    const data = JSON.stringify(contacts);
    window.localStorage.setItem('todo-items', data);
}

export function append(contact) {
    const contacts = read();
    contacts.push(contact);
    write(contacts);
}


