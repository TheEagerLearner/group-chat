import React,{useState} from 'react';

import io from 'socket.io-client';
import {Button,TextField} from '@mui/material'
const socket = io('http://localhost:3002')

function App() {
  
  socket.on('connect',()=>{
    console.log(socket.connected)
  })
  
  socket.on('rec',message=>{
    setMsg(message)  
  })

  const [inputValue, setInputValue] = useState('');
  const [msg,setMsg] = useState("")
  const handleChange = (event) => {
    setInputValue(event.target.value);
    // console.log(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message',inputValue);
    setInputValue("")
  
  };


  return (
  <div>
    <form onSubmit={handleSubmit}>
      <TextField id="filled-basic" label="message" variant="filled"  type="text" value={inputValue} onChange={handleChange} />
      <Button variant="contained" type="submit">Submit</Button>
    </form>
    <h1>{msg}</h1>  
  </div>  
  )
}

export default App
