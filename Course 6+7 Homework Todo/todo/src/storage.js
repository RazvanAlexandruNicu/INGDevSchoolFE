export function read() {
  const data = window.localStorage.getItem('todo-items');
  return data === null ? [] : JSON.parse(data);
}

function write(contacts) {
  const data = JSON.stringify(contacts);
  window.localStorage.setItem('todo-items', data);
}

export function append(todoItem) {
  const todoItems = read();
  todoItems.push(todoItem);
  write(todoItems);
}

export function remove(id) {
  const todoItems = read();
  const index = todoItems.findIndex(element => element.id === id);
  if (index !== -1) {
    todoItems.splice(index, 1);
    write(todoItems);
  }
}
