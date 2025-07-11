interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

class TodoList {
  private items: TodoItem[] = [];
  private nextId = 1;
  private listElement: HTMLElement;

  constructor(listElement: HTMLElement) {
    this.listElement = listElement;
  }

  add(text: string): void {
    const item: TodoItem = { id: this.nextId++, text, completed: false };
    this.items.push(item);
    this.renderItem(item);
  }

  remove(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    const li = this.listElement.querySelector(`li[data-id='${id}']`);
    if (li) this.listElement.removeChild(li);
  }

  edit(id: number, newText: string): void {
    const item = this.items.find((item) => item.id === id);
    if (item) item.text = newText;
    const li = this.listElement.querySelector(`li[data-id='${id}']`);
    if (li) {
      const span = li.querySelector("span.task-text") as HTMLElement;
      if (span) span.textContent = newText;
    }
  }

  toggleComplete(id: number): void {
    const item = this.items.find((item) => item.id === id);
    if (item) item.completed = !item.completed;
    const li = this.listElement.querySelector(`li[data-id='${id}']`);
    if (li) li.classList.toggle("completed", item?.completed);
  }

  renderItem(item: TodoItem): void {
    const li = document.createElement("li");
    li.setAttribute("data-id", item.id.toString());
    (li as any)._editing = false;

    const span: HTMLElement = document.createElement("span");
    span.textContent = item.text;
    span.className = "task-text";
    span.onclick = () => {
      this.toggleComplete(item.id);
    };

    const editBtn: HTMLElement = document.createElement("button");
    editBtn.innerHTML = "&#9998;";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      if (!(li as any)._editing) {
        const editInput: HTMLInputElement = document.createElement("input");
        editInput.type = "text";
        editInput.value = span.textContent || "";
        li.replaceChild(editInput, span);
        editBtn.innerHTML = "&#10003;";
        editInput.focus();
        (li as any)._editing = true;
      } else {
        const editInput = li.querySelector(
          "input[type='text']"
        ) as HTMLInputElement;
        if (editInput) {
          this.edit(item.id, editInput.value);
          span.textContent = editInput.value;
          li.replaceChild(span, editInput);
        }
        editBtn.innerHTML = "&#9998;";
        (li as any)._editing = false;
      }
    };

    const deleteBtn: HTMLElement = document.createElement("button");
    deleteBtn.innerHTML = "&#128465;";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      this.remove(item.id);
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    this.listElement.appendChild(li);
  }
}

const form2 = document.querySelector("#todo-form") as HTMLFormElement;
const input2 = document.querySelector("#todo-input") as HTMLInputElement;
const list2 = document.querySelector("#todo-list") as HTMLElement;
const todoList = new TodoList(list2);

form2.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input2.value.trim() !== "") {
    todoList.add(input2.value.trim());
    input2.value = "";
  }
});
