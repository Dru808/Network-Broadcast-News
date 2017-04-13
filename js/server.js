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
    if(data.toString().charAt(0) === '*') {
      clientInfo.userName = data.toString();
  console.log('what is in room ', clientInfo.userName);
    }
    for(let i = 0; i < room.length; i++) {
      if(room[i].connection !== client && room[i].userName !== null) {
        room[i].connection.write(data);

      }

    }
  });
});

server.listen(6969, () => {
  console.log('server is up! wait...');
});