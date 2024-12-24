import React, { useState, SetStateAction } from "react";

export default function ToDo() {
  const [task, setTask] = useState("");
  // const [isCompleted, setisCompleted] = useState(false);
  const [taskArray, setTaskArray] = useState<
    { task: string; isCompleted: boolean; id: number }[]
  >([]);
  const [isUpdate, setUpdate] = useState(false);
  const [updateAt, setUpdateIndex] = useState<number | null>(null);

  console.log(taskArray);

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setTask(event.target.value);
  };

  const handleUpdate = (index: number) => {
    setTask(taskArray[index].task);
    setUpdate(true);
    setUpdateIndex(index);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      const updatedTasks = taskArray.map((item, index) =>
        index === updateAt ? { task: task.trim(), isCompleted: false, id: item.id } : item
      );
      setTaskArray(updatedTasks); // Update the state with the new array
      setTask(""); // Clear the input field
      setUpdate(false); // Exit update mode
    } else {
      if (task.trim() !== "" && taskArray.some((item) => item.task === task)) {
        alert("The todo is already present.");
      } else if (task.trim() !== "") {
        setTaskArray([
          ...taskArray,
          { task: task.trim(), isCompleted: false, id: Date.now() },
        ]);
        setTask("");
      }
    }
  };

  const handleComplete = (index : number) => {

    setTaskArray(
      taskArray.map((item) =>
        item.id === index ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <div>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && task) {
              handleSubmit();
            }
          }}
          type="text"
          value={task}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>add</button>
        {""}
        <ul>
          {taskArray
            .filter((item) => item.task !== "") // Ensures non-empty tasks
            .map((item) => (
              <div key={item.id}
              
               onClick={() => handleComplete(item.id)}>
                <li
                className={`${
                  item.isCompleted
                    ? " line-through"
                    : " none"
                }`}
                
                >{item.task}</li> 
                
                <span
                  onClick={() => {
                    setTaskArray(taskArray.filter((t) => t.id !== item.id));
                  }}
                >
                  {" "}
                  delete{" "}
                </span>
                <span
                  onClick={() => {
                    handleUpdate(taskArray.findIndex((t) => t.id === item.id));
                  }}
                >
                  {" "}
                  Update{" "}
                </span>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}
