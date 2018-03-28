'use strict'
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
const btnSubmit = document.querySelector('button.message-submit');
const status = document.querySelector('.chat-status');

const msgContent = document.querySelector('.messages-content');
const mes = document.querySelector('.message').cloneNode(true);
const msText = mes.querySelector('.message-text');

const mesPers = document.querySelector('.message-personal').cloneNode(true);

const msTimestamp = mesPers.querySelector('.timestamp');
const mesStatus = document.querySelector('.message-status').cloneNode(true);
const loading = document.querySelector('.loading').cloneNode(true);

const input = document.querySelector('.message-input');
//console.log(status.innerHTML);

connection.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
  status.textContent = ''; 
  status.textContent = status.dataset.online;
  btnSubmit.removeAttribute('disabled');
  mesStatus.textContent = 'Пользователь появился в сети';
  msgContent.appendChild(mesStatus);
});

connection.addEventListener('message', event => {
  console.log(event.data);
  if(event.data === '...') {
    loading.textContent = 'Пишет...';
    mes.appendChild(loading);
  } else {
      mes.textContent = event.data;
      msgContent.appendChild(mes);
    
//    msText.textContent = event.data;
//    msTimestamp.textContent = new Date().getHours() + ':' + new Date().getMinutes();
//    mes.appendChild(msText);
//    mes.appendChild(msTimestamp);
//    msgContent.appendChild(mes);
  }
});

function submit(event) {
  event.preventDefault();
  mesPers.textContent = input.value;
  
  msgContent.appendChild(mesPers);
  connection.send(input.value);
  
}

btnSubmit.addEventListener('click', submit);
connection.addEventListener('close', () => {
  console.log('Вебсокет-соединение закрыто');
  status.textContent = ''; 
  status.textContent = status.dataset.offline;
  btnSubmit.setAttribute('disabled');
  mesStatus.textContent = 'Пользователь не в сети';
  msgContent.appendChild(mesStatus);
});