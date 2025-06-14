import React, { useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillDelete}  from "react-icons/ai";
import Modal from './Modal';
import Swal from 'sweetalert2'
import Checkbox from '@mui/material/Checkbox';
import { DialogContent, DialogContentText, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { TbBoxMargin } from 'react-icons/tb';
import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import { createTheme } from '@mui/material/styles';
import { green,pink } from '@mui/material/colors';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FiPlus } from "react-icons/fi";
import { Label, Palette } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import AccountCircle from '@mui/icons-material/AccountCircle';





const App = () => {

  



  const [changetask, setChangetask]=useState("");
  const [open2, setOpen2]=useState(false);
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
      Swal.fire("Please enter a task");
      return;
    } else if (flag === 0) {
      console.log("good THING POOR");
      Swal.fire("Please enter a proper task.");
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
  // const editagain = (index) => {
  //   let cpy = [...finalTask];
  //   const newTask = prompt("Edit Task", finalTask[index].task);
  // }
  // Edit a task
  const editHandler = (index,changetask) => {
    
    let cpy = [...finalTask];
    
    cpy[index].task = changetask;
      setFinalTask(cpy);
  }
    return(
      <Dialog open={open2} key="index">
        
        <DialogContentText>
          Edit the task.
        </DialogContentText>
        <TextField value={finalTask[index].task}
          onChange={(e) => setChangetask(e.target.value)}
        />
        <Button onClick={()=>{editHandler(index,changetask)}}  disableRipple>Ok</Button>
        <Button onClick={()=>}>Cancel</Button>
        
      </Dialog>
    )}




  //   if (newTask !== null && newTask.trim() !== "") {
  //     cpy[index].task = newTask;
  //     setFinalTask(cpy);
  //   }
  // };

  // Render task list
  const rendertask = finalTask.length === 0 ? (
    <h5>No task! HURRAY!</h5>
  ) : (
    finalTask.map((item, index) => (
      <div key={index}>
        
        <div id="thetask">
          <div id="left">
            
            <Typography variant='h7' id="addedTask">{index + 1}. {item.task}</Typography>
          </div>
          <div> 
            <Checkbox   disableRipple sx={{marginRight:'35px'}}/> 
            <Button variant="text"  onClick={() => editHandler(index)} disableRipple>
              <AiFillEdit />
            </Button>{" "}
            {/* <Button variant="text"  onClick={() => editModal(index)}  data-swal-toast-template="#my-template" disableRipple> */}
            <Button variant="text"  onClick={() => {setOpen2(true)}} disableRipple > 
              <AiFillDelete/>
            </Button>



            {/* Modal per task */}
            <Modal
            id="dialogopen"
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
    
    <Paper elevation={24}  id="outerbox" sx={{margin:"60px 100px 100px"}}>
    
      <AppBar position="static" id="todo">To-Do List</AppBar>
      <form onSubmit={buttonClick}>
        <Input  
          type="text"
          color='black'
          size="60"
          placeholder="Enter task"
          value={task}
  
          
          
          onChange={(e) => setTask(e.target.value)

          }
        />{" "}
        <Button size="medium"  aria-label="add" disableRipple disableElevation variant='outlined' color='error' sx={{border:"1px #FF8DA1 solid",borderRadius:"50px", maxWidth:"30px"}}   type='submit'>
  <FiPlus />
</Button>
      </form>

      <div>{rendertask}</div>
    </Paper>
  );
};

export default App;