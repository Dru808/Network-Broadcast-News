/*jshint esversion: 6*/

const net = require('net');
const room = [];
const server = net.createServer((client) => {

  //This is the very first code that runs as soon as a new connection is made. The code thens runs down the line.

  const clientInfo = {
    connection: client,
    userName: null,
  };

  room.push(clientInfo);
  client.write('Please enter user name with an "*" as the first Character');

  client.on('data', (data) => {

    console.log(data.toString());

    //check if user wants to set username
    if(data.toString().charAt(0) === '*') {
      //set username
      clientInfo.userName = data.toString().trim();
      let joinMessage = `${clientInfo.userName} has joined the room`;
      console.log('who is in room ', clientInfo.userName);

      //writes joinMessage to everyon except the person who wrote the message
      for(let i = 0; i < room.length; i++) {
        if(room[i].connection !== client && room[i].userName !== null) {
          room[i].connection.write(joinMessage);
        }
      }
      return; //stops execution
    }

    for(let i = 0; i < room.length; i++) {

      if(room[i].connection !== client && room[i].userName !== null) {

        //while this code is in the for loop, the server writes to all users
        room[i].connection.write(`${clientInfo.userName} says: ${data}`);
      }
    }
  });
});

server.listen(6969, () => {
  console.log('server is up! wait...');
});