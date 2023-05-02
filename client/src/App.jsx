import React from 'react';
import io from 'socket.io-client';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material'
import Snack from './assets/components/Snack';
import InputBar from './assets/components/InputBar';
import BtmTextField from './assets/components/BtmTextField';
import Chat from './assets/components/Chat';
import { animateScroll } from 'react-scroll';

import './App.css';

const socket = io('http://localhost:3002')

function App() {
  const [open, setOpen] = React.useState(true);
  const [sn_open,setSnOpen] = React.useState({open:false,text:"Success",sev:"success"});
  const [username,setUsername] = React.useState('PolarBear');
  const [room,setRoom] = React.useState('global');
  const [inputValue, setInputValue] = React.useState('');
  const [messages,setMessages] = React.useState([])
  const bottomRef = React.useRef(null);


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
    // console.log(open)
  };


  // ---------Socket Logic and functions ---------------------
  //Eastablishing Socket Connection ------------
  socket.on('connect',()=>{
    console.log("connection eastablished with server") //Grabbing Socket Status
    // console.log(socket.connected)
  })


  //Recv Broadcasted Message back
  socket.on('rec',message=>{
    console.log(message)
    setMessages([...messages,message])
  })

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = {
      message:inputValue,
      author:username,
      room:room
    }

    //Sending Socket message to Server
    // setMessages([...messages,message])
    socket.emit('message',message);
    setInputValue("")
  
  };
      React.useEffect(() => {
          bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
      }, [messages]);
  
  
      return (
  <div className='blue-950'>
  
  <div id='messages-container' ref={bottomRef} className='pb-28 overflow-y-scroll h-screen'>

      <ul className='pb-28'>
        {messages.map((message) => (
          <li>
            <Chat
              me={message.author === username} 
              author={message.author}
              message={message.message}
            />
          </li>
        ))}
      </ul>      

  </div>
      <BtmTextField 
        value={inputValue}
        onChange={(event)=>{setInputValue(event.target.value)}}
        onSubmit={handleSubmit}
      />
    

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
