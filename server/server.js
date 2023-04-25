const io = require('socket.io')(3002,{
    cors:{
        origin:"*"
    }
});

io.on('connection',socket=>{
    // console.log(socket.id)
    console.log("connection eastablished with client")
    socket.on('message',message=>{
            console.log(message)
            io.emit('rec',message)
    
    })
})
