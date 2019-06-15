db.collection('chats').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    const doc = change.doc;
    console.log(doc.data());
  });
});
