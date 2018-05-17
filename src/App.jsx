import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

require ('../styles/application.scss');
// Wrap it in div element so there can be multiple ones.
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // currentUser: {name: "Chris"}, // optional. if currentUser is not defined, it means the user is Anonymous
      currentUser: {name: 'Bob'},
      messages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.onNewPost = this.onNewPost.bind(this);
  }

  handleChange(event) {
    this.setState({currentUser: {name:event}});
  }

  handleEnter(event) {
    event.preventDefault();
  }


    // in App.jsx
  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001');

    // take message and send off to all the clients, instead of just the original one
    this.socket.addEventListener('message', (messageEvent) => {
      const messageObject = JSON.parse(messageEvent.data);
      console.log("received message on client side:", messageObject);
      this.setState({
        messages: [...this.state.messages, messageObject],
      });

    });



    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Bob", content: "Hello there!"};

    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages});
    // }, 500);
  }


    //create a function that passes through props to chatbar
    // when client types in content, want to send it over to server.
    onNewPost(content) {
      const newMessage = { username: this.state.currentUser.name, content: content};
      const messages = this.state.messages.concat(newMessage);

      // this.setState({messages: messages}); (THIS IS commented out as it created duplicates)
      this.socket.send(JSON.stringify(newMessage));
    }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar onNewPost={ this.onNewPost } currentUser={this.state.currentUser} handleChange={this.handleChange}/>
        <MessageList message={this.state.messages}/>
      </div>
    );
  }
}


export default App;
