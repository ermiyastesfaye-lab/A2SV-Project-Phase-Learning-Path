const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value.trim() !== "") {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = input.value;
    span.className = "task-text";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "&#9998;";
    editBtn.className = "edit-btn";
    let editing = false;
    editBtn.onclick = function () {
      if (!editing) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = span.textContent;
        li.replaceChild(editInput, span);
        editBtn.innerHTML = "&#10003;";
        editInput.focus();
        editing = true;
      } else {
        const editInput = li.querySelector("input[type='text']");
        span.textContent = editInput.value;
        li.replaceChild(span, editInput);
        editBtn.innerHTML = "&#9998;";
        editing = false;
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&#128465;";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
      list.removeChild(li);
    };

    span.onclick = function () {
      li.classList.toggle("completed");
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = "";
  }
});
