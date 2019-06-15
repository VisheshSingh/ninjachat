class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chat = db.collection('chats');
  }

  // adding new chat documents
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

  // Real time listener - to get chats
  getChats(callback) {
    this.chat.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          // update the ui
          callback(change.doc.data());
        }
      });
    });
  }
}
// updating the username
// updating the room

const chatroom = new Chatroom('general', 'shaun');
chatroom.getChats(data => {
  console.log(data);
});
