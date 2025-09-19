import React, { useState } from "react";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    await onUpdate(task._id, { completed: !task.completed });
    setIsCompleting(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      medium:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
      high: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    };
    return colors[priority] || colors.medium;
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && !task.completed;
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={handleToggleComplete}
            disabled={isCompleting}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? "bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600"
                : "border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500"
            } ${isCompleting ? "opacity-50" : ""}`}
          >
            {task.completed && (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <h3
              className={`font-medium ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p
                className={`mt-1 text-sm ${
                  task.completed
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {task.description}
              </p>
            )}

            <div className="flex items-center space-x-4 mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>

              {task.dueDate && (
                <span
                  className={`text-xs ${
                    isOverdue(task.dueDate)
                      ? "text-red-600 dark:text-red-400 font-medium"
                      : task.completed
                      ? "text-gray-400 dark:text-gray-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Due: {formatDate(task.dueDate)}
                  {isOverdue(task.dueDate) && " (Overdue)"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onUpdate(task._id, "edit")}
            className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="Edit task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Delete task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
