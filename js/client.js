/*jshint esversion: 6*/

const net = require('net');
process.stdin.setEncoding('utf8');

const client = net.connect({port: 6969}, () => {
  console.log('You are now connected to the server');


  process.stdin.on('data', (chunk) => {
    if (chunk !== null) {
      client.write(chunk);
    }
  });

  client.on('data', (data) => {
    console.log(data.toString());
  });




});