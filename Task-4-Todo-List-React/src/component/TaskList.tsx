import React from "react";
import { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  editText: string;
  setEditText: (text: string) => void;
  saveEditTask: (id: number) => void;
  cancelEditTask: (id: number) => void;
  completeTask: (id: number) => void;
  startEditTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskList = ({
  tasks,
  editText,
  setEditText,
  saveEditTask,
  cancelEditTask,
  completeTask,
  startEditTask,
  deleteTask,
}: TaskListProps): React.JSX.Element => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          {task.isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
              <div className="edit-actions">
                <button className="save" onClick={() => saveEditTask(task.id)}>
                  Save
                </button>
                <button
                  className="cancel"
                  onClick={() => cancelEditTask(task.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onClick={() => completeTask(task.id)}
                />
                <span>{task.name}</span>
              </div>
              <div className="task-actions">
                <button className="edit" onClick={() => startEditTask(task.id)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
