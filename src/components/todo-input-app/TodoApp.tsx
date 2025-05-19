import React, { useState } from "react";

interface TaskType {
  id: number;
  description: string;
}

const TodoApp = () => {
  const [inputVal, setInputVal] = useState<string>("");

  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setInputVal(val);
  };

  const handleAddTask = () => {
    const idList = taskList.map((task) => task.id);
    const maxId = idList?.length === 0 ? 0 : Math.max(...idList);

    const sampleTask: TaskType = {
      id: maxId + 1, // to keep track of unique numbers (not to use any external library)
      description: inputVal,
    };
    if (inputVal === "") {
      alert("Please add description of task");
      return;
    }
    setTaskList((prev) => [...prev, sampleTask]);
    setInputVal("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputVal?.length > 0) {
      const idList = taskList.map((task) => task.id);
      const maxId = idList?.length === 0 ? 0 : Math.max(...idList);

      const sampleTask: TaskType = {
        id: maxId + 1, // to keep track of unique numbers (not to use any external library)
        description: inputVal,
      };
      if (inputVal === "") {
        alert("Please add description of task");
        return;
      }
      setTaskList((prev) => [...prev, sampleTask]);
      setInputVal("");
    }
  };

  const handleDeleteTask = (id: number) => {
    const updatedList = taskList?.filter((task) => task.id !== id);
    setTaskList(updatedList);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      {/* Text type input field */}
      <input
        type="text"
        onChange={handleInputField}
        onKeyDown={handleKeyDown}
        value={inputVal}
        placeholder="Description"
      />
      {/* add task button */}
      <button type="button" onClick={handleAddTask} disabled={inputVal === ""}>
        Add Task
      </button>
      {/* List of tasks */}
      <div>
        {taskList?.map((task) => {
          return (
            <div
              key={task.id}
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <span> {task?.description}</span>
              <button type="button" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoApp;
