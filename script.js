/* add task
update task
delete task
toggle task */

class TodoStore {
  #todoData = [];

  updateFunc = null;

  get getTodos() {
    return this.#todoData;
  }

  addTodo(taskName) {
    const newTodo = {
      id: new Date().getTime().toString(),
      taskName,
      done: false,
    };

    this.#todoData = [newTodo, ...this.#todoData];
    this.updateFunc && this.updateFunc(this.#todoData);
  }

  removeTodo(id) {
    const idxToRemove = this.#todoData.findIndex(
      (todo) => todo.id === id.toString()
    );

    if (idxToRemove === -1) return;

    this.#todoData.splice(idxToRemove, 1);
    this.updateFunc && this.updateFunc(this.#todoData);
  }

  subscribe(func) {
    this.updateFunc = func;
  }
}

// initialize store
const todoStore = new TodoStore();

// subscribe store to update ui
todoStore.subscribe(updateTodoUI);

// add todo ui
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');

addTodoBtn.addEventListener('click', () => {
  const taskName = todoInput.value;

  if (taskName.trim() === '') return;

  todoStore.addTodo(taskName);
  todoInput.value = '';
});

// ui
const todoContainer = document.getElementById('todo-container');
function updateTodoUI(data) {
  todoContainer.innerHTML = '';

  data.forEach((data) => {
    const liTag = document.createElement('li');
    const taskNameSpan = document.createElement('span');
    const deleteIconSpan = document.createElement('span');

    taskNameSpan.textContent = data.taskName;
    deleteIconSpan.textContent = `❌`;
    deleteIconSpan.style.cssText = 'font-size: 12px; margin-left: 1rem;';

    deleteIconSpan.addEventListener('click', () => {
      todoStore.removeTodo(data.id);
    });

    liTag.append(taskNameSpan, deleteIconSpan);

    todoContainer.appendChild(liTag);
  });
}

updateTodoUI(todoStore.getTodos);
