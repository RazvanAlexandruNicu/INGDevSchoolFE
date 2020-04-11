import { append, read, deleteEntry } from './storage.js'

export function init() {
    window.addEventListener('DOMContentLoaded', onLoad);
}

function onLoad() {
    console.log("on load")
    document.getElementById("form-add").addEventListener('submit', onSubmitAdd);
    document.getElementById("form-delete").addEventListener('submit', onSubmitDelete);
    render();
}

function eventsForButtons() {
    var elements = document.getElementsByClassName("check");
    for (var i = 0; i < elements.length; i++) {
        console.log(elements[i]);
        elements[i].addEventListener('change', displayDeleteButton);
    }
}

function displayDeleteButton() {
    document.getElementById("deletebutton").hidden = checkedBoxes().length === 0;
}

function onSubmitAdd(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const contact = Object.fromEntries(data);
    append(contact);
    event.target.reset();
    render();
}

function onSubmitDelete(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const contact = Object.fromEntries(data);
    // Get all elements with class 'check' - all the checkbuttons
    // which are checked
    let l = checkedBoxes();
    if(l.length > 0) {
        deleteEntry(l);
        render();
    }
}

function checkedBoxes() {
    const array = document.getElementsByClassName("check");
    var arrayLength = array.length;
    let l = []
    for (var i = 0; i < arrayLength; i++) {
        // if it is checked, look at id and find the text associated with it
        if(array[i].checked) {
            let my_id = array[i].id;
            let sub_id = my_id.substring(4, my_id.length);
            let text = document.getElementById("text"+sub_id).innerHTML;
            l.push(text)
        }
    }
    return l;
}

function render() {
    const contacts = read();
    const list = document.getElementById('list');
    const items = contacts.map((contact,index) => `<li><input type="checkbox" name="delete" class="check" id="elem${index}">
                    <span id="text${index}">${contact.name} &lt;${contact.email}&gt. (${contact.phone})</span></li>`)
    list.innerHTML = items.join('');
    const formDelete = document.getElementById('form-delete');
    formDelete.hidden = contacts.length === 0;
    const deleteButton = document.getElementById('deletebutton');
    deleteButton.hidden = checkedBoxes().length === 0;
    // Add listeners for the new entered buttons
    eventsForButtons();
}