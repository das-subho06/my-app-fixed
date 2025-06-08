import React, { useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillDelete}  from "react-icons/ai";
import Modal from './Modal';
import Swal from 'sweetalert2'
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const App = () => {

  const [task, setTask] = useState("");                 // input field
  const [finalTask, setFinalTask] = useState([]);       // list of tasks
  const [modalarr, setModalarr] = useState([]);         // tracks which modal is open

  // Add a task
  const buttonClick = (event) => {
    event.preventDefault();
    let flag = 0;
    for (let i = 0; i < task.length; i++) {
      const ch = task.charAt(i);
      if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
        flag = 1;
        break;
      }
    }

    if (task.trim() === "") {
      Swal.fire("pls enter a task");
      return;
    } else if (flag === 0) {
      console.log("good THING POOR");
      Swal.fire({
  title: "Oops",
  text: "Enter a task right now",
  icon: "warning"
});
      return;
    }

    setFinalTask([...finalTask, { task }]);
    setModalarr([...modalarr, false]);
    setTask("");  // clear input field
  };

  // Open modal for a specific task
  const editModal = (index) => {
    let cpym = [...modalarr];
    cpym[index] = true;
    setModalarr(cpym);
  };

  // Delete a task
  const deleteHandler = (index) => {
    let cpy = [...finalTask];
    cpy.splice(index, 1);
    setFinalTask(cpy);

    let newModals = [...modalarr];
    newModals.splice(index, 1);
    setModalarr(newModals);
  };

  // Edit a task
  const editHandler = (index) => {
    let cpy = [...finalTask];
    const newTask = prompt("Edit Task", finalTask[index].task);
    if (newTask !== null && newTask.trim() !== "") {
      cpy[index].task = newTask;
      setFinalTask(cpy);
    }
  };

  // Render task list
  const rendertask = finalTask.length === 0 ? (
    <h5>No task! HURRAY!</h5>
  ) : (
    finalTask.map((item, index) => (
      <div key={index}>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />
        <div id="thetask">
          <div id="left">
            <Checkbox  defaultChecked />
            <Typography variant='h4' id="addedTask">{index + 1}. {item.task}</Typography>
          </div>
          <div> 

            <Button variant="contained" className="buttonHover" onClick={() => editHandler(index)}>
              <AiFillEdit />
            </Button>{" "}
            <Button variant="contained" className="buttonHover" onClick={() => editModal(index)}>
              <AiFillDelete/>
            </Button>

            {/* Modal per task */}
            <Modal
              key={index}
              open={modalarr[index]}
              close={() => {
                let newArr = [...modalarr];
                newArr[index] = false;
                setModalarr(newArr);
              }}
              onaction={() => {
                deleteHandler(index);
                let newArr = [...modalarr];
                newArr[index] = false;
                setModalarr(newArr);
              }}
            />
          </div>
        </div>
        <hr />
      </div>
    ))
  );

  // JSX return
  return (
    
    <div>
    
      <Typography variant='h1' id="todo">To-Do List</Typography>
      <form onSubmit={buttonClick}>
        <Input  
          type="text"
          size="50"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />{" "}
        <Button variant="contained" className="buttonHover" type="submit">
          <AiOutlinePlus />
        </Button>
      </form>

      <div>{rendertask}</div>
    </div>
  );
};

export default App;