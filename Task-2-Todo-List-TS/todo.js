var TodoList = /** @class */ (function () {
    function TodoList(listElement) {
        this.items = [];
        this.nextId = 1;
        this.listElement = listElement;
    }
    TodoList.prototype.add = function (text) {
        var item = { id: this.nextId++, text: text, completed: false };
        this.items.push(item);
        this.renderItem(item);
    };
    TodoList.prototype.remove = function (id) {
        this.items = this.items.filter(function (item) { return item.id !== id; });
        var li = this.listElement.querySelector("li[data-id='".concat(id, "']"));
        if (li)
            this.listElement.removeChild(li);
    };
    TodoList.prototype.edit = function (id, newText) {
        var item = this.items.find(function (item) { return item.id === id; });
        if (item)
            item.text = newText;
        var li = this.listElement.querySelector("li[data-id='".concat(id, "']"));
        if (li) {
            var span = li.querySelector("span.task-text");
            if (span)
                span.textContent = newText;
        }
    };
    TodoList.prototype.toggleComplete = function (id) {
        var item = this.items.find(function (item) { return item.id === id; });
        if (item)
            item.completed = !item.completed;
        var li = this.listElement.querySelector("li[data-id='".concat(id, "']"));
        if (li)
            li.classList.toggle("completed", item === null || item === void 0 ? void 0 : item.completed);
    };
    TodoList.prototype.renderItem = function (item) {
        var _this = this;
        var li = document.createElement("li");
        li.setAttribute("data-id", item.id.toString());
        li._editing = false;
        var span = document.createElement("span");
        span.textContent = item.text;
        span.className = "task-text";
        span.onclick = function () {
            _this.toggleComplete(item.id);
        };
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "&#9998;";
        editBtn.className = "edit-btn";
        editBtn.onclick = function () {
            if (!li._editing) {
                var editInput = document.createElement("input");
                editInput.type = "text";
                editInput.value = span.textContent || "";
                li.replaceChild(editInput, span);
                editBtn.innerHTML = "&#10003;";
                editInput.focus();
                li._editing = true;
            }
            else {
                var editInput = li.querySelector("input[type='text']");
                if (editInput) {
                    _this.edit(item.id, editInput.value);
                    span.textContent = editInput.value;
                    li.replaceChild(span, editInput);
                }
                editBtn.innerHTML = "&#9998;";
                li._editing = false;
            }
        };
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&#128465;";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function () {
            _this.remove(item.id);
        };
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        this.listElement.appendChild(li);
    };
    return TodoList;
}());
var form2 = document.querySelector("#todo-form");
var input2 = document.querySelector("#todo-input");
var list2 = document.querySelector("#todo-list");
var todoList = new TodoList(list2);
form2.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input2.value.trim() !== "") {
        todoList.add(input2.value.trim());
        input2.value = "";
    }
});
