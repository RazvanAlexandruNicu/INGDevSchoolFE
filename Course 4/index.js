import { read, append, remove, edit} from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-edit').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-edit').addEventListener('change', onChangeDelete);
  navigator.serviceWorker.register('sw.js')
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  data.set('id', Date.now());
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onSubmitDelete(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const contacts = read();
  data.getAll('id').forEach(id => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      remove(contact);
    }
  });
  render();
}

function onChangeDelete(event) {
  const { form } = event.target;
  const data = new FormData(form);
  const hasChecked = data.getAll('id').length > 0;
  form.elements.delete.disabled = !hasChecked;
}


function fieldset_readonly(buton, displayValue) {
  const field_set_elems = Array.from(buton.parentNode.elements);
  field_set_elems.filter(el => el.name === 'edit')[0].hidden = !displayValue;
  field_set_elems.filter(el => el.name === 'save')[0].hidden = displayValue;
  field_set_elems.filter(el => el.name === 'cancel')[0].hidden = displayValue;
  field_set_elems.filter(el => el.nodeName === "INPUT")
            .slice(1,4).forEach(el => el.readOnly = displayValue);
}

function restore_fields(buton) {
  console.log(buton.value)
  const field_set_elems = Array.from(buton.parentNode.elements);
  const contacts = read();
  const index = contacts.findIndex(element => element.id === buton.value);
  const values = [contacts[index].name, contacts[index].email, contacts[index].phone];
  field_set_elems.filter(el => el.nodeName === "INPUT")
            .slice(1,4).forEach((el, index) => el.value = values[index]);
}

function onCancelFields(event) {
  const buton = event.target;
  const field_set_elems = Array.from(buton.parentNode.elements);
  fieldset_readonly(buton, true);
  restore_fields(buton);
}

function onSaveFields(event) {
  const buton = event.target;
  const field_set_elems = Array.from(buton.parentNode.elements);
  let values = []
  field_set_elems.filter(el => el.nodeName === "INPUT")
            .slice(1,4).forEach((el,index) => values[index] = el.value);
  edit(values, event.target.value);
  fieldset_readonly(buton, true);
}

function onEditFields(event) {
  const buton = event.target;
  const field_set = Array.from(buton.parentNode.elements);
  fieldset_readonly(buton, false);
}

function onFieldClick(event) {
 // console.log(event.target);
  const field = event.target;
  if(field.readOnly) {
    const checkbox = Array.from(field.parentNode.childNodes).filter(el => el.type === 'checkbox')[0];
    checkbox.checked ^= 1;
    const { form } = checkbox;
    const data = new FormData(form);
    const hasChecked = data.getAll('id').length > 0;
    form.elements.delete.disabled = !hasChecked;
  }
}

function render() {
  const contacts = read();
  const items = contacts.map(
    contact => `
      <li>
        <fieldset name="fs">
          <label>
            <input type="checkbox" name="id" value="${contact.id}">
            <input type="text" value="${contact.name}" name="info" style="width:auto;" readonly>
            <input type="text" value="${contact.email}" name="info" readonly>
            <input type="text" value="${contact.phone}" name="info" readonly>
          </label>         
          <button type="button" value="${contact.id}" name="edit"> Edit </button>
          <button type="button" value="${contact.id}" name="save" hidden> Save </button>
          <button type="button" value="${contact.id}" name="cancel" hidden> Cancel </button>
        </fieldset>
      </li>
    `
  );

  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-edit').hidden = contacts.length === 0;
  
  
  Array.from(document.getElementById('form-edit').elements.edit).forEach(
    edit => edit.addEventListener('click', onEditFields) 
  );
  Array.from(document.getElementById('form-edit').elements.save).forEach(
    edit => edit.addEventListener('click', onSaveFields) 
  );
  Array.from(document.getElementById('form-edit').elements.cancel).forEach(
    edit => edit.addEventListener('click', onCancelFields) 
  );
  Array.from(document.getElementById('form-edit').elements.info).forEach(
    edit => edit.addEventListener('click', onFieldClick) 
  );
}



