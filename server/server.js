const io = require('socket.io')(3002,{
    cors:{
        origin:"*"
    }
});

io.on('connection',socket=>{
    // console.log(socket.id)
    socket.on('message',message=>{
        socket.broadcast.emit('rec',message)
    })
})
