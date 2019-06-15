// render chat templates to DOM
// clear the list of chats
class ChatUI {
  constructor(list) {
    this.list = list;
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true
    });
    const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <span class="time">${when}</span>
        </li>
      `;

    this.list.innerHTML += html;
  }
}
