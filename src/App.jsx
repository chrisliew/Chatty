import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

require ('../styles/application.scss');
// Wrap it in div element so there can be multiple ones.
class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onNewPost = this.onNewPost.bind(this);
  }

    // in App.jsx
  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('open', (event) => {
      console.log(this.socket.readyState);
    });

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Bob", content: "Hello there!"};

      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 500);
  }


    //create a function that passes through props to chatbar
    // when client types in content, want to send it over to server.
    onNewPost(content) {
      const newMessage = {id: 3, username: "Michelle", content: content};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      console.log("WHATUP" , this.socket.send(""));
    }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar onNewPost={ this.onNewPost } currentUser={this.state.currentUser}/>
        <MessageList message={this.state.messages}/>
      </div>
    );
  }
}


export default App;
