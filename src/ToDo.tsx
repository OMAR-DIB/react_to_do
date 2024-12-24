import { SetStateAction, useState } from "react";

export default function ToDo() {
  const [task, setTask] = useState("");
  const [taskArray, setTaskArray] = useState<string[]>([]);
  const [isUpdate, setUpdate] = useState(false);
  const [updateAt, setUpdateIndex] = useState<number | null>(null);

  console.log(taskArray);

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTask(event.target.value);
  };

  const handleUpdate = (index: number) => {
    setTask(taskArray[index]);
    setUpdate(true);
    setUpdateIndex(index);
  };

  const handleSubmit = () => {
    if (isUpdate){
      const updatedTasks = taskArray.map((item, index) =>
        index === updateAt ? task : item
      );

      setTaskArray(updatedTasks); // Update the state with the new array
      setTask(""); // Clear the input field
      setUpdate(false); // Exit update mode
    }else {

      if (task !== "" && taskArray.includes(task)) {
        alert("the todo is presented before");
      } else if (task !== "") {
        setTaskArray([...taskArray, task]);
        setTask("");
      }
    }
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
        <button onClick={  handleSubmit}>add</button>
        {""}
        <ul>
          {taskArray
            .filter((item) => item !== "")
            .map((item, index) => (
              <div key={index}>
                <li>{item} </li>
                <span
                  key={index}
                  onClick={() => {
                    setTaskArray(taskArray.filter((t) => t !== item));
                  }}
                >
                  {" "}
                  delete{" "}
                </span>
                <span
                  onClick={() => {
                    handleUpdate(index);
                    // setTaskArray(taskArray.filter((t) => t !== item));
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
