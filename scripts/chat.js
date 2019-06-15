class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
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

    const response = await this.chats.add(chat);
    return response;
  }

  // Real time listener - to get chats
  getChats(callback) {
    this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
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

const chatroom = new Chatroom('general', 'steve');
// chatroom
//   .addChat('cover me boys')
//   .then(() => console.log('chat added!'))
//   .catch(err => console.log(err.message));
chatroom.getChats(data => {
  console.log(data);
});
