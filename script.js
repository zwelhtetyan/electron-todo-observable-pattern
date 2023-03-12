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

const todoStore = new TodoStore();

todoStore.subscribe(logger);

function logger(data) {
  console.log(data);
}
