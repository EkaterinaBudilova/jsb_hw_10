'use strict';
const counter = document.querySelector('span.counter');
const errors = document.querySelector('output.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
});

function fn() {
  connection.close(1000);
}

document.addEventListener('beforeunload', fn)

connection.addEventListener('message', event => {
  const msg = JSON.parse(event.data);
  counter.innerHTML = msg.connections;
  errors.innerHTML = msg.errors;
});
