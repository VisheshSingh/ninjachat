// dom queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');

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
});

// get chats and render
chatroom.getChats(data => {
  chatUI.render(data);
});
