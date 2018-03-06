'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open', () => {
  showBubbles(connection);
  console.log('Вебсокет-соединение открыто');
});
function sendData(event) {
  let coord = { x: event.pageX, y: event.pageY
  }
  connection.send(JSON.stringify(coord));
}
document.addEventListener('click', sendData);
