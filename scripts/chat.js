// adding new chat documents

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chat = db.collection('chats');
  }
  async addChat(message) {
    const now = new Date();
    const chat = {
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
      message: message
    };

    const response = await this.chat.add(chat);
    return response;
  }
}
// updating the username
// updating the room

// Real time listener - to get chats
db.collection('chats').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    const doc = change.doc;
    console.log(doc.data());
  });
});

const chatroom = new Chatroom('general', 'shaun');
chatroom
  .addChat('yo yo yo boys!')
  .then(() => console.log('chat added!'))
  .catch(err => console.log(err.message));
