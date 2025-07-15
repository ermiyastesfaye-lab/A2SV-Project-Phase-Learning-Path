import { useState } from "react";
import { Task } from "../types/Task";
import TaskList from "./TaskList";

const TodoList = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTask,
        completed: false,
        isEditing: false,
      },
    ]);
    setNewTask("");
  };

  const startEditTask = (id: number) => {
    const currTask = tasks.find((task) => task.id === id);
    if (!currTask) return;
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: true }
          : { ...task, isEditing: false }
      )
    );
    setEditText(currTask.name);
  };

  const saveEditTask = (id: number) => {
    if (!editText.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: editText, isEditing: false } : task
      )
    );
    setEditText("");
  };

  const cancelEditTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
    setEditText("");
  };

  const deleteTask = (id: number) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const completeTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <TaskList
        tasks={tasks}
        editText={editText}
        setEditText={setEditText}
        saveEditTask={saveEditTask}
        cancelEditTask={cancelEditTask}
        completeTask={completeTask}
        startEditTask={startEditTask}
        deleteTask={deleteTask}
      />

      <div className="status">
        {tasks.filter((t) => !t.completed).length} tasks remaining
      </div>
    </div>
  );
};

export default TodoList;
