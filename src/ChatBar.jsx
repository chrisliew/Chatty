import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.onContent = this.onContent.bind(this);
    this.onCurrentUser = this.onCurrentUser.bind(this);
  }

  onContent(event) {
    if(event.key === "Enter"){
      this.props.onNewPost(event.target.value);
    }
  }

   onCurrentUser(event) {
    if(event.key === 'Enter') {
      this.props.onNewUser(event.target.value);
    }
  }


  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
        defaultValue={this.props.currentUser} onKeyPress={this.onCurrentUser}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
         onKeyPress={this.onContent}/>
      </footer>
    )
  }
}
// want to take messages then pass it along to messages then to message list.
export default ChatBar;