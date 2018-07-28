import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
require ('../styles/application.scss');

class App extends Component {
    constructor() {
      super();

      this.state = {
          currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [],
          clientCount: 0,
      };
      this.onNewPost = this.onNewPost.bind(this);
      this.onNewUser = this.onNewUser.bind(this);
    }

    componentDidMount() {

      this.socket = new WebSocket('ws://localhost:3001');


      this.socket.addEventListener('message', (messageEvent) => {
        const messageObject = JSON.parse(messageEvent.data);

        if (messageObject.type === 'usersCount') {
          this.setState({
            clientCount: messageObject.content
          });
          } else {
            this.setState({
              messages: [...this.state.messages, messageObject],
            });
          }
      });
    }

    onNewPost(content) {
      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: content
      };
      const message = this.state.messages.concat(newMessage);
      console.log("NewPost msg from client" , JSON.stringify(newMessage));
      this.socket.send(JSON.stringify(newMessage));

    }

    onNewUser(event) {
      let previousUser = this.state.currentUser.name;
      let currentUserChange = {name: event};
      //this.setState is asynchronous. Can't console.log to get state, so use the react in chrome dev tools
      this.setState({
        currentUser: currentUserChange
      });

      let notificationMessage = `${previousUser} has changed their name to ${event}`;

      let newMessage = {
        type: "postNotification",
        content: notificationMessage
      };
      let messages = this.state.messages.concat(newMessage);
      this.socket.send(JSON.stringify(newMessage));
      console.log("Client Sends:" , newMessage);
    }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty
            <span className = "client-count">
            {this.state.clientCount} users online
            </span>
          </a>
        </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser.name} onNewPost={this.onNewPost} onNewUser={this.onNewUser} />
      </div>
    );
  }
}
export default App;
