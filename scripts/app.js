// dom queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'steve');

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
