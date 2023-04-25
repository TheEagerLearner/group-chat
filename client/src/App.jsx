import React,{useState} from 'react';

import io from 'socket.io-client';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material'
import Snack from './assets/components/Snack';
import InputBar from './assets/components/InputBar';
const socket = io('http://localhost:3002')

function App() {
  const [open, setOpen] = React.useState(true);
  const [sn_open,setSnOpen] = React.useState({open:false,text:"Success",sev:"success"});
  const [username,setUsername] = React.useState('PolarBear');
  const [room,setRoom] = React.useState('global');


  //Function to validate the Data entered in Dialog---------------
  const handleUserDataSubmit = ()=>{
    console.log(username,room)
    if(username.length==0 || room.length==0){
      setSnOpen({open:true,text:"Please Enter all the details",sev:"error"})
    }
    else{
      setSnOpen({open:true,text:"Start chatting with the room members",sev:"success"})  
      setOpen(false);
    }
  }

  //Handling Closing option for Dialog -------------------
  const handleClose = () => {
    setSnOpen(prevState => ({...prevState, open: false}));
    console.log(open)
  };


  // ---------Socket Logic and functions ---------------------
  //Eastablishing Socket Connection ------------
  socket.on('connect',()=>{
    console.log(socket.connected) //Grabbing Socket Status
  })

  //Recv Broadcasted Message back
  socket.on('rec',message=>{
    setMsg(message)  
  })

  const [inputValue, setInputValue] = useState('');
  const [msg,setMsg] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    //Sending Socket message to Server
    socket.emit('message',inputValue);
    setInputValue("")
  
  };


  return (
  <div>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          WELCOME TO group-chat 💬
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To start enter username and room-id
          </DialogContentText>

          <InputBar 
            label={"username"}
            value={username}
            onChange={(event)=>{setUsername(event.target.value)}}
          />

          <InputBar
            label={"room-id"}
            value={room}
            onChange={(event)=>{setRoom(event.target.value.toLowerCase())}}
          />

        </DialogContent>
        <DialogActions>
          <Button 
            type='submit' 
            onClick={handleUserDataSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    <Snack 
      sn_open={sn_open}
      handleClose={handleClose}
    />
  </div>  
  )
}

export default App
