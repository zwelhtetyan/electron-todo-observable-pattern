/*
add todo
update todo
delete todo
toggle todo
*/

class TodoStore {
  #todoData = [];

  updateFunc = null;

  get getTodos() {
    return this.#todoData;
  }

  set setTodos(todoData) {
    this.#todoData = todoData;
  }

  addTodo(taskName) {
    const newTodo = {
      id: new Date().getTime().toString(),
      taskName,
      done: false,
    };

    this.#todoData = [newTodo, ...this.#todoData];
    this.updateFunc && this.updateFunc(this.#todoData);

    notifyMe('Successfully added!', taskName);
  }

  updateTodo(id, taskName) {
    this.#todoData = this.#todoData.map((todo) =>
      todo.id === id ? { ...todo, taskName } : todo
    );

    this.updateFunc && this.updateFunc(this.#todoData);
  }

  toggleTodo(id) {
    this.#todoData = this.#todoData.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );

    this.updateFunc && this.updateFunc(this.#todoData);
  }

  removeTodo(id) {
    const idxToRemove = this.#todoData.findIndex(
      (todo) => todo.id.toString() === id.toString()
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
todoStore.subscribe((data) => {
  console.log(data);

  updateTodoUI(data);

  saveDataToLS('todoData', data);
});

// add task
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');

addTodoBtn.addEventListener('click', () => {
  const taskName = todoInput.value;

  if (taskName.trim() === '') return;

  todoStore.addTodo(taskName);
  todoInput.value = '';
});

// display todos
const todoContainer = document.getElementById('todo-container');
function updateTodoUI(data) {
  todoContainer.innerHTML = '';

  data.forEach((data) => {
    const liTag = document.createElement('li');
    const checkInput = document.createElement('input');
    const taskNameSpan = document.createElement('span');
    const deleteBtn = document.createElement('button');

    checkInput.type = 'checkbox';
    checkInput.checked = data.done ? true : false;
    taskNameSpan.textContent = data.taskName;
    taskNameSpan.contentEditable = true;
    deleteBtn.textContent = `❌`;
    deleteBtn.style.cssText = 'font-size: 12px; margin-left: 1rem;';

    // update todo
    taskNameSpan.addEventListener('blur', () => {
      todoStore.updateTodo(data.id, taskNameSpan.textContent);
    });

    // toggle todo
    checkInput.addEventListener('click', () => {
      todoStore.toggleTodo(data.id);
    });

    // delete todo
    deleteBtn.addEventListener('click', () => {
      todoStore.removeTodo(data.id);
    });

    liTag.append(checkInput, taskNameSpan, deleteBtn);

    todoContainer.appendChild(liTag);
  });
}

function getDataFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveDataToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function init() {
  const todoData = getDataFromLS('todoData') || todoStore.getTodos;

  todoStore.setTodos = todoData;

  updateTodoUI(todoData);
}

// register serviceWorker
navigator.serviceWorker.register('sw.js');

function notifyMe(title, bodyText) {
  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification

    // const notification = new Notification(title, {
    //   body: bodyText,
    // });

    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, {
        body: bodyText,
      });
    });
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        // const notification = new Notification(title, {
        //   body: bodyText,
        // });

        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, {
            body: bodyText,
          });
        });
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

init();
