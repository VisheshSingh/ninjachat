// dom queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => {
      chatUI.render(chat);
    });
  }
});

// class instances
const chatUI = new ChatUI(chatList);
const username = localStorage.getItem('username')
  ? localStorage.getItem('username')
  : 'anonymous';
const chatroom = new Chatroom('general', username);

// form events
newChat.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChat.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChat.reset())
    .catch(err => console.log(err.message));
});

newName.addEventListener('submit', e => {
  e.preventDefault();
  const username = newName.name.value.trim();
  chatroom.updateUsername(username);
  newName.reset();

  updateMsg.innerText = `You are updated username is ${username}`;
  setTimeout(() => (updateMsg.innerText = ''), 3000);
});

// get chats and render
chatroom.getChats(data => {
  chatUI.render(data);
});
