'use strict'
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
const btnSubmit = document.querySelector('button.message-submit');
const status = document.querySelector('h2.chat-status');
const msg = document.querySelector('div.message span.message-text');
console.log(status.innerHTML);

connection.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
  btnSubmit.removeAttribute('disabled');
  status.textContent = 'Пользователь появился в сети';
});

connection.addEventListener('message', event => {
  if(event.data === '...') {
    status.textContent = 'Пишет...'
  } else {
    status.textContent = '';
    msg.textContent = event.data;
    
  }
});