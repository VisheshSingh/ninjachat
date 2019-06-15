class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
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
    this.unsub = this.chats
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
  // updating the username
  updateUsername(username) {
    this.username = username;
    console.log('username updated!');
  }
  // updating the room
  updateRoom(room) {
    this.room = room;
    console.log('room updated!');
    if (this.unsub) {
      this.unsub();
    }
  }
}
