// dom queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'steve');

// submit event
newChat.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChat.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChat.reset())
    .catch(err => console.log(err.message));
});

// get chats and render
chatroom.getChats(data => {
  chatUI.render(data);
});
