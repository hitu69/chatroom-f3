// client side

const socket = io('http://localhost:3000');
// connection between client and server is established

let username = '';

// to join chatroom
document.getElementById('join-btn').addEventListener('click', (event) => {
  event.preventDefault();

  username = document.getElementById('username-input').value;

  if (username.trim() != '') {
    document.querySelector('.form-username').style.display = 'none';
    document.querySelector('.chatroom-container').style.display = 'block';

    document.querySelector(
      '.chatroom-header'
    ).innerText = `Chatroom - ${username}`;

    // from client to server
    socket.emit('username enter', username);
  } else {
    alert('Username cannot be empty');
  }
});

document.getElementById('send-btn').addEventListener('click', (event) => {
  event.preventDefault();

  const data = {
    username: username,
    message: document.getElementById('message-input').value,
  };

  // frontend -> add the message on screen
  addMessage(data, true);

  // socket -> send the message to server
  socket.emit('message', data);
});

// flag -> whether we have recieved the message or sent
function addMessage(data, flag) {
  var msgDiv = document.createElement('div');
  msgDiv.innerText = `${data.username}: ${data.message}`;

  if (flag) {
    // i have sent the message
    msgDiv.setAttribute('class', 'message sent');
  } else {
    // i have recieved the message
    msgDiv.setAttribute('class', 'message recieved');
  }

  document.querySelector('#messages-container').appendChild(msgDiv);
}

// for exit

document.getElementById('exit-btn').addEventListener('click', () => {
  //
  //

  socket.emit('username left', username);
});

socket.on('username enter', (username) => {
  console.log('from server to client');

  var msgDiv = document.createElement('div');
  msgDiv.innerText = `${username} has entered`;

  document.querySelector('#messages-container').appendChild(msgDiv);
});

socket.on('message', (data) => {
  if (data.username !== username) {
    addMessage(data, false);
  }
});

socket.on('username left', (data) => {
  // if the user which has left is not this current user
  if (data !== username) {
    var msgDiv = document.createElement('div');
    msgDiv.innerText = `${data} has left!`;

    document.querySelector('#messages-container').appendChild(msgDiv);
  } else {
    var msgDiv = document.createElement('div');
    msgDiv.innerText = `you have left!`;

    document.querySelector('#messages-container').appendChild(msgDiv);
  }
});
