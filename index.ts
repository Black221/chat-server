import * as dotenv from "dotenv";
import express, { Request, Response , Application } from 'express';
import cors from "cors";
import { createServer } from 'node:http';
import { Server } from "socket.io";

const app: Application = express();
const server = createServer(app);
dotenv.config({ path: '../config/.env' });


const io = new Server(server, {
    cors: {
      origin: "*",
    }
})

var userList: any [] = [];
var groupList: any [] = [];
let PORT: number = parseInt(process.env.PORT as string, 10);


io.on('connection', function(socket){

    console.log('User Conncetion');
  
    socket.on('connect user', function(id,user){
      console.log("Connected user ");
      io.emit('connect user', id,user);
    });
  
    socket.on('on typing', function(id,typing){
      io.emit('on typing', id,typing);
    });
  
    socket.on('chat message', function(id,msg){
      io.emit('chat message',id, msg);
    });
   socket.on('Group', function(Group){
       groupList.push(Group)
      io.emit('Group',Group);
      io.emit('AllGroup',groupList);
    });
    
     socket.on('AllGroup', function(Group){
      io.emit('AllGroup',groupList);
    });
    socket.on('SingUp', function(id,User){
       for (let i = 0; i < userList.length; i++) { 
          if (userList[i]['email']==User['email']) {
             io.emit('SingUp', id,false);
              break;
          }else if(i==userList.length-1){
             userList.push(User);
             io.emit('SingUp', id,true);
             io.emit('get all user', userList);    
          }
        }
       if(userList.length==0){
             userList.push(User);
             io.emit('SingUp', id,true);
             io.emit('get all user', userList);
          }
    });
  
  
    socket.on('get all user', function(Users){
      io.emit('get all user', userList);
    });
  
      socket.on('SingIn', function(id,User){
        for (let i = 0; i < userList.length; i++) { 
          if (userList[i]['email']==User['email'] && userList[i]['password']==User['password'] ) {
             io.emit('SingIn', id,userList[i]);
              break;
          }
        }
    });
  
      socket.on('dataUpdate', function(User){
        console.log("dataUpdate"+User)
        for (let i = 0; i < userList.length; i++) { 
          if (userList[i]['id']==User['id']) {
            userList[i]['isOnline']=User['isOnline'];
             // io.emit('dataUpdate',userList[i]);
             io.emit('get all user', userList);
              break;
          }
        }
    });
  
     socket.on('dataProfile', function(User){
        console.log("dataUpdate"+User)
        for (let i = 0; i < userList.length; i++) { 
          if (userList[i]['id']==User['id']) {
            userList[i]['image']=User['image'];
            userList[i]['name']=User['name'];
            userList[i]['password']=User['password'];
             io.emit('get all user', userList);
              break;
          }
        }
    });
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});